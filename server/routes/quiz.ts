import { Request, Response, Router } from "express";
import { generateQuizQuestions } from "../services/fetchAIQuestions.js";
import { getRecommendation } from "../services/fetchAIRecmndtn.js";

const router = Router();

router.post("/quiz", generateQuizQuestions);
router.post("/recommendation", getRecommendation);

router.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

export default router;
