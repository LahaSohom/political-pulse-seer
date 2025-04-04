
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FilterBarProps {
  onPlatformChange: (platform: string) => void;
  onTimeRangeChange: (range: string) => void;
  onTopicChange: (topic: string) => void;
  selectedPlatform: string;
  selectedTimeRange: string;
  selectedTopic: string;
  topics: string[];
}

const FilterBar: React.FC<FilterBarProps> = ({
  onPlatformChange,
  onTimeRangeChange,
  onTopicChange,
  selectedPlatform,
  selectedTimeRange,
  selectedTopic,
  topics
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between space-y-3 md:space-y-0 md:space-x-4 p-4 bg-white rounded-lg shadow-sm">
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium text-muted-foreground">Platform</p>
        <Tabs defaultValue={selectedPlatform} onValueChange={onPlatformChange} className="w-full">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="twitter">Twitter</TabsTrigger>
            <TabsTrigger value="reddit">Reddit</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium text-muted-foreground">Time Range</p>
        <Select defaultValue={selectedTimeRange} onValueChange={onTimeRangeChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="90days">Last 3 months</SelectItem>
            <SelectItem value="year">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium text-muted-foreground">Topic</p>
        <Select defaultValue={selectedTopic} onValueChange={onTopicChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select topic" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Topics</SelectItem>
            {topics.map(topic => (
              <SelectItem key={topic} value={topic.toLowerCase()}>{topic}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FilterBar;
