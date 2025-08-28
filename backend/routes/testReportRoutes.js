import { Router } from "express";
import generateTestReport from "../controller/testReportController.js";

const router = Router();

router.post("/generate-report", generateTestReport);

export default router;




