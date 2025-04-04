
// Mock data for sentiment analysis

export interface SocialMediaPost {
  id: string;
  content: string;
  platform: 'twitter' | 'reddit' | 'facebook';
  timestamp: string;
  likes: number;
  shares: number;
  sentiment: 'positive' | 'negative' | 'neutral';
  sentimentScore: number; // -1 to 1
  topic?: string;
  author?: string;
  location?: string;
  politicalLeaning?: 'democrat' | 'republican' | 'independent' | 'unknown';
}

export interface Candidate {
  id: string;
  name: string;
  party: 'democrat' | 'republican' | 'independent';
  imageUrl?: string;
  sentimentScore: number; // -1 to 1
  approvalRating: number; // percentage
  mentionsCount: number;
  trendDirection: 'up' | 'down' | 'stable';
}

export interface Topic {
  id: string;
  name: string;
  mentionsCount: number;
  sentimentScore: number; // -1 to 1
  trendDirection: 'up' | 'down' | 'stable';
  relatedTopics: string[];
}

export interface SentimentOverTime {
  date: string;
  democrat: number;
  republican: number;
  independent: number;
}

export interface TopicTrend {
  topic: string;
  data: { date: string; value: number }[];
}

// Helper to generate random sentiment between -1 and 1
const randomSentiment = () => parseFloat((Math.random() * 2 - 1).toFixed(2));

// Helper to determine sentiment category
const getSentimentCategory = (score: number): 'positive' | 'negative' | 'neutral' => {
  if (score > 0.2) return 'positive';
  if (score < -0.2) return 'negative';
  return 'neutral';
};

// Mock candidates
export const candidates: Candidate[] = [
  {
    id: '1',
    name: 'Jane Smith',
    party: 'democrat',
    imageUrl: 'https://i.pravatar.cc/150?img=1',
    sentimentScore: 0.42,
    approvalRating: 54,
    mentionsCount: 12500,
    trendDirection: 'up'
  },
  {
    id: '2',
    name: 'John Davis',
    party: 'republican',
    imageUrl: 'https://i.pravatar.cc/150?img=2',
    sentimentScore: 0.31,
    approvalRating: 48,
    mentionsCount: 11200,
    trendDirection: 'stable'
  },
  {
    id: '3',
    name: 'Alex Johnson',
    party: 'independent',
    imageUrl: 'https://i.pravatar.cc/150?img=3',
    sentimentScore: -0.15,
    approvalRating: 32,
    mentionsCount: 4300,
    trendDirection: 'down'
  },
  {
    id: '4',
    name: 'Maria Rodriguez',
    party: 'democrat',
    imageUrl: 'https://i.pravatar.cc/150?img=4',
    sentimentScore: 0.25,
    approvalRating: 46,
    mentionsCount: 8700,
    trendDirection: 'stable'
  },
  {
    id: '5',
    name: 'Robert Wilson',
    party: 'republican',
    imageUrl: 'https://i.pravatar.cc/150?img=5',
    sentimentScore: -0.23,
    approvalRating: 41,
    mentionsCount: 7600,
    trendDirection: 'down'
  }
];

// Mock topics
export const topics: Topic[] = [
  {
    id: '1',
    name: 'Healthcare Reform',
    mentionsCount: 25600,
    sentimentScore: -0.15,
    trendDirection: 'up',
    relatedTopics: ['Insurance', 'Medicare', 'Prescription Drugs']
  },
  {
    id: '2',
    name: 'Climate Change',
    mentionsCount: 18700,
    sentimentScore: 0.22,
    trendDirection: 'up',
    relatedTopics: ['Green Energy', 'Carbon Tax', 'Paris Agreement']
  },
  {
    id: '3',
    name: 'Economic Policy',
    mentionsCount: 21300,
    sentimentScore: 0.05,
    trendDirection: 'stable',
    relatedTopics: ['Taxes', 'Inflation', 'Jobs']
  },
  {
    id: '4',
    name: 'Immigration',
    mentionsCount: 19200,
    sentimentScore: -0.38,
    trendDirection: 'up',
    relatedTopics: ['Border Security', 'DACA', 'Asylum']
  },
  {
    id: '5',
    name: 'Gun Control',
    mentionsCount: 16400,
    sentimentScore: -0.52,
    trendDirection: 'down',
    relatedTopics: ['Second Amendment', 'Background Checks', 'Mass Shootings']
  }
];

// Generate mock social media posts
const generateMockPosts = (count: number): SocialMediaPost[] => {
  const platforms = ['twitter', 'reddit', 'facebook'] as const;
  const topics = ['Healthcare', 'Economy', 'Immigration', 'Climate', 'Education', 'Foreign Policy'];
  const posts: SocialMediaPost[] = [];
  
  const mockContents = [
    "I think the new healthcare policy will benefit many Americans. #Healthcare",
    "This economic plan is a disaster for small businesses. #Economy",
    "The immigration reforms are long overdue and needed. #Immigration",
    "Climate change policies need to be more aggressive now! #Climate",
    "Education funding is critical for our future generations. #Education",
    "Our foreign policy needs a complete overhaul. #ForeignPolicy",
    "Healthcare costs are still too high despite recent reforms. #Healthcare",
    "The economy is showing strong signs of recovery! #Economy",
    "Immigration system is broken and needs immediate attention. #Immigration",
    "We need to act faster on climate change initiatives. #Climate",
    "Teachers deserve better pay and resources. #Education",
    "Our diplomatic approach has improved our standing globally. #ForeignPolicy"
  ];
  
  for (let i = 0; i < count; i++) {
    const sentimentScore = randomSentiment();
    const contentIndex = Math.floor(Math.random() * mockContents.length);
    const post: SocialMediaPost = {
      id: `post-${i}`,
      content: mockContents[contentIndex],
      platform: platforms[Math.floor(Math.random() * platforms.length)],
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
      likes: Math.floor(Math.random() * 1000),
      shares: Math.floor(Math.random() * 500),
      sentiment: getSentimentCategory(sentimentScore),
      sentimentScore,
      topic: topics[Math.floor(Math.random() * topics.length)],
      author: `user${Math.floor(Math.random() * 1000)}`,
      location: ['New York', 'California', 'Texas', 'Florida', 'Ohio'][Math.floor(Math.random() * 5)],
      politicalLeaning: ['democrat', 'republican', 'independent', 'unknown'][Math.floor(Math.random() * 4)] as any
    };
    posts.push(post);
  }
  
  return posts;
};

export const socialMediaPosts = generateMockPosts(50);

// Generate sentiment data over time
export const generateSentimentOverTime = (days: number): SentimentOverTime[] => {
  const data: SentimentOverTime[] = [];
  const now = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(now.getDate() - i);
    
    data.push({
      date: date.toISOString().split('T')[0],
      democrat: parseFloat((Math.random() * 0.5 + 0.1 + Math.sin(i / 5) * 0.3).toFixed(2)),
      republican: parseFloat((Math.random() * 0.5 - 0.1 + Math.cos(i / 5) * 0.3).toFixed(2)),
      independent: parseFloat((Math.random() * 0.3 - 0.15 + Math.sin(i / 3) * 0.15).toFixed(2))
    });
  }
  
  return data;
};

export const sentimentTimeData = generateSentimentOverTime(30);

// Generate topic trends over time
export const generateTopicTrends = (): TopicTrend[] => {
  const topicNames = ['Healthcare', 'Economy', 'Immigration', 'Climate', 'Education'];
  const trends: TopicTrend[] = [];
  const now = new Date();
  
  topicNames.forEach((topic) => {
    const data = [];
    let value = Math.floor(Math.random() * 100) + 50;
    
    for (let i = 30; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(now.getDate() - i);
      
      // Random fluctuation with some trend
      value = Math.max(10, Math.min(500, value + (Math.random() * 40 - 20)));
      
      data.push({
        date: date.toISOString().split('T')[0],
        value
      });
    }
    
    trends.push({
      topic,
      data
    });
  });
  
  return trends;
};

export const topicTrends = generateTopicTrends();

// Mock prediction data
export const electionPrediction = {
  democrat: 48.2,
  republican: 46.5,
  independent: 5.3,
  margin: 1.7,
  confidence: 'moderate',
  lastUpdated: new Date().toISOString()
};

export const getPredictedApprovalRatings = () => {
  return candidates.map(candidate => ({
    id: candidate.id,
    name: candidate.name,
    party: candidate.party,
    current: candidate.approvalRating,
    predicted: candidate.approvalRating + (Math.random() * 10 - 5),
    confidence: Math.random() * 30 + 65
  }));
};
