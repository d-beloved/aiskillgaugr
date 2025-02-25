import React, { createContext, useContext, useState, useEffect } from "react";
import { startQuiz } from "@/services/quiz.service";
import { QuizContextType, QuizData, QuizPreference } from "@/types";

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [quizPreferences, setPreferences] = useState<QuizPreference | null>(null);
  const [session, setSession] = useState<QuizData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const savedSession = localStorage.getItem("currentQuiz");
    const savedPreferences = localStorage.getItem("quizPreferences");

    if (savedSession && savedPreferences) {
      const parsedSession = JSON.parse(savedSession);
      const parsedPreferences = JSON.parse(savedPreferences);

      // Check if session is still valid (within 2 hours)
      const isValid = Date.now() - parsedSession.timestamp < 2 * 60 * 60 * 1000;

      if (isValid) {
        setSession(parsedSession);
        setPreferences(parsedPreferences);
      }
    }
  }, []);

  const startNewQuiz = async (prefs: QuizPreference) => {
    const { language, level, quizCount } = prefs;
    setIsLoading(true);
    setError(null);
    try {
      const questions = await startQuiz(language, level, +quizCount);
      setPreferences(prefs);
      setSession({
        questions,
        currentIndex: 0,
        answers: [],
        timestamp: Date.now(),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to start quiz");
    } finally {
      setIsLoading(false);
    }
  };

  const submitAnswer = (answer: string) => {
    if (!session) return;

    const newAnswers = [...session.answers, answer];
    const newSession = {
      ...session,
      answers: newAnswers,
      currentIndex: session.currentIndex + 1,
    };

    setSession(newSession);
    localStorage.setItem("currentQuiz", JSON.stringify(newSession));
  };

  const resetQuiz = () => {
    setSession(null);
    setPreferences(null);
    localStorage.removeItem("currentQuiz");
    localStorage.removeItem("quizPreferences");
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
