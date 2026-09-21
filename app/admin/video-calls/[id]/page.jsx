"use client";
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Copy, Share2, LogIn, Square, Trash2, ArrowLeft, Lock, Unlock } from 'lucide-react';
import { videoCallApi } from '../../../video-call/lib/api';
import AdminLayout from '../../components/AdminLayout';
import Link from 'next/link';

export default function AdminMeetingDetails() {
  const { id } = useParams();
  const navigate = useRouter(); // ✅ fixed
  const token =
    typeof window !== 'undefined'
      ? localStorage.getItem('tToken') || localStorage.getItem('adminToken') || localStorage.getItem('token')
      : null;

  const [meeting, setMeeting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    try {
      const res = await videoCallApi.getMeeting(id, token);
      setMeeting(res.meeting);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [id]);

  if (loading) return <div className="!p-10 !text-center !text-slate-500">Loading…</div>;
  if (error) return <div className="!p-10 !text-center !text-rose-400">{error}</div>;
  if (!meeting) return null;

  const endMeeting = async () => {
    if (!window.confirm('End this meeting for everyone?')) return;
    await videoCallApi.endMeeting(meeting.meetingId, token);
    load();
  };

  const remove = async () => {
    if (!window.confirm('Delete this meeting permanently?')) return;
    await videoCallApi.deleteMeeting(meeting.meetingId, token);
    navigate.push('/admin/video-calls'); // ✅ fixed
  };

  const toggleLock = async () => {
    await videoCallApi.updateMeeting(meeting.meetingId, { locked: !meeting.locked }, token);
    load();
  };

  return (
    <AdminLayout>
      <div className="!min-h-screen !bg-[#0b0f19] !p-6">
        <div className="!mx-auto !max-w-4xl !space-y-6">
          <button
            onClick={() => navigate.push('/admin/video-calls')} // ✅ fixed
            className="!flex !items-center !gap-2 !text-sm !text-slate-400 hover:!text-white"
          >
            <ArrowLeft size={16} /> Back to meetings
          </button>

          <div className="!rounded-2xl !bg-slate-900/60 !p-6 !ring-1 !ring-white/10">
            <div className="!flex !flex-wrap !items-start !justify-between !gap-4">
              <div>
                <h1 className="!text-xl !font-semibold !text-white">{meeting.title}</h1>
                <p className="!mt-1 !font-mono !text-xs !text-slate-500">{meeting.meetingId}</p>
              </div>
              <span className="!rounded-full !bg-slate-800 !px-3 !py-1.5 !text-xs !font-medium !text-slate-300">
                {meeting.status}
              </span>
            </div>

            <dl className="!mt-6 !grid !gap-4 sm:!grid-cols-2">
              {[
                ['Client', meeting.clientName || '—'],
                ['Email', meeting.clientEmail || '—'],
                ['Phone', meeting.clientPhone || '—'],
                ['Host', meeting.hostName || '—'],
                ['Date', new Date(meeting.startTime).toLocaleDateString()],
                ['Time', `${new Date(meeting.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} – ${new Date(meeting.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`],
                ['Participants', String(meeting.participants?.length || 0)],
                ['Service', meeting.serviceType || '—'],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="!text-xs !uppercase !tracking-wide !text-slate-500">{k}</dt>
                  <dd className="!mt-0.5 !text-sm !text-slate-200">{v}</dd>
                </div>
              ))}
            </dl>

            {meeting.description && (
              <p className="!mt-5 !rounded-xl !bg-slate-800/60 !p-4 !text-sm !text-slate-300">{meeting.description}</p>
            )}

            <div className="!mt-6 !rounded-xl !bg-slate-800/60 !p-4 !ring-1 !ring-white/5">
              <p className="!text-xs !uppercase !tracking-wide !text-slate-500">Meeting link</p>
              <p className="!mt-1 !break-all !font-mono !text-sm !text-emerald-300">{meeting.link}</p>
            </div>

            <div className="!mt-6 !flex !flex-wrap !gap-3">
              <button
                onClick={() => navigator.clipboard.writeText(meeting.link)}
                className="!flex !items-center !gap-2 !rounded-xl !bg-slate-800 !px-4 !py-2.5 !text-sm !font-medium !text-slate-200 hover:!bg-slate-700"
              >
                <Copy size={16} /> Copy link
              </button>
              <button
                onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(`Join my video consultation: ${meeting.link}`)}`, '_blank')}
                className="!flex !items-center !gap-2 !rounded-xl !bg-emerald-700 !px-4 !py-2.5 !text-sm !font-medium !text-white hover:!bg-emerald-600"
              >
                <Share2 size={16} /> Share
              </button>
              <Link
                href={`/admin/video-calls/${meeting.meetingId}/room`}
                target="_blank"
                rel="noreferrer"
                className="!flex !items-center !gap-2 !rounded-xl !bg-emerald-600 !px-4 !py-2.5 !text-sm !font-semibold !text-white hover:!bg-emerald-500"
              >
                <LogIn size={16} /> Join as host
              </Link>
              <button
                onClick={toggleLock}
                className="!flex !items-center !gap-2 !rounded-xl !bg-slate-800 !px-4 !py-2.5 !text-sm !font-medium !text-slate-200 hover:!bg-slate-700"
              >
                {meeting.locked ? <><Unlock size={16} /> Unlock meeting</> : <><Lock size={16} /> Lock meeting</>}
              </button>
              {meeting.status !== 'completed' && (
                <button
                  onClick={endMeeting}
                  className="!flex !items-center !gap-2 !rounded-xl !bg-amber-600 !px-4 !py-2.5 !text-sm !font-semibold !text-white hover:!bg-amber-500"
                >
                  <Square size={16} /> End meeting
                </button>
              )}
              <button
                onClick={remove}
                className="!flex !items-center !gap-2 !rounded-xl !bg-rose-700 !px-4 !py-2.5 !text-sm !font-semibold !text-white hover:!bg-rose-600"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>

          {meeting.participants?.length > 0 && (
            <div className="!rounded-2xl !bg-slate-900/60 !p-6 !ring-1 !ring-white/10">
              <h2 className="!mb-4 !text-sm !font-semibold !uppercase !tracking-wide !text-slate-500">
                Participant history
              </h2>
              <ul className="!divide-y !divide-white/5">
                {meeting.participants.map((p, i) => (
                  <li key={`${p.name}-${i}`} className="!flex !items-center !justify-between !py-3 !text-sm">
                    <span className="!text-slate-200">{p.name}</span>
                    <span className="!text-xs !text-slate-500">
                      {p.role} · joined {new Date(p.joinedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      {p.leftAt ? ` · left ${new Date(p.leftAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : ''}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}