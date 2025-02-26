import { QuizQuestion, QuizPreference } from "@/types";

const CACHE_DURATION = 48 * 60 * 60 * 1000; // 48 hours

interface CachedData {
  questions: QuizQuestion[];
  timestamp: number;
}

export const cacheManager = {
  generateKey(preferences: QuizPreference): string {
    return `quiz-cache-${preferences.language}-${preferences.level}`;
  },

  get(preferences: QuizPreference): CachedData | null {
    const cacheKey = this.generateKey(preferences);
    const cachedData = localStorage.getItem(cacheKey);

    if (!cachedData) return null;

    const { questions, timestamp } = JSON.parse(cachedData);
    const isValid = Date.now() - timestamp < CACHE_DURATION;

    return isValid ? { questions, timestamp } : null;
  },

  set(preferences: QuizPreference, questions: QuizQuestion[]) {
    const cacheKey = this.generateKey(preferences);
    const data = {
      questions,
      timestamp: Date.now(),
    };
    localStorage.setItem(cacheKey, JSON.stringify(data));
  },

  delete(preferences: QuizPreference): void {
    if (preferences) {
      const cacheKey = this.generateKey(preferences);
      localStorage.removeItem(cacheKey);
    } else {
      const keys = Object.keys(localStorage);
      keys.forEach((key) => {
        if (key.startsWith("quiz-cache-")) {
          localStorage.removeItem(key);
        }
      });
    }
  },

  clearExpired(): void {
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.startsWith("quiz-cache-")) {
        const cachedData = localStorage.getItem(key);
        if (cachedData) {
          const { timestamp } = JSON.parse(cachedData);
          if (Date.now() - timestamp > CACHE_DURATION) {
            localStorage.removeItem(key);
          }
        }
      }
    });
  },
};
