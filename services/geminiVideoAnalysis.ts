import { GoogleGenAI, Type, Schema } from "@google/genai";
import { YouTubeAnalysisResult } from "../types/youtube";

// Initialize Gemini Client for video analysis
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

const RESPONSE_SCHEMA: Schema = {
  type: Type.OBJECT,
  properties: {
    title: {
      type: Type.STRING,
      description: "A concise, engaging title for the biblical teaching content.",
    },
    mainFocus: {
      type: Type.STRING,
      description: "A summary of the main biblical focus or theme of the teaching.",
    },
    keyTeachings: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of key biblical teachings and spiritual insights from the video.",
    },
    biblicalReferences: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of Bible verses or passages referenced (e.g., 'John 3:16', 'Romans 8:28-30').",
    },
    practicalApplications: {
      type: Type.STRING,
      description: "How these teachings can be practically applied to daily Christian life.",
    },
    theologicalInsights: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Deeper theological or doctrinal insights explained in the teaching.",
    },
    quiz: {
      type: Type.ARRAY,
      description: "A list of 5 questions to test understanding, mixing True/False and Multiple Choice.",
      items: {
        type: Type.OBJECT,
        properties: {
          question: {
            type: Type.STRING,
            description: "A question testing comprehension of the biblical teaching."
          },
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
  required: ["title", "mainFocus", "keyTeachings", "biblicalReferences", "practicalApplications", "theologicalInsights", "quiz"],
};

/**
 * Analyze a YouTube video directly using Gemini's multimodal capabilities
 * This is used as a fallback when transcript is not available
 */
export const analyzeVideoWithGemini = async (videoUrl: string): Promise<YouTubeAnalysisResult> => {
  if (!ai) {
    throw new Error("Gemini API key not configured. Please add GEMINI_API_KEY to your .env.local file.");
  }

  try {
    // Use Gemini 2.0 Flash which supports video analysis
    const model = "gemini-2.0-flash-exp";

    const response = await ai.models.generateContent({
      model: model,
      config: {
        systemInstruction: `You are an expert biblical teacher and theologian analyzing a YouTube video of a sermon or biblical teaching.

Your task is to:
1. Watch and listen to the video content carefully
2. Extract the main biblical focus and key teachings
3. Identify all scripture references mentioned or displayed
4. Provide theological insights and practical applications
5. Generate a quiz to test understanding

IMPORTANT:
- Always cite specific Bible verses when referenced (e.g., "John 3:16", "Romans 8:28-30")
- Focus on theological accuracy and biblical soundness
- Make practical applications relevant to daily Christian living
- Ensure quiz questions test comprehension of key biblical concepts
- If the video is not a biblical teaching, explain that and provide what analysis you can`,
        responseMimeType: "application/json",
        responseSchema: RESPONSE_SCHEMA,
      },
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Please analyze this biblical teaching YouTube video and provide a comprehensive summary with key teachings, biblical references, theological insights, practical applications, and a quiz:\n\n${videoUrl}`,
            },
          ],
        },
      ],
    });

    const jsonText = response.text;
    if (!jsonText) {
      throw new Error("No response received from Gemini.");
    }

    const result = JSON.parse(jsonText) as YouTubeAnalysisResult;
    return result;

  } catch (error: any) {
    console.error("Gemini Video Analysis Failed:", error);

    // Provide helpful error messages
    if (error.message?.includes('model not found') || error.message?.includes('2.0')) {
      throw new Error("Video analysis requires Gemini 2.0 Flash which may not be available yet. Please try using a video with transcripts or paste the transcript manually.");
    }

    throw new Error(error.message || "Failed to analyze video content.");
  }
};
