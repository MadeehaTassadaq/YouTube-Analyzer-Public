export interface Topic {
  name: string;
  relevance: number; // 0-100
  [key: string]: any;
}

export interface SentimentData {
  name: string;
  value: number;
  fill: string;
  [key: string]: any;
}

export interface AnalysisResult {
  title: string;
  thumbnailUrl: string;
  summary: string;
  description: string; // Detailed description
  keyPoints: string[];
  topics: Topic[];
  insights: string[];
  sentiment: SentimentData[];
}

export interface WebhookConfig {
  url: string;
  useMock: boolean;
}