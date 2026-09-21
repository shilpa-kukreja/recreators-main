"use client";
import PropTypes from 'prop-types';
import { Mic, MicOff, Video as VideoIcon, VideoOff, X, Crown, UserX, MicOff as MuteIcon } from 'lucide-react';

export default function ParticipantPanel({
  open,
  participants = [],
  selfId,
  isHost,
  waiting = [],
  onClose,
  onRemove,
  onMute,
  onApprove,
  onReject,
}) {
  if (!open) return null;

  return (
    <aside className="!flex !h-full !w-full !flex-col !border-l !border-white/10 !bg-slate-900/70 !backdrop-blur-md md:!w-80">
      <header className="!flex !items-center !justify-between !border-b !border-white/10 !px-4 !py-3">
        <h3 className="!text-sm !font-semibold !text-white">
          Participants ({participants.length})
        </h3>
        <button onClick={onClose} className="!rounded-lg !p-1.5 !text-slate-400 hover:!bg-white/10 hover:!text-white" aria-label="Close panel">
          <X size={16} />
        </button>
      </header>

      {isHost && waiting.length > 0 && (
        <div className="!border-b !border-white/10 !bg-amber-500/5 !px-4 !py-3">
          <p className="!mb-2 !text-xs !font-semibold !uppercase !tracking-wide !text-amber-400">
            Waiting room
          </p>
          <ul className="!space-y-2">
            {waiting.map((w) => (
              <li key={w.socketId} className="!flex !items-center !justify-between !gap-2 !rounded-lg !bg-slate-800 !px-3 !py-2">
                <span className="!truncate !text-sm !text-slate-200">{w.name}</span>
                <span className="!flex !gap-1.5">
                  <button
                    onClick={() => onApprove(w.socketId)}
                    className="!rounded-md !bg-emerald-600 !px-2.5 !py-1 !text-xs !font-semibold !text-white hover:!bg-emerald-500"
                  >
                    Allow
                  </button>
                  <button
                    onClick={() => onReject(w.socketId)}
                    className="!rounded-md !bg-slate-700 !px-2.5 !py-1 !text-xs !font-semibold !text-slate-200 hover:!bg-slate-600"
                  >
                    Reject
                  </button>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <ul className="!flex-1 !divide-y !divide-white/5 !overflow-y-auto">
        {participants.map((p) => (
          <li key={p.socketId} className="!flex !items-center !justify-between !gap-3 !px-4 !py-3">
            <div className="!flex !min-w-0 !items-center !gap-3">
              <div className="!flex !h-9 !w-9 !shrink-0 !items-center !justify-center !rounded-full !bg-slate-700 !text-xs !font-semibold !text-slate-200">
                {p.name?.split(' ').slice(0, 2).map((n) => n[0]?.toUpperCase()).join('') || '?'}
              </div>
              <div className="!min-w-0">
                <p className="!flex !items-center !gap-1.5 !truncate !text-sm !font-medium !text-white">
                  {p.name}
                  {p.isHost && <Crown size={12} className="!text-amber-400" />}
                  {p.socketId === selfId && <span className="!text-[10px] !text-slate-500">(You)</span>}
                </p>
                <p className="!text-[11px] !text-slate-500">{p.isHost ? 'Host' : 'Guest'}</p>
              </div>
            </div>

            <div className="!flex !items-center !gap-1.5">
              <span className={`!rounded-md !p-1 ${p.micOn ? '!text-slate-400' : '!bg-rose-500/20 !text-rose-400'}`}>
                {p.micOn ? <Mic size={14} /> : <MicOff size={14} />}
              </span>
              <span className={`!rounded-md !p-1 ${p.camOn ? '!text-slate-400' : '!bg-rose-500/20 !text-rose-400'}`}>
                {p.camOn ? <VideoIcon size={14} /> : <VideoOff size={14} />}
              </span>

              {isHost && p.socketId !== selfId && (
                <>
                  <button
                    onClick={() => onMute(p.socketId, !p.micOn)}
                    title={p.micOn ? 'Mute participant' : 'Ask to unmute'}
                    className="!rounded-md !p-1 !text-slate-400 hover:!bg-white/10 hover:!text-white"
                  >
                    <MuteIcon size={14} />
                  </button>
                  <button
                    onClick={() => onRemove(p.socketId)}
                    title="Remove participant"
                    className="!rounded-md !p-1 !text-rose-400 hover:!bg-rose-500/10"
                  >
                    <UserX size={14} />
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}

ParticipantPanel.propTypes = {
  open: PropTypes.bool,
  participants: PropTypes.array,
  waiting: PropTypes.array,
  selfId: PropTypes.string,
  isHost: PropTypes.bool,
  onClose: PropTypes.func,
  onRemove: PropTypes.func,
  onMute: PropTypes.func,
  onApprove: PropTypes.func,
  onReject: PropTypes.func,
};