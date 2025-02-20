import { Quiz, Question } from "../types";

const API_BASE_URL = "https://api.example.com"; // Replace with your actual API endpoint

export async function fetchQuizzes(language: string, level: string, numberOfQuizzes: number): Promise<Quiz[]> {
  const response = await fetch(`${API_BASE_URL}/quizzes?language=${language}&level=${level}&count=${numberOfQuizzes}`);

  if (!response.ok) {
    throw new Error("Failed to fetch quizzes");
  }

  const data = await response.json();
  return data.quizzes as Quiz[];
}

export async function submitQuizResults(results: { quizId: string; score: number }): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/results`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(results),
  });

  if (!response.ok) {
    throw new Error("Failed to submit results");
  }
}
