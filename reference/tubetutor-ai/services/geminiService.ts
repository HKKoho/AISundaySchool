import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AnalysisResult } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const RESPONSE_SCHEMA: Schema = {
  type: Type.OBJECT,
  properties: {
    title: {
      type: Type.STRING,
      description: "A concise, engaging title for the educational content.",
    },
    mainFocus: {
      type: Type.STRING,
      description: "A summary of the main focus of the talk.",
    },
    relevantIdeas: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of relevant ideas highlighted in the video.",
    },
    newConcepts: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of new concepts introduced.",
    },
    criticism: {
      type: Type.STRING,
      description: "The main criticism or critical viewpoint discussed in the video.",
    },
    examples: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "One or two main examples mentioned in the talk.",
    },
    quiz: {
      type: Type.ARRAY,
      description: "A list of 5 questions, mixing True/False and Multiple Choice.",
      items: {
        type: Type.OBJECT,
        properties: {
          question: { type: Type.STRING },
          type: {
            type: Type.STRING,
            enum: ["MULTIPLE_CHOICE", "TRUE_FALSE"],
            description: "The type of question."
          },
          options: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "For True/False, provide ['True', 'False']. For Multiple Choice, provide 4 options.",
          },
          correctAnswerIndex: {
            type: Type.INTEGER,
            description: "The zero-based index of the correct option.",
          },
        },
        required: ["question", "type", "options", "correctAnswerIndex"],
      },
    },
  },
  required: ["title", "mainFocus", "relevantIdeas", "newConcepts", "criticism", "examples", "quiz"],
};

export const analyzeContent = async (text: string): Promise<AnalysisResult> => {
  try {
    const model = "gemini-2.5-flash";
    
    const response = await ai.models.generateContent({
      model: model,
      config: {
        systemInstruction: "You are an expert educational content analyzer. Your goal is to analyze video transcripts to extract the main focus, highlight relevant ideas, identify new concepts, note the main criticism, and cite key examples. You also generate a mixed quiz (True/False or Multiple Choice) to test understanding.",
        responseMimeType: "application/json",
        responseSchema: RESPONSE_SCHEMA,
      },
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Analyze the following educational video transcript:\n\n${text}`,
            },
          ],
        },
      ],
    });

    const jsonText = response.text;
    if (!jsonText) {
      throw new Error("No response received from Gemini.");
    }

    const result = JSON.parse(jsonText) as AnalysisResult;
    return result;

  } catch (error: any) {
    console.error("Gemini Analysis Failed:", error);
    throw new Error(error.message || "Failed to analyze content.");
  }
};