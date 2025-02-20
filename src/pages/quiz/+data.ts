import type { PageContextServer } from "vike/types";
import type { QuizOptions } from "../../types/index.js";

export type Data = Awaited<ReturnType<typeof data>>;

export const data = async (pageContext: PageContextServer) => {
  const { language, level, numberOfQuizzes } = pageContext.routeParams;

  const quizOptions: QuizOptions = {
    language,
    level,
    quizCounts: parseInt(numberOfQuizzes, 10),
  };

  // Here you would typically fetch quiz data based on the options
  // For now, we will return the options as a placeholder
  return quizOptions;
};
