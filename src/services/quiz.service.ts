import { BaseQuestions } from "@/constants";
import { QuizQuestion } from "../types";

const API_URL = process.env.NODE_ENV === "production" ? "" : "http://localhost:3001";

const startQuiz = async (language: string, level: string, count: number) => {
  const initialQuizQuestions = getBaseQuestions(language, level);

  startQuizSession(initialQuizQuestions);

  try {
    const aiQuestions = await fetchAIQuestions(language, level, count - initialQuizQuestions.length);
    updateQuizSession(mergeQuestions(initialQuizQuestions, aiQuestions));
  } catch (error) {
    console.error("Failed to fetch AI questions, continuing with base questions");
  }
};

const getBaseQuestions = (language: string, level: string): QuizQuestion[] => {
  return BaseQuestions[language][level] || [];
};

const startQuizSession = (questions: QuizQuestion[]) => {
  localStorage.setItem(
    "currentQuiz",
    JSON.stringify({
      questions,
      currentIndex: 0,
      answers: {},
      timestamp: Date.now(),
    }),
  );
};

const updateQuizSession = (questions: QuizQuestion[]) => {
  const session = JSON.parse(localStorage.getItem("currentQuiz") || "{}");
  session.questions = questions;
  localStorage.setItem("currentQuiz", JSON.stringify(session));
};

const mergeQuestions = (base: QuizQuestion[], ai: QuizQuestion[]) => {
  // Ensure we don't have duplicate questions
  const combined = [...base];
  ai.forEach((question) => {
    if (!combined.find((q) => q.question === question.question)) {
      combined.push(question);
    }
  });
  return combined;
};

async function fetchAIQuestions(language: string, level: string, count: number): Promise<QuizQuestion[]> {
  try {
    const response = await fetch(`${API_URL}/api/quiz`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ language, level, count }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch questions");
    }

    const data = await response.json();
    return data.questions;
  } catch (error) {
    console.error("Error fetching AI questions:", error);
    return [];
  }
}

export default startQuiz;
