import { useEffect, useState } from "react";
import { navigate } from "vike/client/router";
import { useQuiz } from "@/contexts/QuizContext";
import SessionWarning from "@/components/SessionWarning";
import ErrorAlert from "@/components/common/ErrorAlert";
import CacheStatus from "@/components/common/CacheStatus";
import ProgressWarning from "@/components/common/ProgressWarning";

export default function Page() {
  const { session, quizPreferences, submitAnswer, isLoading, error, clearError } = useQuiz();
  const [showProgressWarning, setShowProgressWarning] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);

  useEffect(() => {
    if (!quizPreferences || !session) {
      handleNavigation("/");
      return;
    }
  }, [quizPreferences, session]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (session && !session.isComplete) {
        e.preventDefault();
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [session]);

  const handleNavigation = (path: string) => {
    if (session && !session.isComplete) {
      setShowProgressWarning(true);
      setPendingNavigation(path);
    } else {
      navigate(path);
    }
  };

  const handleContinueNavigation = () => {
    if (pendingNavigation) {
      navigate(pendingNavigation);
    }
    setShowProgressWarning(false);
    setPendingNavigation(null);
  };

  const handleCancelNavigation = () => {
    setShowProgressWarning(false);
    setPendingNavigation(null);
  };

  if (isLoading || !quizPreferences || !session) {
    return <div className="loading loading-spinner"></div>;
  }

  const { language, level, quizCount } = quizPreferences;
  const { questions, currentIndex } = session;

  const currentQuestion = questions[currentIndex];
  const lastQuestion = currentIndex === questions.length - 1;

  const handleSubmitAnswer = (answer: string) => {
    submitAnswer(answer, lastQuestion);
    if (lastQuestion) {
      handleNavigation("/result");
    }
  };

  const handleRetry = () => {
    clearError();
    switch (error?.type) {
      case "SESSION_EXPIRED":
        handleNavigation("/");
        break;
      default:
        submitAnswer("", false);
        break;
    }
  };

  return (
    <div className="hero min-h-screen">
      {error && <ErrorAlert error={error} onDismiss={clearError} onRetry={handleRetry} />}
      {showProgressWarning && (
        <ProgressWarning onContinue={handleContinueNavigation} onCancel={handleCancelNavigation} />
      )}
      <SessionWarning />
      <CacheStatus />
      <div>
        <h1>
          {level} level {language} Quiz
        </h1>
        <h2>You have signed up to do {quizCount} questions</h2>
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Question {currentIndex + 1}</h2>
            <p>{currentQuestion.question}</p>
            <div className="flex flex-col gap-2">
              {currentQuestion.options.map((option, index) => (
                <button key={index} className="btn btn-primary" onClick={() => handleSubmitAnswer(option)}>
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
