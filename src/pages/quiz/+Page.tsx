import { useEffect } from "react";
import { navigate } from "vike/client/router";
import { useQuiz } from "@/contexts/QuizContext";
import SessionWarning from "@/components/SessionWarning";
import ErrorAlert from "@/components/common/ErrorAlert";
import CacheStatus from "@/components/common/CacheStatus";

export default function Page() {
  const { session, quizPreferences, submitAnswer, isLoading, error, clearError } = useQuiz();

  useEffect(() => {
    if (!quizPreferences || !session) {
      navigate("/");
      return;
    }

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (session && !session.isComplete) {
        e.preventDefault();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [quizPreferences, session]);

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
      navigate("/result");
    }
  };

  const handleRetry = () => {
    clearError();
    switch (error?.type) {
      case "SESSION_EXPIRED":
        navigate("/");
        break;
      default:
        submitAnswer("", false);
        break;
    }
  };

  return (
    <div className="hero min-h-screen">
      <div>
        {error && <ErrorAlert error={error} onDismiss={clearError} onRetry={handleRetry} />}
        <SessionWarning />
        <CacheStatus />
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
