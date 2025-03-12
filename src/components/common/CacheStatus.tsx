import { useEffect, useState } from "react";
import { useQuiz } from "@/contexts/QuizContext";
import { cacheManager } from "@/utils/cache";

export default function CacheStatus() {
  const { quizPreferences, session } = useQuiz();
  const [isPreexistingCache, setIsPreexistingCache] = useState<boolean>(false);
  const [usingBaseQuestions, setUsingBaseQuestions] = useState<boolean>(false);

  useEffect(() => {
    if (quizPreferences) {
      const cachedData = cacheManager.get(quizPreferences);
      const cacheTimestamp = cachedData?.timestamp;

      const isOldCache = cacheTimestamp && Date.now() - cacheTimestamp > 10000;
      setIsPreexistingCache(!!cachedData && !!isOldCache);
    }
    if (session && session.questions.length === 5) {
      setUsingBaseQuestions(true);
    }
  }, [quizPreferences, session]);

  if (!isPreexistingCache && !usingBaseQuestions) return null;

  return (
    <div
      className="tooltip tooltip-top tooltip-info"
      data-tip={`${usingBaseQuestions} ? "Using Base Questions" : "These Questions are loaded from previous session`}
    >
      <div
        className="badge bg-primary/30 text-info gap-2 p-4 shadow-lg 
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
        <span className="font-medium">{`${usingBaseQuestions} ? "Failed to load the AI generated questions. Using Base Questions." : "Using cached questions`}</span>
      </div>
    </div>
  );
}
