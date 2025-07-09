import { Request, Response } from 'express';
import Ticket from '../models/ticket.models';

export const createTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description } = req.body;
    const createdBy = (req.user as any).username; // using attached user from authMiddleware

    const ticket = new Ticket({ title, description, createdBy });
    await ticket.save();

    res.status(201).json({ message: 'Ticket created successfully', ticket });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
export const getAllTickets = async (req: Request, res: Response): Promise<void> => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getTicketById = async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) return res.status(404).json({ error: 'Ticket not found' });
  res.json(ticket);
};

export const updateTicketStatus = async (req: Request, res: Response) => {
  const { status } = req.body;
  const ticket = await Ticket.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!ticket) return res.status(404).json({ error: 'Ticket not found' });
  res.json(ticket);
};


export const getTicketCounts = async (req: Request, res: Response) => {
  try {
    const totalCount = await Ticket.countDocuments();
    const inProgressCount = await Ticket.countDocuments({ status: 'In Progress' });
    const inReviewCount = await Ticket.countDocuments({ status: 'In Review' });
    const doneCount = await Ticket.countDocuments({ status: 'Done' });

    res.json({
      total: totalCount,
      inProgress: inProgressCount,
      inReview: inReviewCount,
      done: doneCount,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};