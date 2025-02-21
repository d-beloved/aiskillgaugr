import { Router } from "express";
import { generateQuizQuestions } from "../services/fetchAIQuestions";

const router = Router();

router.post("/quiz", async (req, res) => {
  try {
    const { language, level, count } = req.body;

    if (!language || !level || !count) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const questions = await generateQuizQuestions(language, level, count);
    res.json({ questions });
    return;
  } catch (error) {
    console.error("error in generating questions", error);
    res.status(500).json({ error: "Failed to generate questions" });
    return;
  }
});

export default router;
