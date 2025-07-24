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
exports.loginUser = exports.registerUser = void 0;
const user_models_1 = __importDefault(require("../models/user.models"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("../utils/jwt");
const registerUser = (username, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield user_models_1.default.findOne({ email });
    if (existing)
        throw new Error('Email already exists');
    const hashed = yield bcryptjs_1.default.hash(password, 10);
    const user = new user_models_1.default({
        username,
        email,
        password: hashed,
        role: 'maintainer', // ✅ set role here
    });
    yield user.save();
    const token = (0, jwt_1.generateToken)({ id: user._id, email: user.email, role: user.role });
    return { user, token };
});
exports.registerUser = registerUser;
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_models_1.default.findOne({ email });
    if (!user)
        throw new Error('User not found');
    const isMatch = yield bcryptjs_1.default.compare(password, user.password);
    if (!isMatch)
        throw new Error('Invalid credentials');
    const token = (0, jwt_1.generateToken)({ id: user._id, email: user.email, username: user.username, role: user.role });
    return { user, token };
});
exports.loginUser = loginUser;
