import type { PageContextServer } from "vike/types";

export type Data = {
  languages: string[];
  levels: string[];
  quizCounts: number[];
};

export const data = async (pageContext: PageContextServer): Promise<Data> => {
  const languages = ["JavaScript", "Typescript", "Python", "Java", "C++", "Ruby"];
  const levels = ["Beginner", "Intermediate", "Advanced"];
  const quizCounts = [10, 20, 30];

  return {
    languages,
    levels,
    quizCounts,
  };
};
