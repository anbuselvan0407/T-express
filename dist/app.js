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
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'https://t-track2.web.app', // Your Angular app URL
    credentials: true
}));
app.use(express_1.default.json());
(0, db_1.default)();
app.use('/api/auth', auth_routes_1.default);
app.use('/api/tickets', ticket_routes_1.default);
app.use('/api/users', auth_routes_1.default);
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
