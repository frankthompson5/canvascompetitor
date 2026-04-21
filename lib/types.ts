export type Difficulty = "intro" | "intermediate" | "expert";

export interface CourseInput {
  topic: string;
  level: Difficulty;
  durationWeeks: number;
  goalType: "career-ready" | "academic" | "practical";
}

export interface Lesson {
  id: string;
  title: string;
  resource: string;
}

export interface Quiz {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  passThreshold: number;
}

export interface Assignment {
  id: string;
  prompt: string;
}

export interface VideoAssessment {
  id: string;
  prompt: string;
}

export interface Module {
  id: string;
  title: string;
  objective: string;
  lessons: Lesson[];
  quiz: Quiz;
  assignment: Assignment;
  videoAssessment: VideoAssessment;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  modules: Module[];
}

export interface ModuleProgress {
  quizScore?: number;
  assignmentSubmitted: boolean;
  videoSubmitted: boolean;
}

export type ProgressState = Record<string, ModuleProgress>;
