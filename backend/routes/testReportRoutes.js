import { Router } from "express";
import generateTestReport from "../controller/testReportController.js";
import { requireAuth } from "@clerk/express";

const router = Router();

router.post("/generate-report", requireAuth() , generateTestReport);

export default router;




