import React, { useEffect, useState } from "react";
import { navigate } from "vike/client/router";
import { QuizData, QuizPreference } from "../types";

interface QuizProps {
  onComplete: (score: number) => void;
}

const QuizQuestions: React.FC<QuizProps> = ({ onComplete }) => {
  const [quizPreferences, setQuizPreferences] = useState<QuizPreference>({
    language: "",
    level: "",
    quizCount: "",
  });
  const [quiz, setQuiz] = useState<QuizData>({
    questions: [],
    currentIndex: 0,
    answers: [],
    timestamp: Date.now(),
  });

  useEffect(() => {
    const quizPreferencesString = localStorage.getItem("quizPreferences");
    const currentQuizString = localStorage.getItem("currentQuiz");
    if (!quizPreferencesString) {
      navigate("/");
      return;
    }

    setQuizPreferences(JSON.parse(quizPreferencesString));
    setQuiz(JSON.parse(currentQuizString!));
  }, []);

  const { language, level, quizCount } = quizPreferences;
  const { questions, currentIndex: currentQuestionIndex, answers } = quiz;

  const calculateScore = () => {
    const score = answers.filter((answer, index) => answer === questions![index].correctAnswer).length;
    onComplete((score / questions.length) * 100);
  };

  const ongoingQuiz = currentQuestionIndex < questions!.length - 1;
  const lastQuestion = currentQuestionIndex === questions!.length - 1;

  return (
    <div>
      <h1>
        {level} level {language} Quiz
      </h1>
      <h2>{quizCount} questions</h2>
      <h2>{questions![currentQuestionIndex]?.question}</h2>
      <ul>
        {questions![currentQuestionIndex]?.options.map((option, index) => (
          <li key={index}>
            <button
              className="btn btn-info w-full text-left mb-2 text-lg active:bg-accent active:text-accent-content"
              key={index}
              onClick={() => setQuiz({ ...quiz, answers: [...answers, option] })}
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
      {ongoingQuiz && (
        <button
          className="btn btn-primary"
          onClick={() => setQuiz({ ...quiz, currentIndex: currentQuestionIndex + 1 })}
        >
          Next
        </button>
      )}
      {lastQuestion && (
        <button className="btn btn-primary" type="submit" onClick={calculateScore}>
          Submit
        </button>
      )}
    </div>
  );
};

export default QuizQuestions;
