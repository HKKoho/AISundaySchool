import { GoogleGenAI, Type } from "@google/genai";
import { RouteData, QuizQuestion } from "./types";

const GEMINI_API_KEY = (process.env.GEMINI_API_KEY || process.env.API_KEY) as string | undefined;

let ai: GoogleGenAI | null = null;

if (GEMINI_API_KEY) {
  ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  console.log('[JourneyService] Gemini AI initialized');
} else {
  console.warn('[JourneyService] No API key found, using fallback data');
}

export const generateRouteData = async (
  routeId: string,
  routeTitle: string,
  routeTitleZh: string
): Promise<RouteData> => {
  if (!ai) {
    console.log('[JourneyService] Using fallback route data');
    return getFallbackRouteData(routeId);
  }

  try {
    console.log(`[JourneyService] Generating route data for: ${routeTitle}`);

    const model = "gemini-2.0-flash-exp";

    const prompt = `
      Generate a historical and biblical route for "${routeTitle}" (${routeTitleZh}).
      Create a list of 5 to 7 key chronological stops (locations) for this journey.

      For each stop, provide content in BOTH English and Traditional Chinese:
      1. A short name (e.g., "Mount Sinai" / "西奈山")
      2. A brief narrative description of what happened there (max 2 sentences in each language)
      3. A "Theological Insight" explaining the spiritual significance of this event (in both languages)
      4. A descriptive "Image Prompt" in English that can be used to generate a historical, oil-painting style illustration
      5. Approximate Latitude and Longitude for mapping purposes

      IMPORTANT: Provide all text fields in both English and Traditional Chinese.
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
            titleZh: { type: Type.STRING },
            description: { type: Type.STRING },
            descriptionZh: { type: Type.STRING },
            stops: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.NUMBER },
                  name: { type: Type.STRING },
                  nameZh: { type: Type.STRING },
                  description: { type: Type.STRING },
                  descriptionZh: { type: Type.STRING },
                  theology: { type: Type.STRING },
                  theologyZh: { type: Type.STRING },
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

    const data = JSON.parse(response.text) as RouteData;
    console.log(`[JourneyService] Successfully generated ${data.stops.length} stops`);
    return data;

  } catch (error) {
    console.error('[JourneyService] Error generating route data:', error);
    console.log('[JourneyService] Falling back to preset data');
    return getFallbackRouteData(routeId);
  }
};

export const generateQuizForStep = async (
  currentStopName: string,
  currentStopNameZh: string,
  nextStopName: string,
  nextStopNameZh: string,
  routeTitle: string
): Promise<QuizQuestion> => {
  if (!ai) {
    console.log('[JourneyService] Using fallback quiz');
    return getFallbackQuiz();
  }

  try {
    console.log(`[JourneyService] Generating quiz: ${currentStopName} -> ${nextStopName}`);

    const model = "gemini-2.0-flash-exp";

    const prompt = `
      The user is playing a game about the biblical route: "${routeTitle}".
      They are currently at "${currentStopName}" (${currentStopNameZh}) and need to travel to "${nextStopName}" (${nextStopNameZh}).

      Generate a multiple-choice quiz question that bridges these two events or tests knowledge about the current location before they can leave.

      Provide content in BOTH English and Traditional Chinese:
      1. Question text in both languages
      2. 4 options in both languages (same order)
      3. Correct answer index (0-3)
      4. Short explanation in both languages

      The question should be engaging and biblically accurate.
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
            questionZh: { type: Type.STRING },
            options: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            optionsZh: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            correctAnswerIndex: { type: Type.NUMBER },
            explanation: { type: Type.STRING },
            explanationZh: { type: Type.STRING }
          }
        }
      }
    });

    if (!response.text) {
      throw new Error("No quiz generated");
    }

    const quiz = JSON.parse(response.text) as QuizQuestion;
    console.log('[JourneyService] Quiz generated successfully');
    return quiz;

  } catch (error) {
    console.error('[JourneyService] Error generating quiz:', error);
    console.log('[JourneyService] Falling back to preset quiz');
    return getFallbackQuiz();
  }
};

// Fallback data for when API is unavailable
function getFallbackRouteData(routeId: string): RouteData {
  const fallbackRoutes: Record<string, RouteData> = {
    exodus: {
      title: "The Exodus",
      titleZh: "出埃及記",
      description: "Journey from slavery in Egypt to the Promised Land",
      descriptionZh: "從埃及的奴役到應許之地的旅程",
      stops: [
        {
          id: 1,
          name: "Rameses",
          nameZh: "蘭塞",
          description: "The Israelites begin their journey out of Egypt after 400 years of slavery.",
          descriptionZh: "以色列人在經過400年的奴役後，開始離開埃及的旅程。",
          theology: "God hears the cries of the oppressed and moves to deliver His people.",
          theologyZh: "神聽見受壓迫者的哀求，並採取行動拯救祂的子民。",
          imagePrompt: "Ancient Egyptian city of Rameses with Hebrew slaves departing, carrying belongings, oil painting style",
          coordinates: { lat: 30.8, lng: 31.9 }
        },
        {
          id: 2,
          name: "Red Sea Crossing",
          nameZh: "紅海渡口",
          description: "God parts the Red Sea, allowing Israel to cross on dry ground while Pharaoh's army is destroyed.",
          descriptionZh: "神分開紅海，讓以色列人走乾地過去，而法老的軍隊被毀滅。",
          theology: "God's power over nature demonstrates His sovereignty and faithfulness to His covenant.",
          theologyZh: "神對自然的能力彰顯了祂的主權和對祂約的信實。",
          imagePrompt: "Dramatic scene of parted Red Sea with walls of water, Israelites crossing, oil painting",
          coordinates: { lat: 29.9, lng: 32.6 }
        },
        {
          id: 3,
          name: "Mount Sinai",
          nameZh: "西奈山",
          description: "Moses receives the Ten Commandments and the Law from God on the mountain.",
          descriptionZh: "摩西在山上從神那裡領受十誡和律法。",
          theology: "God establishes His covenant with Israel, revealing His character and expectations.",
          theologyZh: "神與以色列立約，顯明祂的性格和期望。",
          imagePrompt: "Mount Sinai with Moses receiving stone tablets, lightning and clouds, dramatic biblical scene",
          coordinates: { lat: 28.5, lng: 33.97 }
        },
        {
          id: 4,
          name: "Kadesh Barnea",
          nameZh: "加低斯巴尼亞",
          description: "Israel's rebellion and refusal to enter the Promised Land leads to 40 years of wandering.",
          descriptionZh: "以色列的反叛和拒絕進入應許之地導致了40年的漂流。",
          theology: "Unbelief and disobedience have consequences, but God remains faithful despite human failure.",
          theologyZh: "不信和悖逆會有後果，但儘管人類失敗，神仍然信實。",
          imagePrompt: "Desert oasis of Kadesh Barnea with Israelite camp, wilderness setting, historical painting",
          coordinates: { lat: 30.7, lng: 34.4 }
        },
        {
          id: 5,
          name: "Plains of Moab",
          nameZh: "摩押平原",
          description: "The new generation prepares to enter the Promised Land as Moses delivers his final addresses.",
          descriptionZh: "新一代準備進入應許之地，摩西發表他的最後講話。",
          theology: "God's promises endure across generations; faithfulness is passed from parent to child.",
          theologyZh: "神的應許跨越世代持續；信實從父母傳給孩子。",
          imagePrompt: "Plains of Moab overlooking Jordan River and Promised Land, Moses addressing people, sunset",
          coordinates: { lat: 31.8, lng: 35.7 }
        }
      ]
    },
    david: {
      title: "David Fleeing Saul",
      titleZh: "大衛逃避掃羅",
      description: "The wilderness wanderings of the future King",
      descriptionZh: "未來君王的曠野漂流",
      stops: [
        {
          id: 1,
          name: "Gibeah",
          nameZh: "基比亞",
          description: "David flees from Saul's court where the jealous king first tries to kill him.",
          descriptionZh: "大衛逃離掃羅的宮廷，嫉妒的王第一次試圖殺他。",
          theology: "God's anointed often face opposition, but His purposes will prevail.",
          theologyZh: "神所膏立的人常面對反對，但祂的旨意必會成就。",
          imagePrompt: "Ancient Israelite palace of Gibeah, David fleeing at night, dramatic lighting",
          coordinates: { lat: 31.9, lng: 35.2 }
        },
        {
          id: 2,
          name: "Cave of Adullam",
          nameZh: "亞杜蘭洞",
          description: "David gathers a band of followers in this cave refuge.",
          descriptionZh: "大衛在這個洞穴避難所聚集了一群追隨者。",
          theology: "God builds His kingdom through the humble and the outcast.",
          theologyZh: "神透過謙卑的人和被遺棄的人建立祂的國度。",
          imagePrompt: "Cave entrance in wilderness with David and his men gathering, oil painting style",
          coordinates: { lat: 31.7, lng: 34.9 }
        },
        {
          id: 3,
          name: "En Gedi",
          nameZh: "隱基底",
          description: "David spares Saul's life in the wilderness of En Gedi, showing mercy to his enemy.",
          descriptionZh: "大衛在隱基底的曠野饒了掃羅的性命，向他的敵人施憐憫。",
          theology: "Vengeance belongs to God; mercy triumphs over judgment.",
          theologyZh: "伸冤在神；憐憫勝過審判。",
          imagePrompt: "Desert oasis of En Gedi with caves, David cutting Saul's robe, biblical scene",
          coordinates: { lat: 31.4, lng: 35.4 }
        }
      ]
    }
  };

  return fallbackRoutes[routeId] || fallbackRoutes.exodus;
}

function getFallbackQuiz(): QuizQuestion {
  return {
    question: "What did God provide to guide the Israelites in the wilderness?",
    questionZh: "神提供什麼來引導以色列人在曠野中？",
    options: [
      "A golden compass",
      "A pillar of cloud and fire",
      "A magical map",
      "A talking donkey"
    ],
    optionsZh: [
      "金色指南針",
      "雲柱和火柱",
      "魔法地圖",
      "會說話的驢"
    ],
    correctAnswerIndex: 1,
    explanation: "God led the Israelites with a pillar of cloud by day and a pillar of fire by night (Exodus 13:21-22).",
    explanationZh: "神用雲柱在白天引導以色列人，用火柱在夜間引導（出埃及記13:21-22）。"
  };
}
