// ============================================================
// BACKEND — socket/videoCallSocket.js
// ============================================================
import jwt from 'jsonwebtoken';
import VideoMeeting from '../models/VideoMeeting.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

/** meetingId -> RoomState */
const rooms = new Map();

function getRoom(meetingId) {
  let room = rooms.get(meetingId);
  if (!room) {
    room = {
      participants: new Map(), // socketId -> participant
      waiting: new Map(),      // socketId -> { socketId, name }
      locked: false,
      hostSocketIds: new Set(),
    };
    rooms.set(meetingId, room);
  }
  return room;
}

function cleanupRoom(meetingId, room) {
  if (room.participants.size === 0 && room.waiting.size === 0) {
    rooms.delete(meetingId);
  }
}

const publicParticipant = (p) => ({
  socketId: p.socketId,
  name: p.name,
  role: p.role,
  isHost: p.role === 'host',
  micOn: p.micOn,
  camOn: p.camOn,
  sharing: p.sharing,
});

export default function initVideoCallSocket(io) {
  const nsp = io.of('/video');

  /* ------------------------- auth middleware ------------------------- */
  nsp.use((socket, next) => {
    try {
      const { token, meetingId } = socket.handshake.auth || {};
      if (!token || !meetingId) return next(new Error('Authentication error'));

      const decoded = jwt.verify(token, JWT_SECRET);

      // Guest tokens are scoped to exactly one meeting.
      if (decoded.kind === 'guest' && decoded.meetingId !== meetingId) {
        return next(new Error('Invalid meeting token'));
      }

      socket.data.user = decoded;
      socket.data.meetingId = String(meetingId).toUpperCase();
      socket.data.isHost = decoded.kind !== 'guest';
      return next();
    } catch {
      return next(new Error('Authentication error'));
    }
  });

  /* --------------------------- connection --------------------------- */
  nsp.on('connection', async (socket) => {
    const { meetingId, isHost } = socket.data;
    const user = socket.data.user;
    const room = getRoom(meetingId);

    let joined = false; // becomes true once admitted into the room

    /* ---------------------- shared admit logic ---------------------- */
    const admit = async (name, role) => {
      joined = true;

      const participant = {
        socketId: socket.id,
        name,
        role,
        micOn: true,
        camOn: true,
        sharing: false,
      };

      // Everyone already in the room (send BEFORE joining so the new socket
      // is not in its own list).
      const existing = [...room.participants.values()].map(publicParticipant);

      room.participants.set(socket.id, participant);
      if (role === 'host') room.hostSocketIds.add(socket.id);

      socket.join(meetingId);

      // New joiner initiates WebRTC offers to everyone already present.
      socket.emit('room-joined', {
        selfId: socket.id,
        isHost: role === 'host',
        participants: existing,
      });

      // Tell the others.
      socket.to(meetingId).emit('user-joined', publicParticipant(participant));

      // Persist participant + flip meeting to active.
      VideoMeeting.updateOne(
        { meetingId },
        {
          $push: { participants: { socketId: socket.id, name, role, joinedAt: new Date() } },
          $set: { status: 'active', startedAt: new Date() },
        }
      ).catch(() => {});

      // Notify any waiting guests that a host is now present.
     // When a host joins, forward every currently-waiting guest as a join-request
// so the host's participant panel shows them immediately.
if (role === 'host' && room.waiting.size > 0) {
  room.waiting.forEach((w) => {
    nsp.to(socket.id).emit('join-request', { socketId: w.socketId, name: w.name });
  });
}
    };

    /* --------------------------- join-room --------------------------- */
    socket.on('join-room', async ({ name: rawName } = {}) => {
      try {
        const meeting = await VideoMeeting.findOne({ meetingId });
        if (!meeting) {
          return socket.emit('meeting-error', { code: 'NOT_FOUND', message: 'Meeting not found.' });
        }

        const state = meeting.getJoinState();
        if (!state.joinable && !state.canWait) {
          return socket.emit('meeting-error', { code: state.code, message: state.message });
        }
        if (meeting.locked && !isHost) {
          return socket.emit('meeting-error', { code: 'LOCKED', message: 'This meeting is locked by the host.' });
        }

        const displayName = isHost
          ? (user.name || meeting.hostName || 'Host')
          : (String(rawName || user.name || '').trim() || 'Guest');

        if (isHost) {
          await admit(displayName, 'host');
          return;
        }

        // Guest: host present AND waiting room enabled → request approval.
        const hostPresent = room.hostSocketIds.size > 0;

        if (meeting.waitingRoomEnabled && hostPresent) {
          room.waiting.set(socket.id, { socketId: socket.id, name: displayName });
          socket.emit('waiting-for-approval', { name: displayName });

          room.hostSocketIds.forEach((hostId) => {
            nsp.to(hostId).emit('join-request', { socketId: socket.id, name: displayName });
          });
          return;
        }

        if (!hostPresent) {
          // Host not here yet — park in waiting room.
          room.waiting.set(socket.id, { socketId: socket.id, name: displayName });
          socket.emit('waiting-for-host', { name: displayName });
          return;
        }

        await admit(displayName, 'guest');
      } catch (err) {
        console.error('join-room error', err);
        socket.emit('meeting-error', { code: 'SERVER', message: 'Unable to join the meeting.' });
      }
    });

    /* ------------------------ host approvals ------------------------ */
    socket.on('join-approved', async ({ socketId }) => {
      if (!isHost) return;
      const waiting = room.waiting.get(socketId);
      if (!waiting) return;

      room.waiting.delete(socketId);
      const guestSocket = nsp.sockets.get(socketId);
      if (!guestSocket) return;

      guestSocket.data.pendingApproval = false;
      guestSocket.emit('join-approved');

      // Run the same admit path on the guest socket.
      const participant = {
        socketId,
        name: waiting.name,
        role: 'guest',
        micOn: true,
        camOn: true,
        sharing: false,
      };
      const existing = [...room.participants.values()].map(publicParticipant);

      room.participants.set(socketId, participant);
      guestSocket.join(meetingId);

      guestSocket.emit('room-joined', {
        selfId: socketId,
        isHost: false,
        participants: existing,
      });
      guestSocket.to(meetingId).emit('user-joined', publicParticipant(participant));

      VideoMeeting.updateOne(
        { meetingId },
        {
          $push: { participants: { socketId, name: waiting.name, role: 'guest', joinedAt: new Date() } },
          $set: { status: 'active', startedAt: new Date() },
        }
      ).catch(() => {});
    });

    socket.on('join-rejected', ({ socketId }) => {
      if (!isHost) return;
      const waiting = room.waiting.get(socketId);
      if (!waiting) return;
      room.waiting.delete(socketId);
      nsp.to(socketId).emit('join-rejected', {
        message: 'Your request to join was declined.',
      });
      const guestSocket = nsp.sockets.get(socketId);
      if (guestSocket) guestSocket.disconnect(true);
    });

    /* --------------------------- signaling --------------------------- */
    socket.on('offer', ({ to, sdp }) => {
      if (!to || !joined) return;
      nsp.to(to).emit('offer', { from: socket.id, sdp });
    });

    socket.on('answer', ({ to, sdp }) => {
      if (!to || !joined) return;
      nsp.to(to).emit('answer', { from: socket.id, sdp });
    });

    socket.on('ice-candidate', ({ to, candidate }) => {
      if (!to || !joined) return;
      nsp.to(to).emit('ice-candidate', { from: socket.id, candidate });
    });

    /* ------------------------- media state ------------------------- */
    const patchParticipant = (patch) => {
      const p = room.participants.get(socket.id);
      if (!p) return;
      Object.assign(p, patch);
      socket.to(meetingId).emit('participant-updated', { socketId: socket.id, ...patch });
    };

    socket.on('toggle-microphone', ({ micOn }) => patchParticipant({ micOn: !!micOn }));
    socket.on('toggle-camera', ({ camOn }) => patchParticipant({ camOn: !!camOn }));

    socket.on('screen-share-started', () => patchParticipant({ sharing: true }));
    socket.on('screen-share-stopped', () => patchParticipant({ sharing: false }));

    /* ----------------------------- chat ----------------------------- */
    socket.on('chat-message', ({ text }) => {
      const p = room.participants.get(socket.id);
      const clean = String(text || '').trim().slice(0, 2000);
      if (!p || !clean) return;

      const message = {
        id: `${socket.id}-${Date.now()}`,
        text: clean,
        senderId: socket.id,
        senderName: p.name,
        isHost: p.role === 'host',
        at: new Date().toISOString(),
      };
      nsp.to(meetingId).emit('chat-message', message);
      socket.emit('chat-message', message);
    });

    /* ------------------------ host controls ------------------------- */
    socket.on('mute-participant', ({ socketId, micOn }) => {
      if (!isHost) return;
      nsp.to(socketId).emit('force-mute', { micOn: !!micOn });
      const p = room.participants.get(socketId);
      if (p) {
        p.micOn = !!micOn;
        nsp.to(meetingId).emit('participant-updated', { socketId, micOn: !!micOn });
      }
    });

    socket.on('remove-participant', ({ socketId }) => {
      if (!isHost) return;
      nsp.to(socketId).emit('removed-from-meeting', {
        message: 'You have been removed from the meeting by the host.',
      });
      const s = nsp.sockets.get(socketId);
      if (s) s.disconnect(true);
    });

    socket.on('lock-meeting', async ({ locked }) => {
      if (!isHost) return;
      room.locked = !!locked;
      await VideoMeeting.updateOne({ meetingId }, { $set: { locked: !!locked } }).catch(() => {});
      nsp.to(meetingId).emit('meeting-locked', { locked: !!locked });
    });

    socket.on('end-meeting', async () => {
      if (!isHost) return;
      await VideoMeeting.updateOne(
        { meetingId },
        { $set: { status: 'completed', endedAt: new Date() } }
      ).catch(() => {});

      nsp.to(meetingId).emit('meeting-ended', { reason: 'Meeting ended by the host.' });
      setTimeout(() => {
        nsp.in(meetingId).disconnectSockets(true);
        rooms.delete(meetingId);
      }, 400);
    });

    /* --------------------------- disconnect -------------------------- */
    socket.on('disconnect', async () => {
      room.waiting.delete(socket.id);

      const wasParticipant = room.participants.has(socket.id);
      room.participants.delete(socket.id);
      room.hostSocketIds.delete(socket.id);

      if (wasParticipant) {
        socket.to(meetingId).emit('user-left', { socketId: socket.id });

        await VideoMeeting.updateOne(
          { meetingId, 'participants.socketId': socket.id },
          { $set: { 'participants.$.leftAt': new Date() } }
        ).catch(() => {});

        // Reject any waiting guests if no host remains.
        if (room.hostSocketIds.size === 0 && room.waiting.size > 0) {
          room.waiting.forEach((w) => {
            nsp.to(w.socketId).emit('waiting-for-host');
          });
        }
      }

      cleanupRoom(meetingId, room);
    });
  });

  return nsp;
}