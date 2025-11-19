import express from "express";
import { checkAuth, receiveNewUserFromClerk} from "../controller/auth.controller.js";
import { ProtectRoute } from "../middleware/ProtectRoute.js";

const router = express.Router();



router.get("/check",ProtectRoute, checkAuth);
router.post("/webhook/new-user", receiveNewUserFromClerk);


export default router;



