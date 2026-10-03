
// import mongoose from 'mongoose';
// import express from 'express';
// import 'dotenv/config';
// import cors from 'cors';
// import path from "path";
// import http from 'http';
// import jwt from 'jsonwebtoken';
// import { Server as SocketIOServer } from 'socket.io';
// import connectDB from './config/db.js';
// import subscriberRoutes from './routes/subscriberRoutes.js';
// import authRoutes from './routes/authRoutes.js';
// import categoryRoutes from './routes/categoryRoutes.js';
// import blogRouter from './routes/blogRoutes.js';
// import contactRoutes from './routes/contactRoutes.js';
// import carrerRoutes from './routes/carrerRoutes.js';
// import carrerFormRoutes from './routes/carrerFormRoutes.js';
// import pricingRoutes from './routes/pricingRoutes.js';
// import portfolioRoutes from './routes/portfolioRoutes.js';
// import paymentRoutes from './routes/paymentRoutes.js';
// import couponRouter from './routes/couponRoutes.js';
// import dns from "dns";

// // 🆕 video call imports
// import videoMeetingRouter from './routes/videoMeetingRoute.js';
// import initVideoCallSocket from './socket/videoCallSocket.js';

// dns.setServers(["1.1.1.1", "8.8.8.8"]);

// const app = express();
// app.use(
//   cors({
//     origin: [
//       "https://08z4s4jn-3000.inc1.devtunnels.ms",
//       "http://localhost:3000",
//       "https://recreators-main.vercel.app",
//     ],
//   })
// );
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// const port = process.env.PORT || 5000;
// const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// connectDB();

// /* ================== 🆕 SOCKET.IO / VIDEO CALL SETUP ================== */

// const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:5173,https://myinnerside.com')
//   .split(',')
//   .map((s) => s.trim())
//   .filter(Boolean);

// const server = http.createServer(app);

// const io = new SocketIOServer(server, {
//   cors: { origin: allowedOrigins, methods: ['GET', 'POST'], credentials: true },
//   transports: ['websocket', 'polling'],
//   pingTimeout: 30000,
//   pingInterval: 25000,
// });

// app.set('io', io); // so controllers can broadcast

// /* --- default-namespace handler for appointment calls --- */
// const activeCalls = {};

// io.use((socket, next) => {
//   const token = socket.handshake.auth?.token;
//   if (!token) return next(new Error('Authentication error'));
//   jwt.verify(token, JWT_SECRET, (err, decoded) => {
//     if (err) return next(new Error('Authentication error'));
//     socket.user = decoded;
//     next();
//   });
// });

// io.on('connection', (socket) => {
//   console.log(`User connected: ${socket.user.userId}`);

//   socket.on('join-call', ({ appointmentId }) => {
//     if (!activeCalls[appointmentId]) {
//       activeCalls[appointmentId] = { participants: [], offer: null, answers: {}, iceCandidates: {} };
//     }
//     const call = activeCalls[appointmentId];
//     if (!hasAccessToAppointment(socket.user, appointmentId)) {
//       return socket.emit('error', 'Unauthorized access to call');
//     }

//     call.participants.push(socket.user.userId);
//     socket.join(appointmentId);
//     socket.to(appointmentId).emit('user-joined', { userId: socket.user.userId });

//     if (call.offer) socket.emit('offer', { offer: call.offer, sender: call.offer.sender });

//     socket.on('offer', (data) => {
//       call.offer = { ...data.offer, sender: socket.user.userId };
//       socket.to(appointmentId).emit('offer', { offer: data.offer, sender: socket.user.userId });
//     });
//     socket.on('answer', (data) => {
//       call.answers[socket.user.userId] = data.answer;
//       socket.to(appointmentId).emit('answer', { answer: data.answer, sender: socket.user.userId });
//     });
//     socket.on('ice-candidate', (data) => {
//       if (!call.iceCandidates[socket.user.userId]) call.iceCandidates[socket.user.userId] = [];
//       call.iceCandidates[socket.user.userId].push(data.candidate);
//       socket.to(appointmentId).emit('ice-candidate', { candidate: data.candidate, sender: socket.user.userId });
//     });
//     socket.on('end-call', () => {
//       socket.to(appointmentId).emit('call-ended', { userId: socket.user.userId });
//       delete activeCalls[appointmentId];
//     });
//     socket.on('disconnect', () => {
//       const i = call.participants.indexOf(socket.user.userId);
//       if (i > -1) call.participants.splice(i, 1);
//       socket.to(appointmentId).emit('user-left', { userId: socket.user.userId });
//     });
//   });
// });

// function hasAccessToAppointment() { return true; }

// /* 🆕 register the /video namespace */
// initVideoCallSocket(io);

// /* ======================= END SOCKET.IO SETUP ======================= */

// // Routes
// app.use('/api/subscriber', subscriberRoutes);
// app.use('/api/users', authRoutes);
// app.use('/api/category', categoryRoutes);
// app.use('/api/blog', blogRouter);
// app.use('/api/contact', contactRoutes);
// app.use('/api/carrer', carrerRoutes);
// app.use('/api/carrer', carrerFormRoutes);
// app.use('/api/price', pricingRoutes);
// app.use('/api/portfolio', portfolioRoutes);
// app.use('/api/payment', paymentRoutes);
// app.use('/api/coupon', couponRouter);

// /* 🆕 video calls REST route */
// app.use('/api/video-calls', videoMeetingRouter);

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// server.listen(port, () => {
//   console.log(`Server started on port ${port}`);
//   console.log(`Video signaling available at ws://localhost:${port}/video`);
// });

import mongoose from 'mongoose';
import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import path from "path";
import http from 'http';
import jwt from 'jsonwebtoken';
import { Server as SocketIOServer } from 'socket.io';
import { MongoClient } from 'mongodb';   // 🆕 for chatbot
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
app.use(
  cors({
    origin: [
      "https://08z4s4jn-3000.inc1.devtunnels.ms",
      "http://localhost:3000",
      "https://recreators-main.vercel.app",
    ],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

connectDB();

/* ============================================================
   🆕 CHATBOT SETUP (RAG — Hugging Face + Groq + MongoDB)
   ============================================================ */

// Native MongoDB client (separate from mongoose, but same DB)
let chatbotClient = null;
let chatbotDb = null;

async function getChatbotDb() {
  if (chatbotDb) return chatbotDb;
  if (!chatbotClient) {
    chatbotClient = new MongoClient(process.env.MONGO_URI);
    await chatbotClient.connect();
  }
  chatbotDb = chatbotClient.db('recreators');
  return chatbotDb;
}

// Hugging Face embedding
async function getEmbedding(text) {
  const res = await fetch('https://api.cohere.com/v1/embed', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      texts: [text],
      model: 'embed-english-light-v3.0',
      input_type: 'search_query',   // 👈 INDEXING MEIN 'search_document' THA, YAHAN 'search_query'
      truncate: 'END',
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    console.error('Cohere error:', data);
    throw new Error(data.message || 'Cohere failed');
  }
  return data.embeddings[0];
}

// Cosine similarity
function cosineSimilarity(a, b) {
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

// 🆕 Chatbot route
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message?.trim()) {
      return res.status(400).json({ answer: 'Please ask a question.' });
    }

    const db = await getChatbotDb();
    const col = db.collection('knowledge');
    const all = await col
      .find({}, { projection: { embedding: 1, text: 1, url: 1 } })
      .toArray();

    if (all.length === 0) {
      return res.json({
        answer: 'Knowledge base is empty. Run the indexing script first.',
      });
    }

    const queryEmb = await getEmbedding(message);
    const scored = all
      .map((doc) => ({ ...doc, score: cosineSimilarity(queryEmb, doc.embedding) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    const context = scored.map((d) => d.text).join('\n\n---\n\n');

const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'openai/gpt-oss-120b',
    messages: [
      {
        role: 'system',
        content: `You are the helpful assistant for ReCreators, a digital agency. Answer ONLY using the context below. If the answer isn't in the context, politely say you don't know and suggest contacting the team.

Context:
${context}`,
      },
      { role: 'user', content: message },
    ],
    temperature: 0.3,
    max_tokens: 500,
  }),
});

// 🆕 DEBUG LOGS — yeh add karo
console.log('🔍 Groq status:', groqRes.status);
const data = await groqRes.json();
console.log('🔍 Groq response:', JSON.stringify(data, null, 2));

if (!groqRes.ok) {
  console.error('❌ Groq API error:', data);
  return res.json({ 
    answer: `Groq error: ${data?.error?.message || 'Unknown'}` 
  });
}

const answer = data?.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.';
res.json({ answer });
  } catch (error) {
    console.error('❌ Chatbot error:', error);
    res.status(500).json({ answer: 'Something went wrong. Please try again.' });
  }
});

/* ============================================================
   END CHATBOT SETUP
   ============================================================ */

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
  console.log(`🤖 Chatbot available at http://localhost:${port}/api/chat`);
});

















