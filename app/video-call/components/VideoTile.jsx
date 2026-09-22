'use client';
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
    if (!stream) return;

    const tryPlay = async () => {
      try { await el.play(); }
      catch {
        el.muted = true;
        try { await el.play(); } catch (e2) { console.error('play failed:', e2); }
      }
    };
    const t = setTimeout(tryPlay, 100);
    return () => clearTimeout(t);
  }, [stream, camOn]);  // ← key change: rerun when camOn toggles too

  const initials = (name || '?').split(' ').filter(Boolean).slice(0, 2).map(n => n[0]?.toUpperCase()).join('') || '?';

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl bg-slate-900 ring-1 transition-all duration-300
        ${isActiveSpeaker ? 'ring-2 ring-emerald-400' : 'ring-white/10'} ${className}`}
      style={{ position: 'relative', width: '100%', height: '100%', minWidth: 0, minHeight: 0 }}
    >
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={isLocal}
        style={{
          width: '100%',
          height: '100%',
          objectFit: sharing ? 'contain' : 'cover',
          display: 'block',
          transform: isLocal && !sharing ? 'scaleX(-1)' : 'none',
          background: sharing ? '#000' : 'transparent',
          opacity: stream && camOn !== false ? 1 : 0,     // ← fade out
          position: 'absolute',
          inset: 0,
        }}
      />

      {(!stream || camOn === false) && (
        <div
          style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: 12, background: 'linear-gradient(135deg, #1e293b, #0f172a)',
          }}
        >
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            background: '#334155', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: 22, fontWeight: 600, color: '#e2e8f0',
          }}>
            {initials}
          </div>
          <p style={{ fontSize: 13, color: '#94a3b8' }}>
            {camOn ? 'Connecting…' : 'Camera off'}
          </p>
        </div>
      )}

      <div
        style={{
          position: 'absolute', left: 0, right: 0, bottom: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 8, padding: '8px 12px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.75), transparent)',
          pointerEvents: 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {isLocal ? `${name} (You)` : name}
          </span>
          {isHost && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, borderRadius: 999, background: 'rgba(245,158,11,0.2)', color: '#fcd34d', padding: '2px 8px', fontSize: 10, fontWeight: 600, textTransform: 'uppercase' }}>
              <Crown size={10} /> Host
            </span>
          )}
          {sharing && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, borderRadius: 999, background: 'rgba(14,165,233,0.2)', color: '#7dd3fc', padding: '2px 8px', fontSize: 10, fontWeight: 600, textTransform: 'uppercase' }}>
              <MonitorUp size={10} /> Sharing
            </span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ borderRadius: 999, padding: 4, background: micOn ? 'rgba(255,255,255,0.1)' : 'rgba(244,63,94,0.9)', color: '#fff', display: 'inline-flex' }}>
            {micOn ? <Mic size={12} /> : <MicOff size={12} />}
          </span>
          <span style={{ borderRadius: 999, padding: 4, background: camOn ? 'rgba(255,255,255,0.1)' : 'rgba(244,63,94,0.9)', color: '#fff', display: 'inline-flex' }}>
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