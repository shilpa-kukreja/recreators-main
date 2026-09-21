'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Video, Wifi, WifiOff, X } from 'lucide-react';
import { useVideoRoom } from '../../../../video-call/context/VideoRoomContext';
import VideoGrid from '../../../../video-call/components/VideoGrid';
import CallControls from '../../../../video-call/components/CallControls';
import ChatPanel from '../../../../video-call/components/ChatPanel';
import ParticipantPanel from '../../../../video-call/components/ParticipantPanel';
import { videoCallApi } from '../../../../video-call/lib/api';

export default function AdminVideoRoom() {
  const { id } = useParams();
  const router = useRouter();

  const {
    // state — safe defaults so first render never crashes
    meeting = null,
    selfId = null,
    participants = [],
    remoteStreams = {},
    localStream = null,
    chat = [],
    unreadCount = 0,
    micOn = false,
    camOn = false,
    sharing = false,
    reconnecting = false,
    error = '',
    callStatus = 'idle',
    waiting = [],
    // actions
    enterRoomAsHost,
    approveJoin,
    rejectJoin,
    removeParticipant,
    muteParticipant,
    toggleMic,
    toggleCam,
    startScreenShare,
    stopScreenShare,
    sendChat,
    leaveCall,
    endMeetingForAll,
    setUnread,
  } = useVideoRoom();

  const [chatOpen, setChatOpen] = useState(false);
  const [peopleOpen, setPeopleOpen] = useState(true);
  const [infoOpen, setInfoOpen] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [loading, setLoading] = useState(true);
  const [origin, setOrigin] = useState('');

  /* ---------- capture origin client-side only ---------- */
  useEffect(() => {
    if (typeof window !== 'undefined') setOrigin(window.location.origin);
  }, []);

  /* -------------- fetch meeting + join as host -------------- */
  useEffect(() => {
    const token =
      typeof window !== 'undefined'
        ? localStorage.getItem('tToken') ||
        localStorage.getItem('adminToken') ||
        localStorage.getItem('token')
        : null;

    if (!token) {
      router.replace('/admin/login');
      return;
    }

    if (typeof enterRoomAsHost !== 'function') {
      console.error('enterRoomAsHost is not available from VideoRoomContext');
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const res = await videoCallApi.getMeeting(id, token);
        if (!res?.meeting?.meetingId) {
          throw new Error('Meeting not found.');
        }
        await enterRoomAsHost({
          meetingId: res.meeting.meetingId,
          adminToken: token,
          meeting: res.meeting,
          displayName: 'Admin',
        });
      } catch (err) {
        console.error('Failed to join as host', err);
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  /* -------------- timer -------------- */
  useEffect(() => {
    if (callStatus !== 'active') return undefined;
    const t = setInterval(() => setElapsed((v) => v + 1), 1000);
    return () => clearInterval(t);
  }, [callStatus]);

  const sharingId = useMemo(
    () => participants.find((p) => p.sharing)?.socketId,
    [participants]
  );

  const fmt = (s) => {
    const h = Math.floor(s / 3600).toString().padStart(2, '0');
    const m = Math.floor((s % 3600) / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${h}:${m}:${sec}`;
  };

  const handleLeave = () => {
    try {
      if (typeof leaveCall === 'function') leaveCall();
    } catch (err) {
      console.error('leaveCall failed', err);
    }
    router.replace('/admin/video-calls');
  };

  const handleEndForAll = async () => {
    if (!window.confirm('End the meeting for everyone?')) return;
    try {
      if (typeof endMeetingForAll === 'function') await endMeetingForAll();
      router.replace('/admin/video-calls');
    } catch (err) {
      console.error('endMeetingForAll failed', err);
      alert('Could not end the meeting. Please try again.');
    }
  };

  /* ------------------------------ render ------------------------------ */
  if (loading || callStatus === 'connecting') {
    return (
      <div className="!flex !h-screen !items-center !justify-center !bg-[#0b0f19] !text-slate-400">
        Connecting as host…
      </div>
    );
  }

  if (callStatus === 'error') {
    return (
      <div className="!flex !h-screen !items-center !justify-center !bg-[#0b0f19] !p-6">
        <div className="!w-full !max-w-md !rounded-3xl !bg-slate-900/70 !p-8 !text-center !ring-1 !ring-white/10">
          <X className="!mx-auto !mb-3 !text-rose-400" size={32} />
          <h1 className="!text-lg !font-semibold !text-white">Unable to join</h1>
          <p className="!mt-1 !text-sm !text-slate-400">{error || 'Something went wrong.'}</p>
          <button
            onClick={() => router.push('/admin/video-calls')}
            className="!mt-5 !rounded-xl !bg-slate-800 !px-5 !py-2.5 !text-sm !font-medium !text-slate-200 hover:!bg-slate-700"
          >
            Back to dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="!flex !h-screen !flex-col !bg-[#0b0f19]">
      {/* Header */}
      <header className="!flex !shrink-0 !items-center !justify-between !gap-4 !border-b !border-white/10 !px-4 !py-3 md:!px-6">
        <div className="!flex !min-w-0 !items-center !gap-3">
          <div className="!flex !h-8 !w-8 !shrink-0 !items-center !justify-center !rounded-lg !bg-emerald-600 !text-white">
            <Video size={16} />
          </div>
          <div className="!min-w-0">
            <h1 className="!truncate !text-sm !font-semibold !text-white">
              {meeting?.title || 'Video Consultation'}{' '}
              <span className="!ml-2 !rounded !bg-amber-500/20 !px-1.5 !py-0.5 !text-[10px] !font-bold !text-amber-300">
                HOST
              </span>
            </h1>
            <p className="!truncate !text-[11px] !text-slate-500">
              {meeting?.meetingId} · {participants.length} participant{participants.length === 1 ? '' : 's'}
              {waiting.length > 0 && (
                <span className="!ml-2 !rounded !bg-emerald-500/20 !px-1.5 !py-0.5 !text-[10px] !font-bold !text-emerald-300">
                  {waiting.length} waiting
                </span>
              )}
            </p>
          </div>
        </div>

        <div className="!flex !items-center !gap-3">
          <span className="!hidden !items-center !gap-1.5 !rounded-full !bg-slate-800 !px-3 !py-1.5 !text-xs !font-medium !text-slate-300 sm:!flex">
            {reconnecting ? (
              <><WifiOff size={13} className="!text-amber-400" /> Reconnecting…</>
            ) : (
              <><Wifi size={13} className="!text-emerald-400" /> {fmt(elapsed)}</>
            )}
          </span>
        </div>
      </header>

      {/* Body */}
      <div className="!flex !min-h-0 !flex-1">
        <main className="!min-w-0 !flex-1 !p-3 md:!p-4">
          <VideoGrid
            participants={participants}
            remoteStreams={remoteStreams}
            localStream={localStream}
            selfId={selfId}
            sharingId={sharingId}
          />
        </main>

        <ChatPanel
          open={chatOpen}
          messages={chat}
          selfId={selfId}
          onSend={sendChat}
          onClose={() => setChatOpen(false)}
        />

        <ParticipantPanel
          open={peopleOpen}
          participants={participants}
          waiting={waiting}
          selfId={selfId}
          isHost
          onClose={() => setPeopleOpen(false)}
          onRemove={removeParticipant}
          onMute={muteParticipant}
          onApprove={approveJoin}
          onReject={rejectJoin}
        />
      </div>

      {/* Controls */}
      <footer className="!shrink-0 !px-3 !pb-4 !pt-2 md:!px-6 md:!pb-6">
        <CallControls
          micOn={micOn}
          camOn={camOn}
          sharing={sharing}
          unreadCount={unreadCount}
          isHost
          onToggleMic={toggleMic}
          onToggleCam={toggleCam}
          onToggleScreen={sharing ? stopScreenShare : startScreenShare}
          onToggleChat={() => { setChatOpen((v) => !v); setUnread(0); }}
          onToggleParticipants={() => setPeopleOpen((v) => !v)}
          onLeave={handleLeave}
          onEndForAll={handleEndForAll}
          onOpenInfo={() => setInfoOpen(true)}
        />
      </footer>

      {/* Meeting info drawer */}
      {infoOpen && (
        <div
          className="!fixed !inset-0 !z-40 !flex !items-center !justify-center !bg-black/60 !p-4"
          onClick={() => setInfoOpen(false)}
        >
          <div
            className="!w-full !max-w-md !rounded-2xl !bg-slate-900 !p-6 !ring-1 !ring-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="!mb-4 !flex !items-center !justify-between">
              <h3 className="!text-base !font-semibold !text-white">Meeting information</h3>
              <button
                onClick={() => setInfoOpen(false)}
                className="!rounded-lg !p-1.5 !text-slate-400 hover:!bg-white/10"
              >
                <X size={16} />
              </button>
            </div>
            <dl className="!space-y-2.5 !text-sm">
              {[
                ['Title', meeting?.title],
                ['Meeting ID', meeting?.meetingId],
                ['Host', meeting?.hostName],
                ['Date', meeting?.startTime ? new Date(meeting.startTime).toLocaleDateString() : '—'],
                ['Start time', meeting?.startTime ? new Date(meeting.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—'],
                ['Link', meeting?.meetingId && origin ? `${origin}/video-call/${meeting.meetingId}` : '—'],
              ].map(([k, v]) => (
                <div key={k} className="!flex !items-start !justify-between !gap-4">
                  <dt className="!text-slate-500">{k}</dt>
                  <dd className="!max-w-[60%] !truncate !text-right !text-slate-200">{v}</dd>
                </div>
              ))}
            </dl>
            <button
              onClick={() => {
                if (!meeting?.meetingId || !origin) return;
                navigator.clipboard.writeText(`${origin}/video-call/${meeting.meetingId}`);
              }}
              className="!mt-5 !w-full !rounded-xl !bg-slate-800 !py-2.5 !text-sm !font-medium !text-slate-200 hover:!bg-slate-700"
            >
              Copy meeting link
            </button>
          </div>
        </div>
      )}
    </div>
  );
}