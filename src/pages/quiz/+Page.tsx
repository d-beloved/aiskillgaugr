import { useState } from "react";
import QuizQuestions from "@/components/QuizQuestions";
import QuizResult from "@/components/QuizResult";

export default function Page() {
  const [score, setScore] = useState<string>("");
  const [showResult, setShowResult] = useState<boolean>(false);

  const handleCompleteQuiz = (score: number) => {
    setScore(`${score}%`);
    // setShowResult(true);
    alert(`You scored ${score}%`);
  };

  return (
    <div className="hero min-h-screen">
      <QuizQuestions onComplete={handleCompleteQuiz} />
      {showResult && <QuizResult score={score} showModal={showResult} />}
    </div>
  );
}
