import { QuizQuestion, TopicWeight } from "../../src/types";
import { TopicWeights } from "../../src/constants/index.js";
import { Request, Response } from "express";
import { sendPrompt } from "../utils/sendPrompt.js";

export const generateQuizQuestions = async (req: Request, res: Response) => {
  const { language, level, count } = req.body;

  if (!language || !level || !count) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  if (!process.env.HUGGING_FACE_API_KEY) {
    throw new Error("HuggingFace API key is not configured");
  }

  try {
    const topics = TopicWeights[language.toLowerCase()][level.toLowerCase()];

    const prompt = `Generate ${count} multiple choice questions for ${level} level ${language} programming.
    Focus on these topics with their respective weights: ${topics.map((t: TopicWeight) => `${t.topic}(${t.weight})`).join(", ")}.
    
    Return a pure JSON array of questions without any additional text, comments, or markdown formatting.
      Each question should have this exact format:
      {
        "id": string,
        "question": string,
        "options": string[],
        "correctAnswer": string,
        "topic": string
      }

      Example of expected response format:
      [
        {
          "id": "1",
          "question": "What is...",
          "options": ["a", "b", "c", "d"],
          "correctAnswer": "b",
          "topic": "Variables"
        }
      ]`;

    const response = await sendPrompt(prompt);

    let cleanText = response.generated_text
      .trim()
      .replace(/^```(javascript|json|python|java|kotlin|typescript)\s*|\s*```$/gm, "")
      .replace(/^const\s+questions\s+=\s+/m, "")
      .replace(/`([^`]+)`/g, (match, code) => {
        return code.replace(/"/g, '\\"');
      })
      .trim();

    // Extract the array portion if multiple arrays are present
    const arrayMatch = cleanText.match(/\[[\s\S]*\]/);
    if (!arrayMatch) {
      throw new Error("No valid JSON array found in response");
    }

    try {
      const questions = JSON.parse(arrayMatch[0]);
      const formattedQuestions = questions.map((question: QuizQuestion, index: number) => ({
        ...question,
        id: `${language.toLowerCase()}-${level.toLowerCase()}-${index + 1}`,
      }));

      res.json({ questions: formattedQuestions });
    } catch (parseError) {
      // If direct parsing fails, try cleaning the string
      const cleanedString = arrayMatch[0]
        .replace(/\\"/g, '"')
        .replace(/\\/g, "")
        .replace(/"([^"]*)"/g, (_, content) => `"${content.replace(/"/g, '\\"')}"`);

      try {
        const questions = JSON.parse(cleanedString);
        const formattedQuestions = questions.map((question: QuizQuestion, index: number) => ({
          ...question,
          id: `${language.toLowerCase()}-${level.toLowerCase()}-${index + 1}`,
        }));

        res.json({ questions: formattedQuestions });
      } catch (secondParseError) {
        console.error("Second JSON Parse Error:", secondParseError, "trying to parse:", cleanedString);
        throw new Error("Failed to parse questions after cleaning");
      }
    }
  } catch (error) {
    console.error("Error generating questions:", error);
    res.status(500).json({
      error: "Failed to generate questions",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
