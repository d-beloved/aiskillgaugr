import { BaseQuestions } from "@/constants";
import { QuizPreference, QuizQuestion } from "../types";

const API_URL = process.env.NODE_ENV === "production" ? "" : "http://localhost:3001";
const CACHE_DURATION = 48 * 60 * 60 * 1000; // 48 hours

export const getCachedQuestions = (preferences: QuizPreference): QuizQuestion[] | null => {
  const cacheKey = `quiz-cache-${preferences.language}-${preferences.level}`;
  const cachedData = localStorage.getItem(cacheKey);

  if (!cachedData) return null;

  const { questions, timestamp } = JSON.parse(cachedData);
  const isValid = Date.now() - timestamp < CACHE_DURATION;

  return isValid ? questions : null;
};

export const cacheQuestions = (preferences: QuizPreference, questions: QuizQuestion[]) => {
  const cacheKey = `quiz-cache-${preferences.language}-${preferences.level}`;
  const data = {
    questions,
    timestamp: Date.now(),
  };
  localStorage.setItem(cacheKey, JSON.stringify(data));
};

export const startQuiz = async (language: string, level: string, count: number): Promise<QuizQuestion[]> => {
  const preferences = { language, level, quizCount: count.toString() };
  const cachedQuestions = getCachedQuestions(preferences);

  if (cachedQuestions) {
    return cachedQuestions;
  }

  const lang = language.toLowerCase();
  const lvl = level.toLowerCase();
  const initialQuizQuestions = getBaseQuestions(lang, lvl);

  try {
    const aiQuestions = await fetchAIQuestions(language, level, count - initialQuizQuestions.length);
    const combinedQuestions = mergeQuestions(initialQuizQuestions, aiQuestions);

    // cache the questions for 48 hours to reduce API calls and token usage, also improving the app performance
    cacheQuestions(preferences, combinedQuestions);

    return combinedQuestions;
  } catch (error) {
    console.error("Failed to fetch AI questions, continuing with base questions");
    return initialQuizQuestions;
  }
};

const getBaseQuestions = (language: string, level: string): QuizQuestion[] => {
  return BaseQuestions[language][level] || [];
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
