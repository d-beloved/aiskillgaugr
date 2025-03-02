import { useEffect } from "react";
import { navigate } from "vike/client/router";
import { useQuiz } from "@/contexts/QuizContext";
import SessionWarning from "@/components/SessionWarning";
import ErrorAlert from "@/components/common/ErrorAlert";
import CacheStatus from "@/components/common/CacheStatus";

export default function Page() {
  const { session, quizPreferences, submitAnswer, isLoading, error, clearError } = useQuiz();

  useEffect(() => {
    if (!session) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 1000);
      return () => clearTimeout(timer);
    }

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (session && !session.isComplete) {
        e.preventDefault();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [session]);

  if (isLoading || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  const { language, level, quizCount } = quizPreferences!;
  const { questions, currentIndex } = session;

  const currentQuestion = questions[currentIndex];
  const lastQuestion = currentIndex === questions.length - 1;

  const handleSubmitAnswer = async (answer: string) => {
    const shouldNavigate = await submitAnswer(answer, lastQuestion);
    if (shouldNavigate) {
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
    <div className="min-h-screen flex flex-col items-center p-4 animate-fade-in">
      <div className="w-full max-w-4xl">
        {error && <ErrorAlert error={error} onDismiss={clearError} onRetry={handleRetry} />}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <SessionWarning />
          <CacheStatus />
        </div>

        <div className="text-center mb-8 animate-slide-up">
          <h1 className="text-3xl font-bold text-white mb-2">
            {level} level {language} Quiz
          </h1>
          <h2 className="text-xl text-gray-300">
            Question {currentIndex + 1} of {questions.length}
          </h2>
        </div>

        <div className="card bg-slate-800/50 backdrop-blur shadow-xl p-6 w-full animate-scale-in">
          <div className="mb-8">
            <h3 className="text-xl text-white mb-4">{currentQuestion.question}</h3>
            <div className="grid gap-4">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  className="btn bg-slate-700/50 hover:bg-slate-600/50 text-left text-white p-4 
                           transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]
                           border border-slate-600/50 hover:border-slate-500/50"
                  onClick={() => handleSubmitAnswer(option)}
                >
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
