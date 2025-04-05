import { Question } from "./question";

export interface Quiz {
    id: number;
    category: string;
    maxScore: number;
    maxTime: number;
    questions: Question[];
  }