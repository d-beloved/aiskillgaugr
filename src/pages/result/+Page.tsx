import { useEffect, useState } from "react";
import { navigate } from "vike/client/router";
import { useQuiz } from "@/contexts/QuizContext";
import ErrorAlert from "@/components/common/ErrorAlert";

export default function QuizResult() {
  const { quizPreferences, quizResult, resetQuiz, error, clearError, isLoading, recommendation, getRecommendation } =
    useQuiz();
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
    return <div className="loading loading-spinner"></div>;
  }

  const { questions, answers, score, scorePercentage } = quizResult;

  const handleNewSession = () => {
    resetQuiz();
    navigate("/");
  };

  const handleGetRecommendation = () => {
    getRecommendation(quizPreferences!, questions, answers, score);
  };

  const AIRecommendation = () => {
    return (
      <div className="card w-96 bg-base-100 shadow-xl">
        <p>{recommendation}</p>
      </div>
    );
  };

  const correctAnswersCard = () => {
    return questions.map((question, index) => (
      <div key={index} className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Question {index + 1}:</h2>
          <p>{question.question}</p>
          <p>Selected Answer: {answers[index]}</p>
          <p>Correct Answer: {question.correctAnswer}</p>
        </div>
      </div>
    ));
  };

  return (
    <div className="flex justify-center items-center">
      {error && <ErrorAlert error={error} onRetry={clearError} onDismiss={clearError} />}
      <div className="card w-96 bg-base-100 shadow-xl">
        {!recommendation && (
          <button className="btn btn-soft" onClick={handleGetRecommendation}>
            {isLoading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Get Expert Assessment and Recommendations"
            )}
          </button>
        )}
        {recommendation && AIRecommendation()}
        <div className="card-body">
          <h2 className="card-title">Quiz Results</h2>
          <p>Score: {scorePercentage}</p>
          <p>Correct Answers: {score}</p>
          <p>Total Questions: {questions.length}</p>
          <button className="btn btn-primary" onClick={handleNewSession}>
            Start New Quiz
            {/* Todo: Add an info icon (or a modal that pops up after clicking it) that explains that this will start a new session erasing your previous answers,
                preferences and recommendations if available.
            */}
          </button>
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Go Home
          </button>
        </div>
      </div>
      {correctAnswersCard()}
    </div>
  );
}
