import express from 'express';
import {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicketStatus,
  getTicketCounts,
  uploadPdf,
  updateTicketDetails,getPdf
} from '../controllers/ticket.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { upload } from '../controllers/ticket.controller'; // import multer setup

const router = express.Router();

router.post('/', authMiddleware, createTicket);
router.get('/counts', authMiddleware, getTicketCounts);
router.get('/', authMiddleware, getAllTickets);
router.get('/:id', authMiddleware, getTicketById);
router.put('/:id', authMiddleware, updateTicketStatus);

// ✅ New route for uploading PDF
router.post('/:id/upload-pdf', authMiddleware, upload, uploadPdf);
router.get('/:id/pdf', getPdf);

router.put('/:id/details', authMiddleware, updateTicketDetails);
export default router;
