import Quiz from "@/components/QuizQuestions";

export default function Page() {
  const handleCompleteQuiz = (score: number) => {
    console.log(`Your score is ${score}%`);
    alert(`Your score is ${score}%`);
  };

  return (
    <div className="hero min-h-screen">
      <Quiz onComplete={handleCompleteQuiz} />
    </div>
  );
}
