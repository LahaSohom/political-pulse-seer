
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  Legend,
  Tooltip,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar
} from 'recharts';
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, Clock } from "lucide-react";

interface PredictionProps {
  electionPrediction: {
    democrat: number;
    republican: number;
    independent: number;
    margin: number;
    confidence: string;
    lastUpdated: string;
  };
  approvalPredictions: Array<{
    id: string;
    name: string;
    party: string;
    current: number;
    predicted: number;
    confidence: number;
  }>;
}

const PredictionDashboard: React.FC<PredictionProps> = ({ 
  electionPrediction, 
  approvalPredictions 
}) => {
  // Format data for the pie chart
  const electionData = [
    { name: 'Democrat', value: electionPrediction.democrat },
    { name: 'Republican', value: electionPrediction.republican },
    { name: 'Independent', value: electionPrediction.independent }
  ];

  // Colors for the pie chart
  const COLORS = ['#1a365d', '#9B2C2C', '#4A5568'];

  // Format data for the bar chart
  const approvalData = approvalPredictions.map(candidate => ({
    name: candidate.name,
    current: candidate.current,
    predicted: candidate.predicted,
    party: candidate.party
  }));

  const getConfidenceBadge = (confidence: string) => {
    switch(confidence) {
      case 'high':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-600">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            High Confidence
          </Badge>
        );
      case 'moderate':
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-600">
            <AlertCircle className="h-3 w-3 mr-1" />
            Moderate Confidence
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-600">
            <AlertCircle className="h-3 w-3 mr-1" />
            Low Confidence
          </Badge>
        );
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      {/* Election Prediction */}
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Election Prediction</CardTitle>
            {getConfidenceBadge(electionPrediction.confidence)}
          </div>
          <CardDescription className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            Last updated: {new Date(electionPrediction.lastUpdated).toLocaleString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={electionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                >
                  {electionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => {
                    return typeof value === 'number' 
                      ? `${value.toFixed(1)}%` 
                      : value;
                  }} 
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-sm text-center">
            <p className="font-medium">Predicted Margin: <span className="font-bold">{electionPrediction.margin}%</span></p>
          </div>
        </CardContent>
      </Card>
      
      {/* Approval Rating Predictions */}
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Approval Rating Predictions</CardTitle>
            <Badge variant="outline">4-Week Forecast</Badge>
          </div>
          <CardDescription>
            Current and predicted approval ratings for candidates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={approvalData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12 }}
                  tickMargin={5}
                />
                <YAxis 
                  domain={[0, 100]}
                  tickFormatter={(value) => `${value}%`}
                  width={40}
                />
                <Tooltip 
                  formatter={(value) => {
                    return typeof value === 'number' 
                      ? [`${value.toFixed(1)}%`, 'Approval Rating'] 
                      : [value, 'Approval Rating'];
                  }}
                />
                <Legend />
                <Bar 
                  dataKey="current" 
                  name="Current" 
                  fill="#64748B" 
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="predicted" 
                  name="Predicted" 
                  radius={[4, 4, 0, 0]}
                >
                  {approvalData.map((entry, index) => {
                    const color = entry.party === 'democrat' ? '#1a365d' : 
                                entry.party === 'republican' ? '#9B2C2C' : '#4A5568';
                    return <Cell key={`cell-${index}`} fill={color} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PredictionDashboard;
