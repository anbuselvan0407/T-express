import mongoose, { Document } from 'mongoose';

export interface ITicket extends Document {
  title: string;
  description: string;
  createdBy: string;
  status: String;
}

const ticketSchema = new mongoose.Schema<ITicket>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdBy: { type: String, required: true }, // Store username or user id
 status: { type: String, default: 'inProgress', required: true },
});

export default mongoose.model<ITicket>('Ticket', ticketSchema);
