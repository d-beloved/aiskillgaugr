import { useState } from "react";
import ErrorAlert from "@/components/common/ErrorAlert";
import QuizOptionsModal from "@/components/QuizOptionsModal";
import { useQuiz } from "@/contexts/QuizContext";
import { navigate } from "vike/client/router";

export default function Page() {
  const { error, clearError, quizResult, recommendation } = useQuiz();
  const [showQuizOptions, setShowQuizOptions] = useState<boolean>(false);

  const hasAResult = !!quizResult || !!recommendation;

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <div className="max-w-4xl w-full px-4">
        {error && <ErrorAlert error={error} onRetry={clearError} onDismiss={clearError} />}
        <div className="text-center space-y-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white animate-fade-in">Gauge Your Skill Level</h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-300">Get AI Recommendations For Upskilling</h2>
          <p className="text-xl text-gray-400">Select a language and level to start the quiz</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            {hasAResult && (
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
              {hasAResult ? "Start New Quiz" : "Start Quiz"}
            </button>
          </div>
        </div>
      </div>
      {showQuizOptions && <QuizOptionsModal showModal={showQuizOptions} onClose={() => setShowQuizOptions(false)} />}
    </div>
  );
}
