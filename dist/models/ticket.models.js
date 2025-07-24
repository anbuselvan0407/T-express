"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ticketSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: { type: String, required: true }, // Store username or user id
    status: { type: String, default: 'inProgress', required: true },
    pdfBinary: Buffer,
}, { timestamps: true });
exports.default = mongoose_1.default.model('Ticket', ticketSchema);
