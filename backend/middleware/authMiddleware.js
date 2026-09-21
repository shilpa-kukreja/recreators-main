// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

/* ---------------------------------------------------------------
   protectAdmin → valid JWT AND admin identity
   Admin is confirmed if:
     - token kind === 'admin'
     - OR email === ADMIN_EMAIL
--------------------------------------------------------------- */
export const protectAdmin = (req, res, next) => {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;

    if (!token) {
      return res.status(401).json({ success: false, message: 'Authentication required.' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    // Reject guest tokens — they can only be used on public routes
    if (decoded.kind === 'guest') {
      return res.status(403).json({ success: false, message: 'Admin access required.' });
    }

    const isAdmin =
      decoded.kind === 'admin' ||
      (ADMIN_EMAIL && decoded.email === ADMIN_EMAIL);

    if (!isAdmin) {
      return res.status(403).json({ success: false, message: 'Admin access required.' });
    }

    req.user = decoded;
    req.token = token;
    return next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Session expired. Please login again.' });
    }
    return res.status(401).json({ success: false, message: 'Invalid authentication token.' });
  }
};