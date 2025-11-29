import { GoogleGenAI, Type } from "@google/genai";
import { BiblicalTriple } from "../types";

// Initialize Gemini Client
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("VITE_GEMINI_API_KEY is not defined in environment variables");
}
const ai = new GoogleGenAI({ apiKey });

/**
 * Generates 5 Biblical triples (object name, chapter reference, verse, and image prompt) using the text model.
 */
export const generateBiblicalTriples = async (): Promise<Array<{objectName: string, chapterReference: string, verseText: string, imagePrompt: string}>> => {
  const modelId = "gemini-2.0-flash-exp";

  const prompt = `
    Generate exactly 5 distinct Biblical objects for a memory matching game.

    Requirements:
    1. Select objects from these categories: Plants, Animals, Food, or Places mentioned in the Bible
    2. Each object should be visually distinctive and recognizable
    3. Choose specific Bible chapters (Book + Chapter) that clearly mention each object
    4. Include the actual Bible verse text that mentions the object
    5. Objects should be from different categories when possible
    6. Create detailed image prompts that will generate clear, biblical-style illustrations

    Return pure JSON with this schema:
    {
      "triples": [
        {
          "objectName": "Fig Tree",
          "chapterReference": "Mark 11:13",
          "verseText": "Seeing in the distance a fig tree in leaf, he went to find out if it had any fruit. When he reached it, he found nothing but leaves, because it was not the season for figs.",
          "imagePrompt": "A detailed biblical-style illustration of a fig tree..."
        },
        ... (4 more)
      ]
    }
  `;

  try {
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
                  chapterReference: { type: Type.STRING },
                  verseText: { type: Type.STRING },
                  imagePrompt: { type: Type.STRING }
                },
                required: ["objectName", "chapterReference", "verseText", "imagePrompt"]
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
    return parsed.triples;
  } catch (error) {
    console.error("Error generating biblical triples:", error);
    throw error;
  }
};

/**
 * Generates an image URL using Unsplash API for real photos
 */
export const generateImage = (imagePrompt: string, objectName: string): string => {
  const searchTerm = extractSearchTerm(objectName);

  // Use Unsplash Source API for random images based on search term
  // This is a free service that doesn't require API key
  const unsplashUrl = `https://source.unsplash.com/400x400/?${encodeURIComponent(searchTerm)}`;

  console.log(`Fetching real image for ${objectName}: ${unsplashUrl}`);

  return unsplashUrl;
};

function extractSearchTerm(objectName: string): string {
  const name = objectName.toLowerCase();

  // Extract the main keyword for image search - optimized for biblical objects
  if (name.includes('fig')) return 'fig,tree,fruit';
  if (name.includes('olive')) return 'olive,tree,branch';
  if (name.includes('grape') || name.includes('vine')) return 'grape,vineyard,wine';
  if (name.includes('wheat')) return 'wheat,field,grain';
  if (name.includes('lion')) return 'lion,wildlife';
  if (name.includes('lamb') || name.includes('sheep')) return 'sheep,lamb,pastoral';
  if (name.includes('dove') || name.includes('bird')) return 'dove,bird,white';
  if (name.includes('fish')) return 'fish,water';
  if (name.includes('bread')) return 'bread,loaf';
  if (name.includes('wine')) return 'wine,chalice,goblet';
  if (name.includes('honey')) return 'honey,honeycomb';
  if (name.includes('mountain')) return 'mountain,landscape,peak';
  if (name.includes('river') || name.includes('jordan')) return 'river,water,stream';
  if (name.includes('temple') || name.includes('jerusalem')) return 'temple,architecture,ancient';
  if (name.includes('desert') || name.includes('wilderness')) return 'desert,sand,dunes';
  if (name.includes('garden') || name.includes('eden')) return 'garden,paradise,nature';
  if (name.includes('sea')) return 'sea,ocean,water';
  if (name.includes('well')) return 'well,water,stone';
  if (name.includes('palm')) return 'palm,tree,tropical';
  if (name.includes('cedar')) return 'cedar,tree,forest';
  if (name.includes('locust')) return 'locust,insect';
  if (name.includes('manna')) return 'bread,grain';
  if (name.includes('camel')) return 'camel,desert';
  if (name.includes('serpent') || name.includes('snake')) return 'snake,serpent';

  // Default: use the object name
  return objectName.replace(/\s+/g, ',');
}

function createSVGImage(objectName: string, searchTerm: string): string {
  const colors = getColorTheme(objectName);
  const icon = getIconShape(objectName);

  // Create unique gradient ID based on object name
  const gradientId = `grad-${objectName.toLowerCase().replace(/\s+/g, '-')}`;

  const svg = `<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${colors.start};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${colors.end};stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="400" height="400" fill="url(#${gradientId})"/>
  ${icon}
  <text x="200" y="320" font-size="36" font-weight="bold" text-anchor="middle" fill="white" font-family="Arial, sans-serif">${objectName}</text>
</svg>`;

  // Use URI encoding instead of btoa to avoid emoji issues
  const dataUri = `data:image/svg+xml,${encodeURIComponent(svg)}`;

  console.log(`Created SVG for ${objectName}:`, {
    colors,
    gradientId,
    dataUriLength: dataUri.length,
    svgPreview: svg.substring(0, 200)
  });

  return dataUri;
}

function getIconShape(objectName: string): string {
  const name = objectName.toLowerCase();

  // Animals - larger, more prominent
  if (name.includes('lion')) {
    return '<circle cx="200" cy="160" r="60" fill="rgba(255,255,255,0.9)"/><circle cx="180" cy="150" r="12" fill="rgba(139,69,19,0.8)"/><circle cx="220" cy="150" r="12" fill="rgba(139,69,19,0.8)"/><path d="M 180 180 Q 200 190 220 180" stroke="rgba(139,69,19,0.8)" stroke-width="3" fill="none"/><circle cx="160" cy="140" r="20" fill="rgba(255,255,255,0.7)"/><circle cx="240" cy="140" r="20" fill="rgba(255,255,255,0.7)"/>';
  }
  if (name.includes('lamb') || name.includes('sheep')) {
    return '<ellipse cx="200" cy="170" rx="70" ry="50" fill="rgba(255,255,255,0.95)"/><circle cx="200" cy="140" r="40" fill="rgba(255,255,255,0.95)"/><circle cx="185" cy="135" r="8" fill="rgba(0,0,0,0.7)"/><circle cx="215" cy="135" r="8" fill="rgba(0,0,0,0.7)"/>';
  }
  if (name.includes('dove') || name.includes('bird')) {
    return '<ellipse cx="200" cy="160" rx="50" ry="70" fill="rgba(255,255,255,0.9)"/><circle cx="200" cy="130" r="30" fill="rgba(255,255,255,0.9)"/><path d="M 150 160 Q 120 140 100 160" stroke="rgba(255,255,255,0.8)" stroke-width="8" fill="none"/><path d="M 250 160 Q 280 140 300 160" stroke="rgba(255,255,255,0.8)" stroke-width="8" fill="none"/>';
  }
  if (name.includes('fish')) {
    return '<ellipse cx="200" cy="180" rx="80" ry="40" fill="rgba(255,255,255,0.9)"/><circle cx="230" cy="170" r="8" fill="rgba(0,0,0,0.7)"/><path d="M 280 180 L 320 160 L 320 200 Z" fill="rgba(255,255,255,0.8)"/>';
  }

  // Plants - larger, more visible
  if (name.includes('tree') || name.includes('fig') || name.includes('olive') || name.includes('palm')) {
    return '<rect x="185" y="200" width="30" height="100" fill="rgba(139,69,19,0.9)"/><circle cx="200" cy="170" r="70" fill="rgba(255,255,255,0.85)"/><circle cx="180" cy="150" r="50" fill="rgba(255,255,255,0.7)"/><circle cx="220" cy="150" r="50" fill="rgba(255,255,255,0.7)"/>';
  }
  if (name.includes('grape') || name.includes('vine')) {
    return '<circle cx="200" cy="130" r="25" fill="rgba(147,51,234,0.8)"/><circle cx="175" cy="155" r="25" fill="rgba(147,51,234,0.8)"/><circle cx="225" cy="155" r="25" fill="rgba(147,51,234,0.8)"/><circle cx="190" cy="180" r="25" fill="rgba(147,51,234,0.8)"/><circle cx="210" cy="180" r="25" fill="rgba(147,51,234,0.8)"/>';
  }
  if (name.includes('wheat')) {
    return '<line x1="200" y1="250" x2="200" y2="130" stroke="rgba(210,180,140,0.9)" stroke-width="8"/><circle cx="190" cy="120" r="12" fill="rgba(218,165,32,0.9)"/><circle cx="210" cy="120" r="12" fill="rgba(218,165,32,0.9)"/><circle cx="200" cy="105" r="12" fill="rgba(218,165,32,0.9)"/>';
  }

  // Food - more prominent
  if (name.includes('bread')) {
    return '<ellipse cx="200" cy="180" rx="90" ry="60" fill="rgba(255,248,220,0.95)"/><ellipse cx="200" cy="175" rx="80" ry="50" fill="rgba(222,184,135,0.8)"/>';
  }
  if (name.includes('wine')) {
    return '<path d="M 150 110 L 165 200 Q 200 220 235 200 L 250 110 Z" fill="rgba(255,255,255,0.9)"/><rect x="150" y="100" width="100" height="15" fill="rgba(255,255,255,0.9)"/>';
  }
  if (name.includes('honey')) {
    return '<path d="M 200 130 L 230 150 L 220 200 L 180 200 L 170 150 Z" fill="rgba(255,215,0,0.9)"/><path d="M 200 140 L 220 155 L 215 190 L 185 190 L 180 155 Z" fill="rgba(255,193,7,0.7)"/>';
  }

  // Places - larger, more dramatic
  if (name.includes('mountain')) {
    return '<path d="M 80 280 L 200 100 L 320 280 Z" fill="rgba(255,255,255,0.7)"/><path d="M 130 280 L 230 120 L 300 280 Z" fill="rgba(255,255,255,0.5)"/><path d="M 200 100 L 180 140 L 220 140 Z" fill="rgba(255,255,255,0.9)"/>';
  }
  if (name.includes('river') || name.includes('sea')) {
    return '<path d="M 50 160 Q 150 140 200 160 Q 250 180 350 160" stroke="rgba(173,216,230,0.9)" stroke-width="40" fill="none"/><path d="M 50 190 Q 150 170 200 190 Q 250 210 350 190" stroke="rgba(135,206,250,0.8)" stroke-width="30" fill="none"/>';
  }
  if (name.includes('temple') || name.includes('city') || name.includes('jerusalem')) {
    return '<rect x="140" y="140" width="120" height="140" fill="rgba(255,255,255,0.9)"/><polygon points="140,140 200,90 260,140" fill="rgba(255,255,255,0.95)"/><rect x="170" y="180" width="25" height="40" fill="rgba(139,69,19,0.7)"/><rect x="205" y="180" width="25" height="40" fill="rgba(139,69,19,0.7)"/>';
  }
  if (name.includes('desert')) {
    return '<ellipse cx="200" cy="220" rx="130" ry="50" fill="rgba(255,248,220,0.8)"/><ellipse cx="250" cy="200" rx="90" ry="35" fill="rgba(255,228,196,0.7)"/><ellipse cx="150" cy="210" rx="80" ry="30" fill="rgba(255,239,213,0.6)"/>';
  }
  if (name.includes('garden')) {
    return '<circle cx="170" cy="150" r="40" fill="rgba(144,238,144,0.8)"/><circle cx="230" cy="150" r="40" fill="rgba(144,238,144,0.8)"/><circle cx="200" cy="190" r="40" fill="rgba(144,238,144,0.8)"/><circle cx="200" cy="130" r="35" fill="rgba(152,251,152,0.7)"/>';
  }
  if (name.includes('manna')) {
    return '<circle cx="180" cy="140" r="18" fill="rgba(255,255,255,0.9)"/><circle cx="220" cy="140" r="18" fill="rgba(255,255,255,0.9)"/><circle cx="200" cy="170" r="20" fill="rgba(255,255,255,0.95)"/><circle cx="170" cy="180" r="15" fill="rgba(255,255,255,0.85)"/><circle cx="230" cy="180" r="15" fill="rgba(255,255,255,0.85)"/>';
  }
  if (name.includes('locust')) {
    return '<ellipse cx="200" cy="170" rx="60" ry="30" fill="rgba(139,69,19,0.8)"/><circle cx="200" cy="150" r="25" fill="rgba(160,82,45,0.8)"/><line x1="150" y1="160" x2="120" y2="140" stroke="rgba(139,69,19,0.7)" stroke-width="4"/><line x1="250" y1="160" x2="280" y2="140" stroke="rgba(139,69,19,0.7)" stroke-width="4"/>';
  }

  // Default - book/scroll
  return '<rect x="130" y="110" width="140" height="180" rx="15" fill="rgba(255,255,255,0.9)"/><line x1="160" y1="150" x2="240" y2="150" stroke="rgba(139,69,19,0.6)" stroke-width="4"/><line x1="160" y1="180" x2="240" y2="180" stroke="rgba(139,69,19,0.6)" stroke-width="4"/><line x1="160" y1="210" x2="240" y2="210" stroke="rgba(139,69,19,0.6)" stroke-width="4"/><line x1="160" y1="240" x2="240" y2="240" stroke="rgba(139,69,19,0.6)" stroke-width="4"/>';
}

function getColorTheme(objectName: string): { start: string; end: string } {
  const name = objectName.toLowerCase();

  // Animals - warm earth tones
  if (name.includes('lion') || name.includes('camel')) return { start: '#d4a373', end: '#8b5a3c' };
  if (name.includes('lamb') || name.includes('sheep')) return { start: '#e8d5c4', end: '#b8a898' };
  if (name.includes('dove') || name.includes('bird')) return { start: '#87ceeb', end: '#4682b4' };
  if (name.includes('fish')) return { start: '#40e0d0', end: '#20b2aa' };

  // Plants - green tones
  if (name.includes('fig') || name.includes('tree')) return { start: '#6b8e23', end: '#556b2f' };
  if (name.includes('olive')) return { start: '#808000', end: '#556b2f' };
  if (name.includes('grape') || name.includes('vine')) return { start: '#8e4585', end: '#5d3a5a' };
  if (name.includes('wheat')) return { start: '#daa520', end: '#b8860b' };

  // Food - warm tones
  if (name.includes('bread')) return { start: '#d2691e', end: '#8b4513' };
  if (name.includes('wine')) return { start: '#722f37', end: '#4a1f26' };
  if (name.includes('honey')) return { start: '#ffd700', end: '#ffb347' };

  // Places - varied natural tones
  if (name.includes('mountain')) return { start: '#696969', end: '#2f4f4f' };
  if (name.includes('river') || name.includes('sea')) return { start: '#4682b4', end: '#1e3a5f' };
  if (name.includes('desert')) return { start: '#edc9af', end: '#d2b48c' };
  if (name.includes('temple') || name.includes('city')) return { start: '#daa520', end: '#8b6914' };
  if (name.includes('garden')) return { start: '#90ee90', end: '#228b22' };

  // Default - biblical gold/brown
  return { start: '#d4af37', end: '#8b7355' };
}

/**
 * Maps object names to relevant emojis for visual representation
 */
function getEmojiForObject(objectName: string): string {
  const name = objectName.toLowerCase();

  // Animals
  if (name.includes('lion')) return '🦁';
  if (name.includes('lamb') || name.includes('sheep')) return '🐑';
  if (name.includes('dove') || name.includes('bird')) return '🕊️';
  if (name.includes('fish')) return '🐟';
  if (name.includes('serpent') || name.includes('snake')) return '🐍';
  if (name.includes('donkey')) return '🫏';
  if (name.includes('camel')) return '🐫';
  if (name.includes('ox') || name.includes('cattle')) return '🐂';
  if (name.includes('raven') || name.includes('crow')) return '🐦‍⬛';
  if (name.includes('eagle')) return '🦅';

  // Plants
  if (name.includes('fig')) return '🌳';
  if (name.includes('olive')) return '🫒';
  if (name.includes('grape') || name.includes('vine')) return '🍇';
  if (name.includes('wheat')) return '🌾';
  if (name.includes('tree')) return '🌲';
  if (name.includes('flower') || name.includes('lily')) return '🌺';
  if (name.includes('palm')) return '🌴';
  if (name.includes('cedar')) return '🌲';

  // Food
  if (name.includes('bread')) return '🍞';
  if (name.includes('wine')) return '🍷';
  if (name.includes('milk')) return '🥛';
  if (name.includes('honey')) return '🍯';
  if (name.includes('manna')) return '✨';
  if (name.includes('oil')) return '🫗';

  // Places
  if (name.includes('mountain') || name.includes('sinai') || name.includes('zion')) return '⛰️';
  if (name.includes('river') || name.includes('jordan')) return '🌊';
  if (name.includes('desert') || name.includes('wilderness')) return '🏜️';
  if (name.includes('temple')) return '🕌';
  if (name.includes('city') || name.includes('jerusalem')) return '🏛️';
  if (name.includes('garden') || name.includes('eden')) return '🌿';
  if (name.includes('sea')) return '🌊';
  if (name.includes('well')) return '💧';

  // Default
  return '📖';
}

/**
 * Delay helper to avoid rate limiting
 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Generates all 5 triples with real photo representations for the game
 */
export const generateGameTriples = async (): Promise<BiblicalTriple[]> => {
  try {
    // Generate the 5 triple data (names, chapters, verses, prompts)
    const triplesData = await generateBiblicalTriples();

    // Generate visual representations (real photos from Unsplash) for each triple
    const triplesWithImages: BiblicalTriple[] = triplesData.map((triple, index) => ({
      id: index,
      objectName: triple.objectName,
      chapterReference: triple.chapterReference,
      verseText: triple.verseText,
      imageBase64: generateImage(triple.imagePrompt, triple.objectName)
    }));

    return triplesWithImages;
  } catch (error) {
    console.error("Error generating game triples:", error);
    throw error;
  }
};