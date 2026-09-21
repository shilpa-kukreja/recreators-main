"use client";
import PropTypes from 'prop-types';
import { Loader2, ShieldCheck } from 'lucide-react';

export default function WaitingRoom({ displayName, meetingTitle, hostName, variant = 'host' }) {
  return (
    <div className="!flex !flex-col !items-center !justify-center !gap-5 !rounded-2xl !bg-slate-900 !px-8 !py-14 !text-center !ring-1 !ring-white/10">
      <div className="!relative">
        <span className="!absolute !inset-0 !animate-ping !rounded-full !bg-emerald-500/30" />
        <div className="!relative !flex !h-16 !w-16 !items-center !justify-center !rounded-full !bg-emerald-600/20 !ring-1 !ring-emerald-500/40">
          <Loader2 className="!animate-spin !text-emerald-400" size={26} />
        </div>
      </div>

      <div className="!space-y-1">
        <h3 className="!text-lg !font-semibold !text-white">
          {variant === 'host' ? 'Waiting for the host to join…' : 'Waiting for approval…'}
        </h3>
        <p className="!max-w-sm !text-sm !text-slate-400">
          {variant === 'host'
            ? `${hostName || 'The host'} will let you in shortly. Please keep this tab open.`
            : 'The host has been notified. You will join automatically once approved.'}
        </p>
      </div>

      <div className="!w-full !max-w-sm !space-y-1.5 !rounded-xl !bg-slate-800/60 !px-4 !py-3 !text-left !text-sm !ring-1 !ring-white/5">
        <p className="!flex !items-center !justify-between">
          <span className="!text-slate-500">Meeting</span>
          <span className="!text-slate-200">{meetingTitle}</span>
        </p>
        <p className="!flex !items-center !justify-between">
          <span className="!text-slate-500">Your name</span>
          <span className="!text-slate-200">{displayName}</span>
        </p>
      </div>

      <p className="!flex !items-center !gap-1.5 !text-xs !text-slate-500">
        <ShieldCheck size={13} /> Your camera and microphone are not shared until you join.
      </p>
    </div>
  );
}

WaitingRoom.propTypes = {
  displayName: PropTypes.string,
  meetingTitle: PropTypes.string,
  hostName: PropTypes.string,
  variant: PropTypes.oneOf(['host', 'approval']),
};