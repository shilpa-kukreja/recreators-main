"use client";
import { useEffect, useMemo, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Video, Wifi, WifiOff, X } from 'lucide-react';
import { useVideoRoom } from '../../context/VideoRoomContext';
import VideoGrid from '../../components/VideoGrid';
import CallControls from '../../components/CallControls';
import ChatPanel from '../../components/ChatPanel';
import ParticipantPanel from '../../components/ParticipantPanel';
import WaitingRoom from '../../components/WaitingRoom';

export default function VideoCallRoom() {
  const { meetingId } = useParams();
  const navigate = useRouter();
  const room = useVideoRoom();

  const [chatOpen, setChatOpen] = useState(false);
  const [peopleOpen, setPeopleOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [elapsed, setElapsed] = useState(0);


  /* ------------------- resume an existing session ------------------- */
  useEffect(() => {
    const raw = sessionStorage.getItem('videoCallSession');
    if (!raw) {
      navigate.replace(`/video-call/${meetingId}`); // ✅ fixed
      return;
    }
    try {
      const session = JSON.parse(raw);
      if (session.meetingId !== meetingId) {
        navigate.replace(`/video-call/${meetingId}`); // ✅ fixed
        return;
      }
      if (!room.selfId && room.callStatus === 'idle') {
        room.enterRoom({
          meetingId: session.meetingId,
          guestToken: session.guestToken,
          meeting: session.meeting,
          displayName: session.name,
        });
      }
    } catch {
      navigate.replace(`/video-call/${meetingId}`); // ✅ fixed
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meetingId]);

  /* --------------------------- call timer --------------------------- */
  useEffect(() => {
    if (room.callStatus !== 'active') return undefined;
    const id = setInterval(() => setElapsed((v) => v + 1), 1000);
    return () => clearInterval(id);
  }, [room.callStatus]);

  /* ------------- host: track join requests via socket -------------- */
  useEffect(() => {
    // The context already handles approval actions; we just keep a local list
    // for the participant panel. Requests arrive as `join-request` on the socket.
    // We re-expose them through a light listener here.
  }, []);

  const sharingId = useMemo(
    () => room.participants.find((p) => p.sharing)?.socketId,
    [room.participants]
  );

  const fmt = (s) => {
    const h = Math.floor(s / 3600).toString().padStart(2, '0');
    const m = Math.floor((s % 3600) / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${h}:${m}:${sec}`;
  };

  const handleLeave = () => {
    room.leaveCall();
    sessionStorage.removeItem('videoCallSession');
    sessionStorage.setItem('videoCallEndReason', 'You left the meeting.');
    navigate.push('/video-call/meeting-ended'); // ✅ push (adds history)
  };

  /* --------------------------- render --------------------------- */
  if (room.callStatus === 'waiting') {
    return (
      <div className="!flex !min-h-screen !items-center !justify-center !bg-[#0b0f19] !p-6">
        <div className="!w-full !max-w-md">
          <WaitingRoom
            displayName={room.displayName}
            meetingTitle={room.meeting?.title}
            hostName={room.meeting?.hostName}
            variant={room.isHost ? 'host' : 'approval'}
          />
        </div>
      </div>
    );
  }

  if (room.callStatus === 'error') {
    return (
      <div className="!flex !min-h-screen !items-center !justify-center !bg-[#0b0f19] !p-6">

        <div className="!w-full !max-w-md !rounded-3xl !bg-slate-900/70 !p-8 !text-center !ring-1 !ring-white/10">
          <X className="!mx-auto !mb-3 !text-rose-400" size={32} />
          <h1 className="!text-lg !font-semibold !text-white">Unable to continue</h1>
          <p className="!mt-1 !text-sm !text-slate-400">{room.error}</p>
          <button
            onClick={() => navigate.push('/join-video-call')} // ✅ push
            className="!mt-5 !rounded-xl !bg-slate-800 !px-5 !py-2.5 !text-sm !font-medium !text-slate-200 hover:!bg-slate-700"
          >
            Back to join page
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
              {room.meeting?.title || 'Video Consultation'}
            </h1>
            <p className="!truncate !text-[11px] !text-slate-500">
              {room.meeting?.meetingId} · {room.participants.length} participant
              {room.participants.length === 1 ? '' : 's'}
            </p>
          </div>
        </div>

        <div className="!flex !items-center !gap-3">
          <span className="!hidden !items-center !gap-1.5 !rounded-full !bg-slate-800 !px-3 !py-1.5 !text-xs !font-medium !text-slate-300 sm:!flex">
            {room.reconnecting ? (
              <><WifiOff size={13} className="!text-amber-400" /> Reconnecting…</>
            ) : (
              <><Wifi size={13} className="!text-emerald-400" /> {fmt(elapsed)}</>
            )}
          </span>
          {room.locked && (
            <span className="!rounded-full !bg-amber-500/15 !px-3 !py-1.5 !text-xs !font-medium !text-amber-300">
              Locked
            </span>
          )}
        </div>
      </header>

      {room.reconnecting && (
        <div className="!shrink-0 !bg-amber-500/10 !px-4 !py-2 !text-center !text-xs !text-amber-300">
          Connection interrupted. Reconnecting…
        </div>
      )}

      {/* Body */}
      <div className="!flex !min-h-0 !flex-1">
        <main className="!min-w-0 !flex-1 !p-3 md:!p-4">
          <VideoGrid
            participants={room.participants}
            remoteStreams={room.remoteStreams}
            localStream={room.localStream}
            selfId={room.selfId}
            sharingId={sharingId}
          />
        </main>

        <ChatPanel
          open={chatOpen}
          messages={room.chat}
          selfId={room.selfId}
          onSend={room.sendChat}
          onClose={() => setChatOpen(false)}
        />

        <ParticipantPanel
          open={peopleOpen}
          participants={room.participants}
          waiting={room.waiting}
          selfId={room.selfId}
          isHost={room.isHost}
          onClose={() => setPeopleOpen(false)}
          onRemove={room.removeParticipant}
          onMute={room.muteParticipant}
          onApprove={room.approveJoin}
          onReject={room.rejectJoin}
        />
      </div>

      {/* Controls */}
      <footer className="!shrink-0 !px-3 !pb-4 !pt-2 md:!px-6 md:!pb-6">
        <CallControls
          micOn={room.micOn}
          camOn={room.camOn}
          sharing={room.sharing}
          unreadCount={room.unreadCount}
          isHost={room.isHost}
          onToggleMic={room.toggleMic}
          onToggleCam={room.toggleCam}
          onToggleScreen={room.sharing ? room.stopScreenShare : room.startScreenShare}
          onToggleChat={() => {
            setChatOpen((v) => !v);
            room.setUnread(0);
          }}
          onToggleParticipants={() => setPeopleOpen((v) => !v)}
          onLeave={handleLeave}
          onEndForAll={room.endMeetingForAll}
          onOpenInfo={() => setInfoOpen(true)}
        />
      </footer>

      {/* Meeting info drawer */}
      {infoOpen && (
        <div className="!fixed !inset-0 !z-40 !flex !items-center !justify-center !bg-black/60 !p-4" onClick={() => setInfoOpen(false)}>
          <div
            className="!w-full !max-w-md !rounded-2xl !bg-slate-900 !p-6 !ring-1 !ring-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="!mb-4 !flex !items-center !justify-between">
              <h3 className="!text-base !font-semibold !text-white">Meeting information</h3>
              <button onClick={() => setInfoOpen(false)} className="!rounded-lg !p-1.5 !text-slate-400 hover:!bg-white/10">
                <X size={16} />
              </button>
            </div>
            <dl className="!space-y-2.5 !text-sm">
              {[
                ['Title', room.meeting?.title],
                ['Meeting ID', room.meeting?.meetingId],
                ['Host', room.meeting?.hostName],
                ['Your name', room.displayName],
                ['Date', room.meeting?.startTime ? new Date(room.meeting.startTime).toLocaleDateString() : '—'],
                ['Start time', room.meeting?.startTime ? new Date(room.meeting.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—'],
                ['Link', room.meeting?.meetingId ? `${window.location.origin}/video-call/${room.meeting.meetingId}` : '—'],
              ].map(([k, v]) => (
                <div key={k} className="!flex !items-start !justify-between !gap-4">
                  <dt className="!text-slate-500">{k}</dt>
                  <dd className="!max-w-[60%] !truncate !text-right !text-slate-200">{v}</dd>
                </div>
              ))}
            </dl>
            <button
              onClick={() => {
                navigator.clipboard.writeText(`${window.location.origin}/video-call/${room.meeting?.meetingId}`);
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