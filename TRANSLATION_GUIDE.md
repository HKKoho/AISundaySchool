# Bible Game Translation Guide

## Overview

The Bible Game quest system now supports internationalization (i18n) using translation keys. This allows the same quest data to display in multiple languages based on the user's language selection.

## Current Status

- ✅ **UI Components**: All UI text in QuestModal, GameMap, and Header components are translated
- ✅ **Translation System**: Custom hooks (`useTranslatedQuest`, `useTranslatedQuests`) created
- ✅ **Sample Quests**: 3 quests (q1, q2, q5) fully translated as examples
- ⏳ **Remaining Quests**: 72 quests need translation (q3, q4, q6-q75)

## How the Translation System Works

### 1. Translation Files

Quest translations are stored in:
- `/locales/en/bibleGame.json` - English translations
- `/locales/zh-TW/bibleGame.json` - Traditional Chinese translations

### 2. Translation Structure

Each quest follows this structure in the JSON files:

```json
{
  "quests": {
    "q1": {
      "character": "Abraham",
      "question": "God made a covenant with me...",
      "options": [
        "Option 1",
        "Option 2",
        "Option 3",
        "Option 4"
      ],
      "explanation": "The Abrahamic Covenant...",
      "journalPrompt": {
        "title": "The Abrahamic Covenant",
        "content": "A covenant is a sacred promise..."
      },
      "deepDive": {
        "title": "Covenant Theology",
        "content": "In Hebrew, covenant is 'berit'..."
      }
    }
  }
}
```

### 3. Automatic Fallback

The `useTranslatedQuest` hook automatically:
- Returns translated content if available in the current language
- Falls back to original Chinese content if translation doesn't exist
- This means untranslated quests still work, they just show in Chinese

## How to Add Translations for Remaining Quests

### Step 1: Extract Chinese Content

For each quest in `/data/gameData.ts`, note the quest ID and all text fields:
- `character` - Character name
- `question` - The question text
- `options` - Array of 4 answer options
- `explanation` - Explanation of the correct answer
- `journalPrompt.title` - Journal entry title
- `journalPrompt.content` - Journal entry content
- `deepDive.title` - Deep dive title
- `deepDive.content` - Deep dive content

### Step 2: Add to Chinese Translation File

Add the quest to `/locales/zh-TW/bibleGame.json` under the `quests` section:

```json
{
  "quests": {
    "q3": {
      "character": "施洗約翰",
      "question": "我在約旦河為人們施洗。我的洗禮是...",
      "options": [
        "加入當地的釣魚俱樂部。",
        "加入羅馬軍隊的入會儀式。",
        "一個沒有意義的文化傳統。",
        "悔改的洗，使罪得赦。"
      ],
      "explanation": "約翰的洗禮是一個強有力的公開宣告...",
      "journalPrompt": {
        "title": "悔改的洗禮",
        "content": "施洗約翰是舊約與新約之間的橋樑..."
      },
      "deepDive": {
        "title": "浸禮池（Mikveh）與約翰的洗禮",
        "content": "猶太傳統中已有在「浸禮池」中進行禮儀性浸泡..."
      }
    }
  }
}
```

### Step 3: Add English Translation

Translate the content and add to `/locales/en/bibleGame.json`:

```json
{
  "quests": {
    "q3": {
      "character": "John the Baptist",
      "question": "I baptized people in the Jordan River. My baptism was...",
      "options": [
        "Joining the local fishing club.",
        "An initiation rite for the Roman army.",
        "A meaningless cultural tradition.",
        "A baptism of repentance for the forgiveness of sins."
      ],
      "explanation": "John's baptism was a powerful public declaration...",
      "journalPrompt": {
        "title": "The Baptism of Repentance",
        "content": "John the Baptist was the bridge between the Old and New Testament..."
      },
      "deepDive": {
        "title": "Mikveh and John's Baptism",
        "content": "Jewish tradition already had ritual immersion in a 'mikveh' for purification..."
      }
    }
  }
}
```

### Step 4: Test

1. Start the dev server: `npm run dev`
2. Switch between English and Chinese in the app
3. Open the quest and verify both languages display correctly

## Tips for Translation

### Character Names
- Keep biblical names consistent with common English translations
- Example: 亞伯拉罕 → Abraham, 摩西 → Moses, 以西結 → Ezekiel

### Scripture References
- Maintain scripture references in the same format
- Example: "創世記 12, 15, 17章" → "Genesis 12, 15, 17"

### Theological Terms
- Use standard English theological terminology
- Covenant (約), Baptism (洗禮), Redemption (救贖), etc.

### Tone
- Keep the educational and reverent tone
- Maintain accuracy to biblical and theological content
- The Chinese content can serve as a guide but adapt naturally to English

## Automated Translation

For bulk translation, you could:

1. **Use AI Translation**: Tools like ChatGPT or Claude can help translate content while maintaining theological accuracy
2. **Create a Script**: Write a Node.js script to extract Chinese content and prepare it for translation
3. **Batch Process**: Translate multiple quests at once and review for accuracy

## Example AI Translation Prompt

```
Please translate the following Bible quiz question from Chinese to English, maintaining theological accuracy and keeping scripture references intact:

Character: [Chinese name]
Question: [Chinese question]
Options: [4 Chinese options]
Explanation: [Chinese explanation]
Journal Title: [Chinese title]
Journal Content: [Chinese content]
Deep Dive Title: [Chinese title]
Deep Dive Content: [Chinese content]

Return the translation in JSON format matching the structure above.
```

## Quest Status Tracking

### Completed (3/75)
- q1 (Abraham)
- q2 (Moses)
- q5 (Ezekiel)

### Remaining (72/75)
- q3 (John the Baptist)
- q4 (Apostle Peter)
- q6 (Apostle Paul)
- q7-q75 (Various biblical characters and topics)

## Questions?

If you need help with:
- Biblical name translations
- Theological term translations
- Scripture reference formatting

Consult standard English Bible translations (NIV, ESV, KJV) for consistency.
