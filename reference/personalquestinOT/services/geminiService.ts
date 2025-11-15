import { GoogleGenAI, Type, Modality } from "@google/genai";
import type { Answer, ArchetypeResult } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    archetype: { type: Type.STRING, description: "A short, insightful title for the user's core spiritual theme based on their answers, e.g., 'Covenant & Calling' or 'Wisdom in Leadership'." },
    character: { type: Type.STRING, description: "The name of the primary Old Testament character that exemplifies this theme, e.g., 'Moses' or 'Solomon'." },
    description: { type: Type.STRING, description: "A short, engaging paragraph (2-3 sentences) describing the user's identified spiritual theme, connecting it to the selected Old Testament character." },
    hebrewPerspective: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING, description: "A title for the Hebrew perspective, e.g., 'The Lawgiver & Nation Builder'." },
        summary: { type: Type.STRING, description: "A paragraph explaining this character's significance from a scholarly Hebrew or Jewish perspective, focusing on key theological concepts, covenants, and their role in the Tanakh." },
        keyTexts: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "An array of 2-3 key Old Testament scripture references (e.g., 'Exodus 3:1-10')."
        },
        studyTopics: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "An array of 2-3 topics for further study from a Hebrew perspective (e.g., 'Covenant Theology', 'Rabbinic Interpretation')."
        },
      },
      required: ["title", "summary", "keyTexts", "studyTopics"],
    },
    christianPerspective: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING, description: "A title for the Christian perspective, e.g., 'The Deliverer & Christ Figure'." },
        summary: { type: Type.STRING, description: "A paragraph explaining this character's significance from a scholarly Christian doctrinal perspective, analyzing their role in salvation history, and connections to New Testament theology (e.g., typology, fulfillment)." },
        keyTexts: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "An array of 2-3 key Old and New Testament scripture references (e.g., 'Hebrews 3:1-6')."
        },
        studyTopics: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "An array of 2-3 topics for further study from a Christian perspective (e.g., 'Typology of Christ', 'Salvation History')."
        },
      },
      required: ["title", "summary", "keyTexts", "studyTopics"],
    },
  },
  required: ["archetype", "character", "description", "hebrewPerspective", "christianPerspective"],
};


export const generateArchetype = async (answers: Answer[], lang: 'en' | 'zh'): Promise<ArchetypeResult> => {
  const formattedAnswers = answers
    .map(a => `Question: "${a.questionText}"\nAnswer: "${a.answerText}"`)
    .join('\n\n');

  const languageName = lang === 'zh' ? 'Traditional Chinese' : 'English';
  const languageInstruction = `The entire JSON response, including all keys and string values, MUST be in ${languageName}.`;

  const prompt = `
    Act as a Bible scholar with deep knowledge of both Hebrew (Tanakh) and Christian (Old Testament) theology and doctrine.
    Analyze the following quiz answers to identify a core spiritual theme or challenge reflected in the user's responses.
    Based on this theme, select a primary Old Testament character who exemplifies it.
    Instead of a simple personality archetype, provide a nuanced, doctrinal analysis.
    Generate a personalized description and two distinct, doctrinally-grounded learning paths: one from a Hebrew/Jewish perspective and one from a Christian perspective.
    The analysis must be theologically sound, referencing key doctrines and scholarly interpretations for both traditions.
    The tone should be insightful, educational, and respectful of both traditions, aiming to guide the user in their spiritual exploration.
    ${languageInstruction}

    User's Answers:
    ---
    ${formattedAnswers}
    ---

    Please provide the response in the specified JSON format.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });
    
    const text = response.text.trim();
    try {
        const result = JSON.parse(text);
        return result as ArchetypeResult;
    } catch (e) {
        console.error("Failed to parse Gemini response as JSON:", text);
        throw new Error("Invalid JSON response from the model.");
    }

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Could not generate archetype from the model.");
  }
};

export const generateImage = async (archetype: string, character: string, description: string): Promise<string> => {
  const prompt = `Create a simple, minimalist abstract diagram that visually represents the spiritual theme of '${archetype}', inspired by the biblical figure ${character}. The diagram should use basic geometric shapes, a limited but meaningful color palette, and lines or links to suggest relationships and core concepts from this theme. Focus on clarity and symbolic representation. The artwork must be purely graphical and should not contain any realistic figures, complex textures, text, or letters. The goal is to evoke the essence of the theme through color, shape, and structure.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts ?? []) {
      if (part.inlineData) {
        const base64ImageBytes: string = part.inlineData.data;
        return `data:image/png;base64,${base64ImageBytes}`;
      }
    }
    throw new Error("No image data found in the response.");

  } catch (error) {
    console.error("Error generating image with Gemini:", error);
    throw new Error("Could not generate a visual for the archetype.");
  }
};