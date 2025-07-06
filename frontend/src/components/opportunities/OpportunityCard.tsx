
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, DollarSign, Star, Calendar, Bookmark, Eye } from "lucide-react";

interface OpportunityCardProps {
  opportunity: {
    id: number;
    university: string;
    program: string;
    country: string;
    city: string;
    level: string;
    field: string;
    tuition: string;
    scholarship: string;
    deadline: string;
    rating: number;
    aiMatch: number;
    image: string;
  };
  onViewDetails: (id: number) => void;
  onSaveOpportunity: (id: number) => void;
  isSaved?: boolean;
}

const OpportunityCard: React.FC<OpportunityCardProps> = ({
  opportunity,
  onViewDetails,
  onSaveOpportunity,
  isSaved = false
}) => {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      <div className="relative h-48 bg-gradient-to-br from-blue-600 to-green-600">
        <img 
          src={opportunity.image} 
          alt={opportunity.university}
          className="w-full h-full object-cover mix-blend-overlay"
        />
        <div className="absolute top-4 right-4 flex space-x-2">
          <Badge className="bg-white/90 text-gray-800">
            {opportunity.aiMatch}% Match
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSaveOpportunity(opportunity.id)}
            className={`bg-white/90 hover:bg-white ${isSaved ? 'text-yellow-600' : 'text-gray-600'}`}
          >
            <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
          </Button>
        </div>
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-xl font-bold">{opportunity.university}</h3>
          <p className="text-sm opacity-90">{opportunity.program}</p>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Key Information */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span>{opportunity.city}, {opportunity.country}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span>{opportunity.rating}/5.0</span>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-gray-500" />
              <span>{opportunity.tuition}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-red-500" />
              <span>{opportunity.deadline}</span>
            </div>
          </div>

          {/* Scholarship Information */}
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="text-sm font-semibold text-green-800 mb-1">Scholarship Available</p>
            <p className="text-sm text-green-600">{opportunity.scholarship}</p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{opportunity.level}</Badge>
            <Badge variant="outline">{opportunity.field}</Badge>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 pt-2">
            <Button 
              className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
              onClick={() => onViewDetails(opportunity.id)}
            >
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OpportunityCard;
