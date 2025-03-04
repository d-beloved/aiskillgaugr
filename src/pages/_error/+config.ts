import vikeReact from "vike-react/config";
import type { Config } from "vike/types";

export default {
  extends: vikeReact,
  route: "/_error",
  prerender: false,
  title: "Error | AISkillGuagr",
  description: "Error page",
} satisfies Config;
