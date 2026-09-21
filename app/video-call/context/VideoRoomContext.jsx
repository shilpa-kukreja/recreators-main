'use client';
import {
  createContext, useCallback, useContext, useEffect, useMemo, useRef, useState,
} from 'react';
import { io } from 'socket.io-client';
import PropTypes from 'prop-types';
import { useWebRTC } from '../hooks/useWebRTC';

const VideoRoomContext = createContext(null);
const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5000';

const initialRoomState = {
  meeting: null,
  guestToken: null,
  displayName: '',
  isHost: false,
  selfId: null,
  participants: [],
  remoteStreams: {},
  callStatus: 'idle',
  error: null,
  notices: [],
  chat: [],
  unreadCount: 0,
  micOn: true,
  camOn: true,
  sharing: false,
  reconnecting: false,
  locked: false,
};

export function VideoRoomProvider({ children }) {
  const [state, setState] = useState(initialRoomState);
  const [waiting, setWaiting] = useState([]);

  // ✅ state, so re-renders fire when these become available
  const [socket, setSocket] = useState(null);
  const [localStream, setLocalStream] = useState(null);

  // refs for imperative access inside callbacks
  const socketRef = useRef(null);
  const localStreamRef = useRef(null);
  const screenStreamRef = useRef(null);
  const cameraTrackRef = useRef(null);

  const patch = useCallback((p) => setState((s) => ({ ...s, ...p })), []);

  const stopStream = (s) => s?.getTracks().forEach((t) => t.stop());

  /* ------------------------- media ------------------------- */
  const getLocalStream = useCallback(async ({ video = true, audio = true } = {}) => {
    if (!navigator.mediaDevices?.getUserMedia) {
      throw new Error('Your browser does not support video calling.');
    }
    const stream = await navigator.mediaDevices.getUserMedia({
      video: video ? { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' } : false,
      audio: audio ? { echoCancellation: true, noiseSuppression: true } : false,
    });
    localStreamRef.current = stream;
    cameraTrackRef.current = stream.getVideoTracks()[0] || null;
    setLocalStream(stream);           // ✅ triggers re-render
    return stream;
  }, []);

  /* ---------------------------- socket ---------------------------- */
  const connectSocket = useCallback(({ token, meetingId }) => {
    if (socketRef.current) return socketRef.current;

    const s = io(`${SOCKET_URL}/video`, {
      auth: { token, meetingId },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 8000,
    });

    s.on('connect', () => patch({ reconnecting: false }));
    s.on('disconnect', () => patch({ reconnecting: true }));
    s.on('connect_error', (err) => patch({ error: err.message, callStatus: 'error' }));

    socketRef.current = s;
    setSocket(s);                     // ✅ triggers re-render → useWebRTC gets real socket
    return s;
  }, [patch]);

  /* ---------------------------- WebRTC ---------------------------- */
  const handleRemoteStream = useCallback((peerId, stream) => {
    setState((s) => ({
      ...s,
      remoteStreams: { ...s.remoteStreams, [peerId]: stream },
      callStatus: 'active',
    }));
  }, []);

  const handlePeerRemoved = useCallback((peerId) => {
    setState((s) => {
      const next = { ...s.remoteStreams };
      delete next[peerId];
      return { ...s, remoteStreams: next };
    });
  }, []);

  const { createPeer, closeAll, connectionState } = useWebRTC({
    socket,                            // ✅ real state
    localStream,                       // ✅ real state
    onRemoteStream: handleRemoteStream,
    onPeerRemoved: handlePeerRemoved,
  });

  /* -------------------- socket event subscriptions -------------------- */
  useEffect(() => {
    if (!socket) return undefined;

    // const onRoomJoined = ({ selfId, isHost, participants }) => {
    //   patch({ selfId, isHost, participants, callStatus: 'active' });

    //   // ✅ THE MISSING PIECE: as the newest joiner, WE initiate offers to
    //   //    everyone already in the room.
    //   participants.forEach((p) => {
    //     if (p.socketId !== selfId) {
    //       createPeer(p.socketId, { initiator: true });
    //     }
    //   });
    // };


    const onRoomJoined = ({ selfId, isHost, participants }) => {
      // ✅ dedupe by socketId
      const seen = new Set();
      const clean = [];
      for (const p of participants || []) {
        if (!p?.socketId || seen.has(p.socketId)) continue;
        seen.add(p.socketId);
        clean.push(p);
      }

      patch({ selfId, isHost, participants: clean, callStatus: 'active' });

      clean.forEach((p) => {
        if (p.socketId !== selfId) {
          createPeer(p.socketId, { initiator: true });
        }
      });
    };

    const onUserJoined = (participant) => {
      setState((s) => {
        if (s.participants.some((p) => p.socketId === participant.socketId)) return s;
        return { ...s, participants: [...s.participants, participant] };
      });
      // We do NOT create the peer — the joiner offers to us.
    };

    const onUserLeft = ({ socketId }) => {
      setState((s) => ({
        ...s,
        participants: s.participants.filter((p) => p.socketId !== socketId),
      }));
      setWaiting((w) => w.filter((x) => x.socketId !== socketId));
    };

    const onParticipantUpdated = ({ socketId, ...rest }) => {
      setState((s) => ({
        ...s,
        participants: s.participants.map((p) =>
          p.socketId === socketId ? { ...p, ...rest } : p
        ),
      }));
    };

    const onChat = (message) => {
      setState((s) => ({
        ...s,
        chat: [...s.chat, message],
        unreadCount: s.chatOpen ? s.unreadCount : s.unreadCount + 1,
      }));
    };

    const onWaitingApproval = () => patch({ callStatus: 'waiting' });
    const onWaitingForHost = () => patch({ callStatus: 'waiting' });

    const onJoinRequest = ({ socketId, name }) => {
      setWaiting((w) =>
        w.some((x) => x.socketId === socketId) ? w : [...w, { socketId, name }]
      );
    };

    const onHostAvailable = () => {
      socket.emit('join-room', { name: state.displayName });
    };

    const onJoinApproved = () => patch({ callStatus: 'connecting' });
    const onJoinRejected = ({ message }) => patch({ callStatus: 'error', error: message });
    const onMeetingError = ({ message }) => patch({ callStatus: 'error', error: message });

    const onMeetingEnded = ({ reason }) => {
      patch({ callStatus: 'ended', error: null });
      stopStream(localStreamRef.current);
      localStreamRef.current = null;
      setLocalStream(null);
      closeAll();
      socket.disconnect();
      socketRef.current = null;
      setSocket(null);
      sessionStorage.setItem('videoCallEndReason', reason || 'Meeting ended by the host.');
      window.location.href = '/video-call/meeting-ended';
    };

    const onRemoved = ({ message }) => {
      patch({ callStatus: 'error', error: message });
      stopStream(localStreamRef.current);
      localStreamRef.current = null;
      setLocalStream(null);
      closeAll();
      socket.disconnect();
      socketRef.current = null;
      setSocket(null);
    };

    const onLocked = ({ locked }) => patch({ locked });

    const onForceMute = ({ micOn }) => {
      const tracks = localStreamRef.current?.getAudioTracks() || [];
      tracks.forEach((t) => { t.enabled = micOn; });
      patch({ micOn });
      socket.emit('toggle-microphone', { micOn });
    };

    socket.on('room-joined', onRoomJoined);
    socket.on('user-joined', onUserJoined);
    socket.on('user-left', onUserLeft);
    socket.on('participant-updated', onParticipantUpdated);
    socket.on('chat-message', onChat);
    socket.on('waiting-for-approval', onWaitingApproval);
    socket.on('waiting-for-host', onWaitingForHost);
    socket.on('join-request', onJoinRequest);
    socket.on('host-available', onHostAvailable);
    socket.on('join-approved', onJoinApproved);
    socket.on('join-rejected', onJoinRejected);
    socket.on('meeting-error', onMeetingError);
    socket.on('meeting-ended', onMeetingEnded);
    socket.on('removed-from-meeting', onRemoved);
    socket.on('meeting-locked', onLocked);
    socket.on('force-mute', onForceMute);

    return () => {
      socket.off('room-joined', onRoomJoined);
      socket.off('user-joined', onUserJoined);
      socket.off('user-left', onUserLeft);
      socket.off('participant-updated', onParticipantUpdated);
      socket.off('chat-message', onChat);
      socket.off('waiting-for-approval', onWaitingApproval);
      socket.off('waiting-for-host', onWaitingForHost);
      socket.off('join-request', onJoinRequest);
      socket.off('host-available', onHostAvailable);
      socket.off('join-approved', onJoinApproved);
      socket.off('join-rejected', onJoinRejected);
      socket.off('meeting-error', onMeetingError);
      socket.off('meeting-ended', onMeetingEnded);
      socket.off('removed-from-meeting', onRemoved);
      socket.off('meeting-locked', onLocked);
      socket.off('force-mute', onForceMute);
    };
  }, [socket, state.displayName, patch, closeAll, createPeer]);

  /* ------------------------------ entry points ------------------------------ */

const enterRoom = useCallback(
  async ({ meetingId, guestToken, meeting, displayName }) => {
    if (socketRef.current?.connected) return;

    patch({ meeting, guestToken, displayName, callStatus: 'connecting', error: null });

    try {
      if (!localStreamRef.current) {
        await getLocalStream({ video: true, audio: true });
      }
    } catch (err) {
      console.error('getUserMedia failed', err);
      patch({ callStatus: 'error', error: 'Could not access camera/microphone.' });
      return;
    }

    const s = connectSocket({ token: guestToken, meetingId });
    if (!s.data?.__joined) {
      s.data = s.data || {};
      s.data.__joined = true;
      s.emit('join-room', { name: displayName });
    }
  },
  [connectSocket, getLocalStream, patch]
);

const enterRoomAsHost = useCallback(
  async ({ meetingId, adminToken, meeting, displayName }) => {
    // ✅ already connected → skip
    if (socketRef.current?.connected) return;

    patch({
      meeting, guestToken: adminToken, displayName,
      isHost: true, callStatus: 'connecting', error: null,
    });

    try {
      if (!localStreamRef.current) {
        await getLocalStream({ video: true, audio: true });
      }
    } catch (err) {
      console.error('getUserMedia failed', err);
      patch({ callStatus: 'error', error: 'Could not access camera/microphone.' });
      return;
    }

    const s = connectSocket({ token: adminToken, meetingId });
    // make sure we only emit once per socket
    if (!s.data?.__joined) {
      s.data = s.data || {};
      s.data.__joined = true;
      s.emit('join-room', { name: displayName });
    }
  },
  [connectSocket, getLocalStream, patch]
);

  /* ---------------------------- controls ---------------------------- */

  const toggleMic = useCallback(() => {
    const tracks = localStreamRef.current?.getAudioTracks() || [];
    if (!tracks.length) return;
    const next = !tracks[0].enabled;
    tracks.forEach((t) => { t.enabled = next; });
    patch({ micOn: next });
    socketRef.current?.emit('toggle-microphone', { micOn: next });
  }, [patch]);

  const toggleCam = useCallback(() => {
    const tracks = localStreamRef.current?.getVideoTracks() || [];
    if (!tracks.length) return;
    const next = !tracks[0].enabled;
    tracks.forEach((t) => { t.enabled = next; });
    patch({ camOn: next });
    socketRef.current?.emit('toggle-camera', { camOn: next });
  }, [patch]);

  const startScreenShare = useCallback(async () => {
    if (!navigator.mediaDevices?.getDisplayMedia) return;
    try {
      const display = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: false });
      screenStreamRef.current = display;
      const screenTrack = display.getVideoTracks()[0];
      setState((s) => ({ ...s, sharing: true }));
      window.dispatchEvent(new CustomEvent('video-call:screen-track', { detail: screenTrack }));
      socketRef.current?.emit('screen-share-started');
      screenTrack.onended = () => {
        window.dispatchEvent(new CustomEvent('video-call:screen-track', { detail: cameraTrackRef.current }));
        socketRef.current?.emit('screen-share-stopped');
        screenStreamRef.current = null;
        setState((s) => ({ ...s, sharing: false }));
      };
    } catch (e) { console.warn('Screen share cancelled', e); }
  }, []);

  const stopScreenShare = useCallback(() => {
    screenStreamRef.current?.getTracks().forEach((t) => t.stop());
    window.dispatchEvent(new CustomEvent('video-call:screen-track', { detail: cameraTrackRef.current }));
    socketRef.current?.emit('screen-share-stopped');
    screenStreamRef.current = null;
    patch({ sharing: false });
  }, [patch]);

  const sendChat = useCallback((text) => {
    socketRef.current?.emit('chat-message', { text });
  }, []);

  const leaveCall = useCallback(() => {
    socketRef.current?.disconnect();
    socketRef.current = null;
    setSocket(null);
    closeAll();
    stopStream(localStreamRef.current);
    stopStream(screenStreamRef.current);
    localStreamRef.current = null;
    screenStreamRef.current = null;
    setLocalStream(null);
    setState({ ...initialRoomState });
    setWaiting([]);
  }, [closeAll]);

  const endMeetingForAll = useCallback(() => {
    socketRef.current?.emit('end-meeting');
  }, []);

  const removeParticipant = useCallback((socketId) => {
    socketRef.current?.emit('remove-participant', { socketId });
  }, []);

  const muteParticipant = useCallback((socketId, micOn) => {
    socketRef.current?.emit('mute-participant', { socketId, micOn });
  }, []);

  const approveJoin = useCallback((socketId) => {
    socketRef.current?.emit('join-approved', { socketId });
    setWaiting((w) => w.filter((x) => x.socketId !== socketId));
  }, []);

  const rejectJoin = useCallback((socketId) => {
    socketRef.current?.emit('join-rejected', { socketId });
    setWaiting((w) => w.filter((x) => x.socketId !== socketId));
  }, []);

  const toggleLock = useCallback(() => {
    socketRef.current?.emit('lock-meeting', { locked: !state.locked });
  }, [state.locked]);

  const value = useMemo(
    () => ({
      ...state,
      waiting,
      connectionState,
      localStream,
      socket,
      getLocalStream,
      prepareDeviceCheck: async () => patch({ callStatus: 'device-check', error: null }),
      startPreview: async () => {
        const stream = await getLocalStream({ video: true, audio: true });
        patch({ micOn: true, camOn: true });
        return stream;
      },
      enterRoom,
      enterRoomAsHost,
      toggleMic,
      toggleCam,
      startScreenShare,
      stopScreenShare,
      sendChat,
      leaveCall,
      endMeetingForAll,
      removeParticipant,
      muteParticipant,
      approveJoin,
      rejectJoin,
      toggleLock,
      setUnread: (n) => patch({ unreadCount: n }),
    }),
    [
      state, waiting, connectionState, localStream, socket, getLocalStream,
      enterRoom, enterRoomAsHost, toggleMic, toggleCam, startScreenShare,
      stopScreenShare, sendChat, leaveCall, endMeetingForAll, removeParticipant,
      muteParticipant, approveJoin, rejectJoin, toggleLock, patch,
    ]
  );

  return <VideoRoomContext.Provider value={value}>{children}</VideoRoomContext.Provider>;
}

VideoRoomProvider.propTypes = { children: PropTypes.node.isRequired };

export function useVideoRoom() {
  const ctx = useContext(VideoRoomContext);
  if (!ctx) throw new Error('useVideoRoom must be used within VideoRoomProvider');
  return ctx;
}