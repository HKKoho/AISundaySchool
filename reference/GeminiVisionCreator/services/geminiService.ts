import { GoogleGenAI } from "@google/genai";
import { AspectRatio } from "../types";

const GEMINI_MODEL = 'gemini-2.5-flash-image';

export const generateImageFromText = async (prompt: string, aspectRatio: AspectRatio): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing. Please check your environment configuration.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio
        }
      }
    });

    // Iterate through parts to find the image data
    // The response structure for images usually contains inlineData with mimeType and data (base64)
    const parts = response.candidates?.[0]?.content?.parts;
    
    if (!parts || parts.length === 0) {
      throw new Error("No content generated from the model.");
    }

    for (const part of parts) {
      if (part.inlineData && part.inlineData.data) {
        const mimeType = part.inlineData.mimeType || 'image/png';
        return `data:${mimeType};base64,${part.inlineData.data}`;
      }
    }

    // If we got text back instead of an image (e.g., refusal or error description in text)
    const textPart = parts.find(p => p.text);
    if (textPart && textPart.text) {
        throw new Error(`Model returned text instead of image: ${textPart.text}`);
    }

    throw new Error("Model response did not contain valid image data.");

  } catch (error: any) {
    console.error("Gemini Image Generation Error:", error);
    throw new Error(error.message || "Failed to generate image.");
  }
};
