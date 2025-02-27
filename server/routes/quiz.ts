import { Router } from "express";
import { generateQuizQuestions } from "../services/fetchAIQuestions";
import { getRecommendation } from "../services/fetchAIRecmndtn";

const router = Router();

router.post("/quiz", generateQuizQuestions);
router.post("/recommendation", getRecommendation);

export default router;
