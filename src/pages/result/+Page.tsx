import { useEffect, useState } from "react";
import { navigate } from "vike/client/router";
import { useQuiz } from "@/contexts/QuizContext";
import ErrorAlert from "@/components/common/ErrorAlert";
import { QuizData } from "@/types";

export default function QuizResult() {
  const { quizPreferences, session, resetQuiz, error, clearError, isLoading, recommendation, getRecommendation } =
    useQuiz();
  const [currentSession, setCurrentSession] = useState<QuizData | null>(session);
  const [score, setScore] = useState<number>(0);
  const [scorePercent, setScorePercent] = useState<number>(0);

  const { questions, answers } = currentSession!;

  useEffect(() => {
    if (!session?.isComplete) {
      navigate("/quiz");
      return;
    }
    const numOfCorrectAnsSelected = answers.filter((answer, index) => answer === questions[index].correctAnswer).length;
    setScore(numOfCorrectAnsSelected);
    setScorePercent((numOfCorrectAnsSelected / questions.length) * 100);
  }, [session]);

  const handleNewSession = () => {
    resetQuiz();
    navigate("/");
  };

  if (!session?.isComplete) {
    return null;
  }

  const handleGetRecommendation = () => {
    getRecommendation(quizPreferences!, questions, answers, score);
  };

  const AIRecommendation = () => {
    return <p>{recommendation}</p>;
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
          <p>Score: {scorePercent.toFixed(2)}%</p>
          <p>Correct Answers: {score}</p>
          <p>Total Questions: {questions.length}</p>
          <button className="btn btn-primary" onClick={handleNewSession}>
            Start New Quiz
          </button>
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Home
          </button>
        </div>
      </div>
      {correctAnswersCard()}
    </div>
  );
}
