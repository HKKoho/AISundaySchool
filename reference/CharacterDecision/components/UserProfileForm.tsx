'use client';

import React from 'react';
import { UserProfile } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';
import { Languages } from 'lucide-react';

interface UserProfileFormProps {
  userProfile: UserProfile;
  setUserProfile: (profile: UserProfile) => void;
  onContinue: () => void;
  loadDemoProfile: (key: string) => void;
  demoProfiles: Record<string, UserProfile>;
}

export default function UserProfileForm({
  userProfile,
  setUserProfile,
  onContinue,
  loadDemoProfile,
  demoProfiles
}: UserProfileFormProps) {
  const { language, setLanguage, t } = useLanguage();

  // Profile images for each demo profile
  const profileImages: Record<string, { emoji: string; gradient: string }> = {
    youngProfessional: {
      emoji: '👨‍💼',
      gradient: 'from-blue-400 to-cyan-400'
    },
    parent: {
      emoji: '👨‍👩‍👧',
      gradient: 'from-green-400 to-emerald-400'
    },
    student: {
      emoji: '👨‍🎓',
      gradient: 'from-purple-400 to-pink-400'
    },
    midCareer: {
      emoji: '👩‍💼',
      gradient: 'from-orange-400 to-red-400'
    },
    retiree: {
      emoji: '👴',
      gradient: 'from-amber-400 to-yellow-400'
    }
  };

  // Helper function to translate life stage values
  const translateLifeStage = (value: string) => {
    const mapping: Record<string, keyof typeof t> = {
      'Student': 'student',
      'Young Professional': 'youngProfessional',
      'Parent of young children': 'parentYoungChildren',
      'Parent of teenagers': 'parentTeenagers',
      'Mid-life adult': 'midLifeAdult',
      'Empty nester': 'emptyNester',
      'Recently retired': 'recentlyRetired',
      'Retired': 'retired',
      'College Student': 'student',
      'Other': 'other'
    };
    const key = mapping[value];
    return key ? t[key] : value;
  };

  // Helper function to translate Christianity relation values
  const translateChristianityRelation = (value: string) => {
    const mapping: Record<string, keyof typeof t> = {
      'Non-believer': 'nonBeliever',
      'Curious/Exploring': 'curiousExploring',
      'Exploring faith': 'curiousExploring',
      'Questioning': 'questioning',
      'New believer': 'newBeliever',
      'Active believer': 'activeBeliever',
      'Mature believer': 'matureBeliever',
      'Lifelong believer': 'matureBeliever',
      'Rediscovering faith': 'curiousExploring',
      'Church leader': 'churchLeader',
      'Prefer not to say': 'preferNotToSay'
    };
    const key = mapping[value];
    return key ? t[key] : value;
  };

  const lifeStageOptions = [
    { value: 'Student', label: t.student },
    { value: 'Young Professional', label: t.youngProfessional },
    { value: 'Parent of young children', label: t.parentYoungChildren },
    { value: 'Parent of teenagers', label: t.parentTeenagers },
    { value: 'Mid-life adult', label: t.midLifeAdult },
    { value: 'Empty nester', label: t.emptyNester },
    { value: 'Recently retired', label: t.recentlyRetired },
    { value: 'Retired', label: t.retired },
    { value: 'Other', label: t.other }
  ];

  const relationshipOptions = [
    { value: 'Single', label: t.single },
    { value: 'In a relationship', label: t.inRelationship },
    { value: 'Engaged', label: t.engaged },
    { value: 'Married', label: t.married },
    { value: 'Divorced', label: t.divorced },
    { value: 'Widowed', label: t.widowed },
    { value: 'Prefer not to say', label: t.preferNotToSay }
  ];

  const christianityRelationOptions = [
    { value: 'Non-believer', label: t.nonBeliever },
    { value: 'Curious/Exploring', label: t.curiousExploring },
    { value: 'Questioning', label: t.questioning },
    { value: 'New believer', label: t.newBeliever },
    { value: 'Active believer', label: t.activeBeliever },
    { value: 'Mature believer', label: t.matureBeliever },
    { value: 'Church leader', label: t.churchLeader },
    { value: 'Prefer not to say', label: t.preferNotToSay }
  ];

  const handleContinue = () => {
    if (!userProfile.lifeStage || !userProfile.relationWithChristianity) {
      alert(t.fillRequiredFields);
      return;
    }
    onContinue();
  };

  return (
    <div className="max-w-[1600px] mx-auto">
      {/* Language Toggle */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
          className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-lg transition-colors shadow-sm border border-gray-200"
        >
          <Languages size={20} />
          <span className="font-medium">{language === 'en' ? 'English' : '繁體中文'}</span>
        </button>
      </div>

      <div className="grid lg:grid-cols-[450px_1fr_450px] gap-0 bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Left Column - Image/Visual Area */}
        <div className="relative bg-gradient-to-br from-pink-400 via-pink-300 to-purple-200 p-8 flex flex-col justify-between min-h-[800px]">
          {/* Decorative gradient bar */}
          <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-r from-pink-500 to-pink-400"></div>

          {/* Profile Image Area */}
          <div className="mt-12 flex items-center justify-center flex-1">
            <div className="text-center">
              {/* Decorative profile illustration */}
              <div className="w-64 h-64 mx-auto mb-6 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center shadow-2xl border-4 border-white/40">
                <div className="text-9xl">
                  🙂
                </div>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {t.title}
                </h1>
                <p className="text-sm text-gray-600">
                  {t.subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Quote/Motivation Box */}
          <div className="bg-gray-900 text-white rounded-2xl p-6 shadow-lg">
            <p className="text-base italic leading-relaxed">
              "{language === 'en'
                ? 'Discover your unique personality through real-life situations.'
                : '透過真實生活情境發現您獨特的性格。'}"
            </p>
          </div>
        </div>

        {/* Middle Column - Demo Profiles */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 border-x border-gray-200">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">✨</span>
              <h2 className="text-2xl font-bold text-gray-900">
                {t.tryDemoProfiles}
              </h2>
            </div>
            <p className="text-gray-600 text-sm">
              {t.demoProfilesDesc}
            </p>
          </div>

          {/* Demo Profile Cards */}
          <div className="space-y-3">
            {Object.entries(demoProfiles).map(([key, profile]) => {
              const imageData = profileImages[key] || { emoji: '👤', gradient: 'from-gray-400 to-gray-500' };
              return (
                <button
                  key={key}
                  onClick={() => loadDemoProfile(key)}
                  className="w-full p-5 bg-white border-2 border-gray-200 rounded-xl hover:border-pink-400 hover:shadow-lg text-left transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${imageData.gradient} flex items-center justify-center flex-shrink-0 text-3xl shadow-md`}>
                      {imageData.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-gray-900 text-base mb-1">{translateLifeStage(profile.lifeStage)}</div>
                      <div className="text-sm text-gray-600 mb-2">{translateChristianityRelation(profile.relationWithChristianity)}</div>
                      <div className="text-xs text-gray-500 line-clamp-2">{profile.interests}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column - Profile Form */}
        <div className="bg-white p-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                {language === 'en' ? 'Your Profile' : '您的檔案'}
              </h2>
            </div>
          </div>

          {/* Profile Form */}
          <div className="space-y-5">
            {/* Life Stage */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <span className="text-pink-500">*</span>
                {t.lifeStageRequired}
              </label>
              <select
                value={userProfile.lifeStage}
                onChange={(e) => setUserProfile({ ...userProfile, lifeStage: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-pink-400 bg-white transition-all text-gray-700 font-medium"
              >
                <option value="">{t.selectLifeStage}</option>
                {lifeStageOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            {/* Christianity Relation */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <span className="text-pink-500">*</span>
                {t.relationWithChristianityRequired}
              </label>
              <select
                value={userProfile.relationWithChristianity}
                onChange={(e) => setUserProfile({ ...userProfile, relationWithChristianity: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-pink-400 bg-white transition-all text-gray-700 font-medium"
              >
                <option value="">{t.selectRelationWithChristianity}</option>
                {christianityRelationOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            {/* Interests */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                {t.interestsHobbies}
              </label>
              <input
                type="text"
                value={userProfile.interests}
                onChange={(e) => setUserProfile({ ...userProfile, interests: e.target.value })}
                placeholder={t.interestsPlaceholder}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all text-gray-700"
              />
            </div>

            {/* Relationship Status */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                {t.relationshipStatus}
              </label>
              <select
                value={userProfile.relationshipStatus}
                onChange={(e) => setUserProfile({ ...userProfile, relationshipStatus: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-pink-400 bg-white transition-all text-gray-700 font-medium"
              >
                <option value="">{t.selectStatus}</option>
                {relationshipOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            {/* Personal Goals */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                {t.personalGoals}
              </label>
              <textarea
                value={userProfile.personalGoals}
                onChange={(e) => setUserProfile({ ...userProfile, personalGoals: e.target.value })}
                placeholder={t.personalGoalsPlaceholder}
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all text-gray-700 resize-none"
              />
            </div>
          </div>

          {/* Continue Button */}
          <div className="mt-8">
            <button
              onClick={handleContinue}
              className="w-full px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all text-lg font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {t.continue}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
