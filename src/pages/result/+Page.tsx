import { useEffect, useState } from "react";
import { navigate } from "vike/client/router";
import { useQuiz } from "@/contexts/QuizContext";
import ErrorAlert from "@/components/common/ErrorAlert";
import AnswerAnalysis from "@/components/AnswerAnalysis";

export default function QuizResult() {
  const { quizPreferences, quizResult, error, clearError, isLoading, recommendation, getRecommendation } = useQuiz();
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    if (!quizResult) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setShowLoading(false);
    }
  }, [quizResult]);

  if (!quizResult || showLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  const { questions, answers, score, scorePercentage } = quizResult;

  const handleGetRecommendation = () => {
    getRecommendation(quizPreferences!, questions, answers, score);
  };

  return (
    <div className="min-h-screen flex justify-center p-4 animate-fade-in">
      <div className="w-full max-w-4xl space-y-8">
        {error && <ErrorAlert error={error} onRetry={clearError} onDismiss={clearError} />}

        <div className="card bg-slate-800/50 backdrop-blur shadow-xl p-6 animate-slide-up">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Quiz Results</h2>
            <div className="stats stats-vertical lg:stats-horizontal shadow bg-slate-700/50">
              <div className="stat">
                <div className="stat-title text-slate-300">Score</div>
                <div className="stat-value text-primary">{scorePercentage}</div>
              </div>
              <div className="stat">
                <div className="stat-title text-slate-300">Correct Answers</div>
                <div className="stat-value text-success">{score}</div>
              </div>
              <div className="stat">
                <div className="stat-title text-slate-300">Total Questions</div>
                <div className="stat-value text-slate-100">{questions.length}</div>
              </div>
            </div>
          </div>

          {!recommendation && (
            <button
              className="btn btn-primary animate-pulse-slow hover:animate-none sm:w-1/2 md:w-[38%] lg:w-[29%] w-full mb-4 self-center"
              onClick={handleGetRecommendation}
            >
              {isLoading ? <span className="loading loading-spinner"></span> : "Get Expert Assessment"}
            </button>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn btn-secondary" onClick={() => navigate("/")}>
              Go Home
            </button>
          </div>
        </div>

        {recommendation && (
          <div className="card bg-slate-800/50 backdrop-blur shadow-xl p-6 animate-scale-in">
            <h3 className="text-2xl font-bold text-white mb-4">AI Recommendations</h3>
            <p className="text-slate-300">{recommendation}</p>
          </div>
        )}

        <div className="space-y-4 animate-slide-up">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-white">Detailed Analysis</h3>
            <div className="flex gap-2">
              <span className="badge badge-success gap-1">
                {answers.filter((a, i) => a === questions[i].correctAnswer).length} Correct
              </span>
              <span className="badge badge-error gap-1">
                {answers.filter((a, i) => a !== questions[i].correctAnswer).length} Wrong
              </span>
            </div>
          </div>
          <AnswerAnalysis questions={questions} answers={answers} />
        </div>
      </div>
    </div>
  );
}
