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

// export interface Result {
//   score: number;
//   totalQuestions: number;
//   feedback: string;
// }

// export interface Recommendation {
//   language: string;
//   level: string;
//   resources: string[];
// }

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
}
