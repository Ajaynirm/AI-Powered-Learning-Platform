import { Router } from "express";
import { storeTestReport , getUserTestData, getSpecificReport} from "../controller/storeReportController.js";


const router = Router();

router.post("/send-report", storeTestReport);
// router.get("/get-report",getResults);

router.get("/get-user-test-data/:user_id",getUserTestData);
router.get("/get-test-report/:id",getSpecificReport);

export default router;




