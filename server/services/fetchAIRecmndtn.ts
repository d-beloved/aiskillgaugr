import { QuizQuestion } from "../../src/types";
import { Request, Response } from "express";
import { sendPrompt } from "../utils/sendPrompt.js";

export const getRecommendation = async (req: Request, res: Response) => {
  const { preferences, questions, answers, score } = req.body;

  if (!preferences || !questions || !answers || score == null) {
    res.status(400).json({ error: "Missing the required fields" });
    return;
  }

  if (!process.env.HUGGING_FACE_API_KEY) {
    throw new Error("HuggingFace API key is not configured");
  }

  try {
    const questionDetails = (questions as QuizQuestion[]).map((q, index) => {
      return { qstn: q.question, corrAns: q.correctAnswer, topic: q.topic, myAns: (answers as string[])[index] };
    });

    const prompt = `Based on a ${preferences.level} level ${preferences.language} programming quiz where I scored ${score}/${questions.length}, 
    analyzing these attempts: ${questionDetails}, provide a structured learning recommendation for me.
    
    Format your response as a markdown string with these sections:
    1. A brief performance assessment
    2. Key areas for improvement based on wrong answers
    3. Specific topics to focus on
    4. Recommended learning resources (include 2-3 specific resources with links)
    5. Practice suggestions
    
    Keep the tone encouraging and constructive. Do not ask questions or include interactive elements.`;

    const response = await sendPrompt(prompt);

    // Handle potential non-markdown responses
    let recommendation = response.generated_text;

    if (recommendation.includes("{") || recommendation.includes("}")) {
      try {
        const parsed = JSON.parse(recommendation);
        recommendation = parsed.recommendation || parsed.text || parsed.response;
      } catch (parseError) {
        // If JSON parsing fails, strip JSON-like syntax and use the raw text
        recommendation = recommendation.replace(/[{"}]/g, "");
      }
    }

    res.json({ recommendation });
  } catch (error) {
    console.error("Error fetching recommendation:", error);
    res.status(500).json({
      error: "Failed to fetch recommendation",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
