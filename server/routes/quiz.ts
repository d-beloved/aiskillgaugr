import { Router } from "express";
import { generateQuizQuestions } from "../services/fetchAIQuestions";

const router = Router();

router.post("/quiz", generateQuizQuestions);

export default router;
