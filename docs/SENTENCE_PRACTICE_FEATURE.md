# 句子練習功能 (Sentence Practice Feature)

## ✨ 新功能概述

在「原文學習」(Biblical Language Learning) 模塊中新增了一個完整的**AI驅動句子練習**功能，讓用戶可以:

1. **AI生成聖經句子** - 使用 Gemini 2.0 生成完整的希伯來文或希臘文聖經經文
2. **語音錄製** - 錄製用戶的發音
3. **AI評分與反饋** - 使用 Gemini 2.5 Flash 評估發音並給出0-100分的評分

## 📁 新增文件

### 1. Types (types.ts)
```typescript
export type LearningMode = ... | 'sentence-practice';

export interface BibleSentence {
  original: string;          // 原文 (希伯來文/希臘文)
  transliteration: string;   // 羅馬化發音指南
  english: string;           // 英文翻譯
  reference: string;         // 經文出處 (例如: "John 3:16")
  language: Language;
}
```

### 2. Service Functions (services/geminiService.ts)

#### `generateBibleSentence(language: Language): Promise<BibleSentence>`
- 使用 **Gemini 2.0 Flash Experimental**
- 生成完整聖經經文
- 包含原文、發音、翻譯和出處
- 使用 JSON schema 確保輸出格式一致

#### `getSentencePronunciationScore(sentence, audioBase64, mimeType): Promise<{score, feedback}>`
- 使用 **Gemini 2.5 Flash** 評估發音
- 返回 0-100 分數
- 提供詳細的反饋建議
- 分析發音準確度、語調、流暢度

### 3. UI Component (components/SentencePractice.tsx)

#### 功能特點:
- ✅ 自動生成初始句子
- ✅ 顯示原文（支持從右到左的希伯來文）
- ✅ 顯示發音指南（拉丁化）
- ✅ 顯示英文翻譯
- ✅ 顯示經文出處（Bible Reference）
- ✅ 語音錄製與評估
- ✅ 動態評分顯示（0-100分）
- ✅ 顏色編碼反饋:
  - 🟢 80-100分: 綠色（優秀）
  - 🟡 60-79分: 黃色（良好）
  - 🔴 0-59分: 紅色（需改進）
- ✅ 進度條視覺化
- ✅ 一鍵生成新句子

## 🎯 使用流程

1. **選擇語言** - 選擇希伯來文或希臘文
2. **選擇模式** - 點擊「✨ 句子練習」
3. **查看句子** - AI自動生成聖經句子
4. **學習發音** - 查看發音指南
5. **錄音** - 點擊「開始錄音」按鈕
6. **朗讀** - 朗讀顯示的聖經經文
7. **停止** - 點擊「停止錄音」
8. **評估** - AI分析發音並給出評分和反饋
9. **重試/新句子** - 可以重新錄音或生成新句子

## 🎨 UI設計

### 卡片佈局:
- **經文出處** - 琥珀色標籤
- **原文** - 藍色漸變背景 + 大字體
- **發音指南** - 灰色背景 + 等寬字體
- **英文翻譯** - 綠色背景 + 斜體
- **錄音按鈕** - 天藍色（待機）/ 紅色脈衝（錄音中）
- **評分卡** - 動態顏色（根據分數）

### 評分顯示:
```
您的得分： 85 /100
[█████████████████        ] 85%

AI 反饋：
Your pronunciation was excellent! You captured 
the vowel sounds well and the rhythm was natural.
```

## 🔧 技術細節

### AI模型:
- **生成**: Gemini 2.0 Flash Experimental
- **評估**: Gemini 2.5 Flash (multimodal - audio input)

### 音頻處理:
- MediaRecorder API
- Blob to Base64 conversion
- MIME type detection

### 狀態管理:
- React hooks (useState, useRef, useCallback, useEffect)
- 6個主要狀態:
  - isGenerating
  - isRecording
  - isEvaluating
  - sentence
  - score
  - feedback

## 📱 響應式設計
- 最大寬度: 4xl (1024px)
- 移動設備友好
- 觸摸友好的按鈕大小
- 自適應文字大小

## 🌐 支持語言
- 希伯來文 (Biblical Hebrew) - 舊約
- 古典希臘文 (Koine Greek) - 新約

## 🎓 教育價值
- 真實聖經經文練習
- 即時AI反饋
- 科學的評分系統
- 個性化學習建議
