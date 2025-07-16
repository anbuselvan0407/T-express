import { Request, Response } from 'express';
import Ticket from '../models/ticket.models';
import multer from 'multer';
import path from 'path';
import { RequestHandler } from 'express';

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
    // Parse page and limit from query
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    // Calculate skip
    const skip = (page - 1) * limit;

    // Fetch paginated tickets
       // 👇 Add sort by createdAt (descending)
    const tickets = await Ticket.find()
      .sort({ createdAt: -1 }) // Newest first
      .skip(skip)
      .limit(limit);

    
    // Get total tickets count
    const total = await Ticket.countDocuments();

    res.status(200).json({
      tickets,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


export const getTicketById: RequestHandler = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      res.status(404).json({ error: 'Ticket not found' });
      return;
    }
    res.json(ticket);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// export const updateTicketStatus = async (req: Request, res: Response) => {
//   const { status } = req.body;
//   const ticket = await Ticket.findByIdAndUpdate(req.params.id, { status }, { new: true });
//   if (!ticket) return res.status(404).json({ error: 'Ticket not found' });
//   res.json(ticket);
// };


export const updateTicketStatus: RequestHandler = async (req: Request, res: Response) => {
  
  try{
    const { status } = req.body;
  const ticket = await Ticket.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!ticket) {
    res.status(404).json({ error: 'Ticket not found' });
    return ;
  }
  res.json(ticket);
}catch(error:any){
  res.status(500).json({error:error.message})
}

};

export const updateTicketDetails = async (req: Request, res: Response) => {
  
  const { title, description } = req.body;
  const ticket = await Ticket.findByIdAndUpdate(
    req.params.id,
    { title, description },
    { new: true }
  );
  if (!ticket) {
    res.status(404).json({ error: 'Ticket not found' });
    return;
  }
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

// Setup multer

const storage = multer.memoryStorage();

export const upload = multer({ storage: storage }).single('pdf');

export const uploadPdf: RequestHandler = async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' });
      return ;
    }

    const ticketId = req.params.id;

    const ticket = await Ticket.findByIdAndUpdate(
      ticketId,
      { pdfBinary: req.file.buffer }, // <--- Store buffer directly
      { new: true }
    );

    if (!ticket) {
      res.status(404).json({ error: 'Ticket not found' });
      return;
    }

    res.json({ message: 'PDF uploaded successfully and stored as binary', ticket });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


export const getPdf: RequestHandler = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket || !ticket.pdfBinary) {
      res.status(404).json({ error: 'PDF not found' });
      return;
    }

    res.contentType('application/pdf');
    res.send(ticket.pdfBinary);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
