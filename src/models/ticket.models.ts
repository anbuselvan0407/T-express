import mongoose, { Document } from 'mongoose';

export interface ITicket extends Document {
  title: string;
  description: string;
  createdBy: string;
  status: string;      // lowercase 'string', not 'String'
  pdfBinary?: Buffer;  // optional if not always present
  createdAt?: Date;
  updatedAt?: Date;
}


const ticketSchema = new mongoose.Schema<ITicket>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdBy: { type: String, required: true }, // Store username or user id
 status: { type: String, default: 'inProgress', required: true },
  pdfBinary: Buffer ,

},{ timestamps: true });

export default mongoose.model<ITicket>('Ticket', ticketSchema);
