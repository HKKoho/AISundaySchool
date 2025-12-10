export interface GeneratedImage {
  id: string;
  imageUrl: string;
  prompt: string;
  aspectRatio: string;
  timestamp: number;
}

export type AspectRatio = "1:1" | "3:4" | "4:3" | "9:16" | "16:9";

export interface GenerationConfig {
  aspectRatio: AspectRatio;
}
