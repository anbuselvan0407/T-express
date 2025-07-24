"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPdf = exports.uploadPdf = exports.upload = exports.getTicketCounts = exports.updateTicketDetails = exports.updateTicketStatus = exports.getTicketById = exports.getAllTickets = exports.createTicket = void 0;
const ticket_models_1 = __importDefault(require("../models/ticket.models"));
const multer_1 = __importDefault(require("multer"));
const createTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        const createdBy = req.user.username; // using attached user from authMiddleware
        const ticket = new ticket_models_1.default({ title, description, createdBy });
        yield ticket.save();
        res.status(201).json({ message: 'Ticket created successfully', ticket });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createTicket = createTicket;
const getAllTickets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Parse page and limit from query
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        // Calculate skip
        const skip = (page - 1) * limit;
        // Fetch paginated tickets
        // 👇 Add sort by createdAt (descending)
        const tickets = yield ticket_models_1.default.find()
            .sort({ createdAt: -1 }) // Newest first
            .skip(skip)
            .limit(limit);
        // Get total tickets count
        const total = yield ticket_models_1.default.countDocuments();
        res.status(200).json({
            tickets,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getAllTickets = getAllTickets;
const getTicketById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ticket = yield ticket_models_1.default.findById(req.params.id);
        if (!ticket) {
            res.status(404).json({ error: 'Ticket not found' });
            return;
        }
        res.json(ticket);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getTicketById = getTicketById;
// export const updateTicketStatus = async (req: Request, res: Response) => {
//   const { status } = req.body;
//   const ticket = await Ticket.findByIdAndUpdate(req.params.id, { status }, { new: true });
//   if (!ticket) return res.status(404).json({ error: 'Ticket not found' });
//   res.json(ticket);
// };
const updateTicketStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status } = req.body;
        const ticket = yield ticket_models_1.default.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!ticket) {
            res.status(404).json({ error: 'Ticket not found' });
            return;
        }
        res.json(ticket);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updateTicketStatus = updateTicketStatus;
const updateTicketDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description } = req.body;
    const ticket = yield ticket_models_1.default.findByIdAndUpdate(req.params.id, { title, description }, { new: true });
    if (!ticket) {
        res.status(404).json({ error: 'Ticket not found' });
        return;
    }
    res.json(ticket);
});
exports.updateTicketDetails = updateTicketDetails;
const getTicketCounts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalCount = yield ticket_models_1.default.countDocuments();
        const inProgressCount = yield ticket_models_1.default.countDocuments({ status: 'In Progress' });
        const inReviewCount = yield ticket_models_1.default.countDocuments({ status: 'In Review' });
        const doneCount = yield ticket_models_1.default.countDocuments({ status: 'Done' });
        res.json({
            total: totalCount,
            inProgress: inProgressCount,
            inReview: inReviewCount,
            done: doneCount,
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getTicketCounts = getTicketCounts;
// Setup multer
const storage = multer_1.default.memoryStorage();
exports.upload = (0, multer_1.default)({ storage: storage }).single('pdf');
const uploadPdf = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            res.status(400).json({ error: 'No file uploaded' });
            return;
        }
        const ticketId = req.params.id;
        const ticket = yield ticket_models_1.default.findByIdAndUpdate(ticketId, { pdfBinary: req.file.buffer }, // <--- Store buffer directly
        { new: true });
        if (!ticket) {
            res.status(404).json({ error: 'Ticket not found' });
            return;
        }
        res.json({ message: 'PDF uploaded successfully and stored as binary', ticket });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.uploadPdf = uploadPdf;
const getPdf = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ticket = yield ticket_models_1.default.findById(req.params.id);
        if (!ticket || !ticket.pdfBinary) {
            res.status(404).json({ error: 'PDF not found' });
            return;
        }
        res.contentType('application/pdf');
        res.send(ticket.pdfBinary);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getPdf = getPdf;
