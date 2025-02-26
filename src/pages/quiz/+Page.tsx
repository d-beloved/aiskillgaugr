import { useEffect } from "react";
import { navigate } from "vike/client/router";
import { useQuiz } from "@/contexts/QuizContext";

export default function Page() {
  const { session, quizPreferences, submitAnswer, isLoading } = useQuiz();

  useEffect(() => {
    if (!quizPreferences || !session) {
      navigate("/");
      return;
    }
  }, [quizPreferences, session]);

  if (isLoading || !quizPreferences || !session) {
    return <div className="loading loading-spinner"></div>;
  }

  const { language, level, quizCount } = quizPreferences;
  const { questions, currentIndex } = session;

  const currentQuestion = questions[currentIndex];
  const lastQuestion = currentIndex === questions.length - 1;

  const handleSubmitAnswer = (answer: string) => {
    submitAnswer(answer, lastQuestion);
    if (lastQuestion) {
      navigate("/result");
    }
  };
  return (
    <div className="hero min-h-screen">
      <div>
        <h1>
          {level} level {language} Quiz
        </h1>
        <h2>You have signed up to do {quizCount} questions</h2>
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Question {currentIndex + 1}</h2>
            <p>{currentQuestion.question}</p>
            <div className="flex flex-col gap-2">
              {currentQuestion.options.map((option, index) => (
                <button key={index} className="btn btn-primary" onClick={() => handleSubmitAnswer(option)}>
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
