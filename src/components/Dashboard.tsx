
import React, { useState } from 'react';
import PoliticalScorecard from './PoliticalScorecard';
import FilterBar from './FilterBar';
import SentimentAnalysis from './SentimentAnalysis';
import TrendAnalysis from './TrendAnalysis';
import SocialMediaPosts from './SocialMediaPosts';
import PredictionDashboard from './PredictionDashboard';
import { 
  candidates, 
  topics, 
  socialMediaPosts, 
  sentimentTimeData, 
  topicTrends,
  electionPrediction,
  getPredictedApprovalRatings
} from '@/services/mockData';

const Dashboard: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedTimeRange, setSelectedTimeRange] = useState('30days');
  const [selectedTopic, setSelectedTopic] = useState('all');

  // Filter social media posts based on selected filters
  const filteredPosts = socialMediaPosts.filter(post => {
    const platformMatch = selectedPlatform === 'all' || post.platform === selectedPlatform;
    const topicMatch = selectedTopic === 'all' || 
      (post.topic && post.topic.toLowerCase() === selectedTopic);
    return platformMatch && topicMatch;
  });

  // Stats calculations for scorecards
  const positiveSentimentPercentage = Math.round(
    (socialMediaPosts.filter(p => p.sentiment === 'positive').length / 
     socialMediaPosts.length) * 100
  );
  
  const topicsList = Array.from(new Set(
    topics.map(topic => topic.name)
  ));

  const averageSentimentScore = parseFloat(
    (socialMediaPosts.reduce((sum, post) => sum + post.sentimentScore, 0) / 
     socialMediaPosts.length).toFixed(2)
  );

  const totalMentions = topics.reduce((sum, topic) => sum + topic.mentionsCount, 0);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-political-blue">Political Pulse Seer</h1>
          <p className="text-gray-600 mt-1">
            Real-time social media sentiment analysis for political trends
          </p>
        </div>
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <span className="text-sm text-muted-foreground">Data updated:</span>
          <span className="text-sm font-medium">{new Date().toLocaleString()}</span>
        </div>
      </div>

      {/* Scorecards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <PoliticalScorecard 
          title="Avg. Sentiment Score" 
          value={averageSentimentScore * 100}
          change={2.5}
          type="percentage"
          description="Overall sentiment score across all platforms"
        />
        <PoliticalScorecard 
          title="Positive Sentiment" 
          value={positiveSentimentPercentage}
          change={-1.2}
          type="percentage"
          description="Percentage of posts with positive sentiment"
        />
        <PoliticalScorecard 
          title="Total Mentions" 
          value={totalMentions}
          change={5.8}
          type="count"
          description="Total mentions across all topics"
        />
        <PoliticalScorecard 
          title="Trending Topics" 
          value={topics.filter(t => t.trendDirection === 'up').length}
          change={1}
          type="count"
          description="Number of topics with increasing mentions"
        />
      </div>

      {/* Filters */}
      <FilterBar 
        onPlatformChange={setSelectedPlatform}
        onTimeRangeChange={setSelectedTimeRange}
        onTopicChange={setSelectedTopic}
        selectedPlatform={selectedPlatform}
        selectedTimeRange={selectedTimeRange}
        selectedTopic={selectedTopic}
        topics={topicsList}
      />

      {/* Sentiment Analysis Charts */}
      <SentimentAnalysis candidates={candidates} topics={topics} />

      {/* Trend Analysis Charts */}
      <TrendAnalysis sentimentData={sentimentTimeData} topicTrends={topicTrends} />

      {/* Prediction Dashboard */}
      <PredictionDashboard 
        electionPrediction={electionPrediction}
        approvalPredictions={getPredictedApprovalRatings()}
      />

      {/* Recent Social Media Posts */}
      <SocialMediaPosts posts={filteredPosts} />
    </div>
  );
};

export default Dashboard;
