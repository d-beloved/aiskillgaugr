import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchAIRecommendations, startQuiz } from "@/services/quiz.service";
import { AppError, QuizContextType, QuizData, QuizPreference, QuizQuestion } from "@/types";
import { sessionManager } from "@/utils/session";

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [quizPreferences, setPreferences] = useState<QuizPreference | null>(null);
  const [session, setSession] = useState<QuizData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AppError | null>(null);
  const [recommendation, setRecommendation] = useState<string>("");

  // Check for existing session on mount
  useEffect(() => {
    const recoveredSession = sessionManager.recoverSession();

    if (recoveredSession) {
      setSession(recoveredSession);
      const preferences = sessionManager.recoverPreferences();
      if (preferences) {
        setPreferences(preferences);
      }
    }

    const recoveredRecommendation = sessionManager.recoverRecommendation();
    if (recoveredRecommendation) {
      setRecommendation(recoveredRecommendation);
    }
  }, []);

  const clearError = () => setError(null);

  const startNewQuiz = async (prefs: QuizPreference) => {
    const { language, level, quizCount } = prefs;
    setIsLoading(true);
    setError(null);
    try {
      const questions = await startQuiz(language, level, +quizCount);
      const newSession = {
        questions,
        currentIndex: 0,
        answers: [],
        isComplete: false,
        ...sessionManager.create(),
      };
      setSession(newSession);
      setPreferences(prefs);
      sessionManager.save(newSession, prefs);
    } catch (err) {
      setError({
        type: "API_ERROR",
        message: "Failed to start quiz",
        details: err instanceof Error ? err.message : "Unknown error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const submitAnswer = (answer: string, isComplete: boolean) => {
    if (!session) return;

    const newAnswers = [...session.answers, answer];
    const newSession = {
      ...session,
      answers: newAnswers,
      currentIndex: session.currentIndex + 1,
      isComplete,
    };

    setSession(newSession);
    sessionManager.updateSession(newSession);
  };

  const resetQuiz = () => {
    setSession(null);
    setPreferences(null);
    sessionManager.clear();
  };

  const getRecommendation = async (
    prefs: QuizPreference,
    questions: QuizQuestion[],
    answers: string[],
    score: number,
  ) => {
    setIsLoading(true);
    try {
      const AIRecommendation = await fetchAIRecommendations(prefs, questions, answers, score);
      setRecommendation(AIRecommendation);
      sessionManager.setRecommendation(AIRecommendation);
    } catch (err) {
      setError({
        type: "API_ERROR",
        message: "Failed to get recommendation",
        details: err instanceof Error ? err.message : "Unknown error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <QuizContext.Provider
      value={{
        quizPreferences,
        session,
        setPreferences,
        startNewQuiz,
        submitAnswer,
        resetQuiz,
        isLoading,
        error,
        clearError,
        getRecommendation,
        recommendation,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
};
