import { BaseQuestions } from "@/constants";
import { QuizQuestion, QuizPreference } from "../types";
import { cacheManager } from "@/utils/cache";

const API_URL = process.env.NODE_ENV === "production" ? "/api" : "http://localhost:3001/api";
const VERCEL_TIMEOUT = 9000;
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const startQuiz = async (language: string, level: string, count: number): Promise<QuizQuestion[]> => {
  const preferences = { language, level, quizCount: count.toString() };
  const cachedQuestions = cacheManager.get(preferences);

  if (cachedQuestions) {
    return cachedQuestions.questions;
  }

  const lang = language.toLowerCase();
  const lvl = level.toLowerCase();
  const initialQuizQuestions = getBaseQuestions(lang, lvl);

  try {
    const aiQuestions = await fetchAIQuestions(language, level, count - initialQuizQuestions.length);
    const combinedQuestions = mergeQuestions(initialQuizQuestions, aiQuestions);

    // cache the questions for 48 hours to reduce API calls and token usage, also improving the app performance
    cacheManager.set(preferences, combinedQuestions);

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

async function fetchWithTimeout(url: string, options: RequestInit): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), VERCEL_TIMEOUT);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        throw new Error("Request timed out");
      }
    }
    throw error;
  }
}

export async function fetchWithRetry<T>(fn: () => Promise<T>, retries = 3, delay = 1000): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0) {
      await wait(delay);
      return fetchWithRetry(fn, retries - 1, delay * 1.5);
    }
    throw error;
  }
}

async function fetchAIQuestions(language: string, level: string, count: number): Promise<QuizQuestion[]> {
  try {
    return await fetchWithRetry(async () => {
      const response = await fetchWithTimeout(`${API_URL}/quiz`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ language, level, count }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch questions: ${response.status}`);
      }

      const data = await response.json();
      return data.questions;
    });
  } catch (error) {
    console.error("Error fetching AI questions:", error instanceof Error ? error.message : "Unknown error");
    return [];
  }
}

export const fetchAIRecommendations = async (
  preferences: QuizPreference,
  questions: QuizQuestion[],
  answers: string[],
  score: number,
): Promise<string> => {
  try {
    return await fetchWithRetry(async () => {
      const response = await fetchWithTimeout(`${API_URL}/recommendation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ preferences, questions, answers, score }),
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch recommendation: ${response.status}`);
      }

      const data = await response.json();
      return data.recommendation;
    });
  } catch (error) {
    console.error("Error fetching recommendation:", error instanceof Error ? error.message : "Unknown error");
    throw new Error("Failed to get recommendation, please try again");
  }
};
