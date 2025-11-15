
export interface Question {
  id: number;
  text: string;
  options: {
    id: string;
    text: string;
  }[];
}

export interface Answer {
  questionId: number;
  questionText: string;
  answerText: string;
}

export interface Perspective {
  title: string;
  summary: string;
  keyTexts: string[];
  studyTopics: string[];
}

export interface ArchetypeResult {
  archetype: string;
  character: string;
  description: string;
  hebrewPerspective: Perspective;
  christianPerspective: Perspective;
  imageUrl?: string;
}