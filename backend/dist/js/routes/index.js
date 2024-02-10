"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employees_1 = require("../controllers/employees");
const router = (0, express_1.Router)();
router.post("/createemp", employees_1.createEmployee);
router.post("/register", employees_1.register);
router.post("/login", employees_1.login);
router.get("/getemps", employees_1.getEmployees);
router.get("/getusers", employees_1.getUsers);
router.get("/getempbyid/:id", employees_1.getEmployeeById);
router.get("/totalsalary", employees_1.totalsalary);
router.get("/empcount", employees_1.empcount);
router.put("/updateemp/:id", employees_1.updateEmployee);
router.delete("/deleteemp/:id", employees_1.deleteEmployee);
exports.default = router;