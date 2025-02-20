import React, { useState } from "react";
import QuizForm from "../../components/QuizForm";
import Quiz from "../../components/Quiz";
import { QuizOptions } from "../../types";

export default function Page() {
  const [quizData, setQuizData] = useState<QuizOptions>({
    language: "",
    level: "",
    quizCounts: 0,
  });
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  const handleStartQuiz = (data: QuizOptions) => {
    setQuizData(data);
    setIsQuizStarted(true);
  };

  return (
    <div>
      <h1>Programming Quiz</h1>
      {!isQuizStarted ? <QuizForm onStartQuiz={handleStartQuiz} /> : <Quiz quizData={quizData} />}
    </div>
  );
}
