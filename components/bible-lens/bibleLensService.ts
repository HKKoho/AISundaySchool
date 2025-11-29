import { GoogleGenAI, Type } from "@google/genai";
import { BiblicalTriple } from "./types";

const GEMINI_API_KEY = (process.env.GEMINI_API_KEY || process.env.API_KEY) as string | undefined;

let ai: GoogleGenAI | null = null;

if (GEMINI_API_KEY) {
  ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  console.log('[BibleLensService] Gemini AI initialized');
} else {
  console.warn('[BibleLensService] No API key found, using fallback data');
}

/**
 * Generates 5 Biblical triples with bilingual content
 */
export const generateBiblicalTriples = async (): Promise<BiblicalTriple[]> => {
  if (!ai) {
    console.log('[BibleLensService] Using fallback triples');
    return getFallbackTriples();
  }

  try {
    console.log('[BibleLensService] Generating biblical triples with AI');

    const modelId = "gemini-2.5-flash";

    const prompt = `
      Generate exactly 5 distinct Biblical objects for a memory matching game.

      Requirements:
      1. Select objects from these categories: Plants, Animals, Food, or Places mentioned in the Bible
      2. Each object should be visually distinctive and recognizable
      3. Choose specific Bible chapters (Book + Chapter) that clearly mention each object
      4. Include the actual Bible verse text that mentions the object
      5. Objects should be from different categories when possible
      6. Create detailed image prompts that will generate clear, biblical-style illustrations
      7. Provide ALL text in both English and Traditional Chinese

      Return pure JSON with this schema:
      {
        "triples": [
          {
            "objectName": "Fig Tree",
            "objectNameZh": "無花果樹",
            "chapterReference": "Mark 11:13",
            "chapterReferenceZh": "馬可福音 11:13",
            "verseText": "Seeing in the distance a fig tree in leaf, he went to find out if it had any fruit.",
            "verseTextZh": "遠遠地看見一棵無花果樹，樹上有葉子，就往那裡去，或者在樹上可以找著什麼。",
            "imagePrompt": "A detailed biblical-style illustration of a fig tree..."
          },
          ... (4 more)
        ]
      }
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            triples: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  objectName: { type: Type.STRING },
                  objectNameZh: { type: Type.STRING },
                  chapterReference: { type: Type.STRING },
                  chapterReferenceZh: { type: Type.STRING },
                  verseText: { type: Type.STRING },
                  verseTextZh: { type: Type.STRING },
                  imagePrompt: { type: Type.STRING }
                },
                required: ["objectName", "objectNameZh", "chapterReference", "chapterReferenceZh", "verseText", "verseTextZh", "imagePrompt"]
              }
            }
          },
          required: ["triples"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No text returned from Gemini");

    const parsed = JSON.parse(text);

    // Generate real images for each triple using Gemini Vision
    console.log('[BibleLensService] Generating images for triples with Gemini Vision...');
    const triples: BiblicalTriple[] = await Promise.all(
      parsed.triples.map(async (triple: any, index: number) => {
        const imageBase64 = await generateImageWithGeminiVision(triple.imagePrompt, triple.objectName);
        return {
          id: index,
          objectName: triple.objectName,
          objectNameZh: triple.objectNameZh,
          chapterReference: triple.chapterReference,
          chapterReferenceZh: triple.chapterReferenceZh,
          verseText: triple.verseText,
          verseTextZh: triple.verseTextZh,
          imageBase64
        };
      })
    );

    console.log('[BibleLensService] Successfully generated triples with images:', triples.length);
    return triples;

  } catch (error) {
    console.error('[BibleLensService] Error generating triples:', error);
    console.log('[BibleLensService] Falling back to preset data');
    return getFallbackTriples();
  }
};

/**
 * Generates an image using Gemini Vision (gemini-2.5-flash-image model)
 */
async function generateImageWithGeminiVision(imagePrompt: string, objectName: string): Promise<string> {
  if (!ai) {
    console.warn('[BibleLensService] No AI available, using placeholder');
    return generatePlaceholderImage(objectName);
  }

  try {
    console.log(`[BibleLensService] Generating image for: ${objectName}`);

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: imagePrompt }]
      },
      config: {
        imageConfig: {
          aspectRatio: '1:1'
        }
      }
    });

    // Extract image data from response
    const parts = response.candidates?.[0]?.content?.parts;

    if (!parts || parts.length === 0) {
      console.warn('[BibleLensService] No content generated, using placeholder');
      return generatePlaceholderImage(objectName);
    }

    for (const part of parts) {
      if (part.inlineData && part.inlineData.data) {
        const mimeType = part.inlineData.mimeType || 'image/png';
        console.log(`[BibleLensService] Successfully generated image for ${objectName}`);
        return `data:${mimeType};base64,${part.inlineData.data}`;
      }
    }

    // If we got text back instead of an image
    const textPart = parts.find(p => p.text);
    if (textPart && textPart.text) {
      console.warn(`[BibleLensService] Model returned text: ${textPart.text}`);
    }

    console.warn('[BibleLensService] No valid image data, using placeholder');
    return generatePlaceholderImage(objectName);

  } catch (error) {
    console.error('[BibleLensService] Error generating image:', error);
    return generatePlaceholderImage(objectName);
  }
}

/**
 * Generates a beautiful SVG placeholder with emoji representation (fallback)
 */
function generatePlaceholderImage(objectName: string): string {
  const emoji = getEmojiForObject(objectName);

  const svg = `
    <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad-${emoji}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#8B7355;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#D4A574;stop-opacity:1" />
        </linearGradient>
        <filter id="shadow">
          <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.3"/>
        </filter>
      </defs>
      <rect width="400" height="400" fill="url(#grad-${emoji})"/>
      <circle cx="200" cy="160" r="80" fill="rgba(255,255,255,0.1)"/>
      <text x="200" y="200" font-family="Arial" font-size="80" text-anchor="middle" filter="url(#shadow)">
        ${emoji}
      </text>
      <text x="200" y="280" font-family="Georgia, serif" font-size="20" font-weight="bold" text-anchor="middle" fill="#fff" opacity="0.9">
        ${objectName}
      </text>
      <rect x="0" y="350" width="400" height="50" fill="rgba(0,0,0,0.2)"/>
      <text x="200" y="380" font-family="Georgia, serif" font-size="16" text-anchor="middle" fill="#fff" opacity="0.8">
        Biblical Object
      </text>
    </svg>
  `;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

/**
 * Gets appropriate emoji for biblical object
 */
function getEmojiForObject(objectName: string): string {
  const name = objectName.toLowerCase();

  // Plants and Trees
  if (name.includes('fig')) return '🌳';
  if (name.includes('olive')) return '🫒';
  if (name.includes('grape') || name.includes('vine')) return '🍇';
  if (name.includes('wheat')) return '🌾';
  if (name.includes('palm')) return '🌴';
  if (name.includes('cedar') || name.includes('tree')) return '🌲';
  if (name.includes('rose') || name.includes('lily')) return '🌹';
  if (name.includes('garden')) return '🏡';

  // Animals
  if (name.includes('lion')) return '🦁';
  if (name.includes('lamb') || name.includes('sheep')) return '🐑';
  if (name.includes('dove') || name.includes('bird')) return '🕊️';
  if (name.includes('fish')) return '🐟';
  if (name.includes('camel')) return '🐪';
  if (name.includes('serpent') || name.includes('snake')) return '🐍';
  if (name.includes('eagle')) return '🦅';
  if (name.includes('ox') || name.includes('calf')) return '🐂';
  if (name.includes('donkey')) return '🫏';
  if (name.includes('locust')) return '🦗';

  // Food and Drink
  if (name.includes('bread')) return '🍞';
  if (name.includes('wine')) return '🍷';
  if (name.includes('honey')) return '🍯';
  if (name.includes('water')) return '💧';
  if (name.includes('milk')) return '🥛';
  if (name.includes('oil')) return '🫗';
  if (name.includes('manna')) return '🥖';

  // Places and Landmarks
  if (name.includes('mountain')) return '⛰️';
  if (name.includes('river') || name.includes('jordan')) return '🏞️';
  if (name.includes('temple')) return '⛩️';
  if (name.includes('desert') || name.includes('wilderness')) return '🏜️';
  if (name.includes('sea') || name.includes('ocean')) return '🌊';
  if (name.includes('well')) return '⛲';
  if (name.includes('city') || name.includes('jerusalem')) return '🏛️';
  if (name.includes('cross')) return '✝️';
  if (name.includes('altar')) return '🕯️';
  if (name.includes('ark')) return '⛵';
  if (name.includes('tent') || name.includes('tabernacle')) return '⛺';
  if (name.includes('stone') || name.includes('rock')) return '🪨';
  if (name.includes('gate') || name.includes('door')) return '🚪';

  // Celestial
  if (name.includes('star')) return '⭐';
  if (name.includes('sun')) return '☀️';
  if (name.includes('moon')) return '🌙';
  if (name.includes('cloud')) return '☁️';
  if (name.includes('fire')) return '🔥';
  if (name.includes('light') || name.includes('lamp')) return '💡';

  // Objects
  if (name.includes('scroll') || name.includes('book')) return '📜';
  if (name.includes('crown')) return '👑';
  if (name.includes('sword')) return '⚔️';
  if (name.includes('shield')) return '🛡️';
  if (name.includes('staff') || name.includes('rod')) return '🪄';
  if (name.includes('trumpet')) return '🎺';
  if (name.includes('harp')) return '🎵';
  if (name.includes('incense')) return '🪔';
  if (name.includes('jar') || name.includes('vessel')) return '🏺';

  // Default
  return '📖';
}

// Fallback data for when API is unavailable
function getFallbackTriples(): BiblicalTriple[] {
  const placeholderSvg = (text: string) => {
    const svg = `
      <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#8B7355;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#D4A574;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="400" height="400" fill="url(#grad)"/>
        <text x="200" y="180" font-family="Georgia, serif" font-size="32" font-weight="bold" text-anchor="middle" fill="#fff" opacity="0.9">
          ${text}
        </text>
        <text x="200" y="220" font-family="Georgia, serif" font-size="18" text-anchor="middle" fill="#fff" opacity="0.7">
          Biblical Object
        </text>
      </svg>
    `;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  };

  return [
    {
      id: 0,
      objectName: "Fig Tree",
      objectNameZh: "無花果樹",
      chapterReference: "Mark 11:13",
      chapterReferenceZh: "馬可福音 11:13",
      verseText: "Seeing in the distance a fig tree in leaf, he went to find out if it had any fruit. When he reached it, he found nothing but leaves, because it was not the season for figs.",
      verseTextZh: "遠遠地看見一棵無花果樹，樹上有葉子，就往那裡去，或者在樹上可以找著什麼。到了樹下，竟找不著什麼，不過有葉子，因為不是收無花果的時候。",
      imageBase64: placeholderSvg("🌳")
    },
    {
      id: 1,
      objectName: "Lamb",
      objectNameZh: "羔羊",
      chapterReference: "John 1:29",
      chapterReferenceZh: "約翰福音 1:29",
      verseText: "The next day John saw Jesus coming toward him and said, 'Look, the Lamb of God, who takes away the sin of the world!'",
      verseTextZh: "次日，約翰看見耶穌來到他那裡，就說：「看哪，神的羔羊，除去世人罪孽的！」",
      imageBase64: placeholderSvg("🐑")
    },
    {
      id: 2,
      objectName: "Bread",
      objectNameZh: "餅",
      chapterReference: "John 6:35",
      chapterReferenceZh: "約翰福音 6:35",
      verseText: "Then Jesus declared, 'I am the bread of life. Whoever comes to me will never go hungry, and whoever believes in me will never be thirsty.'",
      verseTextZh: "耶穌說：「我就是生命的糧。到我這裡來的，必定不餓；信我的，永遠不渴。」",
      imageBase64: placeholderSvg("🍞")
    },
    {
      id: 3,
      objectName: "Olive Tree",
      objectNameZh: "橄欖樹",
      chapterReference: "Romans 11:17",
      chapterReferenceZh: "羅馬書 11:17",
      verseText: "If some of the branches have been broken off, and you, though a wild olive shoot, have been grafted in among the others and now share in the nourishing sap from the olive root.",
      verseTextZh: "若有幾根枝子被折下來，你這野橄欖得接在其中，一同得著橄欖根的肥汁。",
      imageBase64: placeholderSvg("🫒")
    },
    {
      id: 4,
      objectName: "Mountain",
      objectNameZh: "山",
      chapterReference: "Matthew 5:1",
      chapterReferenceZh: "馬太福音 5:1",
      verseText: "Now when Jesus saw the crowds, he went up on a mountainside and sat down. His disciples came to him.",
      verseTextZh: "耶穌看見這許多的人，就上了山，既已坐下，門徒到他跟前來。",
      imageBase64: placeholderSvg("⛰️")
    }
  ];
}
