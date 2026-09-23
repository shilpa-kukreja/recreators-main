// "use client";
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import {
//     CheckCircle2, Copy, Share2, Mail, LogIn, CalendarPlus, AlertCircle,
//     Loader2, User, Calendar, FileText, Clock, Video, Link2, ShieldCheck,
//     ChevronRight, Sparkles,
// } from 'lucide-react';
// import { videoCallApi } from '../../../video-call/lib/api';
// import AdminLayout from '../../components/AdminLayout';

// const emptyForm = {
//     clientName: '', clientEmail: '', clientPhone: '',
//     title: '', description: '',
//     date: '', startTime: '', endTime: '', durationMinutes: 30,
//     internalNotes: '', customerId: '', serviceType: '',
//     waitingRoomEnabled: true,
// };

// /* ---------------------------- small helpers ---------------------------- */
// function SectionCard({ icon: Icon, title, subtitle, children }) {
//     return (
//         <div className="!rounded-2xl !border !border-white/5 !bg-slate-900/40 !p-6 !backdrop-blur-sm">
//             <div className="!mb-5 !flex !items-start !gap-3">
//                 <div className="!flex !h-9 !w-9 !shrink-0 !items-center !justify-center !rounded-lg !bg-emerald-500/10 !text-emerald-400 !ring-1 !ring-emerald-500/20">
//                     <Icon size={16} />
//                 </div>
//                 <div>
//                     <h2 className="!text-sm !font-semibold !text-white">{title}</h2>
//                     {subtitle && <p className="!mt-0.5 !text-xs !text-slate-500">{subtitle}</p>}
//                 </div>
//             </div>
//             {children}
//         </div>
//     );
// }

// function Field({ label, hint, children }) {
//     return (
//         <label className="!block">
//             <span className="!mb-1.5 !flex !items-center !gap-1.5 !text-xs !font-medium !text-slate-400">
//                 {label}
//                 <span className="!text-rose-400">*</span>
//             </span>
//             {children}
//             {hint && <span className="!mt-1 !block !text-[11px] !text-slate-500">{hint}</span>}
//         </label>
//     );
// }

// /* ------------------------------- component ------------------------------- */
// export default function CreateVideoMeeting() {
//     const router = useRouter();
//     const token =
//         typeof window !== 'undefined'
//             ? localStorage.getItem('tToken') || localStorage.getItem('token')
//             : null;

//     const [form, setForm] = useState(emptyForm);
//     const [saving, setSaving] = useState(false);
//     const [error, setError] = useState('');
//     const [created, setCreated] = useState(null);
//     const [copied, setCopied] = useState(false);

//     const set = (k) => (e) => {
//         const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
//         setForm((f) => ({ ...f, [k]: value }));
//     };

//     const submit = async (e) => {
//         e.preventDefault();
//         setError('');
//         setSaving(true);
//         try {
//             const res = await videoCallApi.createMeeting(form, token);
//             setCreated(res.meeting);
//         } catch (err) {
//             setError(err.message || 'Could not create the meeting.');
//         } finally {
//             setSaving(false);
//         }
//     };

//     const handleCopy = () => {
//         navigator.clipboard.writeText(created.link);
//         setCopied(true);
//         setTimeout(() => setCopied(false), 1800);
//     };

//     const whatsappMessage = created
//         ? `Hello ${created.clientName || 'there'},\n\nYour video consultation with My Inner Site has been scheduled.\n\nMeeting: ${created.title}\nDate: ${new Date(created.startTime).toLocaleDateString()}\nTime: ${new Date(created.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}\n\nPlease join using the following link:\n${created.link}\n\nThank you,\nMy Inner Site`
//         : '';

//     const mailtoLink = created
//         ? `mailto:${created.clientEmail || ''}?subject=${encodeURIComponent(`Video consultation: ${created.title}`)}&body=${encodeURIComponent(
//             `Hello ${created.clientName || 'there'},\n\nYour video consultation with My Inner Site has been scheduled.\n\nMeeting: ${created.title}\nDate: ${new Date(created.startTime).toLocaleDateString()}\nTime: ${new Date(created.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}\n\nJoin link: ${created.link}\n\nThank you,\nMy Inner Site`
//         )}`
//         : '#';

//     const baseInput =
//         '!w-full !rounded-xl !border !border-white/10 !bg-slate-950/60 !px-3.5 !py-2.5 !text-sm !text-white placeholder:!text-slate-500 !outline-none !transition focus:!border-emerald-500/50 focus:!ring-2 focus:!ring-emerald-500/20';

//     /* ============================ SUCCESS SCREEN ============================ */
//     if (created) {
//         return (
//             <AdminLayout>
//                 <div className="!min-h-screen !bg-[#0b0f19] !px-4 !py-10 sm:!px-6 lg:!px-8">
//                     <div className="!mx-auto !max-w-2xl">
//                         {/* Success header */}
//                         <div className="!mb-8 !text-center">
//                             <div className="!mx-auto !mb-4 !flex !h-16 !w-16 !items-center !justify-center !rounded-full !bg-emerald-500/10 !ring-1 !ring-emerald-500/30">
//                                 <CheckCircle2 className="!text-emerald-400" size={32} />
//                             </div>
//                             <h1 className="!text-2xl !font-semibold !text-white">
//                                 Video meeting created
//                             </h1>
//                             <p className="!mt-1.5 !text-sm !text-slate-400">
//                                 Share the link below with your client to let them join.
//                             </p>
//                         </div>

//                         {/* Meeting link card */}
//                         <div className="!overflow-hidden !rounded-2xl !border !border-white/10 !bg-slate-900/60 !backdrop-blur-sm">
//                             <div className="!border-b !border-white/5 !bg-slate-950/40 !px-5 !py-3">
//                                 <div className="!flex !items-center !gap-2 !text-xs !font-medium !text-slate-400">
//                                     <Link2 size={14} className="!text-emerald-400" />
//                                     Meeting link
//                                 </div>
//                             </div>
//                             <div className="!p-5">
//                                 <div className="!flex !flex-col !gap-3 sm:!flex-row sm:!items-center">
//                                     <code className="!flex-1 !truncate !rounded-lg !bg-slate-950/70 !px-3 !py-2.5 !font-mono !text-sm !text-emerald-300">
//                                         {created.link}
//                                     </code>
//                                     <button
//                                         onClick={handleCopy}
//                                         className="!inline-flex !items-center !justify-center !gap-2 !rounded-lg !bg-slate-800 !px-4 !py-2.5 !text-sm !font-medium !text-slate-200 !transition hover:!bg-slate-700"
//                                     >
//                                         {copied ? (
//                                             <>
//                                                 <CheckCircle2 size={15} className="!text-emerald-400" /> Copied
//                                             </>
//                                         ) : (
//                                             <>
//                                                 <Copy size={15} /> Copy
//                                             </>
//                                         )}
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Share actions */}
//                         <div className="!mt-6 !grid !grid-cols-1 !gap-3 sm:!grid-cols-3">
//                             <button
//                                 onClick={() =>
//                                     window.open(`https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`, '_blank')
//                                 }
//                                 className="!flex !items-center !gap-3 !rounded-xl !border !border-white/10 !bg-slate-900/60 !px-4 !py-3.5 !text-left !transition hover:!border-emerald-500/30 hover:!bg-slate-900"
//                             >
//                                 <div className="!flex !h-9 !w-9 !items-center !justify-center !rounded-lg !bg-emerald-500/10 !text-emerald-400">
//                                     <Share2 size={16} />
//                                 </div>
//                                 <div className="!min-w-0">
//                                     <p className="!text-sm !font-medium !text-white">WhatsApp</p>
//                                     <p className="!truncate !text-xs !text-slate-500">Send message</p>
//                                 </div>
//                             </button>

//                             <a
//                                 href={mailtoLink}
//                                 className="!flex !items-center !gap-3 !rounded-xl !border !border-white/10 !bg-slate-900/60 !px-4 !py-3.5 !text-left !transition hover:!border-emerald-500/30 hover:!bg-slate-900"
//                             >
//                                 <div className="!flex !h-9 !w-9 !items-center !justify-center !rounded-lg !bg-emerald-500/10 !text-emerald-400">
//                                     <Mail size={16} />
//                                 </div>
//                                 <div className="!min-w-0">
//                                     <p className="!text-sm !font-medium !text-white">Email</p>
//                                     <p className="!truncate !text-xs !text-slate-500">Send invite</p>
//                                 </div>
//                             </a>

//                             <a
//                                 href={`/video-call/${created.meetingId}`}
//                                 target="_blank"
//                                 rel="noreferrer"
//                                 className="!flex !items-center !gap-3 !rounded-xl !border !border-emerald-500/30 !bg-emerald-600/10 !px-4 !py-3.5 !text-left !transition hover:!bg-emerald-600/20"
//                             >
//                                 <div className="!flex !h-9 !w-9 !items-center !justify-center !rounded-lg !bg-emerald-500/20 !text-emerald-300">
//                                     <Video size={16} />
//                                 </div>
//                                 <div className="!min-w-0">
//                                     <p className="!text-sm !font-medium !text-emerald-200">Join now</p>
//                                     <p className="!truncate !text-xs !text-emerald-400/70">Open room</p>
//                                 </div>
//                             </a>
//                         </div>

//                         {/* Footer actions */}
//                         <div className="!mt-8 !flex !flex-col !gap-3 sm:!flex-row">
//                             <button
//                                 onClick={() => router.push(`/admin/video-calls/${created.meetingId}`)}
//                                 className="!inline-flex !flex-1 !items-center !justify-center !gap-2 !rounded-xl !bg-slate-800 !px-5 !py-3 !text-sm !font-medium !text-slate-200 !transition hover:!bg-slate-700"
//                             >
//                                 View meeting details
//                                 <ChevronRight size={16} />
//                             </button>
//                             <button
//                                 onClick={() => {
//                                     setCreated(null);
//                                     setForm(emptyForm);
//                                 }}
//                                 className="!inline-flex !flex-1 !items-center !justify-center !gap-2 !rounded-xl !bg-emerald-600 !px-5 !py-3 !text-sm !font-semibold !text-white !transition hover:!bg-emerald-500"
//                             >
//                                 <Sparkles size={16} /> Create another
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </AdminLayout>
//         );
//     }

//     /* ============================= FORM SCREEN ============================= */
//     return (
//         <AdminLayout>
//             <div className="!min-h-screen !bg-[#0b0f19] !px-4 !py-8 sm:!px-6 lg:!px-8">
//                 <div className="!mx-auto !max-w-4xl">
//                     {/* Page header */}
//                     <div className="!mb-8 !flex !flex-col !gap-4 sm:!flex-row sm:!items-center sm:!justify-between">
//                         <div className="!flex !items-center !gap-4">
//                             <div className="!flex !h-12 !w-12 !items-center !justify-center !rounded-2xl !bg-gradient-to-br !from-emerald-500/20 !to-emerald-600/5 !text-emerald-400 !ring-1 !ring-emerald-500/20">
//                                 <CalendarPlus size={22} />
//                             </div>
//                             <div>
//                                 <h1 className="!text-2xl !font-semibold !tracking-tight !text-white">
//                                     Create Video Meeting
//                                 </h1>
//                                 <p className="!mt-0.5 !text-sm !text-slate-400">
//                                     Schedule a session and share a secure join link with your client.
//                                 </p>
//                             </div>
//                         </div>
//                         <div className="!hidden !items-center !gap-2 !rounded-full !border !border-emerald-500/20 !bg-emerald-500/5 !px-3.5 !py-1.5 !text-xs !font-medium !text-emerald-300 sm:!flex">
//                             <ShieldCheck size={14} />
//                             End-to-end encrypted
//                         </div>
//                     </div>

//                     <form onSubmit={submit} className="!space-y-5">
//                         {/* -------- Client details -------- */}
//                         <SectionCard
//                             icon={User}
//                             title="Client information"
//                             subtitle="Who will you be meeting with?"
//                         >
//                             <div className="!grid !gap-4 sm:!grid-cols-2">
//                                 <Field label="Client name">
//                                     <input
//                                         className={baseInput}
//                                         placeholder="e.g. Priya Sharma"
//                                         required
//                                         value={form.clientName}
//                                         onChange={set('clientName')}
//                                     />
//                                 </Field>
//                                 <Field label="Client email">
//                                     <input
//                                         className={baseInput}
//                                         type="email"
//                                         placeholder="client@example.com"
//                                         required
//                                         value={form.clientEmail}
//                                         onChange={set('clientEmail')}
//                                     />
//                                 </Field>
//                                 <Field label="Client phone">
//                                     <input
//                                         className={baseInput}
//                                         type="tel"
//                                         placeholder="+91 98765 43210"
//                                         required
//                                         value={form.clientPhone}
//                                         onChange={set('clientPhone')}
//                                     />
//                                 </Field>
//                                 <Field label="Service type">
//                                     <input
//                                         className={baseInput}
//                                         placeholder="e.g. Life coaching session"
//                                         required
//                                         value={form.serviceType}
//                                         onChange={set('serviceType')}
//                                     />
//                                 </Field>
//                             </div>
//                         </SectionCard>

//                         {/* -------- Meeting details -------- */}
//                         <SectionCard
//                             icon={Calendar}
//                             title="Meeting details"
//                             subtitle="What is this session about?"
//                         >
//                             <div className="!space-y-4">
//                                 <Field label="Meeting title">
//                                     <input
//                                         className={baseInput}
//                                         placeholder="e.g. Discovery call — anxiety coaching"
//                                         required
//                                         value={form.title}
//                                         onChange={set('title')}
//                                     />
//                                 </Field>

//                                 <Field label="Description">
//                                     <textarea
//                                         className={`${baseInput} !min-h-[90px] !resize-y`}
//                                         placeholder="Short agenda or notes about the session…"
//                                         required
//                                         value={form.description}
//                                         onChange={set('description')}
//                                     />
//                                 </Field>

//                                 <div className="!grid !gap-4 sm:!grid-cols-3 !text-white">
//                                     <Field label="Date" className=" !text-white">
//                                         <input
//                                             type="date"
//                                             className={baseInput}
//                                             required
//                                             value={form.date}
//                                             onChange={set('date')}
//                                         />
//                                     </Field>
//                                     <Field label="Start time">
//                                         <input
//                                             type="time"
//                                             className={baseInput}
//                                             required
//                                             value={form.startTime}
//                                             onChange={set('startTime')}
//                                         />
//                                     </Field>
//                                     <Field label="End time">
//                                         <input
//                                             type="time"
//                                             className={baseInput}
//                                             required
//                                             value={form.endTime}
//                                             onChange={set('endTime')}
//                                         />
//                                     </Field>
//                                 </div>
//                             </div>
//                         </SectionCard>

//                         {/* -------- Session settings -------- */}
//                         <SectionCard
//                             icon={Clock}
//                             title="Session settings"
//                             subtitle="Additional options for this meeting"
//                         >
//                             <div className="!grid !gap-4">
//                                 <Field label="Duration (minutes)">
//                                     <input
//                                         type="number"
//                                         min="10"
//                                         step="5"
//                                         className={baseInput}
//                                         required
//                                         value={form.durationMinutes}
//                                         onChange={set('durationMinutes')}
//                                     />
//                                 </Field>
//                             </div>

//                             <label className="!mt-5 !flex !cursor-pointer !items-start !gap-3 !rounded-xl !border !border-white/10 !bg-slate-950/40 !p-4 !transition hover:!border-emerald-500/20">
//                                 <input
//                                     type="checkbox"
//                                     checked={form.waitingRoomEnabled}
//                                     onChange={set('waitingRoomEnabled')}
//                                     className="!mt-0.5 !h-4 !w-4 !rounded !border-slate-600 !bg-slate-800 !text-emerald-600 focus:!ring-emerald-500"
//                                 />
//                                 <span>
//                                     <span className="!block !text-sm !font-medium !text-white">
//                                         Enable waiting room <span className="!text-rose-400">*</span>
//                                     </span>
//                                     <span className="!mt-0.5 !block !text-xs !text-slate-400">
//                                         Guests wait until you admit them — good for scheduled sessions.
//                                     </span>
//                                 </span>
//                             </label>
//                         </SectionCard>

//                         {/* -------- Internal notes -------- */}
//                         <SectionCard
//                             icon={FileText}
//                             title="Internal notes"
//                             subtitle="Only visible to you — never shared with the client"
//                         >
//                             <Field label="Internal notes">
//                                 <textarea
//                                     className={`${baseInput} !min-h-[80px] !resize-y`}
//                                     placeholder="Prep notes, reminders, follow-ups…"
//                                     required
//                                     value={form.internalNotes}
//                                     onChange={set('internalNotes')}
//                                 />
//                             </Field>
//                         </SectionCard>

//                         {/* -------- Error -------- */}
//                         {error && (
//                             <div className="!flex !items-start !gap-3 !rounded-xl !border !border-rose-500/20 !bg-rose-500/10 !px-4 !py-3 !text-sm !text-rose-300">
//                                 <AlertCircle size={16} className="!mt-0.5 !shrink-0" />
//                                 <span>{error}</span>
//                             </div>
//                         )}

//                         {/* -------- Actions -------- */}
//                         <div className="!sticky !bottom-4 !z-10 !flex !flex-col !gap-3 !rounded-2xl !border !border-white/10 !bg-slate-900/80 !p-4 !backdrop-blur-md sm:!flex-row">
//                             <button
//                                 type="button"
//                                 onClick={() => router.push('/admin/video-calls')}
//                                 className="!order-2 !rounded-xl !border !border-white/10 !bg-slate-950/60 !px-5 !py-3 !text-sm !font-medium !text-slate-300 !transition hover:!bg-slate-800 sm:!order-1"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 type="submit"
//                                 disabled={saving}
//                                 className="!order-1 !flex !flex-1 !items-center !justify-center !gap-2 !rounded-xl !bg-emerald-600 !px-6 !py-3 !text-sm !font-semibold !text-white !shadow-lg !shadow-emerald-600/20 !transition hover:!bg-emerald-500 disabled:!opacity-50 sm:!order-2"
//                             >
//                                 {saving ? (
//                                     <>
//                                         <Loader2 size={16} className="!animate-spin" /> Creating…
//                                     </>
//                                 ) : (
//                                     <>
//                                         <Video size={16} /> Create Video Meeting
//                                     </>
//                                 )}
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </AdminLayout>
//     );
// }

"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    CheckCircle2, Copy, Share2, Mail, LogIn, CalendarPlus, AlertCircle,
    Loader2, User, Calendar, FileText, Clock, Video, Link2, ShieldCheck,
    ChevronRight, Sparkles, Zap,
} from 'lucide-react';
import { videoCallApi } from '../../../video-call/lib/api';
import AdminLayout from '../../components/AdminLayout';

const emptyForm = {
    clientName: '', clientEmail: '', clientPhone: '',
    title: '', description: '',
    date: '', startTime: '', endTime: '', durationMinutes: 30,
    internalNotes: '', customerId: '', serviceType: '',
    waitingRoomEnabled: true,
};

/* ---------------------------- small helpers ---------------------------- */
function SectionCard({ icon: Icon, title, subtitle, children }) {
    return (
        <div className="!rounded-2xl !border !border-white/5 !bg-slate-900/40 !p-6 !backdrop-blur-sm">
            <div className="!mb-5 !flex !items-start !gap-3">
                <div className="!flex !h-9 !w-9 !shrink-0 !items-center !justify-center !rounded-lg !bg-emerald-500/10 !text-emerald-400 !ring-1 !ring-emerald-500/20">
                    <Icon size={16} />
                </div>
                <div>
                    <h2 className="!text-sm !font-semibold !text-white">{title}</h2>
                    {subtitle && <p className="!mt-0.5 !text-xs !text-slate-500">{subtitle}</p>}
                </div>
            </div>
            {children}
        </div>
    );
}

function Field({ label, hint, children }) {
    return (
        <label className="!block">
            <span className="!mb-1.5 !flex !items-center !gap-1.5 !text-xs !font-medium !text-slate-400">
                {label}
                <span className="!text-rose-400">*</span>
            </span>
            {children}
            {hint && <span className="!mt-1 !block !text-[11px] !text-slate-500">{hint}</span>}
        </label>
    );
}

/* ------------------------------- component ------------------------------- */
export default function CreateVideoMeeting() {
    const router = useRouter();
    const token =
        typeof window !== 'undefined'
            ? localStorage.getItem('tToken') || localStorage.getItem('token')
            : null;

    const [form, setForm] = useState(emptyForm);
    const [saving, setSaving] = useState(false);
    const [starting, setStarting] = useState(false);
    const [error, setError] = useState('');
    const [created, setCreated] = useState(null);
    const [copied, setCopied] = useState(false);

    const set = (k) => (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setForm((f) => ({ ...f, [k]: value }));
    };

    const submit = async (e) => {
        e.preventDefault();
        setError('');
        setSaving(true);
        try {
            const res = await videoCallApi.createMeeting(form, token);
            setCreated(res.meeting);
        } catch (err) {
            setError(err.message || 'Could not create the meeting.');
        } finally {
            setSaving(false);
        }
    };

    /* ⚡ Instant meeting — one click, auto-joins the host room */
    const startInstantMeeting = async () => {
        setError('');
        setStarting(true);
        try {
            const now = new Date();
            const end = new Date(now.getTime() + 60 * 60 * 1000);
            const pad = (n) => String(n).padStart(2, '0');

            const payload = {
                clientName: 'Instant Guest',
                clientEmail: '',
                clientPhone: '',
                title: `Instant meeting · ${now.toLocaleDateString()}`,
                description: 'Instant video meeting started from admin dashboard.',
                date: `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`,
                startTime: `${pad(now.getHours())}:${pad(now.getMinutes())}`,
                endTime: `${pad(end.getHours())}:${pad(end.getMinutes())}`,
                durationMinutes: 60,
                internalNotes: '',
                customerId: '',
                serviceType: 'Instant',
                waitingRoomEnabled: false,
            };

            const res = await videoCallApi.createMeeting(payload, token);

            const link = `${window.location.origin}/video-call/${res.meeting.meetingId}`;
            try {
                await navigator.clipboard.writeText(link);
            } catch { /* clipboard blocked — ignore */ }

            router.push(`/admin/video-calls/${res.meeting.meetingId}/room`);
        } catch (err) {
            setError(err.message || 'Could not start the meeting.');
            setStarting(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(created.link);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
    };

    const whatsappMessage = created
        ? `Hello ${created.clientName || 'there'},\n\nYour video consultation with My Inner Site has been scheduled.\n\nMeeting: ${created.title}\nDate: ${new Date(created.startTime).toLocaleDateString()}\nTime: ${new Date(created.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}\n\nPlease join using the following link:\n${created.link}\n\nThank you,\nMy Inner Site`
        : '';

    const mailtoLink = created
        ? `mailto:${created.clientEmail || ''}?subject=${encodeURIComponent(`Video consultation: ${created.title}`)}&body=${encodeURIComponent(
            `Hello ${created.clientName || 'there'},\n\nYour video consultation with My Inner Site has been scheduled.\n\nMeeting: ${created.title}\nDate: ${new Date(created.startTime).toLocaleDateString()}\nTime: ${new Date(created.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}\n\nJoin link: ${created.link}\n\nThank you,\nMy Inner Site`
        )}`
        : '#';

    const baseInput =
        '!w-full !rounded-xl !border !border-white/10 !bg-slate-950/60 !px-3.5 !py-2.5 !text-sm !text-white placeholder:!text-slate-500 !outline-none !transition focus:!border-emerald-500/50 focus:!ring-2 focus:!ring-emerald-500/20';

    /* ============================ SUCCESS SCREEN ============================ */
    if (created) {
        return (
            <AdminLayout>
                <div className="!min-h-screen !bg-[#0b0f19] !px-4 !py-10 sm:!px-6 lg:!px-8">
                    <div className="!mx-auto !max-w-2xl">
                        <div className="!mb-8 !text-center">
                            <div className="!mx-auto !mb-4 !flex !h-16 !w-16 !items-center !justify-center !rounded-full !bg-emerald-500/10 !ring-1 !ring-emerald-500/30">
                                <CheckCircle2 className="!text-emerald-400" size={32} />
                            </div>
                            <h1 className="!text-2xl !font-semibold !text-white">
                                Video meeting created
                            </h1>
                            <p className="!mt-1.5 !text-sm !text-slate-400">
                                Share the link below with your client to let them join.
                            </p>
                        </div>

                        <div className="!overflow-hidden !rounded-2xl !border !border-white/10 !bg-slate-900/60 !backdrop-blur-sm">
                            <div className="!border-b !border-white/5 !bg-slate-950/40 !px-5 !py-3">
                                <div className="!flex !items-center !gap-2 !text-xs !font-medium !text-slate-400">
                                    <Link2 size={14} className="!text-emerald-400" />
                                    Meeting link
                                </div>
                            </div>
                            <div className="!p-5">
                                <div className="!flex !flex-col !gap-3 sm:!flex-row sm:!items-center">
                                    <code className="!flex-1 !truncate !rounded-lg !bg-slate-950/70 !px-3 !py-2.5 !font-mono !text-sm !text-emerald-300">
                                        {created.link}
                                    </code>
                                    <button
                                        onClick={handleCopy}
                                        className="!inline-flex !items-center !justify-center !gap-2 !rounded-lg !bg-slate-800 !px-4 !py-2.5 !text-sm !font-medium !text-slate-200 !transition hover:!bg-slate-700"
                                    >
                                        {copied ? (
                                            <>
                                                <CheckCircle2 size={15} className="!text-emerald-400" /> Copied
                                            </>
                                        ) : (
                                            <>
                                                <Copy size={15} /> Copy
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="!mt-6 !grid !grid-cols-1 !gap-3 sm:!grid-cols-3">
                            <button
                                onClick={() =>
                                    window.open(`https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`, '_blank')
                                }
                                className="!flex !items-center !gap-3 !rounded-xl !border !border-white/10 !bg-slate-900/60 !px-4 !py-3.5 !text-left !transition hover:!border-emerald-500/30 hover:!bg-slate-900"
                            >
                                <div className="!flex !h-9 !w-9 !items-center !justify-center !rounded-lg !bg-emerald-500/10 !text-emerald-400">
                                    <Share2 size={16} />
                                </div>
                                <div className="!min-w-0">
                                    <p className="!text-sm !font-medium !text-white">WhatsApp</p>
                                    <p className="!truncate !text-xs !text-slate-500">Send message</p>
                                </div>
                            </button>

                            <a
                                href={mailtoLink}
                                className="!flex !items-center !gap-3 !rounded-xl !border !border-white/10 !bg-slate-900/60 !px-4 !py-3.5 !text-left !transition hover:!border-emerald-500/30 hover:!bg-slate-900"
                            >
                                <div className="!flex !h-9 !w-9 !items-center !justify-center !rounded-lg !bg-emerald-500/10 !text-emerald-400">
                                    <Mail size={16} />
                                </div>
                                <div className="!min-w-0">
                                    <p className="!text-sm !font-medium !text-white">Email</p>
                                    <p className="!truncate !text-xs !text-slate-500">Send invite</p>
                                </div>
                            </a>

                            <a
                                href={`/video-call/${created.meetingId}`}
                                target="_blank"
                                rel="noreferrer"
                                className="!flex !items-center !gap-3 !rounded-xl !border !border-emerald-500/30 !bg-emerald-600/10 !px-4 !py-3.5 !text-left !transition hover:!bg-emerald-600/20"
                            >
                                <div className="!flex !h-9 !w-9 !items-center !justify-center !rounded-lg !bg-emerald-500/20 !text-emerald-300">
                                    <Video size={16} />
                                </div>
                                <div className="!min-w-0">
                                    <p className="!text-sm !font-medium !text-emerald-200">Join now</p>
                                    <p className="!truncate !text-xs !text-emerald-400/70">Open room</p>
                                </div>
                            </a>
                        </div>

                        <div className="!mt-8 !flex !flex-col !gap-3 sm:!flex-row">
                            <button
                                onClick={() => router.push(`/admin/video-calls/${created.meetingId}`)}
                                className="!inline-flex !flex-1 !items-center !justify-center !gap-2 !rounded-xl !bg-slate-800 !px-5 !py-3 !text-sm !font-medium !text-slate-200 !transition hover:!bg-slate-700"
                            >
                                View meeting details
                                <ChevronRight size={16} />
                            </button>
                            <button
                                onClick={() => {
                                    setCreated(null);
                                    setForm(emptyForm);
                                }}
                                className="!inline-flex !flex-1 !items-center !justify-center !gap-2 !rounded-xl !bg-emerald-600 !px-5 !py-3 !text-sm !font-semibold !text-white !transition hover:!bg-emerald-500"
                            >
                                <Sparkles size={16} /> Create another
                            </button>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    /* ============================= FORM SCREEN ============================= */
    return (
        <AdminLayout>
            <div className="!min-h-screen !bg-[#0b0f19] !px-4 !py-8 sm:!px-6 lg:!px-8">
                <div className="!mx-auto !max-w-4xl">
                    {/* Page header */}
                    <div className="!mb-8 !flex !flex-col !gap-4 sm:!flex-row sm:!items-center sm:!justify-between">
                        <div className="!flex !items-center !gap-4">
                            <div className="!flex !h-12 !w-12 !items-center !justify-center !rounded-2xl !bg-gradient-to-br !from-emerald-500/20 !to-emerald-600/5 !text-emerald-400 !ring-1 !ring-emerald-500/20">
                                <CalendarPlus size={22} />
                            </div>
                            <div>
                                <h1 className="!text-2xl !font-semibold !tracking-tight !text-white">
                                    Create Video Meeting
                                </h1>
                                <p className="!mt-0.5 !text-sm !text-slate-400">
                                    Schedule a session or start one instantly.
                                </p>
                            </div>
                        </div>

                        {/* ⚡ Instant meeting button */}
                        <button
                            type="button"
                            onClick={startInstantMeeting}
                            disabled={starting || saving}
                            className="!inline-flex !items-center !justify-center !gap-2 !rounded-xl !bg-gradient-to-r !from-amber-500 !to-amber-600 !px-5 !py-3 !text-sm !font-semibold !text-white !shadow-lg !shadow-amber-500/20 !transition hover:!from-amber-400 hover:!to-amber-500 disabled:!opacity-50"
                        >
                            {starting ? (
                                <>
                                    <Loader2 size={16} className="!animate-spin" /> Starting…
                                </>
                            ) : (
                                <>
                                    <Zap size={16} /> Start Instant Meeting
                                </>
                            )}
                        </button>
                    </div>

                    {/* Info hint about instant meeting */}
                    <div className="!mb-6 !flex !items-start !gap-3 !rounded-xl !border !border-amber-500/20 !bg-amber-500/5 !px-4 !py-3">
                        <Zap size={16} className="!mt-0.5 !shrink-0 !text-amber-400" />
                        <div className="!text-xs !text-amber-200/80">
                            <span className="!font-semibold !text-amber-300">Tip:</span>{' '}
                            Click <span className="!font-semibold">Start Instant Meeting</span> for a 1-click session with no waiting room.
                            The link is auto-copied to your clipboard and you&apos;re dropped straight into the room.
                        </div>
                    </div>

                    <form onSubmit={submit} className="!space-y-5">
                        {/* -------- Client details -------- */}
                        <SectionCard
                            icon={User}
                            title="Client information"
                            subtitle="Who will you be meeting with?"
                        >
                            <div className="!grid !gap-4 sm:!grid-cols-2">
                                <Field label="Client name">
                                    <input
                                        className={baseInput}
                                        placeholder="e.g. Priya Sharma"
                                        required
                                        value={form.clientName}
                                        onChange={set('clientName')}
                                    />
                                </Field>
                                <Field label="Client email">
                                    <input
                                        className={baseInput}
                                        type="email"
                                        placeholder="client@example.com"
                                        required
                                        value={form.clientEmail}
                                        onChange={set('clientEmail')}
                                    />
                                </Field>
                                <Field label="Client phone">
                                    <input
                                        className={baseInput}
                                        type="tel"
                                        placeholder="+91 98765 43210"
                                        required
                                        value={form.clientPhone}
                                        onChange={set('clientPhone')}
                                    />
                                </Field>
                                <Field label="Service type">
                                    <input
                                        className={baseInput}
                                        placeholder="e.g. Life coaching session"
                                        required
                                        value={form.serviceType}
                                        onChange={set('serviceType')}
                                    />
                                </Field>
                            </div>
                        </SectionCard>

                        {/* -------- Meeting details -------- */}
                        <SectionCard
                            icon={Calendar}
                            title="Meeting details"
                            subtitle="What is this session about?"
                        >
                            <div className="!space-y-4">
                                <Field label="Meeting title">
                                    <input
                                        className={baseInput}
                                        placeholder="e.g. Discovery call — anxiety coaching"
                                        required
                                        value={form.title}
                                        onChange={set('title')}
                                    />
                                </Field>

                                <Field label="Description">
                                    <textarea
                                        className={`${baseInput} !min-h-[90px] !resize-y`}
                                        placeholder="Short agenda or notes about the session…"
                                        required
                                        value={form.description}
                                        onChange={set('description')}
                                    />
                                </Field>

                              
                                    <div className="!grid !gap-4 sm:!grid-cols-3">
    <Field label="Date">
        <div className="!relative">
            <input
                type="date"
                className={baseInput}
                required
                value={form.date}
                onChange={set('date')}
                onClick={(e) => e.currentTarget.showPicker?.()}
                style={{ colorScheme: 'dark' }}
            />
        </div>
    </Field>
    <Field label="Start time">
        <div className="!relative">
            <input
                type="time"
                step="60"
                className={baseInput}
                required
                value={form.startTime}
                onChange={set('startTime')}
                onClick={(e) => e.currentTarget.showPicker?.()}
                style={{ colorScheme: 'dark' }}
            />
        </div>
    </Field>
    <Field label="End time">
        <div className="!relative">
            <input
                type="time"
                step="60"
                className={baseInput}
                required
                value={form.endTime}
                onChange={set('endTime')}
                onClick={(e) => e.currentTarget.showPicker?.()}
                style={{ colorScheme: 'dark' }}
            />
        </div>
    </Field>
</div>
                            </div>
                        </SectionCard>

                        {/* -------- Session settings -------- */}
                        <SectionCard
                            icon={Clock}
                            title="Session settings"
                            subtitle="Additional options for this meeting"
                        >
                            <div className="!grid !gap-4">
                                <Field label="Duration (minutes)">
                                    <input
                                        type="number"
                                        min="10"
                                        step="5"
                                        className={baseInput}
                                        required
                                        value={form.durationMinutes}
                                        onChange={set('durationMinutes')}
                                    />
                                </Field>
                            </div>

                            <label className="!mt-5 !flex !cursor-pointer !items-start !gap-3 !rounded-xl !border !border-white/10 !bg-slate-950/40 !p-4 !transition hover:!border-emerald-500/20">
                                <input
                                    type="checkbox"
                                    checked={form.waitingRoomEnabled}
                                    onChange={set('waitingRoomEnabled')}
                                    className="!mt-0.5 !h-4 !w-4 !rounded !border-slate-600 !bg-slate-800 !text-emerald-600 focus:!ring-emerald-500"
                                />
                                <span>
                                    <span className="!block !text-sm !font-medium !text-white">
                                        Enable waiting room <span className="!text-rose-400">*</span>
                                    </span>
                                    <span className="!mt-0.5 !block !text-xs !text-slate-400">
                                        Guests wait until you admit them — good for scheduled sessions.
                                    </span>
                                </span>
                            </label>
                        </SectionCard>

                        {/* -------- Internal notes -------- */}
                        <SectionCard
                            icon={FileText}
                            title="Internal notes"
                            subtitle="Only visible to you — never shared with the client"
                        >
                            <Field label="Internal notes">
                                <textarea
                                    className={`${baseInput} !min-h-[80px] !resize-y`}
                                    placeholder="Prep notes, reminders, follow-ups…"
                                    required
                                    value={form.internalNotes}
                                    onChange={set('internalNotes')}
                                />
                            </Field>
                        </SectionCard>

                        {/* -------- Error -------- */}
                        {error && (
                            <div className="!flex !items-start !gap-3 !rounded-xl !border !border-rose-500/20 !bg-rose-500/10 !px-4 !py-3 !text-sm !text-rose-300">
                                <AlertCircle size={16} className="!mt-0.5 !shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        {/* -------- Actions -------- */}
                        <div className="!sticky !bottom-4 !z-10 !flex !flex-col !gap-3 !rounded-2xl !border !border-white/10 !bg-slate-900/80 !p-4 !backdrop-blur-md sm:!flex-row">
                            <button
                                type="button"
                                onClick={() => router.push('/admin/video-calls')}
                                className="!order-2 !rounded-xl !border !border-white/10 !bg-slate-950/60 !px-5 !py-3 !text-sm !font-medium !text-slate-300 !transition hover:!bg-slate-800 sm:!order-1"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={saving}
                                className="!order-1 !flex !flex-1 !items-center !justify-center !gap-2 !rounded-xl !bg-emerald-600 !px-6 !py-3 !text-sm !font-semibold !text-white !shadow-lg !shadow-emerald-600/20 !transition hover:!bg-emerald-500 disabled:!opacity-50 sm:!order-2"
                            >
                                {saving ? (
                                    <>
                                        <Loader2 size={16} className="!animate-spin" /> Creating…
                                    </>
                                ) : (
                                    <>
                                        <Video size={16} /> Create Video Meeting
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}