import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Mic, MicOff } from 'lucide-react';
import { UserProfile } from '../../types/character';
import { demoProfiles } from '../../lib/lifeScenarios';

interface UserProfileFormProps {
  userProfile: UserProfile;
  setUserProfile: (profile: UserProfile) => void;
  onContinue: () => void;
}

export default function UserProfileForm({
  userProfile,
  setUserProfile,
  onContinue
}: UserProfileFormProps) {
  const { t, i18n } = useTranslation(['common']);
  const isZh = i18n.language === 'zh-TW';
  const [isListening, setIsListening] = useState(false);
  const [isListeningInterests, setIsListeningInterests] = useState(false);
  const recognitionRef = useRef<any>(null);
  const interestsRecognitionRef = useRef<any>(null);

  const loadDemoProfile = (key: string) => {
    const profile = demoProfiles[key as keyof typeof demoProfiles];
    if (profile) {
      // Use Chinese fields if in Chinese mode
      setUserProfile({
        lifeStage: isZh && profile.lifeStageZh ? profile.lifeStageZh : profile.lifeStage,
        interests: isZh && profile.interestsZh ? profile.interestsZh : profile.interests,
        relationshipStatus: isZh && profile.relationshipStatusZh ? profile.relationshipStatusZh : profile.relationshipStatus,
        personalGoals: isZh && profile.personalGoalsZh ? profile.personalGoalsZh : profile.personalGoals,
        relationWithChristianity: isZh && profile.relationWithChristianityZh ? profile.relationWithChristianityZh : profile.relationWithChristianity
      });
    }
  };

  const profileImages: Record<string, { emoji: string; gradient: string }> = {
    youngProfessional: { emoji: '👨‍💼', gradient: 'from-blue-400 to-cyan-400' },
    parent: { emoji: '👨‍👩‍👧', gradient: 'from-green-400 to-emerald-400' },
    student: { emoji: '👨‍🎓', gradient: 'from-purple-400 to-pink-400' },
    midCareer: { emoji: '👩‍💼', gradient: 'from-orange-400 to-red-400' }
  };

  // Filter out retiree demo profile
  const displayProfiles = Object.entries(demoProfiles).filter(([key]) => key !== 'retiree');

  // Speech-to-text functionality
  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert(isZh
        ? '您的瀏覽器不支持語音識別功能。請使用 Chrome、Edge 或 Safari 瀏覽器。'
        : 'Your browser does not support speech recognition. Please use Chrome, Edge, or Safari.');
      return;
    }

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.lang = isZh ? 'zh-TW' : 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        console.log('Speech recognition started');
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        console.log('Transcript:', transcript);
        setUserProfile({ ...userProfile, personalGoals: userProfile.personalGoals + (userProfile.personalGoals ? ' ' : '') + transcript });
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);

        let errorMessage = isZh ? '語音識別錯誤：' : 'Speech recognition error: ';
        if (event.error === 'not-allowed') {
          errorMessage += isZh
            ? '請允許瀏覽器訪問您的麥克風。檢查瀏覽器地址欄左側的權限設置。'
            : 'Please allow microphone access. Check permissions in your browser address bar.';
        } else if (event.error === 'no-speech') {
          errorMessage += isZh ? '未檢測到語音。請再試一次。' : 'No speech detected. Please try again.';
        } else {
          errorMessage += event.error;
        }
        alert(errorMessage);
      };

      recognition.onend = () => {
        console.log('Speech recognition ended');
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
      console.log('Attempting to start speech recognition...');
    } catch (error) {
      console.error('Error initializing speech recognition:', error);
      alert(isZh
        ? '無法啟動語音識別。請確保您使用的是支持的瀏覽器（Chrome、Edge 或 Safari）並且允許麥克風訪問。'
        : 'Could not start speech recognition. Please ensure you are using a supported browser (Chrome, Edge, or Safari) and have allowed microphone access.');
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  // Speech-to-text functionality for Interests field
  const startListeningInterests = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert(isZh
        ? '您的瀏覽器不支持語音識別功能。請使用 Chrome、Edge 或 Safari 瀏覽器。'
        : 'Your browser does not support speech recognition. Please use Chrome, Edge, or Safari.');
      return;
    }

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.lang = isZh ? 'zh-TW' : 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        console.log('Speech recognition started (Interests)');
        setIsListeningInterests(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        console.log('Transcript (Interests):', transcript);
        setUserProfile({ ...userProfile, interests: userProfile.interests + (userProfile.interests ? ', ' : '') + transcript });
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListeningInterests(false);

        let errorMessage = isZh ? '語音識別錯誤：' : 'Speech recognition error: ';
        if (event.error === 'not-allowed') {
          errorMessage += isZh
            ? '請允許瀏覽器訪問您的麥克風。檢查瀏覽器地址欄左側的權限設置。'
            : 'Please allow microphone access. Check permissions in your browser address bar.';
        } else if (event.error === 'no-speech') {
          errorMessage += isZh ? '未檢測到語音。請再試一次。' : 'No speech detected. Please try again.';
        } else {
          errorMessage += event.error;
        }
        alert(errorMessage);
      };

      recognition.onend = () => {
        console.log('Speech recognition ended (Interests)');
        setIsListeningInterests(false);
      };

      interestsRecognitionRef.current = recognition;
      recognition.start();
      console.log('Attempting to start speech recognition (Interests)...');
    } catch (error) {
      console.error('Error initializing speech recognition:', error);
      alert(isZh
        ? '無法啟動語音識別。請確保您使用的是支持的瀏覽器（Chrome、Edge 或 Safari）並且允許麥克風訪問。'
        : 'Could not start speech recognition. Please ensure you are using a supported browser (Chrome, Edge, or Safari) and have allowed microphone access.');
      setIsListeningInterests(false);
    }
  };

  const stopListeningInterests = () => {
    if (interestsRecognitionRef.current) {
      interestsRecognitionRef.current.stop();
      setIsListeningInterests(false);
    }
  };

  const lifeStageOptions = isZh ? [
    { value: 'Student', label: '學生' },
    { value: 'Young Professional', label: '青年職業人士' },
    { value: 'Parent of young children', label: '幼童家長' },
    { value: 'Parent of teenagers', label: '青少年家長' },
    { value: 'Mid-life adult', label: '中年成人' },
    { value: 'Empty nester', label: '空巢期' },
    { value: 'Recently retired', label: '剛退休' },
    { value: 'Retired', label: '退休' },
    { value: 'Other', label: '其他' }
  ] : [
    { value: 'Student', label: 'Student' },
    { value: 'Young Professional', label: 'Young Professional' },
    { value: 'Parent of young children', label: 'Parent of young children' },
    { value: 'Parent of teenagers', label: 'Parent of teenagers' },
    { value: 'Mid-life adult', label: 'Mid-life adult' },
    { value: 'Empty nester', label: 'Empty nester' },
    { value: 'Recently retired', label: 'Recently retired' },
    { value: 'Retired', label: 'Retired' },
    { value: 'Other', label: 'Other' }
  ];

  const relationshipOptions = isZh ? [
    { value: 'Single', label: '單身' },
    { value: 'In a relationship', label: '交往中' },
    { value: 'Engaged', label: '訂婚' },
    { value: 'Married', label: '已婚' },
    { value: 'Divorced', label: '離婚' },
    { value: 'Widowed', label: '喪偶' },
    { value: 'Prefer not to say', label: '不願透露' }
  ] : [
    { value: 'Single', label: 'Single' },
    { value: 'In a relationship', label: 'In a relationship' },
    { value: 'Engaged', label: 'Engaged' },
    { value: 'Married', label: 'Married' },
    { value: 'Divorced', label: 'Divorced' },
    { value: 'Widowed', label: 'Widowed' },
    { value: 'Prefer not to say', label: 'Prefer not to say' }
  ];

  const christianityRelationOptions = isZh ? [
    { value: 'Non-believer', label: '非信徒' },
    { value: 'Curious/Exploring', label: '好奇/探索中' },
    { value: 'Questioning', label: '質疑中' },
    { value: 'New believer', label: '初信者' },
    { value: 'Active believer', label: '活躍信徒' },
    { value: 'Mature believer', label: '成熟信徒' },
    { value: 'Church leader', label: '教會領袖' },
    { value: 'Prefer not to say', label: '不願透露' }
  ] : [
    { value: 'Non-believer', label: 'Non-believer' },
    { value: 'Curious/Exploring', label: 'Curious/Exploring' },
    { value: 'Questioning', label: 'Questioning' },
    { value: 'New believer', label: 'New believer' },
    { value: 'Active believer', label: 'Active believer' },
    { value: 'Mature believer', label: 'Mature believer' },
    { value: 'Church leader', label: 'Church leader' },
    { value: 'Prefer not to say', label: 'Prefer not to say' }
  ];

  const handleContinue = () => {
    if (!userProfile.lifeStage || !userProfile.relationWithChristianity) {
      alert(isZh ? '請填寫必填欄位（人生階段、與基督教的關係）。' : 'Please fill in required fields (Life Stage, Relation with Christianity).');
      return;
    }
    onContinue();
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <div className="grid lg:grid-cols-[1fr_2fr] gap-6 bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Left Column - Demo Profiles */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 md:p-8 border-r border-gray-200">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">✨</span>
              <h2 className="text-2xl font-bold text-gray-900">
                {isZh ? '試用示範檔案' : 'Try Demo Profiles'}
              </h2>
            </div>
            <p className="text-gray-600 text-sm">
              {isZh ? '使用預設檔案快速體驗評估：' : 'Use pre-filled profiles to quickly experience the assessment:'}
            </p>
          </div>

          {/* Demo Profile Cards */}
          <div className="space-y-3">
            {displayProfiles.map(([key, profile]) => {
              const imageData = profileImages[key] || { emoji: '👤', gradient: 'from-gray-400 to-gray-500' };
              return (
                <button
                  key={key}
                  onClick={() => loadDemoProfile(key)}
                  className="w-full p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-green-400 hover:shadow-lg text-left transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${imageData.gradient} flex items-center justify-center flex-shrink-0 text-2xl shadow-md`}>
                      {imageData.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-gray-900 text-sm mb-1">
                        {isZh && profile.lifeStageZh ? profile.lifeStageZh : profile.lifeStage}
                      </div>
                      <div className="text-xs text-gray-600 mb-2">
                        {isZh && profile.relationWithChristianityZh ? profile.relationWithChristianityZh : profile.relationWithChristianity}
                      </div>
                      <div className="text-xs text-gray-500 line-clamp-2">
                        {isZh && profile.interestsZh ? profile.interestsZh : profile.interests}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column - Profile Form */}
        <div className="bg-white p-6 md:p-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                {isZh ? '您的檔案' : 'Your Profile'}
              </h2>
            </div>
          </div>

          {/* Profile Form */}
          <div className="space-y-5">
            {/* Life Stage */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <span className="text-green-500">*</span>
                {isZh ? '人生階段' : 'Life Stage'}
              </label>
              <select
                value={userProfile.lifeStage}
                onChange={(e) => setUserProfile({ ...userProfile, lifeStage: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 bg-white transition-all text-gray-700 font-medium"
              >
                <option value="">{isZh ? '選擇人生階段' : 'Select life stage'}</option>
                {lifeStageOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            {/* Christianity Relation */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <span className="text-green-500">*</span>
                {isZh ? '與基督教的關係' : 'Relation with Christianity'}
              </label>
              <select
                value={userProfile.relationWithChristianity}
                onChange={(e) => setUserProfile({ ...userProfile, relationWithChristianity: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 bg-white transition-all text-gray-700 font-medium"
              >
                <option value="">{isZh ? '選擇您與基督教的關係' : 'Select your relation with Christianity'}</option>
                {christianityRelationOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            {/* Interests */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                {isZh ? '興趣與嗜好' : 'Interests & Hobbies'}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={userProfile.interests}
                  onChange={(e) => setUserProfile({ ...userProfile, interests: e.target.value })}
                  placeholder={isZh ? '例如：閱讀、登山、攝影' : 'e.g., Reading, hiking, photography'}
                  className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all text-gray-700"
                />
                <button
                  type="button"
                  onClick={isListeningInterests ? stopListeningInterests : startListeningInterests}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-colors ${
                    isListeningInterests
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-green-100 text-green-600 hover:bg-green-200'
                  }`}
                  title={isListeningInterests ? (isZh ? '停止錄音' : 'Stop recording') : (isZh ? '開始語音輸入' : 'Start voice input')}
                >
                  {isListeningInterests ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {isZh ? '點擊麥克風圖標使用語音輸入' : 'Click microphone icon to use voice input'}
              </p>
            </div>

            {/* Relationship Status */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                {isZh ? '感情狀態' : 'Relationship Status'}
              </label>
              <select
                value={userProfile.relationshipStatus}
                onChange={(e) => setUserProfile({ ...userProfile, relationshipStatus: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 bg-white transition-all text-gray-700 font-medium"
              >
                <option value="">{isZh ? '選擇狀態' : 'Select status'}</option>
                {relationshipOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            {/* Personal Goals */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                {isZh ? '個人目標' : 'Personal Goals'}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={userProfile.personalGoals}
                  onChange={(e) => setUserProfile({ ...userProfile, personalGoals: e.target.value })}
                  placeholder={isZh ? '您現在正朝向什麼目標努力？' : 'What are you working towards in life right now?'}
                  className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all text-gray-700"
                />
                <button
                  type="button"
                  onClick={isListening ? stopListening : startListening}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-colors ${
                    isListening
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-green-100 text-green-600 hover:bg-green-200'
                  }`}
                  title={isListening ? (isZh ? '停止錄音' : 'Stop recording') : (isZh ? '開始語音輸入' : 'Start voice input')}
                >
                  {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {isZh ? '點擊麥克風圖標使用語音輸入' : 'Click microphone icon to use voice input'}
              </p>
            </div>
          </div>

          {/* Continue Button */}
          <div className="mt-8">
            <button
              onClick={handleContinue}
              className="w-full px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all text-lg font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {isZh ? '繼續至生活情境 →' : 'Continue to Life Situations →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
