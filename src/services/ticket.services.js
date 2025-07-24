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
exports.getAllTicketsService = exports.createTicketService = void 0;
const ticket_models_1 = __importDefault(require("../models/ticket.models"));
const createTicketService = (title, description, createdBy) => __awaiter(void 0, void 0, void 0, function* () {
    const ticket = new ticket_models_1.default({
        title,
        description,
        createdBy,
    });
    yield ticket.save();
    return ticket;
});
exports.createTicketService = createTicketService;
const getAllTicketsService = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield ticket_models_1.default.find();
});
exports.getAllTicketsService = getAllTicketsService;
