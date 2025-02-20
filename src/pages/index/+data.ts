import { BaseQuestions, Languages, Levels, QuizCounts, TopicWeights } from "@/constants";
import { LevelQuestions, LevelTopics } from "@/types";
import type { PageContextServer } from "vike/types";

export type Data = {
  languages: string[];
  levels: string[];
  quizCounts: number[];
  baseQuestions: {
    [language: string]: LevelQuestions;
  };
  topicWeights: {
    [language: string]: LevelTopics;
  };
};

export const data = async (pageContext: PageContextServer): Promise<Data> => {
  return {
    languages: Languages,
    levels: Levels,
    quizCounts: QuizCounts,
    baseQuestions: BaseQuestions,
    topicWeights: TopicWeights,
  };
};
