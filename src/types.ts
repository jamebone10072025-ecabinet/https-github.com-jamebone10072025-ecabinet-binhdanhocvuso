export type QuestionType = "knowledge" | "scenario";

export interface Question {
  id: string;
  type: QuestionType;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  topicId: number;
  lessonNumber: number;
  title: string;
  videoNote?: string;
  objectives: string[];
  summary: string;
  fullContent?: string;
  keyActionMessage: string;
  legalBases?: string[];
  illustrationText?: string;
  questions: Question[];
}

export interface Topic {
  id: number;
  number: number;
  title: string;
  description: string;
  category: string;
  pageRange: string;
  lessonCount: number;
  lessons: Lesson[];
}

export interface ExamRecord {
  id: string;
  studentName: string;
  agency: string;
  score: number;
  totalQuestions: number;
  passed: boolean;
  completedAt: string;
  durationSeconds: number;
  certificateCode: string;
}

export interface CompetencyCategory {
  id: string;
  name: string;
  description: string;
  questions: {
    id: string;
    text: string;
    levelDescriptions: [string, string, string]; // Basic, Competent, Advanced
  }[];
}

export interface MasterLessonItem {
  orderIndex: number; // 1 to 136
  topicId: number;
  lessonNumber: number;
  title: string;
  videoCount: number; // 1
  infographicCount: number; // 1
  bannerCount: number; // 1
}

export interface ProgramLevelVideo {
  id: number;
  title: string;
  type: string;
  durationEstimate: string;
  description: string;
  target: string;
}
