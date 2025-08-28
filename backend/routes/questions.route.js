import { Router } from "express";
import { getQuestions } from "../controller/questions.controller.js"


const router = Router();


router.get("/questions/:topic/:difficulty",getQuestions);


export default router;