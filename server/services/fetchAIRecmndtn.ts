import { QuizQuestion } from "../../src/types";
import { Request, Response } from "express";
import { sendPrompt } from "../routes/utils/sendPrompt";

export const getRecommendation = async (req: Request, res: Response) => {
  const { preferences, questions, answers, score } = req.body;

  if (!preferences || !questions || !answers || score) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  if (!process.env.HUGGING_FACE_API_KEY) {
    throw new Error("HuggingFace API key is not configured");
  }

  try {
    const questionDetails = (questions as QuizQuestion[]).map((q, index) => {
      return { qstn: q.question, corrAns: q.correctAnswer, topic: q.topic, myAns: (answers as string[])[index] };
    });

    const prompt = `I have completed a quiz on ${preferences.level} level ${preferences.language} programming.
    I got a score of ${score} out of ${questions.length} questions.
    Here is the detail of my attempt: ${questionDetails}.
    I would like to get some recommendations to improve my skills.
    Return a pure JSON object with a key "recommendation" that contains the recommendation.
    Be kind and constructive.`;

    const response = await sendPrompt(prompt);

    const data = JSON.parse(response.generated_text);
    res.json(data.recommendation);
  } catch (error) {
    console.error("Error fetching recommendation:", error);
    res.status(500).json({
      error: "Failed to fetch recommendation",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
