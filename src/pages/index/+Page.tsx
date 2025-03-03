import { useState } from "react";
import ErrorAlert from "@/components/common/ErrorAlert";
import QuizOptionsModal from "@/components/QuizOptionsModal";
import { useQuiz } from "@/contexts/QuizContext";
import { navigate } from "vike/client/router";

export default function Page() {
  const { error, clearError, quizResult } = useQuiz();
  const [showQuizOptions, setShowQuizOptions] = useState<boolean>(false);

  const renderButton = () => {
    return (
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 animate-slide-up">
        {quizResult && (
          <button
            className="btn btn-primary btn-lg hover:scale-105 transition-transform"
            onClick={() => navigate("/result")}
          >
            View Result
          </button>
        )}
        <button
          className="btn btn-secondary btn-lg hover:scale-105 transition-transform"
          onClick={() => setShowQuizOptions(true)}
        >
          {quizResult ? "Start New Quiz" : "Start Quiz"}
        </button>
      </div>
    );
  };

  return (
    <div className="flex justify-center items-center min-h-[75vh] animate-fade-in">
      <div className="max-w-4xl w-full px-4">
        {error && <ErrorAlert error={error} onRetry={clearError} onDismiss={clearError} />}
        <div className="text-center space-y-8">
          <h1 className="text-5xl md:text-6xl md:pb-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary animate-slide-up">
            Gauge Your Skill Level
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-300 animate-slide-up">
            Get AI Recommendations For Upskilling
          </h2>
          <p className="text-xl font-bold text-slate-400 animate-slide-up">
            Select a language and level to start the quiz
          </p>
          {renderButton()}
        </div>
      </div>
      {showQuizOptions && <QuizOptionsModal showModal={showQuizOptions} onClose={() => setShowQuizOptions(false)} />}
    </div>
  );
}
