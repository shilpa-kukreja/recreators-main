// BACKEND — routes/videoMeetingRoute.js
import express from 'express';
import rateLimit from 'express-rate-limit';
import {
  createMeeting, listMeetings, getMeeting, updateMeeting, deleteMeeting,
  getStats, endMeeting, getPublicMeeting, joinMeeting, resolveLink,
} from '../controllers/videoMeetingController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

const publicLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 40,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests. Please slow down.' },
});

/* ---------------- public (no auth) ---------------- */
router.get('/public/:meetingId', publicLimiter, getPublicMeeting);
router.post('/public/resolve', publicLimiter, resolveLink);
router.post('/public/:meetingId/join', publicLimiter, joinMeeting);

/* ---------------- admin only ---------------- */
router.get('/stats', protectAdmin, getStats);
router.post('/',  createMeeting);
router.get('/', protectAdmin, listMeetings);
router.get('/:meetingId', protectAdmin, getMeeting);
router.put('/:meetingId', protectAdmin, updateMeeting);
router.delete('/:meetingId', protectAdmin, deleteMeeting);
router.post('/:meetingId/end', protectAdmin, endMeeting);

export default router;