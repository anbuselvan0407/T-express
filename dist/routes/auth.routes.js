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
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const user_models_1 = __importDefault(require("../models/user.models"));
const router = express_1.default.Router();
router.post('/signup', auth_controller_1.signup);
router.post('/login', auth_controller_1.login);
router.get('/profile', auth_middleware_1.authMiddleware, (req, res) => {
    res.json({ message: 'This is protected', user: req.user });
});
// Get all users
router.get('/', auth_middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_models_1.default.find({}, 'username email role');
    res.json(users);
}));
// Update role
router.put('/:id/role', auth_middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { role } = req.body;
    const user = yield user_models_1.default.findByIdAndUpdate(req.params.id, { role }, { new: true });
    if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
    }
    res.json(user);
    return;
}));
exports.default = router;
