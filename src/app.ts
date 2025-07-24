import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/auth.routes';
import ticketRoutes from './routes/ticket.routes';
import path from 'path';

dotenv.config();

const app = express();
app.use(cors({
  origin: 'https://t-track2.web.app', // Your Angular app URL
  credentials: true
}));

app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/users', authRoutes);
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
