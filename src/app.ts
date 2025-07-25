import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/auth.routes';
import ticketRoutes from './routes/ticket.routes';
import commentRoutes from './routes/comment.routes'; // optional: if you expose comment GET API
import path from 'path';
import http from 'http';
import { Server } from 'socket.io';
import commentSocketHandler from './sockets/comment.socket';

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'https://t-track2.web.app',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

app.use(cors({
  origin: 'https://t-track2.web.app',
  credentials: true
}));
app.use(express.json());
connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/comments', commentRoutes); // if you're using REST for comment fetch
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Socket.IO handler
io.on('connection', (socket) => {
  console.log('🟢 Socket connected:', socket.id);
  commentSocketHandler(io, socket);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
