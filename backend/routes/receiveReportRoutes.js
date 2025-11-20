import { Router } from "express";
import { storeTestReport , getUserTestData, getSpecificReport} from "../controller/storeReportController.js";
import { protect } from "../middleware/auth.middleware.js";


const router = Router();

router.post("/send-report", protect, storeTestReport);

router.get("/get-user-test-data", protect, getUserTestData);
router.get("/get-test-report/:id", protect, getSpecificReport);

export default router;




