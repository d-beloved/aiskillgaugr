import React from "react";

interface QuizResultProps {
  score: number;
  totalQuestions: number;
  feedback: string;
}

const QuizResult: React.FC<QuizResultProps> = ({ score, totalQuestions, feedback }) => {
  return (
    <div className="quiz-result">
      <h2>Your Results</h2>
      <p>
        You scored {score} out of {totalQuestions}.
      </p>
      <p>{feedback}</p>
    </div>
  );
};

export default QuizResult;
