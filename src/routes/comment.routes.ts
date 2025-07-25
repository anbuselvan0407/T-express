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



router.post('/', async (req, res) => {
    try {
        const { ticketId, user, message } = req.body;

    if (!ticketId || !user || !message) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
    }
    
    const comment = new Comment({ ticketId, user, message });
    const saved = await comment.save();
    
    res.status(201).json(saved);
} catch (err) {
    console.error('Error saving comment:', err);
    res.status(500).json({ error: 'Failed to save comment' });
}
});

export default router;