import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import { UserProfile, AssessmentState, AssessmentQuestion, HolisticAnalysis, FinalResult, BibleStoryComparison } from '../types/character';
import { personalityTypes } from '../lib/personalityTypes';
import { lifeScenarios } from '../lib/lifeScenarios';
import { generateQuestion, generateBibleStoryComparison, isOpenAIConfigured } from '../services/openaiService';
import UserProfileForm from './character/UserProfileForm';
import ScenarioSelection from './character/ScenarioSelection';
import BibleStoryPreference from './character/BibleStoryPreference';
import AssessmentFlow from './character/AssessmentFlow';
import AnalysisView from './character/AnalysisView';
import ResultsView from './character/ResultsView';

interface CharacterDecisionProps {
  onBack?: () => void;
}

export default function CharacterDecision({ onBack }: CharacterDecisionProps) {
  const { t, i18n } = useTranslation(['common']);
  const isZh = i18n.language === 'zh-TW';

  const [assessmentState, setAssessmentState] = useState<AssessmentState>('profile');
  const [userProfile, setUserProfile] = useState<UserProfile>({
    lifeStage: '',
    interests: '',
    relationshipStatus: '',
    personalGoals: '',
    relationWithChristianity: ''
  });
  const [selectedScenarios, setSelectedScenarios] = useState<string[]>([]);
  const [showBibleStoriesDuringQuestions, setShowBibleStoriesDuringQuestions] = useState<boolean | null>(null);
  const [generatedQuestions, setGeneratedQuestions] = useState<AssessmentQuestion[]>([]);
  const [currentScenario, setCurrentScenario] = useState(0);
  const [responses, setResponses] = useState<string[]>([]);
  const [bibleStories, setBibleStories] = useState<BibleStoryComparison[]>([]);
  const [currentBibleStory, setCurrentBibleStory] = useState<BibleStoryComparison | null>(null);
  const [finalBibleCharacter, setFinalBibleCharacter] = useState<BibleStoryComparison | null>(null);
  const [currentResponse, setCurrentResponse] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingStory, setIsGeneratingStory] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [holisticAnalysis, setHolisticAnalysis] = useState<HolisticAnalysis | null>(null);
  const [finalResult, setFinalResult] = useState<FinalResult | null>(null);

  // Fallback question generator
  const generateFallbackQuestion = (category: string, profile: UserProfile): string => {
    const questions: Record<string, { en: string; zh: string }> = {
      family_conflict: {
        en: 'Tell me about a time when you faced a significant disagreement or conflict within your family or close relationships. How did you approach the situation, and what was most important to you in handling it?',
        zh: '請描述一次您在家庭或親密關係中面臨重大分歧或衝突的經歷。您如何處理這種情況，在處理時什麼對您最重要？'
      },
      personal_crisis: {
        en: 'Describe a personal crisis or unexpected challenge you\'ve faced in your life. How did you respond initially, and what helped you navigate through it?',
        zh: '描述您生活中面臨的個人危機或意外挑戰。您最初是如何回應的，什麼幫助您度過了難關？'
      },
      social_situations: {
        en: 'Share an experience involving a social gathering or group dynamic where you felt outside your comfort zone. How did you handle it, and what did you learn about yourself?',
        zh: '分享一次涉及社交聚會或群體動態的經歷，當時您感到不在舒適區。您如何處理，並從中了解了自己什麼？'
      },
      personal_growth: {
        en: 'Tell me about a time when you received difficult feedback or realized something challenging about yourself. How did you process it, and what did you do with that awareness?',
        zh: '講述一次您收到困難反饋或意識到自己某個挑戰性方面的經歷。您如何處理它，以及您如何運用這種認知？'
      },
      decision_making: {
        en: 'Describe an important personal decision you had to make with no clear "right" answer. How did you approach the decision, and what factors were most important to you?',
        zh: '描述您必須做出的一個重要個人決定，沒有明確的「正確」答案。您如何處理決策，哪些因素對您最重要？'
      },
      values_ethics: {
        en: 'Share a situation where you had to choose between what was easy/convenient and what you believed was right. What guided your choice, and how did you feel about the outcome?',
        zh: '分享一個您必須在方便/容易和您認為正確的事情之間做出選擇的情況。什麼引導了您的選擇，您對結果有何感受？'
      },
      creative_expression: {
        en: 'Tell me about a creative pursuit, hobby, or form of self-expression that\'s meaningful to you. What draws you to it, and what does it provide for you?',
        zh: '告訴我一個對您有意義的創意追求、愛好或自我表達形式。是什麼吸引您，它為您提供了什麼？'
      },
      conflict_resolution: {
        en: 'Describe a time when you had to resolve a conflict or disagreement with someone important to you. What approach did you take, and what was your goal in the situation?',
        zh: '描述一次您必須與對您重要的人解決衝突或分歧的經歷。您採取了什麼方法，在這種情況下您的目標是什麼？'
      },
      life_changes: {
        en: 'Tell me about a major life transition or change you\'ve experienced. How did you adapt, and what did you learn about yourself through the process?',
        zh: '講述您經歷的重大人生轉變或變化。您如何適應，通過這個過程您對自己有何了解？'
      },
      community_involvement: {
        en: 'Share your experience with community involvement, volunteering, or helping others outside your immediate circle. What motivates you to get involved (or not), and what does it mean to you?',
        zh: '分享您參與社區、志願服務或幫助圈外人士的經驗。是什麼激勵您參與（或不參與），這對您意味著什麼？'
      }
    };

    const questionObj = questions[category];
    if (!questionObj) {
      return isZh
        ? `告訴我一個在您的 ${profile.lifeStage} 階段塑造您的有意義經歷。`
        : `Tell me about a meaningful experience in your ${profile.lifeStage} stage that shaped who you are today.`;
    }

    return isZh ? questionObj.zh : questionObj.en;
  };

  // Handle Bible story preference selection
  const handleBibleStoryPreference = (showDuringQuestions: boolean) => {
    setShowBibleStoriesDuringQuestions(showDuringQuestions);
    setAssessmentState('assessing');
  };

  const handleGenerateQuestions = async () => {
    setIsGenerating(true);
    const questions: AssessmentQuestion[] = [];

    const optimalCount = Math.min(selectedScenarios.length, 3);
    const scenariesToUse = selectedScenarios.slice(0, optimalCount);
    const useOpenAI = isOpenAIConfigured();

    for (const scenarioId of scenariesToUse) {
      const scenario = lifeScenarios.find(s => s.id === scenarioId);
      if (scenario) {
        let questionText = '';

        if (useOpenAI) {
          // Use OpenAI to generate varied questions
          try {
            const label = isZh && scenario.labelZh ? scenario.labelZh : scenario.label;
            const description = isZh && scenario.descriptionZh ? scenario.descriptionZh : scenario.description;

            questionText = await generateQuestion(
              scenarioId,
              label,
              description,
              userProfile.lifeStage,
              isZh ? 'zh' : 'en'
            );
          } catch (error) {
            console.error('Error generating question with OpenAI, using fallback:', error);
            questionText = generateFallbackQuestion(scenarioId, userProfile);
          }
        } else {
          // Use fallback questions
          questionText = generateFallbackQuestion(scenarioId, userProfile);
        }

        questions.push({
          category: scenarioId,
          text: questionText
        });
      }
    }

    setGeneratedQuestions(questions);
    setIsGenerating(false);
    setAssessmentState('biblePreference');
  };

  // Submit response
  const submitResponse = async () => {
    if (!currentResponse.trim() || currentResponse.length < 50) {
      alert(isZh
        ? '請提供更詳細的回應（至少 50 字符）。'
        : 'Please provide a more detailed response (at least 50 characters).');
      return;
    }

    const newResponses = [...responses, currentResponse];
    setResponses(newResponses);

    // Generate Bible story comparison after user's response ONLY if user chose YES
    if (showBibleStoriesDuringQuestions) {
      setIsGeneratingStory(true);
      const currentQuestion = generatedQuestions[currentScenario];
      const scenario = lifeScenarios.find(s => s.id === currentQuestion?.category);
      const scenarioLabel = scenario ? (isZh && scenario.labelZh ? scenario.labelZh : scenario.label) : '';

      let bibleStory: BibleStoryComparison | null = null;

      if (isOpenAIConfigured()) {
        try {
          bibleStory = await generateBibleStoryComparison(
            scenarioLabel,
            currentResponse,
            isZh ? 'zh' : 'en'
          );
        } catch (error) {
          console.error('Error generating Bible story:', error);
        }
      }

      if (bibleStory) {
        setCurrentBibleStory(bibleStory);
        const newBibleStories = [...bibleStories, bibleStory];
        setBibleStories(newBibleStories);
      }

      setIsGeneratingStory(false);
    }

    setCurrentResponse('');

    // Don't auto-advance if showing Bible story, otherwise move to next
    if (!showBibleStoriesDuringQuestions) {
      continueToNextQuestion();
    }
  };

  // Continue to next question after viewing Bible story
  const continueToNextQuestion = () => {
    setCurrentBibleStory(null);

    if (currentScenario < generatedQuestions.length - 1) {
      setCurrentScenario(currentScenario + 1);
    } else {
      // Complete - analyze
      setAssessmentState('analyzing');
      setAnalysisProgress(0);
      performFinalAnalysis(responses);
    }
  };

  const performFinalAnalysis = async (userResponses: string[]) => {
    const analysis = await performAnalysis(userResponses);
    setHolisticAnalysis(analysis);

    const personalityType = personalityTypes[analysis.primaryType];
    setFinalResult({
      type: analysis.primaryType,
      confidence: analysis.confidence,
      personality: personalityType,
      analysis: analysis
    });

    // If user chose NO to Bible stories during questions, generate ONE final Bible character now
    if (!showBibleStoriesDuringQuestions && isOpenAIConfigured()) {
      try {
        const allResponses = userResponses.join('\n\n');
        const personalitySummary = `${personalityType.name}: ${personalityType.description}`;

        const finalBibleChar = await generateBibleStoryComparison(
          personalitySummary,
          allResponses,
          isZh ? 'zh' : 'en'
        );

        setFinalBibleCharacter(finalBibleChar);
      } catch (error) {
        console.error('Error generating final Bible character:', error);
      }
    }

    setAssessmentState('results');
  };

  // Perform holistic analysis
  const performAnalysis = async (userResponses: string[]): Promise<HolisticAnalysis> => {
    // Simulate analysis progress
    setAnalysisProgress(20);
    await new Promise(resolve => setTimeout(resolve, 500));
    setAnalysisProgress(60);
    await new Promise(resolve => setTimeout(resolve, 500));
    setAnalysisProgress(90);
    await new Promise(resolve => setTimeout(resolve, 500));
    setAnalysisProgress(100);

    // Mock analysis (in production, this would call AI API)
    return generateMockAnalysis(userResponses);
  };

  // Mock analysis generator
  const generateMockAnalysis = (userResponses: string[]): HolisticAnalysis => {
    const responseText = userResponses.join(' ').toLowerCase();

    // Simple pattern matching
    let type = "5"; // default
    if (responseText.includes('help') && responseText.includes('others')) type = "2";
    else if (responseText.includes('achieve') || responseText.includes('goal')) type = "3";
    else if (responseText.includes('feel') && responseText.includes('authentic')) type = "4";
    else if (responseText.includes('plan') || responseText.includes('prepare')) type = "6";
    else if (responseText.includes('harmony') || responseText.includes('peace')) type = "9";

    return {
      primaryType: type,
      confidence: 78,
      justification: isZh
        ? `根據您的回應，您顯示出一致的 ${personalityTypes[type].name} 特徵模式。您對生活情況的處理方式、決策風格和人際動態與類型 ${type} 一致。`
        : `Based on your responses, you show consistent patterns of ${personalityTypes[type].name} characteristics. Your approach to life situations, decision-making style, and interpersonal dynamics align with Type ${type}.`,
      keyEvidence: isZh
        ? [
          "溝通風格反映核心類型模式",
          "決策方法顯示特定類型動機",
          "壓力反應與類型特徵一致"
        ]
        : [
          "Communication style reflects core type patterns",
          "Decision-making approach shows type-specific motivations",
          "Stress responses align with type characteristics"
        ],
      corePatterns: {
        motivation: personalityTypes[type].strengths[0],
        fear: personalityTypes[type].challenges[0],
        communicationStyle: isZh ? "深思熟慮和有意圖" : "Thoughtful and intentional",
        stressResponse: isZh ? "有條理的問題解決" : "Methodical problem-solving",
        relationshipApproach: isZh ? "重視真實的連結" : "Values authentic connections"
      }
    };
  };

  // Restart assessment
  const restartAssessment = () => {
    setAssessmentState('profile');
    setUserProfile({
      lifeStage: '',
      interests: '',
      relationshipStatus: '',
      personalGoals: '',
      relationWithChristianity: ''
    });
    setSelectedScenarios([]);
    setGeneratedQuestions([]);
    setCurrentScenario(0);
    setResponses([]);
    setCurrentResponse('');
    setHolisticAnalysis(null);
    setFinalResult(null);
    setAnalysisProgress(0);
  };

  return (
    <div className="min-h-screen max-h-screen overflow-y-auto bg-gradient-to-b from-green-900 to-green-950 flex flex-col">
      {/* Back Button */}
      {onBack && (
        <div className="absolute top-4 left-4 z-50">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 bg-green-700 hover:bg-green-600 text-white rounded-lg transition-colors shadow-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{t('common:buttons.back')}</span>
          </button>
        </div>
      )}

      {/* Header */}
      <div className="text-center py-4 md:py-6 px-4 flex-shrink-0">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 tracking-tight">
          {t('common:features.bibleGame.characterTitle')}
        </h1>
        <p className="text-base md:text-lg text-green-200 max-w-2xl mx-auto">
          {t('common:features.bibleGame.characterDesc')}
        </p>

        {/* Progress Indicator */}
        <div className="mt-6 max-w-md mx-auto">
          <div className="flex items-center justify-center gap-2">
            <div className={`flex items-center gap-2 ${assessmentState === 'profile' ? 'text-white' : 'text-green-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 ${
                assessmentState === 'profile' ? 'bg-white text-green-900 border-white' : 'bg-green-600 border-green-400'
              }`}>
                1
              </div>
              <span className="text-sm font-semibold hidden sm:inline">{isZh ? '個人檔案' : 'Profile'}</span>
            </div>
            <div className="w-8 md:w-16 h-1 bg-green-700"></div>
            <div className={`flex items-center gap-2 ${assessmentState === 'scenarios' ? 'text-white' : 'text-green-700'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 ${
                assessmentState === 'scenarios' ? 'bg-white text-green-900 border-white' : 'bg-green-800 border-green-700'
              }`}>
                2
              </div>
              <span className="text-sm font-semibold hidden sm:inline">{isZh ? '選擇情境' : 'Scenarios'}</span>
            </div>
            <div className="w-8 md:w-16 h-1 bg-green-700"></div>
            <div className="flex items-center gap-2 text-green-700">
              <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold bg-green-800 border-2 border-green-700">
                3
              </div>
              <span className="text-sm font-semibold hidden sm:inline">{isZh ? '評估' : 'Assessment'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto pb-8">
        {assessmentState === 'profile' && (
          <UserProfileForm
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            onContinue={() => setAssessmentState('scenarios')}
          />
        )}

        {assessmentState === 'scenarios' && (
          <div className="relative">
            <button
              onClick={() => setAssessmentState('profile')}
              className="absolute top-4 left-4 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm z-10"
            >
              ← {isZh ? '返回' : 'Back'}
            </button>
            <ScenarioSelection
              selectedScenarios={selectedScenarios}
              setSelectedScenarios={setSelectedScenarios}
              userProfile={userProfile}
              onGenerateQuestions={handleGenerateQuestions}
              isGenerating={isGenerating}
            />
          </div>
        )}

        {assessmentState === 'biblePreference' && (
          <BibleStoryPreference onSelect={handleBibleStoryPreference} />
        )}

        {assessmentState === 'assessing' && (
          <AssessmentFlow
            currentScenario={currentScenario}
            generatedQuestions={generatedQuestions}
            currentResponse={currentResponse}
            setCurrentResponse={setCurrentResponse}
            onSubmitResponse={submitResponse}
            onContinue={continueToNextQuestion}
            lifeScenarios={lifeScenarios}
            currentBibleStory={currentBibleStory}
            isGeneratingStory={isGeneratingStory}
          />
        )}

        {assessmentState === 'analyzing' && (
          <AnalysisView analysisProgress={analysisProgress} />
        )}

        {assessmentState === 'results' && (
          <ResultsView
            finalResult={finalResult}
            holisticAnalysis={holisticAnalysis}
            responses={responses}
            generatedQuestions={generatedQuestions}
            onRestartAssessment={restartAssessment}
            lifeScenarios={lifeScenarios}
            bibleStories={bibleStories}
            finalBibleCharacter={finalBibleCharacter}
          />
        )}
      </div>
    </div>
  );
}
