"use client";
import { useCallback, useEffect, useState } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { Loader2, Video, AlertCircle, ArrowRight, Link2 } from 'lucide-react';
import { videoCallApi } from '../lib/api';
import DeviceCheck from '../components/DeviceCheck';
import { useVideoRoom } from '../context/VideoRoomContext';

const LOGO = process.env.NEXT_PUBLIC_COMPANY_LOGO_URL || '';
const COMPANY = process.env.NEXT_PUBLIC_COMPANY_NAME || 'My Inner Site';

export default function JoinVideoCall() {
  const { meetingId: routeMeetingId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useRouter(); // ✅ fixed
  const { enterRoom } = useVideoRoom();

  const [step, setStep] = useState('loading');
  const [meeting, setMeeting] = useState(null);
  const [joinState, setJoinState] = useState(null);
  const [name, setName] = useState('');
  const [linkInput, setLinkInput] = useState(routeMeetingId || '');
  const [error, setError] = useState('');
  const [guestToken, setGuestToken] = useState('');
  const [submitting, setSubmitting] = useState(false);

  /* ------------------------- load meeting ------------------------- */
  const load = useCallback(async (id) => {
    setStep('loading');
    setError('');
    try {
      const data = await videoCallApi.getPublicMeeting(id);
      setMeeting(data.meeting);
      setJoinState(data.join);

      if (!data.join.joinable && !data.join.canWait) {
        setError(data.join.message);
        setStep('blocked');
        return;
      }
      setStep('form');
    } catch (err) {
      setError(err.message || 'Meeting not found.');
      setStep('blocked');
    }
  }, []);

  useEffect(() => {
    const id = (routeMeetingId || searchParams.get('meetingId') || '').toUpperCase();
    if (id) load(id);
    else setStep('form');
  }, [routeMeetingId, searchParams, load]);

  /* ------------------------ resolve pasted link ------------------------ */
  const resolveAndLoad = async () => {
    setSubmitting(true);
    setError('');
    try {
      const data = await videoCallApi.resolveLink(linkInput);
      setMeeting(data.meeting);
      setJoinState(data.join);
      if (!data.join.joinable && !data.join.canWait) {
        setError(data.join.message);
        setStep('blocked');
        return;
      }
      navigate.replace(`/video-call/${data.meeting.meetingId}`); // ✅ fixed
      setStep('form');
    } catch (err) {
      setError(err.message || 'Invalid meeting link. Please check the link and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  /* ------------------------------ join ------------------------------ */
  const handleNameSubmit = async (e) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      setError('Please enter your full name.');
      return;
    }
    setError('');
    setStep('device');
  };

  const handleDeviceReady = () => {};

  const handleJoinWithDevice = async () => {
    setSubmitting(true);
    setError('');
    try {
      const data = await videoCallApi.joinMeeting(meeting.meetingId, name.trim());
      setGuestToken(data.guestToken);

      sessionStorage.setItem(
        'videoCallSession',
        JSON.stringify({
          meetingId: meeting.meetingId,
          guestToken: data.guestToken,
          name: name.trim(),
          meeting,
        })
      );

      enterRoom({
        meetingId: meeting.meetingId,
        guestToken: data.guestToken,
        meeting,
        displayName: name.trim(),
      });

      navigate.replace(`/video-call/${meeting.meetingId}/room`); // ✅ fixed
    } catch (err) {
      setError(err.message || 'Unable to join the meeting.');
      setStep('form');
    } finally {
      setSubmitting(false);
    }
  };

  /* ------------------------------ render ------------------------------ */
  const fmtDate = (d) =>
    d ? new Date(d).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' }) : '—';
  const fmtTime = (d) =>
    d ? new Date(d).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—';

  return (
    <div className="!min-h-screen !bg-gradient-to-b !from-[#0b0f19] !via-[#0d1220] !to-[#0b0f19]">
      <header className="!mx-auto !flex !max-w-5xl !items-center !justify-between !px-6 !py-5">
        <div className="!flex !items-center !gap-2.5">
          {LOGO ? (
            <img src={LOGO} alt={COMPANY} className="!h-8 !w-auto" />
          ) : (
            <div className="!flex !h-8 !w-8 !items-center !justify-center !rounded-lg !bg-emerald-600 !text-white">
              <Video size={16} />
            </div>
          )}
          <span className="!font-semibold !tracking-tight !text-white">{COMPANY}</span>
        </div>
        <span className="!text-xs !text-slate-500">Secure video consultation</span>
      </header>

      <main className="!mx-auto !max-w-lg !px-6 !pb-16">
        <div className="!rounded-3xl !bg-slate-900/70 !p-7 !shadow-2xl !ring-1 !ring-white/10 !backdrop-blur">
          {step === 'loading' && (
            <div className="!flex !flex-col !items-center !gap-3 !py-14">
              <Loader2 className="!animate-spin !text-emerald-400" size={28} />
              <p className="!text-sm !text-slate-400">Preparing your meeting…</p>
            </div>
          )}

          {step === 'blocked' && (
            <div className="!flex !flex-col !items-center !gap-4 !py-12 !text-center">
              <AlertCircle className="!text-rose-400" size={34} />
              <h1 className="!text-lg !font-semibold !text-white">Unable to join</h1>
              <p className="!max-w-xs !text-sm !text-slate-400">{error}</p>
              <button
                onClick={() => navigate.push('/join-video-call')} // ✅ fixed
                className="!mt-2 !rounded-xl !bg-slate-800 !px-5 !py-2.5 !text-sm !font-medium !text-slate-200 hover:!bg-slate-700"
              >
                Try another meeting
              </button>
            </div>
          )}

          {step === 'form' && (
            <>
              <h1 className="!text-xl !font-semibold !text-white">
                {meeting ? meeting.title : 'Join a video call'}
              </h1>
              <p className="!mt-1 !text-sm !text-slate-400">
                {meeting
                  ? `Hosted by ${meeting.hostName} · ${fmtDate(meeting.startTime)} at ${fmtTime(meeting.startTime)}`
                  : 'Enter the meeting link you received to continue.'}
              </p>

              <form onSubmit={handleNameSubmit} className="!mt-6 !space-y-4">
                {!meeting && (
                  <div>
                    <label htmlFor="meetingLink" className="!mb-1.5 !block !text-sm !font-medium !text-slate-300">
                      Meeting link
                    </label>
                    <div className="!relative">
                      <Link2 size={16} className="!absolute !left-3.5 !top-1/2 !-translate-y-1/2 !text-slate-500" />
                      <input
                        id="meetingLink"
                        value={linkInput}
                        onChange={(e) => setLinkInput(e.target.value)}
                        placeholder="https://myinnerside.com/video-call/VID-8XK29P"
                        className="!w-full !rounded-xl !bg-slate-800 !py-3 !pl-10 !pr-3.5 !text-sm !text-white placeholder:!text-slate-500 !outline-none !ring-1 !ring-white/10 focus:!ring-emerald-500"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={resolveAndLoad}
                      disabled={!linkInput.trim() || submitting}
                      className="!mt-2.5 !w-full !rounded-xl !bg-slate-800 !py-2.5 !text-sm !font-medium !text-slate-200 hover:!bg-slate-700 disabled:!opacity-40"
                    >
                      Validate link
                    </button>
                  </div>
                )}

                <div>
                  <label htmlFor="fullName" className="!mb-1.5 !block !text-sm !font-medium !text-slate-300">
                    Your full name
                  </label>
                  <input
                    id="fullName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. John Smith"
                    maxLength={80}
                    className="!w-full !rounded-xl !bg-slate-800 !px-3.5 !py-3 !text-sm !text-white placeholder:!text-slate-500 !outline-none !ring-1 !ring-white/10 focus:!ring-emerald-500"
                  />
                </div>

                {error && (
                  <p className="!flex !items-start !gap-2 !rounded-xl !bg-rose-500/10 !px-3.5 !py-2.5 !text-sm !text-rose-300">
                    <AlertCircle size={16} className="!mt-0.5 !shrink-0" /> {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={!meeting}
                  className="!flex !w-full !items-center !justify-center !gap-2 !rounded-xl !bg-emerald-600 !px-6 !py-3.5 !font-semibold !text-white !transition hover:!bg-emerald-500 disabled:!cursor-not-allowed disabled:!opacity-40"
                >
                  Continue <ArrowRight size={18} />
                </button>
              </form>

              <p className="!mt-4 !text-center !text-xs !text-slate-500">
                No account needed. Your camera and microphone are only activated after you confirm.
              </p>
            </>
          )}

          {step === 'device' && meeting && (
            <>
              <h1 className="!mb-1 !text-xl !font-semibold !text-white">Check your devices</h1>
              <p className="!mb-5 !text-sm !text-slate-400">
                Make sure you look and sound your best before joining.
              </p>
              <DeviceCheck
                meetingTitle={meeting.title}
                hostName={meeting.hostName}
                displayName={name}
                onReady={handleDeviceReady}
                onJoin={handleJoinWithDevice}
              />
              {error && (
                <p className="!mt-3 !flex !items-start !gap-2 !rounded-xl !bg-rose-500/10 !px-3.5 !py-2.5 !text-sm !text-rose-300">
                  <AlertCircle size={16} className="!mt-0.5 !shrink-0" /> {error}
                </p>
              )}
              {submitting && (
                <p className="!mt-3 !flex !items-center !justify-center !gap-2 !text-sm !text-slate-400">
                  <Loader2 size={16} className="!animate-spin" /> Joining…
                </p>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}