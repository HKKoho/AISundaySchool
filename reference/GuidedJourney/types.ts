export interface Coordinate {
  lat: number;
  lng: number;
}

export interface RouteStop {
  id: number;
  name: string;
  description: string;
  theology: string;
  coordinates: Coordinate;
  imagePrompt: string;
  imageUrl?: string;
}

export interface RouteData {
  title: string;
  description: string;
  stops: RouteStop[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export enum GameState {
  MENU,
  LOADING_ROUTE,
  PLAYING, // Viewing map/narrative
  QUIZ, // Answering a question to move forward
  FINISHED,
  ERROR
}

export const AVAILABLE_ROUTES = [
  {
    id: 'exodus',
    title: 'The Exodus',
    desc: 'Journey from slavery in Egypt to the Promised Land.',
    color: 'from-yellow-700 to-orange-500'
  },
  {
    id: 'david',
    title: 'David Fleeing Saul',
    desc: 'The wilderness wanderings of the future King.',
    color: 'from-stone-600 to-stone-800'
  },
  {
    id: 'elijah',
    title: 'Route of Elijah',
    desc: 'From the showdown at Carmel to the whisper at Horeb.',
    color: 'from-sky-700 to-blue-900'
  },
  {
    id: 'jesus',
    title: 'Jesus in Galilee',
    desc: 'The ministry path around the Sea of Galilee.',
    color: 'from-emerald-600 to-teal-800'
  },
  {
    id: 'paul',
    title: 'Paul\'s 2nd Mission',
    desc: 'Spreading the Gospel across Europe and Asia Minor.',
    color: 'from-purple-700 to-indigo-900'
  },
  {
    id: 'paul_3rd',
    title: 'Paul\'s 3rd Mission',
    desc: 'Strengthening disciples in Galatia, Phrygia, and Ephesus.',
    color: 'from-red-700 to-rose-900'
  }
];