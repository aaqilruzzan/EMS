import { Router } from "express";
import {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  totalsalary,
  empcount,
} from "../controllers/employees";
import { register, login, getUsers } from "../controllers/users";

const router: Router = Router();

router.post("/createemp", createEmployee);
router.post("/register", register);
router.post("/login", login);
router.get("/getemps", getEmployees);
router.get("/getusers", getUsers);
router.get("/getempbyid/:id", getEmployeeById);
router.get("/totalsalary", totalsalary);
router.get("/empcount", empcount);
router.put("/updateemp/:id", updateEmployee);
router.delete("/deleteemp/:id", deleteEmployee);

export default router;
