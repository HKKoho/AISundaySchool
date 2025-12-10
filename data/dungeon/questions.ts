import { DungeonQuestion } from '../../types/dungeon';

export const QUESTIONS: DungeonQuestion[] = [
  {
    id: 1,
    question: "Who encountered God in a burning bush that was not consumed?",
    options: ["Moses", "Abraham", "Elijah", "Joshua"],
    correctAnswer: 0,
    bibleReference: "Exodus 3:2",
    difficulty: "Preliminary" // Well-known story from Exodus
  },
  {
    id: 2,
    question: "Who heard the Lord calling him as a young boy in the temple?",
    options: ["David", "Samuel", "Daniel", "Joseph"],
    correctAnswer: 1,
    bibleReference: "1 Samuel 3:4",
    difficulty: "Competent" // Requires knowledge of Samuel's calling
  },
  {
    id: 3,
    question: "Who wrestled with a man (God/Angel) until daybreak and was renamed Israel?",
    options: ["Isaac", "Esau", "Jacob", "Solomon"],
    correctAnswer: 2,
    bibleReference: "Genesis 32:24-28",
    difficulty: "Preliminary" // Famous Jacob story
  },
  {
    id: 4,
    question: "Who was blinded by a bright light on the road to Damascus while hearing Jesus speak?",
    options: ["Peter", "John", "Saul (Paul)", "Stephen"],
    correctAnswer: 2,
    bibleReference: "Acts 9:3-4",
    difficulty: "Preliminary" // Well-known conversion story
  },
  {
    id: 5,
    question: "Who asked God for a sign using a fleece of wool?",
    options: ["Gideon", "Samson", "Barak", "Jephthah"],
    correctAnswer: 0,
    bibleReference: "Judges 6:36-40",
    difficulty: "Competent" // Requires specific knowledge of Judges
  },
  {
    id: 6,
    question: "Who saw the Lord seated on a throne with the train of his robe filling the temple?",
    options: ["Jeremiah", "Ezekiel", "Isaiah", "Hosea"],
    correctAnswer: 2,
    bibleReference: "Isaiah 6:1",
    difficulty: "Competent" // Prophetic vision requiring deeper knowledge
  },
  {
    id: 7,
    question: "Who stood on the mountain while the Lord passed by in a whisper, after the wind and fire?",
    options: ["Elijah", "Elisha", "Moses", "Aaron"],
    correctAnswer: 0,
    bibleReference: "1 Kings 19:11-13",
    difficulty: "Competent" // Requires knowledge of Elijah's encounter with God
  }
];