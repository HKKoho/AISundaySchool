export enum AppState {
  LANDING = 'LANDING',
  BIBLE = 'BIBLE',
  THEOLOGY_SEARCH = 'THEOLOGY_SEARCH',
  BIBLICAL_LANGUAGE = 'BIBLICAL_LANGUAGE',
  VERSION_COMPARISON = 'VERSION_COMPARISON',
}

// Bible Game Types
export enum BibleVersion {
  NIV = "NIV",
  ESV = "ESV",
  KJV = "KJV",
}

export interface JournalEntry {
  id: string;
  title: string;
  content: string;
}

export enum QuestionCategory {
  BIBLE_BACKGROUND = 'Bible Background', // 聖經背景
  PERSON_IN_BIBLE = 'Person in Bible',   // 聖經人物
}

export interface Quest {
  id: string;
  character: string;
  characterImage: string;
  category: QuestionCategory;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  journalPrompt: {
    title: string;
    content: string;
  };
  deepDive: {
    title: string;
    content: string;
    sources: {
      text: string;
      url: string;
    }[];
  };
}

export interface BibleLocation {
  id: string;
  name: string;
  era: string;
  position: { top: string; left: string };
  questId: string;
  dependency?: string;
}

export interface Level {
  id: string;
  name: string;
  locationIds: string[];
  discussionPrompts: string[];
}

export interface GameContextType {
  completedQuests: Set<string>;
  unlockedLocations: Set<string>;
  journalEntries: JournalEntry[];
  bibleVersion: BibleVersion;
  isFreeChoiceMode: boolean;
  completeQuest: (questId: string, journalEntry: JournalEntry) => void;
  setBibleVersion: (version: BibleVersion) => void;
  setIsFreeChoiceMode: (mode: boolean) => void;
}

// Theology Assistant Types
export enum TheologyAssistantMode {
  THEOLOGY_CHAT = 'Theology Chat',
  READING_QA = 'Reading Q&A',
  ASSIGNMENT_ASSISTANT = 'Assignment Assistant',
  RESOURCE_SEARCH = 'Resource Search',
  BIBLE_STUDY = 'Bible Study'
}

export enum AssignmentStage {
  INPUT = 'input',
  PLANNING = 'planning',
  DRAFTING = 'drafting',
  CRITIQUING = 'critiquing',
  REVISING = 'revising'
}

export enum AcademicLevel {
  UNDERGRADUATE = 'undergraduate',
  GRADUATE = 'graduate',
  DOCTORAL = 'doctoral',
  GENERAL = 'general'
}

export interface AssignmentPlan {
  id: string;
  topic: string;
  content: string;
  createdAt: string;
}

export interface AssignmentDraft {
  id: string;
  topic: string;
  content: string;
  stage: AssignmentStage;
  revisionNumber: number;
  createdAt: string;
}

export interface AssignmentCritique {
  content: string;
  suggestions: string[];
  strengths: string[];
  improvements: string[];
}

export interface DocumentSummary {
  content: string;
  keyPoints: string[];
  themes: string[];
}

export interface UploadedDocument {
  name: string;
  content: string;
  type: 'pdf' | 'docx' | 'txt' | 'md';
  summary?: DocumentSummary;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface LocalLLMModel {
  id: string;
  name: string;
  size: string;
  description: string;
  hasVision?: boolean;
}

export interface TheologyAssistantState {
  mode: TheologyAssistantMode;
  messages: ChatMessage[];
  documents: UploadedDocument[];
  documentSummary?: DocumentSummary;

  // Assignment Assistant specific
  assignmentTopic: string;
  theologyArea: string;
  academicLevel: AcademicLevel;
  assignmentLength: number;
  assignmentTone: string;
  assignmentStage: AssignmentStage;
  currentPlan?: AssignmentPlan;
  currentDraft?: AssignmentDraft;
  currentCritique?: AssignmentCritique;
  revisionNumber: number;
  maxRevisions: number;

  // Model configuration
  selectedModel: string;
  temperature: number;
  topP: number;
  isProcessing: boolean;
}