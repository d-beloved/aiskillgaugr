import React from "react";
import QuizResult from "../../components/QuizResult";
import Recommendation from "../../components/Recommendation";
import { useData } from "vike-react/useData";
import type { Data } from "./+data";

export default function Page() {
  const data = useData<Data>();

  return (
    <div>
      <h1>Quiz Results</h1>
      <QuizResult score={data.score} feedback={data.feedback} totalQuestions={data.totalQuestions} />
      <Recommendation recommendations={data.recommendations} />
    </div>
  );
}
