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
exports.default = commentSocketHandler;
const comment_model_1 = __importDefault(require("../models/comment.model"));
function commentSocketHandler(io, socket) {
    socket.on('joinTicketRoom', (ticketId) => {
        socket.join(ticketId);
        console.log(`✅ Joined ticket room: ${ticketId}`);
    });
    socket.on('newComment', (data) => __awaiter(this, void 0, void 0, function* () {
        try {
            const comment = new comment_model_1.default({
                ticketId: data.ticketId,
                user: data.user,
                message: data.message
            });
            const saved = yield comment.save();
            io.to(data.ticketId).emit('commentAdded', saved);
        }
        catch (err) {
            console.error('❌ Error saving comment:', err);
        }
    }));
}
