export type ErrorType = "SESSION_EXPIRED" | "CACHE_ERROR" | "API_ERROR" | "NETWORK_ERROR";

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  topic: string;
}

export interface TopicWeight {
  topic: string;
  weight: number;
}

export interface LevelTopics {
  [key: string]: TopicWeight[];
}

export interface LevelQuestions {
  [key: string]: QuizQuestion[];
}

export interface QuizPreference {
  language: string;
  level: string;
  quizCount: string;
}

export interface QuizData extends SessionManager {
  questions: QuizQuestion[];
  currentIndex: number;
  answers: string[];
  isComplete?: boolean;
}

export interface CachedQuizData {
  questions: QuizQuestion[];
  timeStamp: number;
  preferences: QuizPreference;
}

export interface QuizContextType {
  quizPreferences: QuizPreference | null;
  session: QuizData | null;
  setPreferences: (prefs: QuizPreference) => void;
  startNewQuiz: (prefs: QuizPreference) => Promise<void>;
  submitAnswer: (answer: string, isComplete: boolean) => Promise<boolean>;
  resetQuiz: () => void;
  isLoading: boolean;
  error: AppError | null;
  clearError: () => void;
  getRecommendation: (prefs: QuizPreference, questions: QuizQuestion[], answers: string[], score: number) => void;
  recommendation: string;
  quizResult: QuizResults | null;
}

export interface QuizResults {
  questions: QuizQuestion[];
  answers: string[];
  score: number;
  scorePercentage: string;
}

export interface SessionManager {
  timestamp: number;
  expiresIn: number; // in milliseconds
  isExpired: boolean;
}

export interface AppError {
  type: ErrorType;
  message: string;
  details?: string;
}

export interface RecoveredData {
  session: QuizData | null;
  preferences: QuizPreference | null;
  recommendation: string;
  result: QuizResults | null;
}
