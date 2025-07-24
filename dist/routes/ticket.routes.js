"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ticket_controller_1 = require("../controllers/ticket.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const ticket_controller_2 = require("../controllers/ticket.controller"); // import multer setup
const router = express_1.default.Router();
router.post('/', auth_middleware_1.authMiddleware, ticket_controller_1.createTicket);
router.get('/counts', auth_middleware_1.authMiddleware, ticket_controller_1.getTicketCounts);
router.get('/', auth_middleware_1.authMiddleware, ticket_controller_1.getAllTickets);
router.get('/:id', auth_middleware_1.authMiddleware, ticket_controller_1.getTicketById);
router.put('/:id', auth_middleware_1.authMiddleware, ticket_controller_1.updateTicketStatus);
// ✅ New route for uploading PDF
router.post('/:id/upload-pdf', auth_middleware_1.authMiddleware, ticket_controller_2.upload, ticket_controller_1.uploadPdf);
router.get('/:id/pdf', ticket_controller_1.getPdf);
router.put('/:id/details', auth_middleware_1.authMiddleware, ticket_controller_1.updateTicketDetails);
exports.default = router;
