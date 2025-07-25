import { Server, Socket } from 'socket.io';
import Comment from '../models/comment.model';

interface CommentPayload {
  ticketId: string;
  user: string;
  message: string;
}

export default function commentSocketHandler(io: Server, socket: Socket): void {
  socket.on('joinTicketRoom', (ticketId: string) => {
    socket.join(ticketId);
    console.log(`✅ Joined ticket room: ${ticketId}`);
  });

  socket.on('newComment', async (data: CommentPayload) => {
    try {
      const comment = new Comment({
        ticketId: data.ticketId,
        user: data.user,
        message: data.message
      });

      const saved = await comment.save();
      io.to(data.ticketId).emit('commentAdded', saved);
    } catch (err) {
      console.error('❌ Error saving comment:', err);
    }
  });
}
