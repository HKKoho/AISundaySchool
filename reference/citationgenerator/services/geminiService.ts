
import { GoogleGenAI, Type } from "@google/genai";
import { SourceType, CitationStyle, GeneratedCitations } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const generatePrompt = (sourceType: SourceType, style: CitationStyle, data: Record<string, string>): string => {
  const fields = Object.entries(data)
    .filter(([, value]) => value.trim())
    .map(([key, value]) => {
      // Simple camelCase to Title Case conversion
      const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
      return `- ${label}: ${value}`;
    })
    .join('\n');

  const citationTypes = style === CitationStyle.NotesBibliography
    ? "a footnote citation and a bibliography entry"
    : "an in-text citation and a reference list entry";

  return `You are an expert academic assistant specializing in the Chicago Manual of Style, 17th edition.
Your task is to generate citations based on the provided source information. Adhere strictly to the formatting rules of the specified Chicago style.

Citation Style: ${style}
Source Type: ${sourceType}

Source Information:
${fields}

Generate ${citationTypes}.
`;
};

export const generateCitation = async (
  sourceType: SourceType,
  style: CitationStyle,
  data: Record<string, string>
): Promise<GeneratedCitations> => {

  const prompt = generatePrompt(sourceType, style, data);

  const responseSchema = style === CitationStyle.NotesBibliography ? {
    type: Type.OBJECT,
    properties: {
      footnote: { type: Type.STRING, description: 'The complete, formatted footnote citation including the note number (e.g., "1.").' },
      bibliography: { type: Type.STRING, description: 'The complete, formatted bibliography entry.' }
    },
    required: ['footnote', 'bibliography']
  } : {
    type: Type.OBJECT,
    properties: {
      inText: { type: Type.STRING, description: 'The complete, formatted author-date in-text citation in parentheses.' },
      reference: { type: Type.STRING, description: 'The complete, formatted reference list entry.' }
    },
    required: ['inText', 'reference']
  };

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: responseSchema,
      temperature: 0.2,
    },
  });

  const jsonText = response.text.trim();
  try {
    const parsedJson = JSON.parse(jsonText);
    return parsedJson as GeneratedCitations;
  } catch (e) {
    console.error("Failed to parse JSON response from Gemini:", jsonText);
    throw new Error("Received an invalid format from the AI. Please try again.");
  }
};

export const findSourceByUrl = async (
  url: string
): Promise<{ sourceType: SourceType; details: Record<string, string> }> => {
  const today = new Date();
  const accessDate = `${today.toLocaleString('en-US', { month: 'long' })} ${today.getDate()}, ${today.getFullYear()}`;

  const prompt = `You are an expert citation assistant. Your task is to analyze the content of the provided URL and extract information needed to create a citation in the Chicago Manual of Style.
You must identify the source type and extract the fields relevant to that type.

The source type MUST be one of: "${SourceType.Book}", "${SourceType.Journal}", "${SourceType.Website}".

Based on the source type, extract the following fields if available:
- For "${SourceType.Book}": author, title, city, publisher, year.
- For "${SourceType.Journal}": author, articleTitle, journalTitle, volume, issue, year, pages, doi.
- For "${SourceType.Website}": author, pageTitle, websiteName, publishDate, url. For the 'accessDate', use today's date: "${accessDate}".

URL to analyze: ${url}

Respond ONLY with a single JSON object. Do not include any other text, explanations, or markdown formatting like \`\`\`json. The output must be a raw JSON string.
The JSON object should have this exact structure:
{
  "sourceType": "...",
  "details": { ... }
}
For the "details" object, ensure the keys match the field names listed above (e.g., "articleTitle", "pageTitle"). For the "url" field in website details, use the original URL provided: "${url}".
`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      tools: [{googleSearch: {}}],
      temperature: 0.1,
    },
  });

  let jsonText = response.text.trim();
  
  if (jsonText.startsWith('```json')) {
    jsonText = jsonText.slice(7, -3).trim();
  }

  try {
    const parsedJson = JSON.parse(jsonText);
    
    if (!parsedJson.sourceType || !parsedJson.details || !Object.values(SourceType).includes(parsedJson.sourceType)) {
        throw new Error("AI response has an invalid structure.");
    }
    
    return {
      sourceType: parsedJson.sourceType as SourceType,
      details: parsedJson.details as Record<string, string>,
    };
  } catch (e) {
    console.error("Failed to parse JSON response from Gemini for URL lookup:", jsonText, e);
    throw new Error("The AI failed to extract information from the URL. Please try another URL or enter the details manually.");
  }
};
