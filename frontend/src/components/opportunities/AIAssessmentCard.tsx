
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp,
  CheckCircle,
  AlertCircle,
  ChevronRight
} from "lucide-react";

interface AIAssessmentCardProps {
  aiAssessment: {
    score: number;
    strengths: string[];
    improvements: string[];
    recommendedActions: string[];
  };
}

const AIAssessmentCard = ({ aiAssessment }: AIAssessmentCardProps) => {
  return (
    <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-3">
          <TrendingUp className="h-7 w-7 text-green-600" />
          <span className="text-2xl">AI Eligibility Assessment</span>
          <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300 text-lg px-4 py-2">
            {aiAssessment.score}% Match
          </Badge>
        </CardTitle>
        <CardDescription className="text-lg">
          Based on your profile, here's how well you match this opportunity
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-xl font-semibold">Your Compatibility Score</span>
              <span className="text-3xl font-bold text-green-600">{aiAssessment.score}%</span>
            </div>
            <Progress value={aiAssessment.score} className="h-4" />
            <p className="text-sm text-gray-600 mt-2">Excellent match! You're in the top 5% of candidates for this program.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-green-700 mb-3 flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                Your Strengths
              </h4>
              <ul className="space-y-2">
                {aiAssessment.strengths.map((strength, index) => (
                  <li key={index} className="text-sm text-green-600 flex items-start">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-orange-700 mb-3 flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                Areas to Improve
              </h4>
              <ul className="space-y-2">
                {aiAssessment.improvements.map((improvement, index) => (
                  <li key={index} className="text-sm text-orange-600 flex items-start">
                    <span className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                    {improvement}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">🎯 Recommended Actions</h4>
            <ul className="space-y-1">
              {aiAssessment.recommendedActions.map((action, index) => (
                <li key={index} className="text-sm text-blue-700 flex items-center">
                  <ChevronRight className="h-4 w-4 mr-2" />
                  {action}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIAssessmentCard;
