
import { SourceType, CitationStyle } from './types';

export const SOURCE_TYPES: SourceType[] = [
  SourceType.Book,
  SourceType.Journal,
  SourceType.Website,
];

export const CITATION_STYLES: CitationStyle[] = [
  CitationStyle.NotesBibliography,
  CitationStyle.AuthorDate,
];

export const FORM_FIELDS: Record<SourceType, { name: string; label: string; placeholder: string }[]> = {
  [SourceType.Book]: [
    { name: 'author', label: 'Author(s)', placeholder: 'e.g., John Doe or John Doe and Jane Smith' },
    { name: 'title', label: 'Book Title', placeholder: 'e.g., The History of Rome' },
    { name: 'city', label: 'City of Publication', placeholder: 'e.g., New York' },
    { name: 'publisher', label: 'Publisher', placeholder: 'e.g., Academic Press' },
    { name: 'year', label: 'Year of Publication', placeholder: 'e.g., 2023' },
  ],
  [SourceType.Journal]: [
    { name: 'author', label: 'Author(s)', placeholder: 'e.g., Jane Smith' },
    { name: 'articleTitle', label: 'Article Title', placeholder: 'e.g., The Impact of Climate Change' },
    { name: 'journalTitle', label: 'Journal Title', placeholder: 'e.g., Journal of Modern History' },
    { name: 'volume', label: 'Volume Number', placeholder: 'e.g., 42' },
    { name: 'issue', label: 'Issue Number', placeholder: 'e.g., 3' },
    { name: 'year', label: 'Year of Publication', placeholder: 'e.g., 2023' },
    { name: 'pages', label: 'Page Range', placeholder: 'e.g., 123-145' },
    { name: 'doi', label: 'DOI (optional)', placeholder: 'e.g., 10.1086/123456' },
  ],
  [SourceType.Website]: [
    { name: 'author', label: 'Author(s) (if available)', placeholder: 'e.g., John Doe' },
    { name: 'pageTitle', label: 'Page Title', placeholder: 'e.g., Gemini API Documentation' },
    { name: 'websiteName', label: 'Website Name', placeholder: 'e.g., Google AI' },
    { name: 'publishDate', label: 'Publication Date (if available)', placeholder: 'e.g., June 1, 2023' },
    { name: 'url', label: 'URL', placeholder: 'https://ai.google.dev' },
    { name: 'accessDate', label: 'Access Date', placeholder: 'e.g., July 20, 2024' },
  ],
};
