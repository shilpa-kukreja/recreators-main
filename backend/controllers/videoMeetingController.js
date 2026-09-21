// ============================================================
// BACKEND — controllers/videoMeetingController.js
// ============================================================
import jwt from 'jsonwebtoken';
import VideoMeeting from '../models/VideoMeeting.js';
import { generateMeetingId } from '../utils/meetingId.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const PUBLIC_BASE_URL = process.env.PUBLIC_BASE_URL || 'https://myinnerside.com';

/* ------------------------------ helpers ------------------------------ */

const buildLink = (meetingId) => `${PUBLIC_BASE_URL}/video-call/${meetingId}`;

const toPublicMeeting = (m) => ({
    meetingId: m.meetingId,
    title: m.title,
    description: m.description,
    hostName: m.hostName,
    clientName: m.clientName,
    startTime: m.startTime,
    endTime: m.endTime,
    status: m.status,
    link: buildLink(m.meetingId),
});

/** Normalises a user-pasted link OR raw meeting id into a meetingId. */
export function extractMeetingId(raw = '') {
    const value = String(raw).trim();
    if (!value) return null;
    if (/^[A-Za-z]{2,5}-[A-Za-z0-9]{4,12}$/.test(value)) return value.toUpperCase();
    const match = value.match(/video-call\/([A-Za-z0-9-]+)/i);
    if (match) return match[1].toUpperCase();
    return value.toUpperCase();
}

/* ------------------------------ public ------------------------------ */

// GET /api/video-calls/public/:meetingId
export const getPublicMeeting = async (req, res) => {
    try {
        const meeting = await VideoMeeting.findOne({
            meetingId: String(req.params.meetingId).toUpperCase(),
        }).select('meetingId title description hostName clientName startTime endTime status locked waitingRoomEnabled');

        if (!meeting) {
            return res.status(404).json({ success: false, code: 'NOT_FOUND', message: 'Meeting not found.' });
        }

        const state = meeting.getJoinState();
        return res.json({
            success: true,
            meeting: {
                meetingId: meeting.meetingId,
                title: meeting.title,
                description: meeting.description,
                hostName: meeting.hostName,
                clientName: meeting.clientName,
                startTime: meeting.startTime,
                endTime: meeting.endTime,
                status: meeting.status,
            },
            join: state,
        });
    } catch (err) {
        console.error('getPublicMeeting', err);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// POST /api/video-calls/public/resolve   { link }
export const resolveLink = async (req, res) => {
    const meetingId = extractMeetingId(req.body?.link);
    if (!meetingId) {
        return res.status(400).json({ success: false, code: 'INVALID_LINK', message: 'Invalid meeting link. Please check the link and try again.' });
    }
    req.params.meetingId = meetingId;
    return getPublicMeeting(req, res);
};

// POST /api/video-calls/public/:meetingId/join   { name }
export const joinMeeting = async (req, res) => {
    try {
        const name = String(req.body?.name || '').trim();
        if (name.length < 2) {
            return res.status(400).json({ success: false, message: 'Please enter your full name.' });
        }

        const meeting = await VideoMeeting.findOne({
            meetingId: String(req.params.meetingId).toUpperCase(),
        });
        if (!meeting) {
            return res.status(404).json({ success: false, code: 'NOT_FOUND', message: 'Meeting not found.' });
        }

        const state = meeting.getJoinState();
        if (!state.joinable && !state.canWait) {
            return res.status(403).json({ success: false, code: state.code, message: state.message });
        }

        // Short-lived guest token — bound to this single meeting.
        const guestToken = jwt.sign(
            { kind: 'guest', meetingId: meeting.meetingId, name, role: 'guest' },
            JWT_SECRET,
            { expiresIn: '8h' }
        );

        return res.json({
            success: true,
            guestToken,
            meeting: toPublicMeeting(meeting),
            join: state,
        });
    } catch (err) {
        console.error('joinMeeting', err);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

/* ------------------------------ admin ------------------------------ */

// POST /api/video-calls
export const createMeeting = async (req, res) => {
    try {
        const {
            title, description, clientName, clientEmail, clientPhone,
            date, startTime, endTime, durationMinutes,
            internalNotes,  customerId, serviceType,
            waitingRoomEnabled = true,
        } = req.body;

        if (!title || !date || !startTime) {
            return res.status(400).json({ success: false, message: 'Title, date and start time are required.' });
        }

        const start = new Date(`${date}T${startTime}`);
        let end;
        if (endTime) end = new Date(`${date}T${endTime}`);
        else end = new Date(start.getTime() + (Number(durationMinutes) || 30) * 60 * 1000);

        if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end <= start) {
            return res.status(400).json({ success: false, message: 'Invalid meeting time range.' });
        }

        // collision-safe meeting id
        let meetingId;
        for (let i = 0; i < 5; i += 1) {
            meetingId = generateMeetingId();
            // eslint-disable-next-line no-await-in-loop
            const exists = await VideoMeeting.exists({ meetingId });
            if (!exists) break;
            meetingId = null;
        }
        if (!meetingId) return res.status(500).json({ success: false, message: 'Could not generate meeting id.' });

        const meeting = await VideoMeeting.create({
            meetingId,
            title,
            description: description || '',
            clientName: clientName || '',
            clientEmail: clientEmail || '',
            clientPhone: clientPhone || '',
            createdBy: req.user?.email || null,     // admin email, or null
            hostName: req.user?.name || 'Admin',
            customerId: customerId || null,
            serviceType: serviceType || '',
            internalNotes: internalNotes || '',
            startTime: start,
            endTime: end,
            waitingRoomEnabled: Boolean(waitingRoomEnabled),
            status: 'scheduled',
        });

        return res.status(201).json({
            success: true,
            message: 'Video meeting created successfully.',
            meeting: { ...meeting.toObject(), link: buildLink(meeting.meetingId) },
        });
    } catch (err) {
        console.error('createMeeting', err);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// GET /api/video-calls
export const listMeetings = async (req, res) => {
    try {
        const { status, q, from, to, page = 1, limit = 20 } = req.query;
        const filter = {};

        if (status && status !== 'all') filter.status = status;
        if (q) {
            filter.$or = [
                { meetingId: new RegExp(q, 'i') },
                { title: new RegExp(q, 'i') },
                { clientName: new RegExp(q, 'i') },
                { clientEmail: new RegExp(q, 'i') },
            ];
        }
        if (from || to) {
            filter.startTime = {};
            if (from) filter.startTime.$gte = new Date(from);
            if (to) filter.startTime.$lte = new Date(to);
        }

        const skip = (Number(page) - 1) * Number(limit);
        const [items, total] = await Promise.all([
            VideoMeeting.find(filter).sort({ startTime: -1 }).skip(skip).limit(Number(limit)).lean(),
            VideoMeeting.countDocuments(filter),
        ]);

        return res.json({
            success: true,
            items: items.map((m) => ({ ...m, link: buildLink(m.meetingId) })),
            total,
            page: Number(page),
            pages: Math.ceil(total / Number(limit)),
        });
    } catch (err) {
        console.error('listMeetings', err);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// GET /api/video-calls/stats
export const getStats = async (_req, res) => {
    try {
        const now = new Date();
        const [total, scheduled, active, completed, upcoming] = await Promise.all([
            VideoMeeting.countDocuments(),
            VideoMeeting.countDocuments({ status: { $in: ['scheduled', 'waiting'] } }),
            VideoMeeting.countDocuments({ status: 'active' }),
            VideoMeeting.countDocuments({ status: 'completed' }),
            VideoMeeting.countDocuments({ status: 'scheduled', startTime: { $gte: now } }),
        ]);
        return res.json({ success: true, stats: { total, scheduled, active, completed, upcoming } });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// GET /api/video-calls/:meetingId  (admin)
export const getMeeting = async (req, res) => {
    try {
        const meeting = await VideoMeeting.findOne({
            meetingId: String(req.params.meetingId).toUpperCase(),
        });
        if (!meeting) return res.status(404).json({ success: false, message: 'Meeting not found.' });
        return res.json({ success: true, meeting: { ...meeting.toObject(), link: buildLink(meeting.meetingId) } });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// PUT /api/video-calls/:meetingId
export const updateMeeting = async (req, res) => {
    try {
        const allowed = [
            'title', 'description', 'clientName', 'clientEmail', 'clientPhone',
            'internalNotes', 'serviceType', 'waitingRoomEnabled', 'locked', 'status',
            'startTime', 'endTime', 'customerId',
        ];
        const patch = {};
        allowed.forEach((k) => {
            if (req.body[k] !== undefined) patch[k] = req.body[k];
        });

        const meeting = await VideoMeeting.findOneAndUpdate(
            { meetingId: String(req.params.meetingId).toUpperCase() },
            { $set: patch },
            { new: true, runValidators: true }
        );
        if (!meeting) return res.status(404).json({ success: false, message: 'Meeting not found.' });
        return res.json({ success: true, meeting: { ...meeting.toObject(), link: buildLink(meeting.meetingId) } });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// DELETE /api/video-calls/:meetingId
export const deleteMeeting = async (req, res) => {
    try {
        const result = await VideoMeeting.findOneAndDelete({
            meetingId: String(req.params.meetingId).toUpperCase(),
        });
        if (!result) return res.status(404).json({ success: false, message: 'Meeting not found.' });
        return res.json({ success: true, message: 'Meeting deleted.' });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// POST /api/video-calls/:meetingId/end
export const endMeeting = async (req, res) => {
    try {
        const meeting = await VideoMeeting.findOneAndUpdate(
            { meetingId: String(req.params.meetingId).toUpperCase() },
            { $set: { status: 'completed', endedAt: new Date() } },
            { new: true }
        );
        if (!meeting) return res.status(404).json({ success: false, message: 'Meeting not found.' });

        // Notify the socket namespace
        const io = req.app.get('io');
        if (io) {
            io.of('/video').to(meeting.meetingId).emit('meeting-ended', {
                reason: 'Meeting ended by the host.',
            });
            io.of('/video').in(meeting.meetingId).disconnectSockets(true);
        }

        return res.json({ success: true, message: 'Meeting ended.' });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};