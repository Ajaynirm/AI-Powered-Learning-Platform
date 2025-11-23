import { Router } from "express";
import { getUserSkillData } from "../controller/skill.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/get-skill", protect , getUserSkillData);

export default router;