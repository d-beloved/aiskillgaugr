import { useEffect, useState } from "react";
import { useQuiz } from "@/contexts/QuizContext";
import { cacheManager } from "@/utils/cache";

export default function CacheStatus() {
  const { quizPreferences } = useQuiz();
  const [isPreexistingCache, setIsPreexistingCache] = useState<boolean>(false);

  useEffect(() => {
    if (quizPreferences) {
      const cachedData = cacheManager.get(quizPreferences);
      const cacheTimestamp = cachedData?.timestamp;

      const isOldCache = cacheTimestamp && Date.now() - cacheTimestamp > 10000;
      setIsPreexistingCache(!!cachedData && !!isOldCache);
    }
  }, [quizPreferences]);

  if (!isPreexistingCache) return null;

  return (
    <div className="tooltip tooltip-bottom" data-tip="Questions loaded from previous session">
      <div
        className="badge bg-primary/10 text-primary gap-2 p-4 shadow-lg 
                    hover:bg-primary/20 transition-all duration-300 animate-fade-in"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 stroke-current animate-pulse-slow"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <span className="font-medium">Using cached questions</span>
      </div>
    </div>
  );
}
