"use client";
import PropTypes from 'prop-types';
import {
  Mic, MicOff, Video as VideoIcon, VideoOff, MonitorUp, MonitorOff,
  MessageSquare, Users, MoreVertical, PhoneOff, Settings, Maximize2, Info, Flag,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

function ControlButton({ label, active = false, danger = false, badge, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`!relative !flex !h-12 !w-12 !items-center !justify-center !rounded-full !transition
        ${danger
          ? '!bg-rose-600 !text-white hover:!bg-rose-500'
          : active
            ? '!bg-slate-700 !text-white hover:!bg-slate-600'
            : '!bg-rose-500/90 !text-white hover:!bg-rose-500'}
        focus:!outline-none focus-visible:!ring-2 focus-visible:!ring-emerald-400`}
    >
      {children}
      {badge > 0 && (
        <span className="!absolute !-right-1 !-top-1 !flex !h-5 !min-w-5 !items-center !justify-center !rounded-full !bg-emerald-500 !px-1 !text-[10px] !font-bold !text-white">
          {badge > 9 ? '9+' : badge}
        </span>
      )}
    </button>
  );
}

ControlButton.propTypes = {
  label: PropTypes.string,
  active: PropTypes.bool,
  danger: PropTypes.bool,
  badge: PropTypes.number,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default function CallControls({
  micOn, camOn, sharing, unreadCount,
  onToggleMic, onToggleCam, onToggleScreen, onToggleChat, onToggleParticipants,
  onLeave, onEndForAll, isHost, onOpenInfo,
}) {
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) setMoreOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const goFullscreen = () => {
    const el = document.documentElement;
    if (!document.fullscreenElement) el.requestFullscreen?.();
    else document.exitFullscreen?.();
    setMoreOpen(false);
  };

  return (
    <div className="!flex !flex-wrap !items-center !justify-center !gap-2 !rounded-2xl !bg-slate-900/80 !p-3 !backdrop-blur-md !ring-1 !ring-white/10">
      <ControlButton label={micOn ? 'Mute microphone' : 'Unmute microphone'} active={micOn} onClick={onToggleMic}>
        {micOn ? <Mic size={20} /> : <MicOff size={20} />}
      </ControlButton>

      <ControlButton label={camOn ? 'Turn camera off' : 'Turn camera on'} active={camOn} onClick={onToggleCam}>
        {camOn ? <VideoIcon size={20} /> : <VideoOff size={20} />}
      </ControlButton>

      <ControlButton label={sharing ? 'Stop sharing' : 'Share screen'} active={!sharing} onClick={onToggleScreen}>
        {sharing ? <MonitorOff size={20} /> : <MonitorUp size={20} />}
      </ControlButton>

      <ControlButton label="Chat" active onClick={onToggleChat} badge={unreadCount}>
        <MessageSquare size={20} />
      </ControlButton>

      <ControlButton label="Participants" active onClick={onToggleParticipants}>
        <Users size={20} />
      </ControlButton>

      <div className="!relative" ref={moreRef}>
        <ControlButton label="More options" active onClick={() => setMoreOpen((v) => !v)}>
          <MoreVertical size={20} />
        </ControlButton>
        {moreOpen && (
          <div className="!absolute !bottom-14 !right-0 !z-30 !w-56 !overflow-hidden !rounded-xl !bg-slate-800 !py-1 !shadow-2xl !ring-1 !ring-white/10">
            <button className="!flex !w-full !items-center !gap-3 !px-4 !py-2.5 !text-sm !text-slate-200 hover:!bg-slate-700" onClick={goFullscreen}>
              <Maximize2 size={16} /> Full screen
            </button>
            <button className="!flex !w-full !items-center !gap-3 !px-4 !py-2.5 !text-sm !text-slate-200 hover:!bg-slate-700" onClick={() => { onOpenInfo?.(); setMoreOpen(false); }}>
              <Info size={16} /> Meeting information
            </button>
            <button className="!flex !w-full !items-center !gap-3 !px-4 !py-2.5 !text-sm !text-slate-200 hover:!bg-slate-700">
              <Settings size={16} /> Device settings
            </button>
            <button className="!flex !w-full !items-center !gap-3 !px-4 !py-2.5 !text-sm !text-slate-200 hover:!bg-slate-700">
              <Flag size={16} /> Report an issue
            </button>
          </div>
        )}
      </div>

      <div className="!mx-1 !h-8 !w-px !bg-white/10" />

      {isHost && (
        <button
          type="button"
          onClick={onEndForAll}
          className="!rounded-full !bg-rose-700 !px-5 !py-3 !text-sm !font-semibold !text-white !transition hover:!bg-rose-600"
        >
          End for all
        </button>
      )}

      <ControlButton label="Leave meeting" danger onClick={onLeave}>
        <PhoneOff size={20} />
      </ControlButton>
    </div>
  );
}

CallControls.propTypes = {
  micOn: PropTypes.bool,
  camOn: PropTypes.bool,
  sharing: PropTypes.bool,
  unreadCount: PropTypes.number,
  isHost: PropTypes.bool,
  onToggleMic: PropTypes.func,
  onToggleCam: PropTypes.func,
  onToggleScreen: PropTypes.func,
  onToggleChat: PropTypes.func,
  onToggleParticipants: PropTypes.func,
  onLeave: PropTypes.func,
  onEndForAll: PropTypes.func,
  onOpenInfo: PropTypes.func,
};