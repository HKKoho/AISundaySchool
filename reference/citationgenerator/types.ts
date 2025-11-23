
export enum SourceType {
  Book = 'Book',
  Journal = 'Journal Article',
  Website = 'Website',
}

export enum CitationStyle {
  NotesBibliography = 'Notes and Bibliography',
  AuthorDate = 'Author-Date',
}

export interface NotesBibliographyOutput {
  footnote: string;
  bibliography: string;
}

export interface AuthorDateOutput {
  inText: string;
  reference: string;
}

export type GeneratedCitations = NotesBibliographyOutput | AuthorDateOutput;
