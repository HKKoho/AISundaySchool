import { PersonalityType } from '@/types';

export const personalityTypes: Record<string, PersonalityType> = {
  "1": {
    name: "The Perfectionist",
    description: "Principled, purposeful, self-controlled, and perfectionistic",
    color: "bg-red-500",
    center: "Body/Instinctive",
    category: "The Reformer",
    traits: ["Ethical", "Dedicated", "Reliable", "Idealistic"],
    strengths: ["Strong sense of right and wrong", "Self-disciplined", "Orderly and organized"],
    challenges: ["Can be critical of self and others", "Perfectionism can lead to stress", "Difficulty relaxing"]
  },
  "2": {
    name: "The Helper",
    description: "Generous, demonstrative, people-pleasing, and possessive",
    color: "bg-pink-500",
    center: "Heart/Feeling",
    category: "The Giver",
    traits: ["Caring", "Generous", "Warm", "Empathetic"],
    strengths: ["Genuinely helpful and caring", "Builds strong relationships", "Attuned to others' needs"],
    challenges: ["Can neglect own needs", "May become overly involved", "Difficulty saying no"]
  },
  "3": {
    name: "The Achiever",
    description: "Adaptable, excelling, driven, and image-conscious",
    color: "bg-yellow-500",
    center: "Heart/Feeling",
    category: "The Performer",
    traits: ["Ambitious", "Energetic", "Pragmatic", "Success-oriented"],
    strengths: ["Highly motivated", "Excellent at adapting", "Inspiring to others"],
    challenges: ["Can be overly concerned with image", "May struggle with authenticity", "Workaholic tendencies"]
  },
  "4": {
    name: "The Individualist",
    description: "Expressive, dramatic, self-absorbed, and temperamental",
    color: "bg-purple-500",
    center: "Heart/Feeling",
    category: "The Romantic",
    traits: ["Creative", "Sensitive", "Introspective", "Authentic"],
    strengths: ["Deep emotional intelligence", "Highly creative", "Values authenticity"],
    challenges: ["Can be moody", "May dwell on negative emotions", "Feeling misunderstood"]
  },
  "5": {
    name: "The Investigator",
    description: "Perceptive, innovative, secretive, and isolated",
    color: "bg-green-500",
    center: "Head/Thinking",
    category: "The Observer",
    traits: ["Analytical", "Insightful", "Independent", "Curious"],
    strengths: ["Deep thinker", "Innovative problem solver", "Self-sufficient"],
    challenges: ["Can be detached", "May isolate self", "Difficulty with emotions"]
  },
  "6": {
    name: "The Loyalist",
    description: "Engaging, responsible, anxious, and suspicious",
    color: "bg-blue-500",
    center: "Head/Thinking",
    category: "The Guardian",
    traits: ["Committed", "Responsible", "Loyal", "Security-oriented"],
    strengths: ["Reliable and trustworthy", "Excellent team player", "Prepared and cautious"],
    challenges: ["Can be anxious", "May struggle with trust", "Overthinking"]
  },
  "7": {
    name: "The Enthusiast",
    description: "Spontaneous, versatile, acquisitive, and scattered",
    color: "bg-orange-500",
    center: "Head/Thinking",
    category: "The Adventurer",
    traits: ["Optimistic", "Enthusiastic", "Adventurous", "Versatile"],
    strengths: ["Brings joy and energy", "Creative and spontaneous", "Quick thinker"],
    challenges: ["Can be scattered", "May avoid pain", "Difficulty with commitment"]
  },
  "8": {
    name: "The Challenger",
    description: "Self-confident, decisive, willful, and confrontational",
    color: "bg-indigo-500",
    center: "Body/Instinctive",
    category: "The Protector",
    traits: ["Strong", "Direct", "Assertive", "Protective"],
    strengths: ["Natural leader", "Stands up for others", "Decisive and confident"],
    challenges: ["Can be dominating", "May struggle with vulnerability", "Confrontational"]
  },
  "9": {
    name: "The Peacemaker",
    description: "Receptive, reassuring, complacent, and resigned",
    color: "bg-teal-500",
    center: "Body/Instinctive",
    category: "The Mediator",
    traits: ["Peaceful", "Easy-going", "Accommodating", "Supportive"],
    strengths: ["Creates harmony", "Good listener", "Accepting of others"],
    challenges: ["Can be passive", "May avoid conflict", "Difficulty prioritizing self"]
  }
};
