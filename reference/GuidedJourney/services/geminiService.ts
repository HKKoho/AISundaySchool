import { GoogleGenAI, Type } from "@google/genai";
import { RouteData, QuizQuestion } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateRouteData = async (routeId: string, routeTitle: string): Promise<RouteData> => {
  const model = "gemini-2.5-flash";
  
  const prompt = `
    Generate a historical and biblical route for "${routeTitle}".
    Create a list of 5 to 7 key chronological stops (locations) for this journey.
    
    For each stop, provide:
    1. A short name (e.g., "Mount Sinai").
    2. A brief narrative description of what happened there (max 2 sentences).
    3. A "Theological Insight" explaining the spiritual significance of this event.
    4. A descriptive "Image Prompt" that can be used to generate a historical, oil-painting style illustration of this specific scene/location.
    5. Approximate Latitude and Longitude for mapping purposes.
  `;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          stops: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.NUMBER },
                name: { type: Type.STRING },
                description: { type: Type.STRING },
                theology: { type: Type.STRING },
                imagePrompt: { type: Type.STRING },
                coordinates: {
                  type: Type.OBJECT,
                  properties: {
                    lat: { type: Type.NUMBER },
                    lng: { type: Type.NUMBER },
                  }
                }
              }
            }
          }
        }
      }
    }
  });

  if (!response.text) {
    throw new Error("No data received from Gemini");
  }

  return JSON.parse(response.text) as RouteData;
};

export const generateImageForStop = async (prompt: string): Promise<string> => {
  const model = "gemini-2.5-flash-image";
  
  // Refine the prompt to ensure consistent style
  const refinedPrompt = `A classical, high-quality historical biblical illustration, oil painting style, depicting: ${prompt}. Soft lighting, dramatic composition.`;

  const response = await ai.models.generateContent({
    model,
    contents: {
      parts: [
        { text: refinedPrompt },
      ],
    },
    config: {
      imageConfig: {
        aspectRatio: "4:3",
      }
    }
  });

  if (response.candidates && response.candidates[0].content && response.candidates[0].content.parts) {
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
  }

  throw new Error("Failed to generate image");
};

export const generateQuizForStep = async (
  currentStopName: string,
  nextStopName: string,
  routeTitle: string
): Promise<QuizQuestion> => {
  const model = "gemini-2.5-flash";

  const prompt = `
    The user is playing a game about the biblical route: "${routeTitle}".
    They are currently at "${currentStopName}" and need to travel to "${nextStopName}".
    
    Generate a multiple-choice quiz question that bridges these two events or tests knowledge about the current location before they can leave.
    
    The question should be engaging.
    Provide 4 options, 1 correct answer index (0-3), and a short explanation.
  `;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          question: { type: Type.STRING },
          options: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          correctAnswerIndex: { type: Type.NUMBER },
          explanation: { type: Type.STRING }
        }
      }
    }
  });

  if (!response.text) {
    throw new Error("No quiz generated");
  }

  return JSON.parse(response.text) as QuizQuestion;
};