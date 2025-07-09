import Ticket, { ITicket } from '../models/ticket.models';

export const createTicketService = async (title: string, description: string, createdBy: string) => {
  const ticket = new Ticket({
    title,
    description,
    createdBy,
  });

  await ticket.save();
  return ticket;
};

export const getAllTicketsService = async () => {
  return await Ticket.find();
};
