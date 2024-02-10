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
exports.getUsers = exports.login = exports.register = void 0;
const app_1 = require("../../app");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        const response = yield app_1.client.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3)", [name, email, hashedPassword]);
        if (process.env.JWT_SECRET != undefined) {
            const token = jsonwebtoken_1.default.sign({ role: "admin" }, process.env.JWT_SECRET, {
                expiresIn: "1d",
            });
            res.status(201).json({
                message: "User Added Successfully",
                token,
            });
        }
        else {
            res.status(500).json({
                message: "Internal Server Error",
            });
        }
    }
    catch (error) {
        console.error("Error creating employee:", error);
        // Handle specific error cases
        if (error.code === "23505") {
            // Unique violation (assuming email is a unique constraint)
            return res.status(409).json({
                message: "Email address already exists. Please use a different email.",
            });
        }
        else {
            // Generic server error
            res.status(500).json({
                message: "Internal Server Error",
                error: error.message,
            });
        }
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const response = yield app_1.client.query("SELECT * FROM users WHERE email = $1", [email]);
        if (response.rows.length === 0) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        const user = response.rows[0];
        const validPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({
                message: "Invalid password",
            });
        }
        if (process.env.JWT_SECRET != undefined) {
            const token = jsonwebtoken_1.default.sign({ role: "admin" }, process.env.JWT_SECRET, {
                expiresIn: "1d",
            });
            res.status(200).json({
                message: "Login successful",
                token,
            });
        }
        else {
            res.status(500).json({
                message: "Internal Server Error",
            });
        }
    }
    catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
});
exports.login = login;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield app_1.client.query("SELECT * FROM users");
        if (response.rows.length === 0) {
            // If no records found, return a specific message or status code
            return res.status(404).json({
                message: "No user records found.",
            });
        }
        res.status(200).json(response.rows);
    }
    catch (error) {
        console.error("Error getting users:", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
});
exports.getUsers = getUsers;
