// ============================================================
// BACKEND — utils/meetingId.js
// ============================================================
import crypto from 'crypto';

// Ambiguity-free alphabet (no I, O, 0, 1)
const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

export function generateMeetingId(prefix = 'VID') {
  const bytes = crypto.randomBytes(8);
  let out = '';
  for (let i = 0; i < 6; i += 1) out += ALPHABET[bytes[i] % ALPHABET.length];
  return `${prefix}-${out}`;
}

export function generateRoomToken() {
  return crypto.randomBytes(24).toString('base64url');
}