import express from "express";
import { checkAuth } from "../controller/auth.controller.js";
import { ProtectRoute } from "../middleware/ProtectRoute.js";

const router = express.Router();



router.get("/check",ProtectRoute, checkAuth);

export default router;



