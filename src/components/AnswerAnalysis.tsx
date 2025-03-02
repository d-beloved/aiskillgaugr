import { FC } from "react";
import { QuizQuestion } from "@/types";

interface AnswerAnalysisProps {
  questions: QuizQuestion[];
  answers: string[];
}

const AnswerAnalysis: FC<AnswerAnalysisProps> = ({ questions, answers }) => {
  return (
    <div className="collapse-group space-y-2 animate-fade-in">
      {questions.map((question, index) => {
        const isCorrect = answers[index] === question.correctAnswer;
        const animationDelay = `${index * 100}ms`;

        return (
          <div
            key={index}
            className={`collapse collapse-arrow mb-2 border backdrop-blur-sm ${
              isCorrect
                ? "border-success/20 bg-success/10 hover:bg-success/20"
                : "border-error/20 bg-error/10 hover:bg-error/20"
            } transition-colors duration-300 animate-scale-in`}
            style={{ animationDelay }}
          >
            <input type="checkbox" />
            <div className="collapse-title flex items-center gap-3">
              <div className={`badge ${isCorrect ? "badge-success" : "badge-error"} gap-1 p-3`}>
                <span>{index + 1}</span>
                {isCorrect ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <span className="font-medium text-slate-100">{question.question}</span>
            </div>
            <div className="collapse-content animate-slide-up">
              <div className="mt-2 space-y-3 text-sm">
                <div className="flex flex-col gap-2">
                  <span className="text-slate-400">Your answer:</span>
                  <span className={`${isCorrect ? "text-success/90" : "text-error/90"} font-medium`}>
                    {answers[index]}
                  </span>
                </div>
                {!isCorrect && (
                  <div className="flex flex-col gap-2">
                    <span className="text-slate-400">Correct answer:</span>
                    <span className="text-success/90 font-medium">{question.correctAnswer}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AnswerAnalysis;
