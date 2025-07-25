import mongoose, { Document, Schema } from 'mongoose';

export interface IComment extends Document {
  ticketId: string;
  user: string;
  message: string;
  createdAt: Date;
}

const commentSchema: Schema = new Schema<IComment>({
  ticketId: { type: String, required: true },
  user: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Comment = mongoose.model<IComment>('Comment', commentSchema);
export default Comment;
