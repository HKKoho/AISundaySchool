export type QuestionDifficulty = 'Preliminary' | 'Competent';

export interface SideItem {
  id: string;
  text: string;
}

export interface MatchItem extends SideItem {
  correctMatch: string; // Corresponds to the id of a SideItem in the left column
}

export interface Round {
  id: number;
  category: string;
  leftSide: SideItem[];
  rightSide: MatchItem[];
  difficulty: QuestionDifficulty;
}

export interface UserSelections {
  [key: string]: string; // key: rightSide item id, value: leftSide item id ('A', 'B', 'C', 'D')
}

export enum RoundResult {
    UNANSWERED,
    CORRECT,
    INCORRECT
}
