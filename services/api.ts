import { AnalysisResult, WebhookConfig, Topic, SentimentData } from '../types';
import { MOCK_RESULT } from '../constants';

// Helper to ensure we always get an array of strings
const safeStringArray = (input: any): string[] => {
  if (!input) return [];
  if (Array.isArray(input)) {
    return input.map(item => 
      typeof item === 'string' ? item : JSON.stringify(item)
    );
  }
  if (typeof input === 'string') {
    // Try to split by newline if it looks like a list string
    return input.split('\n').filter(line => line.trim().length > 0);
  }
  return [];
};

// Helper to ensure we get valid Topics
const safeTopics = (input: any): Topic[] => {
  if (!input) return [];
  if (Array.isArray(input)) {
    return input.map((item: any) => {
      if (typeof item === 'string') {
        return { name: item, relevance: 50 }; // Default relevance
      }
      // Ensure structure
      return {
        name: item.name || item.label || "Unknown",
        relevance: typeof item.relevance === 'number' ? item.relevance : 50,
        ...item
      };
    });
  }
  return [];
};

// Helper to ensure we get valid Sentiment Data
const safeSentiment = (input: any): SentimentData[] => {
  if (Array.isArray(input) && input.length > 0) {
      // Validate shape
      const valid = input.every(i => i.name && typeof i.value === 'number');
      if (valid) return input;
  }
  
  // Default fallback
  return [
    { name: "Positive", value: 0, fill: "#10B981" },
    { name: "Neutral", value: 0, fill: "#9CA3AF" },
    { name: "Negative", value: 0, fill: "#EF4444" }
  ];
};

export const analyzeVideo = async (
  youtubeUrl: string, 
  config: WebhookConfig
): Promise<AnalysisResult> => {
  
  // UX delay
  await new Promise(resolve => setTimeout(resolve, 500));

  if (config.useMock) {
    return MOCK_RESULT;
  }

  if (!config.url) {
    throw new Error("Webhook URL is missing. Please configure it in settings.");
  }

  try {
    const response = await fetch(config.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: youtubeUrl }),
    });

    if (!response.ok) {
      throw new Error(`Webhook failed with status: ${response.status}`);
    }

    const rawData = await response.json();
    
    console.log("n8n Raw Response:", rawData);

    // Handle n8n array structure (common with 'Respond to Webhook' node or default output)
    let data = rawData;
    if (Array.isArray(rawData)) {
      // If array, take the first item that looks like an object
      data = rawData.length > 0 ? rawData[0] : {};
    }

    // Handle potential nesting (e.g., { data: { ... } } or { body: { ... } })
    if (data.body && !data.title && !data.summary) {
      data = { ...data, ...data.body };
    }
    
    console.log("Normalized Data:", data);

    // Map with flexible key names to ensure UI always gets data
    // Prioritize 'description' or 'detailedDescription' for the full text
    // Prioritize 'summary' or 'tldr' for the short summary
    
    const summaryText = data.summary || data.videoSummary || data.tldr || data.shortSummary || "No summary available.";
    
    // Use explicit AI fields first. 
    // Exclude 'data.description' intentionally as it often contains the raw YouTube description (links/timestamps).
    // If no detailed AI analysis is found, fallback to the summaryText which is cleaner.
    const descriptionText = data.detailedDescription || 
                           data.article || 
                           data.fullText || 
                           data.text || 
                           data.analysis || 
                           data.longSummary || 
                           summaryText;

    const result: AnalysisResult = {
      title: data.title || data.videoTitle || data.video_title || "Analyzed Video",
      thumbnailUrl: data.thumbnailUrl || data.thumbnail || "https://picsum.photos/800/450",
      summary: summaryText,
      description: descriptionText,
      
      keyPoints: safeStringArray(data.keyPoints || data.mainPoints || data.points || data.key_points),
      topics: safeTopics(data.topics || data.videoTopics || data.tags || data.keywords),
      insights: safeStringArray(data.insights || data.strategicInsights || data.keyInsights),
      sentiment: safeSentiment(data.sentiment || data.sentimentAnalysis)
    };

    return result;
  } catch (error: any) {
    console.error("Analysis Error:", error);
    
    // Provide more helpful error messages for common Vercel issues
    if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
      throw new Error("Network Error: Could not connect to n8n. Check CORS settings on your webhook or disable AdBlockers.");
    }
    
    throw new Error(error.message || "Failed to connect to analysis service.");
  }
};