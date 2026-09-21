"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, Home, RotateCcw } from 'lucide-react';

export default function MeetingEnded() {
  const navigate = useRouter(); // ✅ fixed
  const [reason, setReason] = useState('The meeting has ended.');

  useEffect(() => {
    const stored = sessionStorage.getItem('videoCallEndReason');
    if (stored) setReason(stored);
    sessionStorage.removeItem('videoCallSession');
  }, []);

  return (
    <div className="!flex !min-h-screen !items-center !justify-center !bg-[#0b0f19] !p-6">
      <div className="!w-full !max-w-md !rounded-3xl !bg-slate-900/70 !p-8 !text-center !ring-1 !ring-white/10">
        <CheckCircle2 className="!mx-auto !mb-4 !text-emerald-400" size={40} />
        <h1 className="!text-xl !font-semibold !text-white">Meeting ended</h1>
        <p className="!mt-2 !text-sm !text-slate-400">{reason}</p>

        <div className="!mt-7 !flex !flex-col !gap-3 sm:!flex-row">
          <button
            onClick={() => navigate.push('/')} // ✅ fixed
            className="!flex !flex-1 !items-center !justify-center !gap-2 !rounded-xl !bg-slate-800 !px-5 !py-3 !text-sm !font-medium !text-slate-200 hover:!bg-slate-700"
          >
            <Home size={16} /> Back to home
          </button>
          <button
            onClick={() => navigate.push('/join-video-call')} // ✅ fixed
            className="!flex !flex-1 !items-center !justify-center !gap-2 !rounded-xl !bg-emerald-600 !px-5 !py-3 !text-sm !font-semibold !text-white hover:!bg-emerald-500"
          >
            <RotateCcw size={16} /> Join another
          </button>
        </div>
      </div>
    </div>
  );
}