// User Profile Types (Life-focused, not job-focused)
export interface UserProfile {
  lifeStage: string; // e.g., "Student", "Young Professional", "Parent", "Retired", etc.
  interests: string;
  relationshipStatus: string;
  personalGoals: string;
  relationWithChristianity: string;
}

// Life Situation Scenario Types
export interface LifeScenario {
  id: string;
  label: string;
  icon: string;
  description: string;
  enneagramFocus: string;
}

// Assessment Question
export interface AssessmentQuestion {
  category: string;
  text: string;
}

// Core Patterns from Analysis
export interface CorePatterns {
  motivation: string;
  fear: string;
  communicationStyle: string;
  stressResponse: string;
  relationshipApproach: string;
}

// Holistic Analysis Result
export interface HolisticAnalysis {
  primaryType: string;
  confidence: number;
  secondaryType?: string;
  justification: string;
  keyEvidence: string[];
  corePatterns: CorePatterns;
}

// Personality Type
export interface PersonalityType {
  name: string;
  description: string;
  color: string;
  center: string;
  category: string;
  traits: string[];
  strengths: string[];
  challenges: string[];
}

// Assessment State
export type AssessmentState = 'profile' | 'scenarios' | 'assessing' | 'analyzing' | 'results';

// Final Result
export interface FinalResult {
  type: string;
  confidence: number;
  personality: PersonalityType;
  analysis: HolisticAnalysis;
}
