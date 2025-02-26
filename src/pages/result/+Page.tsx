import { useEffect } from "react";
import { navigate } from "vike/client/router";
import { useQuiz } from "@/contexts/QuizContext";
import ErrorAlert from "@/components/common/ErrorAlert";

export default function QuizResult() {
  const { session, resetQuiz, error, clearError } = useQuiz();

  useEffect(() => {
    if (!session?.isComplete) {
      navigate("/quiz");
      return;
    }
  }, [session]);

  const handleTryAgain = () => {
    resetQuiz();
    navigate("/");
  };

  if (!session?.isComplete) {
    return null;
  }

  const { questions, answers } = session;

  const correctAnswers = answers.filter((answer, index) => answer === questions[index].correctAnswer).length;

  const score = (correctAnswers / questions.length) * 100;

  return (
    <div className="flex justify-center items-center">
      {error && <ErrorAlert error={error} onRetry={clearError} onDismiss={clearError} />}
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Quiz Results</h2>
          <p>Score: {score.toFixed(2)}%</p>
          <p>Correct Answers: {correctAnswers}</p>
          <p>Total Questions: {questions.length}</p>
          <button className="btn btn-primary" onClick={handleTryAgain}>
            Try Again
          </button>
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Home
          </button>
        </div>
      </div>
    </div>
  );
}
