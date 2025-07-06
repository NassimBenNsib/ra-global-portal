
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";

interface Recommendation {
  id: string;
  type: 'improvement' | 'opportunity' | 'action';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  action?: string;
}

interface AIRecommendationsProps {
  recommendations: Recommendation[];
  profileScore: number;
}

const AIRecommendations: React.FC<AIRecommendationsProps> = ({
  recommendations,
  profileScore
}) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'improvement': return <TrendingUp className="h-4 w-4" />;
      case 'opportunity': return <Sparkles className="h-4 w-4" />;
      case 'action': return <AlertCircle className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Sparkles className="h-6 w-6 text-purple-600" />
          <span>AI Recommendations</span>
          <Badge variant="outline" className="bg-purple-100 text-purple-800">
            Score: {profileScore}%
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((rec) => (
          <div key={rec.id} className="p-4 bg-white rounded-lg border shadow-sm">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="text-purple-600">
                  {getTypeIcon(rec.type)}
                </div>
                <h4 className="font-semibold text-gray-900">{rec.title}</h4>
              </div>
              <Badge className={getPriorityColor(rec.priority)}>
                {rec.priority}
              </Badge>
            </div>
            <p className="text-gray-600 text-sm mb-3">{rec.description}</p>
            {rec.action && (
              <Button variant="outline" size="sm">
                {rec.action}
              </Button>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default AIRecommendations;
