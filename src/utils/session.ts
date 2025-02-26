import { QuizData, QuizPreference } from "@/types";

const SESSION_DURATION = 1 * 60 * 1000; // 1 hour

export const sessionManager = {
  create(): Pick<QuizData, "timestamp" | "expiresIn" | "isExpired"> {
    return {
      timestamp: Date.now(),
      expiresIn: SESSION_DURATION,
      isExpired: false,
    };
  },

  isExpired(session: QuizData): boolean {
    return Date.now() - session.timestamp > session.expiresIn;
  },

  recoverSession(): QuizData | null {
    const savedSession = localStorage.getItem("currentQuiz");
    if (!savedSession) return null;

    const parsedSession = JSON.parse(savedSession) as QuizData;
    return this.isExpired(parsedSession) ? null : parsedSession;
  },

  recoverPreferences(): QuizPreference | null {
    const savedPreferences = localStorage.getItem("quizPreferences");
    if (!savedPreferences) return null;
    return JSON.parse(savedPreferences);
  },

  save(session: QuizData, preferences: QuizPreference): void {
    localStorage.setItem("currentQuiz", JSON.stringify(session));
    localStorage.setItem("quizPreferences", JSON.stringify(preferences));
  },

  updateSession(session: QuizData): void {
    localStorage.setItem("currentQuiz", JSON.stringify(session));
  },

  clear(): void {
    localStorage.removeItem("currentQuiz");
    localStorage.removeItem("quizPreferences");
  },
};
