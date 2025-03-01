import { FC } from "react";
import { QuizQuestion } from "@/types";

interface AnswerAnalysisProps {
  questions: QuizQuestion[];
  answers: string[];
}

const AnswerAnalysis: FC<AnswerAnalysisProps> = ({ questions, answers }) => {
  return (
    <div className="collapse-group">
      {questions.map((question, index) => {
        const isCorrect = answers[index] === question.correctAnswer;

        return (
          <div
            key={index}
            className={`collapse collapse-arrow mb-2 border ${
              isCorrect ? "border-success/20 bg-success/10" : "border-error/20 bg-error/10"
            }`}
          >
            <input type="checkbox" />
            <div className="collapse-title flex items-center gap-2">
              <div className={`badge ${isCorrect ? "badge-success" : "badge-error"} gap-1`}>
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
              <span className="font-medium">{question.question}</span>
            </div>
            <div className="collapse-content">
              <div className="mt-2 space-y-2 text-sm">
                <div className="flex flex-col gap-1">
                  <span className="text-gray-400">Your answer:</span>
                  <span className={isCorrect ? "text-success" : "text-error"}>{answers[index]}</span>
                </div>
                {!isCorrect && (
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-400">Correct answer:</span>
                    <span className="text-success">{question.correctAnswer}</span>
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
