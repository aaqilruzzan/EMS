"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employees_1 = require("../controllers/employees");
const users_1 = require("../controllers/users");
const router = (0, express_1.Router)();
router.post("/createemp", employees_1.createEmployee);
router.post("/register", users_1.register);
router.post("/login", users_1.login);
router.get("/getemps", employees_1.getEmployees);
router.get("/getusers", users_1.getUsers);
router.get("/getempbyid/:id", employees_1.getEmployeeById);
router.get("/totalsalary", employees_1.totalsalary);
router.get("/getempcount", employees_1.getempcount);
router.get("/getusercount", users_1.getUserCount);
router.put("/updateemp/:id", employees_1.updateEmployee);
router.delete("/deleteemp/:id", employees_1.deleteEmployee);
exports.default = router;
