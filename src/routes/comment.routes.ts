import express from 'express';
import Comment from '../models/comment.model';

const router = express.Router();

// GET /api/comments/:ticketId → fetch comments for a ticket
router.get('/:ticketId', async (req, res) => {
  try {
    const comments = await Comment.find({ ticketId: req.params.ticketId }).sort({ createdAt: 1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

export default router;
