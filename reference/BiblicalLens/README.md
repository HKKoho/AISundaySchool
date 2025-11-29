<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Biblical Memory Match

A fun memory matching game that tests your knowledge of Biblical objects and scripture references!

## How to Play

- The game generates 5 Biblical triples, each containing:
  - An AI-generated image of a Biblical object (plants, animals, food, or places)
  - The name of the object
  - The Bible chapter reference where it appears

- These 15 elements are randomly placed in a 4x4 grid (with one hint card)
- Flip cards to reveal their contents
- Match 3 cards that form a complete triple
- Complete all 5 triples as fast as you can!

## Scoring

Your score is calculated as: **max(0, 200 - seconds)**

The faster you complete the game, the higher your score!

View your app in AI Studio: https://ai.studio/apps/drive/1KCq4-W-i_cPCF_9PmnSOWIWjatjpyigW

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   `npm install`
2. Set the `VITE_GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Technology

- React + TypeScript
- Vite
- Google Gemini 2.0 Flash Exp (for text and image generation)
- Tailwind CSS
