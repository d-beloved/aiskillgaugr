import { useQuiz } from "@/contexts/QuizContext";
import { cacheManager } from "@/utils/cache";

export default function CacheStatus() {
  const { quizPreferences } = useQuiz();
  const isCached = quizPreferences && localStorage.getItem(cacheManager.generateKey(quizPreferences));

  if (!isCached) return null;

  return (
    <div className="badge badge-info gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      Using cached questions
    </div>
  );
}
