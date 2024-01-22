"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employees_1 = require("../controllers/employees");
const router = (0, express_1.Router)();
router.post("/createemp", employees_1.createEmployee);
exports.default = router;
