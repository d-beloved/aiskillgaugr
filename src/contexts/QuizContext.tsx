import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchAIRecommendations, startQuiz } from "@/services/quiz.service";
import { AppError, QuizContextType, QuizData, QuizPreference, QuizQuestion, QuizResults, RecoveredData } from "@/types";
import { sessionManager } from "@/utils/session";
import { event } from "@/utils/analytics";

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [quizPreferences, setPreferences] = useState<QuizPreference | null>(null);
  const [session, setSession] = useState<QuizData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AppError | null>(null);
  const [recommendation, setRecommendation] = useState<string>("");
  const [quizResult, setQuizResult] = useState<QuizResults | null>(null);

  // Check for existing sessions and data on mount
  useEffect(() => {
    const recovered: RecoveredData = {
      session: sessionManager.recoverSession(),
      preferences: sessionManager.recoverPreferences(),
      recommendation: sessionManager.recoverRecommendation(),
      result: sessionManager.recoverQuizResult(),
    };

    const setters = {
      session: setSession,
      preferences: setPreferences,
      recommendation: setRecommendation,
      result: setQuizResult,
    } as const;

    Object.entries(recovered).forEach(([key, value]) => {
      if (value) {
        const setter = setters[key as keyof typeof setters];
        setter(value);
      }
    });
  }, []);

  const clearError = () => setError(null);

  const startNewQuiz = async (prefs: QuizPreference) => {
    event({ action: "start_quiz", category: "Quiz", label: `${prefs.language}-${prefs.level}-${prefs.quizCount}` });
    const { language, level, quizCount } = prefs;
    setIsLoading(true);
    setError(null);
    if (quizResult) resetQuiz();
    try {
      const questions = await startQuiz(language, level, +quizCount);
      const newSession = {
        questions,
        currentIndex: 0,
        answers: [],
        isComplete: false,
        ...sessionManager.create(quizCount, questions.length),
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

  const submitAnswer = async (answer: string, isLastQuestion: boolean): Promise<boolean> => {
    if (!session) return false;

    const newAnswers = [...session.answers, answer];
    const newSession = {
      ...session,
      answers: newAnswers,
      currentIndex: session.currentIndex + 1,
      isComplete: isLastQuestion,
    };

    setSession(newSession);
    sessionManager.updateSession(newSession);

    if (isLastQuestion) {
      const { language, level, quizCount } = quizPreferences!;
      event({ action: "complete_quiz", category: "Quiz", label: `${language}-${level}-${quizCount}` });
      const { answers, questions } = newSession;
      const quizScore = answers.filter((a, index) => a === questions[index].correctAnswer).length;
      const scorePercent = ((quizScore / questions.length) * 100).toFixed(2);

      const newQuizResults = {
        questions,
        answers,
        score: quizScore,
        scorePercentage: `${scorePercent}%`,
      };

      setQuizResult(newQuizResults);
      sessionManager.saveQuizResult(newQuizResults);
      return true;
    }
    return false;
  };

  const resetQuiz = () => {
    setSession(null);
    setPreferences(null);
    setQuizResult(null);
    setRecommendation("");
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
      event({
        action: "get_recommendation",
        category: "quiz_result",
        label: `${prefs.language}-${prefs.level}-${prefs.quizCount}`,
        value: score,
      });
      const AIRecommendation = await fetchAIRecommendations(prefs, questions, answers, score);
      setRecommendation(AIRecommendation);
      sessionManager.saveRecommendation(AIRecommendation);
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
        quizResult,
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
