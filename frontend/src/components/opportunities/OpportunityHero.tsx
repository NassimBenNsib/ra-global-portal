
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Clock, 
  Star,
  Award,
  TrendingUp,
  Users,
  Heart,
  Share,
  ExternalLink
} from "lucide-react";

interface OpportunityHeroProps {
  opportunity: any;
  isBookmarked: boolean;
  onBookmark: () => void;
}

const OpportunityHero = ({ opportunity, isBookmarked, onBookmark }: OpportunityHeroProps) => {
  return (
    <Card className="overflow-hidden border-0 shadow-2xl">
      <div className="relative h-80 bg-gradient-to-r from-blue-600 to-green-600">
        <img 
          src={opportunity.image} 
          alt={opportunity.university}
          className="w-full h-full object-cover mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-green-600/80" />
        <div className="absolute bottom-8 left-8 text-white max-w-3xl">
          <div className="flex items-center space-x-3 mb-4">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-sm">
              <Award className="h-4 w-4 mr-2" />
              #{opportunity.ranking} World Ranking
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-sm">
              <TrendingUp className="h-4 w-4 mr-2" />
              {opportunity.acceptanceRate}% Acceptance Rate
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-sm">
              <Users className="h-4 w-4 mr-2" />
              {opportunity.internationalStudents}% International
            </Badge>
          </div>
          <h1 className="text-5xl font-bold mb-3">{opportunity.university}</h1>
          <p className="text-2xl font-semibold mb-2">{opportunity.program}</p>
          <div className="flex items-center space-x-6 text-lg">
            <span className="flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              {opportunity.city}, {opportunity.country}
            </span>
            <span className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              {opportunity.duration}
            </span>
            <span className="flex items-center">
              <Star className="h-5 w-5 mr-2 text-yellow-300" />
              {opportunity.rating}/5.0
            </span>
          </div>
        </div>
        <div className="absolute top-8 right-8 flex space-x-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
            onClick={onBookmark}
          >
            <Heart className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </Button>
          <Button variant="outline" size="sm" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
            <Share className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default OpportunityHero;
