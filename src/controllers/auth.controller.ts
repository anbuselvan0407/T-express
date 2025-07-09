import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/auth.services';

export const signup = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const data = await registerUser(username, email, password);
    res.status(201).json({ message: 'User registered', user: data.user });
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const data = await loginUser(email, password);
    res.status(200).json({ message: 'Login successful', user: data.user, token: data.token });
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
};
