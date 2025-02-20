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
