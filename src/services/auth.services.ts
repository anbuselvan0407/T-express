import User, { IUser } from '../models/user.models';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt';

export const registerUser = async (username: string, email: string, password: string) => {
  const existing = await User.findOne({ email });
  if (existing) throw new Error('Email already exists');

  const hashed = await bcrypt.hash(password, 10);
  const user = new User({
    username,
    email,
    password: hashed,
    role: 'maintainer', // ✅ set role here
  });
  await user.save();

  const token = generateToken({ id: user._id, email: user.email, role: user.role });
  return { user, token };
};


export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = generateToken({ id: user._id, email: user.email,username: user.username, role: user.role });

  return { user, token };
};
