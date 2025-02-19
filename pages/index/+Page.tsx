import React from "react";
import { Link } from "../../components/Link.js";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Welcome to the AI-Powered Quiz App</h1>
      <p className="text-lg mb-8">
        Select your programming language, level of competence, and number of quizzes to get started!
      </p>
      <div className="btn">
        <Link href="/quiz">Start Quiz</Link>
      </div>
    </div>
  );
}
