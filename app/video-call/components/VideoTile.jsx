"use client";
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Mic, MicOff, Video as VideoIcon, VideoOff, MonitorUp, Crown } from 'lucide-react';

export default function VideoTile({
  stream,
  name,
  micOn = true,
  camOn = true,
  sharing = false,
  isHost = false,
  isLocal = false,
  isActiveSpeaker = false,
  className = '',
}) {
  const videoRef = useRef(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (el.srcObject !== stream) el.srcObject = stream || null;
  }, [stream]);

  const initials =
    (name || '?')
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((n) => n[0]?.toUpperCase())
      .join('') || '?';

  return (
    <div
      className={`!group !relative !overflow-hidden !rounded-2xl !bg-slate-900 !ring-1 !transition-all !duration-300
        ${isActiveSpeaker
          ? '!ring-2 !ring-emerald-400 !shadow-[0_0_0_4px_rgba(16,185,129,0.12)]'
          : '!ring-white/10'}
        ${className}`}
    >
      {stream && camOn !== false ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted={isLocal}
          className={`!h-full !w-full !object-cover ${isLocal && !sharing ? '!scale-x-[-1]' : ''}`}
        />
      ) : (
        <div className="!flex !h-full !w-full !flex-col !items-center !justify-center !gap-3 !bg-gradient-to-br !from-slate-800 !to-slate-900">
          <div className="!flex !h-20 !w-20 !items-center !justify-center !rounded-full !bg-slate-700 !text-2xl !font-semibold !text-slate-200">
            {initials}
          </div>
          <p className="!text-sm !text-slate-400">{camOn ? 'Connecting…' : 'Camera off'}</p>
        </div>
      )}

      {/* name + status bar */}
      <div className="!pointer-events-none !absolute !inset-x-0 !bottom-0 !flex !items-center !justify-between !gap-2 !bg-gradient-to-t !from-black/70 !to-transparent !px-3 !py-2">
        <div className="!flex !min-w-0 !items-center !gap-2">
          <span className="!truncate !text-sm !font-medium !text-white">
            {isLocal ? `${name} (You)` : name}
          </span>
          {isHost && (
            <span className="!flex !items-center !gap-1 !rounded-full !bg-amber-500/20 !px-2 !py-0.5 !text-[10px] !font-semibold !uppercase !tracking-wide !text-amber-300">
              <Crown size={10} /> Host
            </span>
          )}
          {sharing && (
            <span className="!flex !items-center !gap-1 !rounded-full !bg-sky-500/20 !px-2 !py-0.5 !text-[10px] !font-semibold !uppercase !tracking-wide !text-sky-300">
              <MonitorUp size={10} /> Sharing
            </span>
          )}
        </div>
        <div className="!flex !items-center !gap-1.5">
          <span className={`!rounded-full !p-1 ${micOn ? '!bg-white/10 !text-white' : '!bg-rose-500/90 !text-white'}`}>
            {micOn ? <Mic size={12} /> : <MicOff size={12} />}
          </span>
          <span className={`!rounded-full !p-1 ${camOn ? '!bg-white/10 !text-white' : '!bg-rose-500/90 !text-white'}`}>
            {camOn ? <VideoIcon size={12} /> : <VideoOff size={12} />}
          </span>
        </div>
      </div>
    </div>
  );
}

VideoTile.propTypes = {
  stream: PropTypes.object,
  name: PropTypes.string,
  micOn: PropTypes.bool,
  camOn: PropTypes.bool,
  sharing: PropTypes.bool,
  isHost: PropTypes.bool,
  isLocal: PropTypes.bool,
  isActiveSpeaker: PropTypes.bool,
  className: PropTypes.string,
};