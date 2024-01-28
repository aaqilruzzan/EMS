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
exports.login = exports.getUsers = exports.register = exports.empcount = exports.totalsalary = exports.deleteEmployee = exports.updateEmployee = exports.getEmployeeById = exports.getEmployees = exports.createEmployee = void 0;
const app_1 = require("../../app");
const bcrypt_1 = __importDefault(require("bcrypt"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        const response = yield app_1.client.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3)", [name, email, hashedPassword]);
        res.status(201).json({
            message: "User Added Successfully",
        });
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
        res.status(200).json({
            message: "Login successful",
        });
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
const createEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, salary, address } = req.body;
    try {
        const response = yield app_1.client.query("INSERT INTO employee (name, email, salary, address) VALUES ($1, $2, $3, $4)", [name, email, salary, address]);
        res.status(201).json({
            message: "Employee Added Successfully",
        });
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
exports.createEmployee = createEmployee;
const getEmployees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield app_1.client.query("SELECT * FROM employee");
        if (response.rows.length === 0) {
            // If no records found, return a specific message or status code
            return res.status(404).json({
                message: "No employee records found.",
            });
        }
        res.status(200).json(response.rows);
    }
    catch (error) {
        console.error("Error getting employees:", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
});
exports.getEmployees = getEmployees;
const getEmployeeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const response = yield app_1.client.query("SELECT * FROM employee WHERE emp_id = $1", [id]);
        if (response.rows.length === 0) {
            // If no records found, return a specific message or status code
            return res.status(404).json({
                message: "No employee records found.",
            });
        }
        res.status(200).json(response.rows);
    }
    catch (error) {
        console.error("Error getting employees:", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
});
exports.getEmployeeById = getEmployeeById;
const updateEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, email, salary, address } = req.body;
    try {
        const response = yield app_1.client.query("UPDATE employee SET name = $1, email = $2, salary = $3, address = $4 WHERE emp_id = $5", [name, email, salary, address, id]);
        if (response.rowCount === 0) {
            // If no records found, return a specific message or status code
            return res.status(404).json({
                message: "No employee records found.",
            });
        }
        res.status(200).json({
            message: "Employee updated successfully",
        });
    }
    catch (error) {
        console.error("Error getting employees:", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
});
exports.updateEmployee = updateEmployee;
const deleteEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const response = yield app_1.client.query("DELETE FROM employee WHERE emp_id = $1", [id]);
        if (response.rowCount === 0) {
            // If no records found, return a specific message or status code
            return res.status(404).json({
                message: "No employee records found.",
            });
        }
        res.status(200).json({
            message: "Employee deleted successfully",
        });
    }
    catch (error) {
        console.error("Error getting employees:", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
});
exports.deleteEmployee = deleteEmployee;
const totalsalary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield app_1.client.query("SELECT SUM(salary) FROM employee");
        if (response.rows.length === 0) {
            // If no records found, return a specific message or status code
            return res.status(404).json({
                message: "No employee records found.",
            });
        }
        res.status(200).json(response.rows);
    }
    catch (error) {
        console.error("Error getting employees:", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
});
exports.totalsalary = totalsalary;
const empcount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield app_1.client.query("SELECT COUNT(emp_id) AS employee_count FROM employee");
        if (response.rows.length === 0) {
            // If no records found, return a specific message or status code
            return res.status(404).json({
                message: "No employee records found.",
            });
        }
        res.status(200).json(response.rows);
    }
    catch (error) {
        console.error("Error getting employees:", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
});
exports.empcount = empcount;
