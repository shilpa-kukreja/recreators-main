"use client";
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Mic, MicOff, Video as VideoIcon, VideoOff, AlertCircle, Loader2, ArrowRight } from 'lucide-react';

export default function DeviceCheck({ onReady, onJoin, meetingTitle, hostName, displayName }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const onReadyRef = useRef(onReady);
  const [status, setStatus] = useState('loading'); // loading | ready | error
  const [error, setError] = useState('');
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);

  // keep the latest onReady without re-running the stream effect
  useEffect(() => { onReadyRef.current = onReady; }, [onReady]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        if (!navigator.mediaDevices?.getUserMedia) {
          throw new Error('UNSUPPORTED');
        }
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
        setStatus('ready');
        onReadyRef.current?.(stream);
      } catch (err) {
        if (cancelled) return;
        const name = err?.name || '';
        let msg = 'Unable to access your camera and microphone.';
        if (name === 'NotAllowedError') {
          msg = 'Camera and microphone access is blocked. Please allow permissions in your browser settings.';
        } else if (name === 'NotFoundError') {
          msg = 'No camera or microphone was found on this device.';
        } else if (err.message === 'UNSUPPORTED') {
          msg = 'Your browser does not support video calling. Please use Chrome, Edge, Safari or Firefox.';
        }
        setError(msg);
        setStatus('error');
      }
    })();

    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    };
  }, []);

  const toggleMic = () => {
    const tracks = streamRef.current?.getAudioTracks() || [];
    tracks.forEach((t) => { t.enabled = !micOn; });
    setMicOn((v) => !v);
  };

  const toggleCam = () => {
    const tracks = streamRef.current?.getVideoTracks() || [];
    tracks.forEach((t) => { t.enabled = !camOn; });
    setCamOn((v) => !v);
  };

  if (status === 'loading') {
    return (
      <div className="!flex !h-72 !flex-col !items-center !justify-center !gap-3 !rounded-2xl !bg-slate-900 !ring-1 !ring-white/10">
        <Loader2 className="!animate-spin !text-emerald-400" size={28} />
        <p className="!text-sm !text-slate-400">Checking your camera and microphone…</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="!flex !h-72 !flex-col !items-center !justify-center !gap-3 !rounded-2xl !bg-slate-900 !px-6 !text-center !ring-1 !ring-rose-500/30">
        <AlertCircle className="!text-rose-400" size={30} />
        <p className="!max-w-sm !text-sm !text-slate-300">{error}</p>
      </div>
    );
  }

  return (
    <div className="!space-y-4">
      <div className="!relative !overflow-hidden !rounded-2xl !bg-slate-900 !ring-1 !ring-white/10">
        {camOn ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="!aspect-video !w-full !-scale-x-100 !object-cover"
          />
        ) : (
          <div className="!flex !aspect-video !w-full !items-center !justify-center !bg-slate-800 !text-slate-500">
            Camera is off
          </div>
        )}

        <div className="!absolute !inset-x-0 !bottom-0 !flex !justify-center !gap-3 !p-4">
          <button
            onClick={toggleMic}
            className={`!flex !h-11 !w-11 !items-center !justify-center !rounded-full ${micOn ? '!bg-slate-700 !text-white' : '!bg-rose-600 !text-white'}`}
            aria-label="Toggle microphone"
          >
            {micOn ? <Mic size={18} /> : <MicOff size={18} />}
          </button>
          <button
            onClick={toggleCam}
            className={`!flex !h-11 !w-11 !items-center !justify-center !rounded-full ${camOn ? '!bg-slate-700 !text-white' : '!bg-rose-600 !text-white'}`}
            aria-label="Toggle camera"
          >
            {camOn ? <VideoIcon size={18} /> : <VideoOff size={18} />}
          </button>
        </div>
      </div>

      <div className="!rounded-xl !bg-slate-900/60 !px-4 !py-3 !text-sm !text-slate-400 !ring-1 !ring-white/10">
        <p><span className="!text-slate-500">Meeting:</span> <span className="!text-slate-200">{meetingTitle}</span></p>
        <p><span className="!text-slate-500">Host:</span> <span className="!text-slate-200">{hostName}</span></p>
        <p><span className="!text-slate-500">Joining as:</span> <span className="!text-slate-200">{displayName}</span></p>
      </div>

      <button
        onClick={() => onJoin?.({ micOn, camOn })}
        className="!flex !w-full !items-center !justify-center !gap-2 !rounded-xl !bg-emerald-600 !px-6 !py-3.5 !font-semibold !text-white !transition hover:!bg-emerald-500"
      >
        Join Meeting <ArrowRight size={18} />
      </button>
    </div>
  );
}

DeviceCheck.propTypes = {
  onReady: PropTypes.func,
  onJoin: PropTypes.func,
  meetingTitle: PropTypes.string,
  hostName: PropTypes.string,
  displayName: PropTypes.string,
};