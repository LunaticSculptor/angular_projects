export interface Question {
    id: number;
    type: 'mcq' | 'text';
    title: string;
    description?: string;
    options: string[] | null;
    correctAnswer: string;
    marksIfCorrect: number;
    negativeMark: number;
  }