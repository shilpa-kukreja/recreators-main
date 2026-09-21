import jwt from 'jsonwebtoken';
import axios from 'axios';






export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      // Only admin fields — nothing else
      const payload = {
        email,
        name: 'Admin',
        kind: 'admin',   // socket uses this to detect host
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '12h' });

      return res.status(200).json({ success: true, token });
    }

    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  } catch (error) {
    console.error('Admin Login Error:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
