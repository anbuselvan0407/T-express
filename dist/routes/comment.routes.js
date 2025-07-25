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
const express_1 = __importDefault(require("express"));
const comment_model_1 = __importDefault(require("../models/comment.model"));
const router = express_1.default.Router();
// GET /api/comments/:ticketId → fetch comments for a ticket
router.get('/:ticketId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comments = yield comment_model_1.default.find({ ticketId: req.params.ticketId }).sort({ createdAt: 1 });
        res.json(comments);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch comments' });
    }
}));
exports.default = router;
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ticketId, user, message } = req.body;
        if (!ticketId || !user || !message) {
            res.status(400).json({ error: 'Missing required fields' });
            return;
        }
        const comment = new comment_model_1.default({ ticketId, user, message });
        const saved = yield comment.save();
        res.status(201).json(saved);
    }
    catch (err) {
        console.error('Error saving comment:', err);
        res.status(500).json({ error: 'Failed to save comment' });
    }
}));
