# AI Question Generator - Feature Verification

## ✓ FEATURE 1: Question Category Classification

**Implementation:** `bibleQuestionGenerator.ts:18-22`, `125-127`

### Categories:

**'Bible Background' (聖經背景)**
- Historical context, rituals, theological concepts
- Cultural practices, laws, covenants
- Example: Questions about cleansing rituals, temple practices

**'Person in Bible' (聖經人物)**
- Character-focused questions
- Personal actions, decisions, faith journeys
- Example: Questions about Abraham's covenant, Peter's teachings

### The AI Classification Process:
1. Analyzes each generated question
2. Classifies it into one of the two categories
3. Includes the category in the JSON response

---

## ✓ FEATURE 2: Answer Randomization

**Implementation:** `bibleQuestionGenerator.ts:91-111`, `153-157`

### Randomization Process:
1. AI generates question with correctAnswerIndex (0-3)
2. **Fisher-Yates shuffle** algorithm randomizes all 4 options
3. System tracks correct answer during shuffle
4. Updates correctAnswerIndex to new position after shuffle

### This ensures:
- ✓ No bias toward options A, B, C, or D
- ✓ Even distribution across all positions
- ✓ Correct answer always points to the right option

---

## How to Test

1. Run the app: `npm run dev`
2. Go to Bible Game section
3. Click **'AI 問題生成器'** button
4. Generate questions in both modes:
   - **Guided Mode**: Specify character/topic/testament
   - **Free Mode**: Custom prompts
5. Check the generated question has:
   - `category` field (Bible Background or Person in Bible)
   - Randomized answer positions

### Example Generated Question Structure:
```json
{
  "character": "摩西",
  "category": "Bible Background",
  "question": "...",
  "options": ["...", "...", "...", "..."],
  "correctAnswerIndex": 2,  // Random position (0-3)
  "explanation": "...",
  ...
}
```

---

## Implementation Summary

### Files Modified:
1. **types.ts** - Added `QuestionCategory` enum
2. **bibleQuestionGenerator.ts** - Added category classification + randomization
3. **gameData.ts** - All 75 existing questions categorized

### Key Functions:
- `randomizeAnswers()` - Shuffles options and tracks correct answer
- `generateBiblicalQuestion()` - Applies both features to generated questions
