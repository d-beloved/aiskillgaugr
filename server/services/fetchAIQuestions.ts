import { HfInference } from "@huggingface/inference";
import { QuizQuestion } from "../../src/types";
import { TopicWeights } from "../../src/constants";

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

export const generateQuizQuestions = async (
  language: string,
  level: string,
  count: number,
): Promise<QuizQuestion[]> => {
  try {
    const topics = TopicWeights[language.toLowerCase()][level.toLowerCase()];

    const prompt = `Generate ${count} multiple choice questions for ${level} level ${language} programming.
    Focus on these topics with their respective weights: ${topics.map((t) => `${t.topic}(${t.weight})`).join(", ")}.
    
    For each question, provide:
    1. A clear question
    2. Four possible answers
    3. The correct answer
    4. The topic it belongs to
    
    Format each question as a JSON object with properties:
    {
      id: string,
      question: string,
      options: string[],
      correctAnswer: string,
      topic: string
    }
    Note that returned questions should be an array of JSON objects.`;

    const response = await hf.textGeneration({
      model: "google/gemma-2-2b-it",
      inputs: prompt,
      parameters: {
        max_new_tokens: 2048,
        temperature: 0.7,
        top_p: 0.95,
        return_full_text: false,
      },
    });

    const generatedQuestions: QuizQuestion[] = JSON.parse(response.generated_text);

    return generatedQuestions.map((question, index) => ({
      ...question,
      id: `${language.toLowerCase()}-${level.toLowerCase()}-${index + 1}`,
    }));
  } catch (error) {
    console.error("Error generating questions:", error);
    throw error;
  }
};
