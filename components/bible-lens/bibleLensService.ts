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

    // Map to BiblicalTriple format with image generation
    const triples: BiblicalTriple[] = parsed.triples.map((triple: any, index: number) => ({
      id: index,
      objectName: triple.objectName,
      objectNameZh: triple.objectNameZh,
      chapterReference: triple.chapterReference,
      chapterReferenceZh: triple.chapterReferenceZh,
      verseText: triple.verseText,
      verseTextZh: triple.verseTextZh,
      imageBase64: generateImage(triple.objectName)
    }));

    console.log('[BibleLensService] Successfully generated triples:', triples.length);
    return triples;

  } catch (error) {
    console.error('[BibleLensService] Error generating triples:', error);
    console.log('[BibleLensService] Falling back to preset data');
    return getFallbackTriples();
  }
};

/**
 * Generates an image using Unsplash or creates an SVG
 */
function generateImage(objectName: string): string {
  const searchTerm = extractSearchTerm(objectName);

  // Use Unsplash Source API for random images based on search term
  const unsplashUrl = `https://source.unsplash.com/400x400/?${encodeURIComponent(searchTerm)}`;

  console.log(`[BibleLensService] Image for ${objectName}: ${unsplashUrl}`);

  return unsplashUrl;
}

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

// Fallback data for when API is unavailable
function getFallbackTriples(): BiblicalTriple[] {
  return [
    {
      id: 0,
      objectName: "Fig Tree",
      objectNameZh: "無花果樹",
      chapterReference: "Mark 11:13",
      chapterReferenceZh: "馬可福音 11:13",
      verseText: "Seeing in the distance a fig tree in leaf, he went to find out if it had any fruit. When he reached it, he found nothing but leaves, because it was not the season for figs.",
      verseTextZh: "遠遠地看見一棵無花果樹，樹上有葉子，就往那裡去，或者在樹上可以找著什麼。到了樹下，竟找不著什麼，不過有葉子，因為不是收無花果的時候。",
      imageBase64: "https://source.unsplash.com/400x400/?fig,tree,fruit"
    },
    {
      id: 1,
      objectName: "Lamb",
      objectNameZh: "羔羊",
      chapterReference: "John 1:29",
      chapterReferenceZh: "約翰福音 1:29",
      verseText: "The next day John saw Jesus coming toward him and said, 'Look, the Lamb of God, who takes away the sin of the world!'",
      verseTextZh: "次日，約翰看見耶穌來到他那裡，就說：「看哪，神的羔羊，除去世人罪孽的！」",
      imageBase64: "https://source.unsplash.com/400x400/?sheep,lamb,pastoral"
    },
    {
      id: 2,
      objectName: "Bread",
      objectNameZh: "餅",
      chapterReference: "John 6:35",
      chapterReferenceZh: "約翰福音 6:35",
      verseText: "Then Jesus declared, 'I am the bread of life. Whoever comes to me will never go hungry, and whoever believes in me will never be thirsty.'",
      verseTextZh: "耶穌說：「我就是生命的糧。到我這裡來的，必定不餓；信我的，永遠不渴。」",
      imageBase64: "https://source.unsplash.com/400x400/?bread,loaf"
    },
    {
      id: 3,
      objectName: "Olive Tree",
      objectNameZh: "橄欖樹",
      chapterReference: "Romans 11:17",
      chapterReferenceZh: "羅馬書 11:17",
      verseText: "If some of the branches have been broken off, and you, though a wild olive shoot, have been grafted in among the others and now share in the nourishing sap from the olive root.",
      verseTextZh: "若有幾根枝子被折下來，你這野橄欖得接在其中，一同得著橄欖根的肥汁。",
      imageBase64: "https://source.unsplash.com/400x400/?olive,tree,branch"
    },
    {
      id: 4,
      objectName: "Mountain",
      objectNameZh: "山",
      chapterReference: "Matthew 5:1",
      chapterReferenceZh: "馬太福音 5:1",
      verseText: "Now when Jesus saw the crowds, he went up on a mountainside and sat down. His disciples came to him.",
      verseTextZh: "耶穌看見這許多的人，就上了山，既已坐下，門徒到他跟前來。",
      imageBase64: "https://source.unsplash.com/400x400/?mountain,landscape,peak"
    }
  ];
}
