import { Router } from "express";
import { storeTestReport , getUserTestData, getSpecificReport} from "../controller/storeReportController.js";
import { ProtectRoute } from "../middleware/ProtectRoute.js";

const router = Router();

router.post("/send-report",ProtectRoute, storeTestReport);

router.get("/get-user-test-data",ProtectRoute, getUserTestData);
router.get("/get-test-report/:id",ProtectRoute, getSpecificReport);

export default router;







