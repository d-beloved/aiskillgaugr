import type { PageContextServer } from "vike/types";
import type { Result } from "../../types";
import { useConfig } from "vike-react/useConfig";

export type Data = Awaited<ReturnType<typeof data>>;

export const data = async (pageContext: PageContextServer) => {
  const config = useConfig();

  const { score, recommendations, totalQuestions } = pageContext.routeParams;

  config({
    title: "Quiz Results",
  });

  return { score, feedback, totalQuestions } as Result;
};
