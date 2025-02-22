import { Languages, Levels, QuizCounts } from "@/constants";
import type { PageContextServer } from "vike/types";

export type Data = {
  languages: string[];
  levels: string[];
  quizCounts: number[];
};

export const data = async (pageContext: PageContextServer): Promise<Data> => {
  return {
    languages: Languages,
    levels: Levels,
    quizCounts: QuizCounts,
  };
};
