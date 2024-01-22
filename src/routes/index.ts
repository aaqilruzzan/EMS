import { Router } from "express";
import { createEmployee } from "../controllers/employees";

const router: Router = Router();

router.post("/createemp", createEmployee);

export default router;
