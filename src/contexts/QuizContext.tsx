import React, { createContext, useContext, useState, useEffect } from "react";
import { startQuiz } from "@/services/quiz.service";
import { QuizContextType, QuizData, QuizPreference } from "@/types";
import { sessionManager } from "@/utils/session";

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [quizPreferences, setPreferences] = useState<QuizPreference | null>(null);
  const [session, setSession] = useState<QuizData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
  }, []);

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
      setError(err instanceof Error ? err.message : "Failed to start quiz");
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
