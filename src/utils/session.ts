import { QuizData, QuizPreference, QuizResults } from "@/types";

const SESSION_DURATION = 0.25 * 60 * 60 * 1000; // 15 mins
// TODO: implement different timings based on number of quiz selected

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
    if (this.isExpired(parsedSession)) {
      this.clearSession();
      return null;
    } else {
      return parsedSession;
    }
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

  clearSession(): void {
    localStorage.removeItem("currentQuiz");
  },

  saveRecommendation(recommendation: string): void {
    localStorage.setItem("recommendation", JSON.stringify(recommendation));
  },

  recoverRecommendation(): string {
    const savedRecommendation = localStorage.getItem("recommendation");
    if (!savedRecommendation) return "";
    return JSON.parse(savedRecommendation);
  },

  saveQuizResult(quizResult: QuizResults): void {
    localStorage.setItem("quizResult", JSON.stringify(quizResult));
  },

  recoverQuizResult(): QuizResults | null {
    const savedQuizResult = localStorage.getItem("quizResult");
    if (!savedQuizResult) return null;
    return JSON.parse(savedQuizResult);
  },

  clear(): void {
    localStorage.removeItem("currentQuiz");
    localStorage.removeItem("quizPreferences");
  },
};
