import { AnalysisResult } from './types';

export const DEFAULT_WEBHOOK_KEY = 'n8n_webhook_url';
export const DEFAULT_WEBHOOK_URL = 'https://learnaiagents.duckdns.org/webhook/ytube';

export const MOCK_RESULT: AnalysisResult = {
  title: "The Future of Artificial Intelligence in 2025",
  thumbnailUrl: "https://picsum.photos/800/450",
  summary: "This video explores the rapid evolution of AI agents, the shift from LLMs to action-oriented models, and the ethical implications of autonomous systems. The speaker emphasizes the importance of human-in-the-loop systems while predicting a massive surge in productivity tools driven by generative AI.",
  description: "This video provides a comprehensive overview of the state of Artificial Intelligence in 2025. It begins by analyzing the shift from Large Language Models (LLMs) to autonomous agents that can execute actions. The presenter argues that while LLMs were about information retrieval, the new wave of AI is about task execution.\n\nFurthermore, the video delves into the hardware constraints that might impede the scaling laws observed in the past decade. With Moore's Law slowing down, specialized AI chips are becoming the new gold standard. The discussion includes a detailed breakdown of the energy requirements for next-generation models and how sustainable energy sources are becoming critical for data centers.\n\nFinally, the ethical dimensions are discussed, particularly focusing on the need for 'human-in-the-loop' frameworks for critical decision-making processes in healthcare and finance. The speaker concludes with a 5-year roadmap for enterprise AI adoption.",
  keyPoints: [
    "Shift from passive LLMs to active autonomous agents.",
    "Ethical considerations regarding AI decision-making in healthcare.",
    "The rise of personalized AI tutors for global education.",
    "Productivity gains estimated at 40% for knowledge workers.",
    "Hardware limitations potentially slowing down scaling laws."
  ],
  topics: [
    { name: "Autonomous Agents", relevance: 95 },
    { name: "Generative AI", relevance: 88 },
    { name: "Ethics", relevance: 75 },
    { name: "Hardware", relevance: 60 },
    { name: "Education", relevance: 50 }
  ],
  insights: [
    "AI is moving beyond chat to executing complex multi-step workflows.",
    "Data privacy will become the primary differentiator for enterprise AI adoption.",
    "Open source models are closing the gap with proprietary frontier models."
  ],
  sentiment: [
    { name: "Positive", value: 65, fill: "#10B981" },
    { name: "Neutral", value: 20, fill: "#9CA3AF" },
    { name: "Negative", value: 15, fill: "#EF4444" }
  ]
};