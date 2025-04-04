
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Candidate, Topic } from '@/services/mockData';
import { Badge } from "@/components/ui/badge";
import { ScanSearch } from "lucide-react";

interface SentimentAnalysisProps {
  candidates: Candidate[];
  topics: Topic[];
}

const SentimentAnalysis: React.FC<SentimentAnalysisProps> = ({ candidates, topics }) => {
  // Transform data for the candidates chart
  const candidateData = candidates.map(candidate => ({
    name: candidate.name,
    sentiment: (candidate.sentimentScore * 100).toFixed(0),
    party: candidate.party
  }));

  // Transform data for the topics chart
  const topicData = topics.map(topic => ({
    name: topic.name,
    sentiment: (topic.sentimentScore * 100).toFixed(0),
    mentions: topic.mentionsCount
  }));

  const getBarColor = (party: string) => {
    switch(party) {
      case 'democrat':
        return '#1a365d';
      case 'republican':
        return '#9B2C2C';
      case 'independent':
        return '#4A5568';
      default:
        return '#718096';
    }
  };

  const getSentimentColor = (sentiment: number) => {
    if (sentiment > 20) return '#38A169';
    if (sentiment < -20) return '#E53E3E';
    return '#718096';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Candidate Sentiment Analysis */}
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Candidate Sentiment</CardTitle>
            <Badge variant="outline" className="font-normal">
              <ScanSearch className="h-3 w-3 mr-1" />
              Sentiment Analysis
            </Badge>
          </div>
          <CardDescription>
            Public sentiment analysis for top political candidates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={candidateData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis 
                  type="number" 
                  domain={[-100, 100]} 
                  tickFormatter={(value) => `${value}%`}
                />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  width={100}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Sentiment Score']}
                  labelFormatter={(value) => `Candidate: ${value}`}
                />
                <Bar dataKey="sentiment" radius={[4, 4, 4, 4]}>
                  {candidateData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getBarColor(entry.party)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* Topic Sentiment Analysis */}
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Topic Sentiment</CardTitle>
            <Badge variant="outline" className="font-normal">
              <ScanSearch className="h-3 w-3 mr-1" />
              Topic Analysis
            </Badge>
          </div>
          <CardDescription>
            Public sentiment analysis for key political topics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={topicData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis 
                  type="number" 
                  domain={[-100, 100]} 
                  tickFormatter={(value) => `${value}%`}
                />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  width={120}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip 
                  formatter={(value, name) => {
                    if (name === 'sentiment') return [`${value}%`, 'Sentiment Score'];
                    return [value, name];
                  }}
                  labelFormatter={(value) => `Topic: ${value}`}
                />
                <Bar dataKey="sentiment" radius={[4, 4, 4, 4]}>
                  {topicData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={getSentimentColor(parseFloat(entry.sentiment as string))} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SentimentAnalysis;
