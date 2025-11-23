
import { GoogleGenAI, GenerateContentResponse, Modality } from "@google/genai";
import { BibleReference, Feature, Version, AnalysisResult } from '../types';

// Fix: Initialize GoogleGenAI with a named apiKey parameter.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const generatePrompt = (
  feature: Feature,
  reference: BibleReference,
  versions: Version[],
  language: string
): string => {
  const referenceString = `${reference.book} ${reference.chapter}:${reference.verse}`;
  const versionsString = versions.join(', ');

  const languageMap: { [key: string]: string } = {
    'en': 'English',
    'es': 'Spanish',
    'zh-TW': 'Traditional Chinese'
  };
  const languageName = languageMap[language] || 'English';

  let basePrompt: string;

  switch (feature) {
    case 'summary':
      basePrompt = `Provide a concise summary of ${referenceString}. Use the following Bible versions for context if available: ${versionsString}.`;
      break;
    case 'explanation':
      basePrompt = `Explain the meaning and significance of ${referenceString}. Use the following Bible versions for context if available: ${versionsString}.`;
      break;
    case 'cross-references':
      basePrompt = `List and briefly explain 5-7 key cross-references for ${referenceString}. Use the following Bible versions for context if available: ${versionsString}.`;
      break;
    case 'original-language':
      basePrompt = `Analyze the original language (Hebrew/Greek) of key terms in ${referenceString}. Provide transliterations and meanings. Use the following Bible versions for context if available: ${versionsString}.`;
      break;
    case 'historical-context':
      basePrompt = `Describe the historical and cultural context of ${referenceString}. Use the following Bible versions for context if available: ${versionsString}.`;
      break;
    case 'character-analysis':
      basePrompt = `Analyze the characters and their motivations in ${referenceString}. Use the following Bible versions for context if available: ${versionsString}.`;
      break;
    case 'theological-insights':
      basePrompt = `What are the main theological insights or doctrines present in ${referenceString}? Use the following Bible versions for context if available: ${versionsString}.`;
      break;
    case 'personal-application':
      basePrompt = `Suggest some points for personal application or reflection based on ${referenceString}. Use the following Bible versions for context if available: ${versionsString}.`;
      break;
    default:
      basePrompt = `Analyze ${referenceString}. Use the following Bible versions for context if available: ${versionsString}.`;
      break;
  }
  
  return `${basePrompt} Respond entirely in ${languageName}.`;
};

export const analyzeText = async (
  feature: Feature,
  reference: BibleReference,
  versions: Version[],
  language: string
): Promise<AnalysisResult> => {
  const prompt = generatePrompt(feature, reference, versions, language);

  try {
    // Fix: Use gemini-2.5-flash for basic text tasks and include Google Search for grounding.
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    // Fix: Directly access the .text property for the response text.
    const text = response.text;
    const groundingMetadata = response.candidates?.[0]?.groundingMetadata;

    let urls;
    if (groundingMetadata?.groundingChunks) {
        urls = groundingMetadata.groundingChunks
            .map((chunk) => chunk.web)
            .filter((web) => web?.uri && web.title) as { uri: string; title: string }[];
    }
    
    return { text, urls };
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw new Error('Failed to get analysis from Gemini.');
  }
};

export const textToSpeech = async (text: string): Promise<string> => {
  try {
    // Fix: Use gemini-2.5-flash-preview-tts model for text-to-speech.
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Say with a clear and calm voice: ${text}` }] }],
      config: {
        // Fix: Use Modality.AUDIO as per guidelines.
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) {
      throw new Error("No audio data returned from API.");
    }
    return base64Audio;
  } catch (error) {
    console.error("Error in text-to-speech generation:", error);
    throw error;
  }
};