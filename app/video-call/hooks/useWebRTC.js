'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

function buildIceConfig() {
  const username = process.env.NEXT_PUBLIC_TURN_USERNAME;
  const credential = process.env.NEXT_PUBLIC_TURN_PASSWORD;

  const iceServers = [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun.relay.metered.ca:80' },
    { urls: 'turn:global.relay.metered.ca:80', username, credential },
    { urls: 'turn:global.relay.metered.ca:80?transport=tcp', username, credential },
    { urls: 'turn:global.relay.metered.ca:443', username, credential },
    { urls: 'turns:global.relay.metered.ca:443?transport=tcp', username, credential },
  ];

  return { iceServers, iceCandidatePoolSize: 10 };
}

export function useWebRTC({ socket, localStream, onRemoteStream, onPeerRemoved }) {
  const peersRef = useRef(new Map());
  const pendingCandidates = useRef(new Map());
  const [connectionState, setConnectionState] = useState('new');
  const [reconnecting, setReconnecting] = useState(false);

  const closePeer = useCallback(
    (peerId) => {
      const pc = peersRef.current.get(peerId);
      if (pc) {
        pc.onicecandidate = null;
        pc.ontrack = null;
        pc.onconnectionstatechange = null;
        try { pc.close(); } catch {}
        peersRef.current.delete(peerId);
      }
      pendingCandidates.current.delete(peerId);
      onPeerRemoved?.(peerId);
    },
    [onPeerRemoved]
  );

  const closeAll = useCallback(() => {
    [...peersRef.current.keys()].forEach(closePeer);
    peersRef.current.clear();
  }, [closePeer]);

  const flushCandidates = useCallback(async (peerId, pc) => {
    const list = pendingCandidates.current.get(peerId);
    if (!list || !pc.remoteDescription) return;
    pendingCandidates.current.delete(peerId);
    for (const c of list) {
      try {
        await pc.addIceCandidate(new RTCIceCandidate(c));
      } catch (e) {
        console.warn('ICE flush failed', e);
      }
    }
  }, []);

  const createPeer = useCallback(
    (peerId, { initiator }) => {
      if (peersRef.current.has(peerId)) return peersRef.current.get(peerId);
      if (!socket) return null;

      const pc = new RTCPeerConnection(buildIceConfig());
      peersRef.current.set(peerId, pc);

      // Add all current local tracks (uses the CURRENT state value, not a stale ref)
      (localStream?.getTracks() || []).forEach((track) => {
        pc.addTrack(track, localStream);
      });

      pc.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit('ice-candidate', { to: peerId, candidate: event.candidate.toJSON() });
        }
      };

      pc.ontrack = (event) => {
        const [stream] = event.streams;
        if (stream) onRemoteStream?.(peerId, stream);
      };

      pc.onconnectionstatechange = () => {
        const s = pc.connectionState;
        if (s === 'connected') { setReconnecting(false); setConnectionState('connected'); }
        if (s === 'disconnected') {
          setReconnecting(true);
          setTimeout(() => {
            if (peersRef.current.get(peerId)?.connectionState === 'disconnected') {
              try { pc.restartIce(); } catch {}
            }
          }, 2000);
        }
        if (s === 'failed') { try { pc.restartIce(); } catch { closePeer(peerId); } }
        if (s === 'closed') closePeer(peerId);
      };

      if (initiator) {
        (async () => {
          try {
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);
            socket.emit('offer', { to: peerId, sdp: pc.localDescription });
          } catch (e) {
            console.error('createOffer failed', e);
          }
        })();
      }

      return pc;
    },
    [socket, localStream, onRemoteStream, closePeer]
  );

  /* ---------- signaling listeners ---------- */
  useEffect(() => {
    if (!socket) return undefined;

    const handleOffer = async ({ from, sdp }) => {
      const pc = createPeer(from, { initiator: false });
      if (!pc) return;
      try {
        await pc.setRemoteDescription(new RTCSessionDescription(sdp));
        await flushCandidates(from, pc);
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socket.emit('answer', { to: from, sdp: pc.localDescription });
      } catch (e) { console.error('handleOffer failed', e); }
    };

    const handleAnswer = async ({ from, sdp }) => {
      const pc = peersRef.current.get(from);
      if (!pc || pc.signalingState !== 'have-local-offer') return;
      try {
        await pc.setRemoteDescription(new RTCSessionDescription(sdp));
        await flushCandidates(from, pc);
      } catch (e) { console.error('handleAnswer failed', e); }
    };

    const handleIce = async ({ from, candidate }) => {
      const pc = peersRef.current.get(from);
      if (!pc || !candidate) return;
      if (!pc.remoteDescription) {
        const list = pendingCandidates.current.get(from) || [];
        list.push(candidate);
        pendingCandidates.current.set(from, list);
        return;
      }
      try { await pc.addIceCandidate(new RTCIceCandidate(candidate)); }
      catch (e) { console.warn('addIceCandidate failed', e); }
    };

    const handleUserLeft = ({ socketId }) => closePeer(socketId);

    socket.on('offer', handleOffer);
    socket.on('answer', handleAnswer);
    socket.on('ice-candidate', handleIce);
    socket.on('user-left', handleUserLeft);

    return () => {
      socket.off('offer', handleOffer);
      socket.off('answer', handleAnswer);
      socket.off('ice-candidate', handleIce);
      socket.off('user-left', handleUserLeft);
    };
  }, [socket, createPeer, closePeer, flushCandidates]);

  /* ---------- replace tracks when local stream changes ---------- */
  useEffect(() => {
    if (!localStream) return;
    peersRef.current.forEach((pc) => {
      const senders = pc.getSenders();
      localStream.getTracks().forEach((track) => {
        const sender = senders.find((s) => s.track && s.track.kind === track.kind);
        if (sender) sender.replaceTrack(track);
        else pc.addTrack(track, localStream);
      });
    });
  }, [localStream]);

 /* ---------- screen-share track swap ---------- */

  useEffect(() => () => closeAll(), [closeAll]);

  return { createPeer, closePeer, closeAll, connectionState, reconnecting };
}