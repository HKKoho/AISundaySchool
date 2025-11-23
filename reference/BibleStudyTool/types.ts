
export type BibleReference = {
  book: string;
  chapter: string;
  verse: string;
};

export type Feature =
  | 'summary'
  | 'explanation'
  | 'cross-references'
  | 'original-language'
  | 'historical-context'
  | 'character-analysis'
  | 'theological-insights'
  | 'personal-application';

export interface AnalysisResult {
  text: string;
  urls?: { uri: string; title: string }[];
}

export interface HistoryItem {
  id: string;
  reference: BibleReference;
  feature: Feature;
  prompt: string;
  result: AnalysisResult;
  timestamp: string;
}

export type Version =
  | 'ESV' | 'NIV' | 'NASB' | 'KJV' | 'NLT' | 'CSB'
  | 'OHB' | 'THGNT'
  | 'GenevaCommentary' | 'MatthewHenry'
  | 'CUV' | 'Luther' | 'SBLGNT';
