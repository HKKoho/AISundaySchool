'use client';

import React, { useState } from 'react';
import { UserProfile, AssessmentState, AssessmentQuestion, HolisticAnalysis, FinalResult } from '@/types';
import { personalityTypes } from '@/lib/personalityTypes';
import { lifeScenarios, demoProfiles, demoResponses } from '@/lib/lifeScenarios';
import UserProfileForm from './UserProfileForm';
import ScenarioSelection from './ScenarioSelection';
import AssessmentFlow from './AssessmentFlow';
import AnalysisView from './AnalysisView';
import ResultsView from './ResultsView';

export default function LifeCharacterAssessment() {
  // State Management
  const [assessmentState, setAssessmentState] = useState<AssessmentState>('profile');
  const [userProfile, setUserProfile] = useState<UserProfile>({
    lifeStage: '',
    interests: '',
    relationshipStatus: '',
    personalGoals: '',
    relationWithChristianity: ''
  });

  const [selectedScenarios, setSelectedScenarios] = useState<string[]>([]);
  const [generatedQuestions, setGeneratedQuestions] = useState<AssessmentQuestion[]>([]);
  const [currentScenario, setCurrentScenario] = useState(0);
  const [responses, setResponses] = useState<string[]>([]);
  const [currentResponse, setCurrentResponse] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [holisticAnalysis, setHolisticAnalysis] = useState<HolisticAnalysis | null>(null);
  const [finalResult, setFinalResult] = useState<FinalResult | null>(null);
  const [testingMode, setTestingMode] = useState(false);

  // Load demo profile
  const loadDemoProfile = (profileKey: keyof typeof demoProfiles) => {
    const profile = demoProfiles[profileKey];
    setUserProfile(profile);
  };

  // Load demo response (testing mode only)
  const loadDemoResponse = (category: string) => {
    if (!testingMode) return;
    const responsesForCategory = demoResponses[category];
    if (responsesForCategory && responsesForCategory.length > 0) {
      const randomResponse = responsesForCategory[Math.floor(Math.random() * responsesForCategory.length)];
      setCurrentResponse(randomResponse);
    }
  };

  // Generate personalized questions
  const generateQuestions = async () => {
    setIsGenerating(true);
    const questions: AssessmentQuestion[] = [];

    const optimalCount = testingMode ? 1 : Math.min(selectedScenarios.length, 6);
    const scenariesToUse = selectedScenarios.slice(0, optimalCount);

    for (const scenarioId of scenariesToUse) {
      const scenario = lifeScenarios.find(s => s.id === scenarioId);
      if (scenario) {
        // Generate fallback question (in production, this would call AI API)
        const question = generateFallbackQuestion(scenarioId, userProfile);
        questions.push({
          category: scenarioId,
          text: question
        });
      }
    }

    setGeneratedQuestions(questions);
    setIsGenerating(false);
    setAssessmentState('assessing');
  };

  // Fallback question generator
  const generateFallbackQuestion = (category: string, profile: UserProfile): string => {
    const questions: Record<string, string> = {
      family_conflict: `Tell me about a time when you faced a significant disagreement or conflict within your family or close relationships. How did you approach the situation, and what was most important to you in handling it?`,
      personal_crisis: `Describe a personal crisis or unexpected challenge you've faced in your life. How did you respond initially, and what helped you navigate through it?`,
      social_situations: `Share an experience involving a social gathering or group dynamic where you felt outside your comfort zone. How did you handle it, and what did you learn about yourself?`,
      personal_growth: `Tell me about a time when you received difficult feedback or realized something challenging about yourself. How did you process it, and what did you do with that awareness?`,
      decision_making: `Describe an important personal decision you had to make with no clear "right" answer. How did you approach the decision, and what factors were most important to you?`,
      values_ethics: `Share a situation where you had to choose between what was easy/convenient and what you believed was right. What guided your choice, and how did you feel about the outcome?`,
      creative_expression: `Tell me about a creative pursuit, hobby, or form of self-expression that's meaningful to you. What draws you to it, and what does it provide for you?`,
      conflict_resolution: `Describe a time when you had to resolve a conflict or disagreement with someone important to you. What approach did you take, and what was your goal in the situation?`,
      life_changes: `Tell me about a major life transition or change you've experienced. How did you adapt, and what did you learn about yourself through the process?`,
      community_involvement: `Share your experience with community involvement, volunteering, or helping others outside your immediate circle. What motivates you to get involved (or not), and what does it mean to you?`
    };

    return questions[category] || `Tell me about a meaningful experience in your ${profile.lifeStage} stage that shaped who you are today.`;
  };

  // Submit response
  const submitResponse = async () => {
    if (!currentResponse.trim() || currentResponse.length < 50) {
      alert('Please provide a more detailed response (at least 50 characters).');
      return;
    }

    const newResponses = [...responses, currentResponse];
    setResponses(newResponses);
    setCurrentResponse('');

    if (currentScenario < generatedQuestions.length - 1) {
      setCurrentScenario(currentScenario + 1);
    } else {
      // Complete - analyze
      setAssessmentState('analyzing');
      setAnalysisProgress(0);

      const analysis = await performAnalysis(newResponses);
      setHolisticAnalysis(analysis);

      const personalityType = personalityTypes[analysis.primaryType];
      setFinalResult({
        type: analysis.primaryType,
        confidence: analysis.confidence,
        personality: personalityType,
        analysis: analysis
      });

      setAssessmentState('results');
    }
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
      justification: `Based on your responses, you show consistent patterns of ${personalityTypes[type].name} characteristics. Your approach to life situations, decision-making style, and interpersonal dynamics align with Type ${type}.`,
      keyEvidence: [
        "Communication style reflects core type patterns",
        "Decision-making approach shows type-specific motivations",
        "Stress responses align with type characteristics"
      ],
      corePatterns: {
        motivation: personalityTypes[type].strengths[0],
        fear: personalityTypes[type].challenges[0],
        communicationStyle: "Thoughtful and intentional",
        stressResponse: "Methodical problem-solving",
        relationshipApproach: "Values authentic connections"
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

  // Render based on current state
  switch (assessmentState) {
    case 'profile':
      return (
        <UserProfileForm
          userProfile={userProfile}
          setUserProfile={setUserProfile}
          onContinue={() => setAssessmentState('scenarios')}
          loadDemoProfile={loadDemoProfile}
          demoProfiles={demoProfiles}
        />
      );

    case 'scenarios':
      return (
        <ScenarioSelection
          selectedScenarios={selectedScenarios}
          setSelectedScenarios={setSelectedScenarios}
          userProfile={userProfile}
          testingMode={testingMode}
          setTestingMode={setTestingMode}
          onGenerateQuestions={generateQuestions}
          isGenerating={isGenerating}
          lifeScenarios={lifeScenarios}
        />
      );

    case 'assessing':
      return (
        <AssessmentFlow
          currentScenario={currentScenario}
          generatedQuestions={generatedQuestions}
          currentResponse={currentResponse}
          setCurrentResponse={setCurrentResponse}
          onSubmitResponse={submitResponse}
          testingMode={testingMode}
          loadDemoResponse={loadDemoResponse}
          lifeScenarios={lifeScenarios}
          demoResponses={demoResponses}
        />
      );

    case 'analyzing':
      return (
        <AnalysisView analysisProgress={analysisProgress} />
      );

    case 'results':
      return (
        <ResultsView
          finalResult={finalResult}
          holisticAnalysis={holisticAnalysis}
          responses={responses}
          generatedQuestions={generatedQuestions}
          testingMode={testingMode}
          onRestartAssessment={restartAssessment}
          lifeScenarios={lifeScenarios}
        />
      );

    default:
      return <div>Loading...</div>;
  }
}
