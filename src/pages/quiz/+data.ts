import { useConfig } from "vike-react/useConfig";
import type { PageContextServer } from "vike/types";

export type Data = Awaited<ReturnType<typeof data>>;

export const data = async (pageContext: PageContextServer) => {
  const config = useConfig();

  config({
    title: "AISkillGuagr - Quiz",
  });

  return;
};
