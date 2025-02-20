import React, { useState } from "react";
import { Question } from "../types";

interface QuizProps {
  quizData: { language: string; level: string; quizCounts: number };
  questions?: Question[];
  onComplete: (score: number) => void;
}

const Quiz: React.FC<QuizProps> = ({ questions, onComplete, quizData }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleAnswer = (answer: string) => {
    setAnswers([...answers, answer]);
    if (currentQuestionIndex < questions!.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const score = calculateScore();
      onComplete(score);
    }
  };

  const calculateScore = () => {
    return answers.filter((answer, index) => answer === questions![index].correctAnswer).length;
  };

  return (
    <div>
      <h2>{questions![currentQuestionIndex].text}</h2>
      <div>
        {questions![currentQuestionIndex].options.map((option, index) => (
          <button key={index} onClick={() => handleAnswer(option)}>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
