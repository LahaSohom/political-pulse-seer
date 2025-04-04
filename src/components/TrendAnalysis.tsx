
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { SentimentOverTime, TopicTrend } from '@/services/mockData';
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface TrendAnalysisProps {
  sentimentData: SentimentOverTime[];
  topicTrends: TopicTrend[];
}

const TrendAnalysis: React.FC<TrendAnalysisProps> = ({ sentimentData, topicTrends }) => {
  const [selectedTopic, setSelectedTopic] = React.useState(topicTrends[0]?.topic || '');
  
  // Get data for the selected topic
  const selectedTopicData = topicTrends.find(trend => trend.topic === selectedTopic)?.data || [];
  
  // Format sentiment data for display
  const formattedSentimentData = sentimentData.map(item => ({
    ...item,
    democrat: (item.democrat * 100).toFixed(0),
    republican: (item.republican * 100).toFixed(0),
    independent: (item.independent * 100).toFixed(0),
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }));

  // Format topic trend data for display
  const formattedTopicData = selectedTopicData.map(item => ({
    ...item,
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      {/* Sentiment Trend Analysis */}
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Sentiment Trends</CardTitle>
            <Badge variant="outline" className="font-normal">
              <TrendingUp className="h-3 w-3 mr-1" />
              Time Series
            </Badge>
          </div>
          <CardDescription>
            Sentiment analysis over time for major political affiliations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={formattedSentimentData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  tickMargin={5}
                />
                <YAxis 
                  domain={[-100, 100]}
                  tickFormatter={(value) => `${value}%`}
                  width={40}
                />
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Sentiment']}
                  labelFormatter={(value) => `Date: ${value}`}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="democrat" 
                  stroke="#1a365d" 
                  activeDot={{ r: 6 }} 
                  strokeWidth={2}
                  name="Democrat"
                />
                <Line 
                  type="monotone" 
                  dataKey="republican" 
                  stroke="#9B2C2C" 
                  activeDot={{ r: 6 }} 
                  strokeWidth={2}
                  name="Republican"
                />
                <Line 
                  type="monotone" 
                  dataKey="independent" 
                  stroke="#4A5568" 
                  activeDot={{ r: 6 }} 
                  strokeWidth={2}
                  name="Independent"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* Topic Trend Analysis */}
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <CardTitle className="mr-2">Topic Mentions</CardTitle>
              <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                <SelectTrigger className="h-8 w-[130px]">
                  <SelectValue placeholder="Select Topic" />
                </SelectTrigger>
                <SelectContent>
                  {topicTrends.map(trend => (
                    <SelectItem key={trend.topic} value={trend.topic}>
                      {trend.topic}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Badge variant="outline" className="font-normal">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              Trending
            </Badge>
          </div>
          <CardDescription>
            Mention frequency over time for selected topics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={formattedTopicData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  tickMargin={5}
                />
                <YAxis 
                  width={40}
                />
                <Tooltip 
                  formatter={(value) => [`${value.toLocaleString()}`, 'Mentions']}
                  labelFormatter={(value) => `Date: ${value}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3182CE" 
                  activeDot={{ r: 6 }} 
                  strokeWidth={2}
                  name={selectedTopic}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrendAnalysis;
