
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SocialMediaPost } from '@/services/mockData';
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, Share2, MessageSquare, Calendar } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';

interface SocialMediaPostsProps {
  posts: SocialMediaPost[];
}

const SocialMediaPosts: React.FC<SocialMediaPostsProps> = ({ posts }) => {
  return (
    <Card className="shadow-sm mt-6">
      <CardHeader>
        <CardTitle>Recent Social Media Activity</CardTitle>
        <CardDescription>Latest posts from various platforms on political topics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {posts.slice(0, 5).map((post) => (
            <div key={post.id} className="border rounded-md p-4 transition-all hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className={`capitalize ${
                    post.platform === 'twitter' ? 'bg-blue-50 text-blue-600' : 
                    post.platform === 'reddit' ? 'bg-orange-50 text-orange-600' :
                    'bg-indigo-50 text-indigo-600'
                  }`}>
                    {post.platform}
                  </Badge>
                  {post.topic && (
                    <Badge variant="secondary" className="font-normal">
                      {post.topic}
                    </Badge>
                  )}
                </div>
                <Badge className={`
                  ${post.sentiment === 'positive' ? 'bg-green-100 text-green-800 hover:bg-green-100' : 
                    post.sentiment === 'negative' ? 'bg-red-100 text-red-800 hover:bg-red-100' : 
                    'bg-gray-100 text-gray-800 hover:bg-gray-100'}
                `}>
                  {post.sentiment}
                </Badge>
              </div>
              
              <p className="mt-3 text-sm">{post.content}</p>
              
              <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center">
                    <ThumbsUp className="h-3 w-3 mr-1" />
                    {post.likes}
                  </span>
                  <span className="flex items-center">
                    <Share2 className="h-3 w-3 mr-1" />
                    {post.shares}
                  </span>
                  <span className="flex items-center">
                    <MessageSquare className="h-3 w-3 mr-1" />
                    {Math.floor(post.likes / 5)}
                  </span>
                </div>
                <span className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialMediaPosts;
