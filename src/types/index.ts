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
  beginner: TopicWeight[];
  intermediate: TopicWeight[];
  advanced: TopicWeight[];
}

export interface LevelQuestions {
  beginner: QuizQuestion[];
  intermediate: QuizQuestion[];
  advanced: QuizQuestion[];
}

export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
}

export interface Result {
  score: number;
  totalQuestions: number;
  feedback: string;
}

export interface Recommendation {
  language: string;
  level: string;
  resources: string[];
}

export interface QuizOptions {
  language: string;
  level: string;
  quizCounts: number;
}
