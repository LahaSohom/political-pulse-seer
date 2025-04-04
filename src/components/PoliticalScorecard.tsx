
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";

interface PoliticalScorecardProps {
  title: string;
  value: number | string;
  change?: number;
  description?: string;
  type?: 'percentage' | 'score' | 'count';
  className?: string;
}

const PoliticalScorecard: React.FC<PoliticalScorecardProps> = ({ 
  title, 
  value, 
  change, 
  description, 
  type = 'score',
  className = '' 
}) => {
  const formatValue = () => {
    if (type === 'percentage') return `${Number(value).toFixed(1)}%`;
    if (type === 'count') return Number(value).toLocaleString();
    if (typeof value === 'number') return value.toFixed(2);
    return value;
  };

  const renderTrend = () => {
    if (change === undefined) return null;
    
    if (change > 0) {
      return (
        <Badge variant="outline" className="text-green-600 bg-green-50">
          <ArrowUp className="mr-1 h-3 w-3" />
          {Math.abs(change).toFixed(1)}%
        </Badge>
      );
    } else if (change < 0) {
      return (
        <Badge variant="outline" className="text-red-600 bg-red-50">
          <ArrowDown className="mr-1 h-3 w-3" />
          {Math.abs(change).toFixed(1)}%
        </Badge>
      );
    } else {
      return (
        <Badge variant="outline" className="text-gray-500 bg-gray-50">
          <Minus className="mr-1 h-3 w-3" />
          0%
        </Badge>
      );
    }
  };

  return (
    <Card className={`shadow-sm ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline justify-between">
          <div className="text-2xl font-bold">{formatValue()}</div>
          {renderTrend()}
        </div>
        {description && <CardDescription className="mt-2 text-xs">{description}</CardDescription>}
      </CardContent>
    </Card>
  );
};

export default PoliticalScorecard;
