import { Router } from "express";
import generateTestReport from "../controller/testReportController.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/generate-report", protect , generateTestReport);

export default router;




