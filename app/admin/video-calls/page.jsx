"use client";
import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import {
    Video, CalendarClock, Radio, CheckCircle2, CalendarDays,
    Plus, Search, Copy, Share2, Trash2, LogIn, Pencil, Square,
} from 'lucide-react';
import { videoCallApi } from '../../video-call/lib/api';
import AdminLayout from '../components/AdminLayout';

const STATUS_STYLES = {
    scheduled: '!bg-sky-500/15 !text-sky-300',
    waiting: '!bg-amber-500/15 !text-amber-300',
    active: '!bg-emerald-500/15 !text-emerald-300',
    completed: '!bg-slate-500/15 !text-slate-300',
    cancelled: '!bg-rose-500/15 !text-rose-300',
    expired: '!bg-slate-600/20 !text-slate-400',
};

const TONES = {
    emerald: '!bg-emerald-500/15 !text-emerald-400',
    sky: '!bg-sky-500/15 !text-sky-400',
    amber: '!bg-amber-500/15 !text-amber-400',
    slate: '!bg-slate-500/15 !text-slate-400',
    violet: '!bg-violet-500/15 !text-violet-400',
};

function StatCard({ icon: Icon, label, value, tone = 'emerald' }) {
    return (
        <div className="!rounded-2xl !bg-slate-900/60 !p-5 !ring-1 !ring-white/10">
            <div className={`!mb-3 !flex !h-9 !w-9 !items-center !justify-center !rounded-lg ${TONES[tone] || TONES.emerald}`}>
                <Icon size={18} />
            </div>
            <p className="!text-2xl !font-semibold !text-white">{value ?? '—'}</p>
            <p className="!text-xs !text-slate-500">{label}</p>
        </div>
    );
}

export default function AdminVideoCalls() {
    const token =
        typeof window !== 'undefined'
            ? localStorage.getItem('adminToken') || localStorage.getItem('adminToken')
            : null;

    const [stats, setStats] = useState(null);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [q, setQ] = useState('');
    const [status, setStatus] = useState('all');
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);

    const load = useCallback(async () => {
        setLoading(true);
        try {
            const [statsRes, listRes] = await Promise.all([
                videoCallApi.getStats(token),
                videoCallApi.listMeetings({ q, status, page, limit: 10 }, token),
            ]);
            setStats(statsRes.stats);
            setItems(listRes.items);
            setPages(listRes.pages || 1);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [q, status, page, token]);

    useEffect(() => {
        load();
    }, [load]);

    const copyLink = (link) => navigator.clipboard.writeText(link);

    const shareWhatsApp = (m) => {
        const msg = `Hello ${m.clientName || 'there'},\n\nYour video consultation with My Inner Site has been scheduled.\n\nMeeting: ${m.title}\nDate: ${new Date(m.startTime).toLocaleDateString()}\nTime: ${new Date(m.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}\n\nPlease join using the following link:\n${m.link}\n\nThank you,\nMy Inner Site`;
        window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
    };

    const endMeeting = async (m) => {
        if (!window.confirm(`End "${m.title}" for everyone?`)) return;
        await videoCallApi.endMeeting(m.meetingId, token);
        load();
    };

    const removeMeeting = async (m) => {
        if (!window.confirm(`Delete meeting ${m.meetingId}?`)) return;
        await videoCallApi.deleteMeeting(m.meetingId, token);
        load();
    };

    return (
        <AdminLayout>
            <div className="!min-h-screen !bg-[#0b0f19] !p-6">
                <div className="!mx-auto !max-w-7xl !space-y-6">
                    {/* Header */}
                    <div className="!flex !flex-wrap !items-center !justify-between !gap-4">
                        <div>
                            <h1 className="!text-2xl !font-semibold !text-white">Video Meetings</h1>
                            <p className="!text-sm !text-slate-500">Create and manage client video consultations.</p>
                        </div>
                        <Link
                            href="/admin/video-calls/create"  // ✅ fixed (was `to=`)
                            className="!flex !items-center !gap-2 !rounded-xl !bg-emerald-600 !px-5 !py-3 !text-sm !font-semibold !text-white !transition hover:!bg-emerald-500"
                        >
                            <Plus size={18} /> Create Video Meeting
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="!grid !grid-cols-2 !gap-4 lg:!grid-cols-5">
                        <StatCard icon={Video} label="Total meetings" value={stats?.total} />
                        <StatCard icon={CalendarClock} label="Scheduled" value={stats?.scheduled} tone="sky" />
                        <StatCard icon={Radio} label="Active" value={stats?.active} tone="amber" />
                        <StatCard icon={CheckCircle2} label="Completed" value={stats?.completed} tone="slate" />
                        <StatCard icon={CalendarDays} label="Upcoming" value={stats?.upcoming} tone="violet" />
                    </div>

                    {/* Filters */}
                    <div className="!flex !flex-wrap !items-center !gap-3">
                        <div className="!relative !min-w-[220px] !flex-1">
                            <Search size={16} className="!absolute !left-3.5 !top-1/2 !-translate-y-1/2 !text-slate-500" />
                            <input
                                value={q}
                                onChange={(e) => { setQ(e.target.value); setPage(1); }}
                                placeholder="Search by client, title or meeting ID…"
                                className="!w-full !rounded-xl !bg-slate-900 !py-3 !pl-10 !pr-4 !text-sm !text-white placeholder:!text-slate-500 !outline-none !ring-1 !ring-white/10 focus:!ring-emerald-500"
                            />
                        </div>
                        <select
                            value={status}
                            onChange={(e) => { setStatus(e.target.value); setPage(1); }}
                            className="!rounded-xl !bg-slate-900 !px-4 !py-3 !text-sm !text-white !outline-none !ring-1 !ring-white/10 focus:!ring-emerald-500"
                        >
                            {['all', 'scheduled', 'waiting', 'active', 'completed', 'cancelled', 'expired'].map((s) => (
                                <option key={s} value={s}>{s[0].toUpperCase() + s.slice(1)}</option>
                            ))}
                        </select>
                    </div>

                    {/* Table */}
                    <div className="!overflow-hidden !rounded-2xl !bg-slate-900/60 !ring-1 !ring-white/10">
                        <div className="!overflow-x-auto">
                            <table className="!w-full !text-left !text-sm">
                                <thead className="!bg-slate-900/80 !text-xs !uppercase !tracking-wide !text-slate-500">
                                    <tr>
                                        {['Meeting ID', 'Client', 'Title', 'Date', 'Time', 'Status', 'Participants', 'Actions'].map((h) => (
                                            <th key={h} className="!whitespace-nowrap !px-4 !py-3 !font-medium">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="!divide-y !divide-white/5">
                                    {loading && (
                                        <tr><td colSpan={8} className="!px-4 !py-10 !text-center !text-slate-500">Loading…</td></tr>
                                    )}
                                    {!loading && items.length === 0 && (
                                        <tr>
                                            <td colSpan={8} className="!px-4 !py-14 !text-center">
                                                <Video className="!mx-auto !mb-3 !text-slate-600" size={30} />
                                                <p className="!text-slate-400">No meetings yet.</p>
                                                <Link href="/admin/video-calls/create" className="!mt-2 !inline-block !text-sm !text-emerald-400 hover:!underline">
                                                    Create your first video meeting
                                                </Link>
                                            </td>
                                        </tr>
                                    )}
                                    {items.map((m) => (
                                        <tr key={m.meetingId} className="hover:!bg-white/[0.03]">
                                            <td className="!whitespace-nowrap !px-4 !py-3 !font-mono !text-xs !text-slate-300">{m.meetingId}</td>
                                            <td className="!px-4 !py-3">
                                                <p className="!text-slate-200">{m.clientName || '—'}</p>
                                                <p className="!text-xs !text-slate-500">{m.clientEmail || m.clientPhone || ''}</p>
                                            </td>
                                            <td className="!max-w-[220px] !truncate !px-4 !py-3 !text-slate-300">{m.title}</td>
                                            <td className="!whitespace-nowrap !px-4 !py-3 !text-slate-400">
                                                {new Date(m.startTime).toLocaleDateString()}
                                            </td>
                                            <td className="!whitespace-nowrap !px-4 !py-3 !text-slate-400">
                                                {new Date(m.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                {' – '}
                                                {new Date(m.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </td>
                                            <td className="!px-4 !py-3">
                                                <span className={`!rounded-full !px-2.5 !py-1 !text-xs !font-medium ${STATUS_STYLES[m.status] || ''}`}>
                                                    {m.status}
                                                </span>
                                            </td>
                                            <td className="!px-4 !py-3 !text-slate-400">{m.participants?.length || 0}</td>
                                            <td className="!px-4 !py-3">
                                                <div className="!flex !items-center !gap-1">
                                                    <Link
                                                        href={`/admin/video-calls/${m.meetingId}/room`}
                                                        target="_blank"
                                                        title="Join as host"
                                                        className="!rounded-lg !p-2 !text-slate-400 hover:!bg-white/10 hover:!text-emerald-400"
                                                    >
                                                        <LogIn size={15} />
                                                    </Link>
                                                    <button onClick={() => copyLink(m.link)} title="Copy link" className="!rounded-lg !p-2 !text-slate-400 hover:!bg-white/10 hover:!text-white">
                                                        <Copy size={15} />
                                                    </button>
                                                    <button onClick={() => shareWhatsApp(m)} title="Share on WhatsApp" className="!rounded-lg !p-2 !text-slate-400 hover:!bg-white/10 hover:!text-emerald-400">
                                                        <Share2 size={15} />
                                                    </button>
                                                    <Link href={`/admin/video-calls/${m.meetingId}`} title="Details" className="!rounded-lg !p-2 !text-slate-400 hover:!bg-white/10 hover:!text-white">
                                                        <Pencil size={15} />
                                                    </Link>
                                                    {m.status === 'active' && (
                                                        <button onClick={() => endMeeting(m)} title="End meeting" className="!rounded-lg !p-2 !text-slate-400 hover:!bg-white/10 hover:!text-amber-400">
                                                            <Square size={15} />
                                                        </button>
                                                    )}
                                                    <button onClick={() => removeMeeting(m)} title="Delete" className="!rounded-lg !p-2 !text-slate-400 hover:!bg-white/10 hover:!text-rose-400">
                                                        <Trash2 size={15} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {pages > 1 && (
                            <div className="!flex !items-center !justify-between !border-t !border-white/5 !px-4 !py-3 !text-sm">
                                <button
                                    disabled={page <= 1}
                                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                                    className="!rounded-lg !bg-slate-800 !px-3 !py-1.5 !text-slate-300 disabled:!opacity-40"
                                >
                                    Previous
                                </button>
                                <span className="!text-slate-500">Page {page} of {pages}</span>
                                <button
                                    disabled={page >= pages}
                                    onClick={() => setPage((p) => Math.min(pages, p + 1))}
                                    className="!rounded-lg !bg-slate-800 !px-3 !py-1.5 !text-slate-300 disabled:!opacity-40"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}