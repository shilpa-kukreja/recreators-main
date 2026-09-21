
import mongoose from 'mongoose';
import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import path from "path";
import http from 'http';
import jwt from 'jsonwebtoken';
import { Server as SocketIOServer } from 'socket.io';
import connectDB from './config/db.js';
import subscriberRoutes from './routes/subscriberRoutes.js';
import authRoutes from './routes/authRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import blogRouter from './routes/blogRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import carrerRoutes from './routes/carrerRoutes.js';
import carrerFormRoutes from './routes/carrerFormRoutes.js';
import pricingRoutes from './routes/pricingRoutes.js';
import portfolioRoutes from './routes/portfolioRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import couponRouter from './routes/couponRoutes.js';
import dns from "dns";

// 🆕 video call imports
import videoMeetingRouter from './routes/videoMeetingRoute.js';
import initVideoCallSocket from './socket/videoCallSocket.js';

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

connectDB();

/* ================== 🆕 SOCKET.IO / VIDEO CALL SETUP ================== */

const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:5173,https://myinnerside.com')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

const server = http.createServer(app);

const io = new SocketIOServer(server, {
  cors: { origin: allowedOrigins, methods: ['GET', 'POST'], credentials: true },
  transports: ['websocket', 'polling'],
  pingTimeout: 30000,
  pingInterval: 25000,
});

app.set('io', io); // so controllers can broadcast

/* --- default-namespace handler for appointment calls --- */
const activeCalls = {};

io.use((socket, next) => {
  const token = socket.handshake.auth?.token;
  if (!token) return next(new Error('Authentication error'));
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return next(new Error('Authentication error'));
    socket.user = decoded;
    next();
  });
});

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.user.userId}`);

  socket.on('join-call', ({ appointmentId }) => {
    if (!activeCalls[appointmentId]) {
      activeCalls[appointmentId] = { participants: [], offer: null, answers: {}, iceCandidates: {} };
    }
    const call = activeCalls[appointmentId];
    if (!hasAccessToAppointment(socket.user, appointmentId)) {
      return socket.emit('error', 'Unauthorized access to call');
    }

    call.participants.push(socket.user.userId);
    socket.join(appointmentId);
    socket.to(appointmentId).emit('user-joined', { userId: socket.user.userId });

    if (call.offer) socket.emit('offer', { offer: call.offer, sender: call.offer.sender });

    socket.on('offer', (data) => {
      call.offer = { ...data.offer, sender: socket.user.userId };
      socket.to(appointmentId).emit('offer', { offer: data.offer, sender: socket.user.userId });
    });
    socket.on('answer', (data) => {
      call.answers[socket.user.userId] = data.answer;
      socket.to(appointmentId).emit('answer', { answer: data.answer, sender: socket.user.userId });
    });
    socket.on('ice-candidate', (data) => {
      if (!call.iceCandidates[socket.user.userId]) call.iceCandidates[socket.user.userId] = [];
      call.iceCandidates[socket.user.userId].push(data.candidate);
      socket.to(appointmentId).emit('ice-candidate', { candidate: data.candidate, sender: socket.user.userId });
    });
    socket.on('end-call', () => {
      socket.to(appointmentId).emit('call-ended', { userId: socket.user.userId });
      delete activeCalls[appointmentId];
    });
    socket.on('disconnect', () => {
      const i = call.participants.indexOf(socket.user.userId);
      if (i > -1) call.participants.splice(i, 1);
      socket.to(appointmentId).emit('user-left', { userId: socket.user.userId });
    });
  });
});

function hasAccessToAppointment() { return true; }

/* 🆕 register the /video namespace */
initVideoCallSocket(io);

/* ======================= END SOCKET.IO SETUP ======================= */

// Routes
app.use('/api/subscriber', subscriberRoutes);
app.use('/api/users', authRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/blog', blogRouter);
app.use('/api/contact', contactRoutes);
app.use('/api/carrer', carrerRoutes);
app.use('/api/carrer', carrerFormRoutes);
app.use('/api/price', pricingRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/coupon', couponRouter);

/* 🆕 video calls REST route */
app.use('/api/video-calls', videoMeetingRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
  console.log(`Video signaling available at ws://localhost:${port}/video`);
});




















