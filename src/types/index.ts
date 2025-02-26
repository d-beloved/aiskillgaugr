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

export interface QuizData {
  questions: QuizQuestion[];
  currentIndex: number;
  answers: string[];
  timestamp: number;
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
  submitAnswer: (answer: string, isComplete: boolean) => void;
  resetQuiz: () => void;
  isLoading: boolean;
  error: string | null;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  timeStamp: number;
  topicPerformance: Record<
    string,
    {
      total: number;
      correct: number;
      percentage: number;
    }
  >;
}
