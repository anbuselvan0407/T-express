import express from 'express';
import {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicketStatus,
  getTicketCounts
} from '../controllers/ticket.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/', authMiddleware, createTicket);
router.get('/counts', authMiddleware, getTicketCounts); // ✅ Move above :id
router.get('/', authMiddleware, getAllTickets);
router.get('/:id', authMiddleware, getTicketById);
router.put('/:id', authMiddleware, updateTicketStatus);

export default router;
