
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Star, 
  Calendar,
  Users,
  FileText,
  Eye,
  Download
} from "lucide-react";

interface OpportunitySidebarProps {
  opportunity: any;
  aiAssessment: { score: number };
  similarOpportunities: any[];
  onApply: () => void;
}

const OpportunitySidebar = ({ opportunity, aiAssessment, similarOpportunities, onApply }: OpportunitySidebarProps) => {
  return (
    <div className="space-y-6">
      {/* Quick Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Quick Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 text-sm">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span>Location</span>
              </div>
              <span className="font-medium">{opportunity.city}, {opportunity.country}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span>Duration</span>
              </div>
              <span className="font-medium">{opportunity.duration}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-gray-500" />
                <span>Tuition</span>
              </div>
              <span className="font-medium">{opportunity.tuition}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>Rating</span>
              </div>
              <span className="font-medium">{opportunity.rating}/5.0</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-gray-500" />
                <span>Students</span>
              </div>
              <span className="font-medium">{opportunity.totalStudents}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-red-500" />
                <span>Deadline</span>
              </div>
              <span className="font-medium text-red-600">{opportunity.deadline}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Application Section */}
      <Card className="bg-gradient-to-br from-blue-50 to-green-50 border-2 border-blue-200">
        <CardHeader>
          <CardTitle className="text-xl">Ready to Apply?</CardTitle>
          <CardDescription className="text-base">
            Your AI compatibility score: <span className="font-bold text-green-600 text-lg">{aiAssessment.score}%</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-lg py-6"
            onClick={onApply}
          >
            <FileText className="h-5 w-5 mr-2" />
            Start Application
          </Button>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" className="w-full">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button variant="outline" size="sm" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Save PDF
            </Button>
          </div>
          <div className="text-center text-sm text-gray-600">
            💡 Application takes approximately 45 minutes to complete
          </div>
        </CardContent>
      </Card>

      {/* Similar Opportunities */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Similar Opportunities</CardTitle>
          <CardDescription>Based on your interests and profile</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {similarOpportunities.map((opp, index) => (
            <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h4 className="font-semibold text-base">{opp.university}</h4>
                  <p className="text-sm text-gray-600">{opp.program}</p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                    <span className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {opp.location}
                    </span>
                    <span className="flex items-center">
                      <DollarSign className="h-3 w-3 mr-1" />
                      {opp.tuition}
                    </span>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs whitespace-nowrap">
                  {opp.match}% Match
                </Badge>
              </div>
            </div>
          ))}
          <Button variant="outline" className="w-full">
            View All Similar Programs
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default OpportunitySidebar;
