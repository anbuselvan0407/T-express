import express from 'express';
import { signup, login } from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import User from '../models/user.models';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', authMiddleware, (req, res) => {
  res.json({ message: 'This is protected', user: req.user });
});
// Get all users
router.get('/', authMiddleware, async (req, res) => {
  const users = await User.find({}, 'username email role');
  res.json(users);
});

// Update role
router.put('/:id/role', authMiddleware, async (req, res) => {
  const { role } = req.body;
  const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }
    return res.json(user);
});


export default router;
