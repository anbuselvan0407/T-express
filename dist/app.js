"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const ticket_routes_1 = __importDefault(require("./routes/ticket.routes"));
const comment_routes_1 = __importDefault(require("./routes/comment.routes")); // optional: if you expose comment GET API
const path_1 = __importDefault(require("path"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const comment_socket_1 = __importDefault(require("./sockets/comment.socket"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: 'https://t-track2.web.app',
        methods: ['GET', 'POST'],
        credentials: true
    }
});
app.use((0, cors_1.default)({
    origin: 'https://t-track2.web.app',
    credentials: true
}));
app.use(express_1.default.json());
(0, db_1.default)();
app.use('/api/auth', auth_routes_1.default);
app.use('/api/tickets', ticket_routes_1.default);
app.use('/api/comments', comment_routes_1.default); // if you're using REST for comment fetch
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
// Socket.IO handler
io.on('connection', (socket) => {
    console.log('🟢 Socket connected:', socket.id);
    (0, comment_socket_1.default)(io, socket);
});
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
