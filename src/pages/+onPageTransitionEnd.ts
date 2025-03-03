import type { OnPageTransitionEndAsync } from "vike/types";
import { pageview } from "@/utils/analytics";

export const onPageTransitionEnd: OnPageTransitionEndAsync = async () => {
  console.log("Page transition end");
  document.querySelector("body")?.classList.remove("page-is-transitioning");
  pageview(window.location.pathname);
};
