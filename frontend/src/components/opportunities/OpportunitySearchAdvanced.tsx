
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { 
  Search, 
  MapPin, 
  GraduationCap, 
  Star, 
  Clock, 
  DollarSign,
  Filter,
  Heart,
  ExternalLink,
  Calendar,
  Map,
  Grid3X3,
  SlidersHorizontal,
  TrendingUp,
  Users,
  Award
} from "lucide-react";

interface Opportunity {
  id: number;
  university: string;
  program: string;
  country: string;
  city: string;
  level: string;
  field: string;
  duration: string;
  tuition: string;
  scholarship: string;
  deadline: string;
  aiMatch: number;
  description: string;
  requirements: string[];
  rating: number;
  image: string;
  popularityScore: number;
  ranking: number;
  language: string[];
}

const OpportunitySearchAdvanced = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [sortBy, setSortBy] = useState('match');
  const [showFilters, setShowFilters] = useState(false);
  const [tuitionRange, setTuitionRange] = useState([0, 100000]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState('');
  const [scholarshipOnly, setScholarshipOnly] = useState(false);

  const opportunities: Opportunity[] = [
    {
      id: 1,
      university: 'MIT',
      program: 'Master in Computer Science',
      country: 'USA',
      city: 'Cambridge',
      level: 'Masters',
      field: 'Computer Science',
      duration: '2 years',
      tuition: '$55,000/year',
      scholarship: 'Available',
      deadline: '2024-12-15',
      aiMatch: 95,
      description: 'World-renowned program in artificial intelligence and machine learning with cutting-edge research opportunities.',
      requirements: ['GRE: 320+', 'TOEFL: 100+', 'GPA: 3.5+'],
      rating: 4.9,
      image: '/placeholder.svg',
      popularityScore: 98,
      ranking: 1,
      language: ['English']
    },
    {
      id: 2,
      university: 'University of Oxford',
      program: 'MSc in Data Science',
      country: 'UK',
      city: 'Oxford',
      level: 'Masters',
      field: 'Data Science',
      duration: '1 year',
      tuition: '£32,000/year',
      scholarship: 'Merit-based',
      deadline: '2024-11-30',
      aiMatch: 88,
      description: 'Intensive program combining statistics, machine learning, and big data analytics.',
      requirements: ['IELTS: 7.5+', 'GPA: 3.7+', 'Quantitative background'],
      rating: 4.8,
      image: '/placeholder.svg',
      popularityScore: 92,
      ranking: 2,
      language: ['English']
    },
    {
      id: 3,
      university: 'ETH Zurich',
      program: 'MSc in Computer Science',
      country: 'Switzerland',
      city: 'Zurich',
      level: 'Masters',
      field: 'Computer Science',
      duration: '1.5 years',
      tuition: 'CHF 1,300/year',
      scholarship: 'Full scholarship available',
      deadline: '2024-12-01',
      aiMatch: 85,
      description: 'Top-ranked European program with focus on theoretical and applied computer science.',
      requirements: ['GRE: 315+', 'TOEFL: 100+', 'Strong Math background'],
      rating: 4.7,
      image: '/placeholder.svg',
      popularityScore: 87,
      ranking: 3,
      language: ['English', 'German']
    }
  ];

  const filteredOpportunities = opportunities.filter(opp => {
    const matchesSearch = opp.program.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         opp.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         opp.field.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCountry = selectedCountries.length === 0 || selectedCountries.includes(opp.country);
    const matchesField = selectedFields.length === 0 || selectedFields.includes(opp.field);
    const matchesLevel = !selectedLevel || opp.level === selectedLevel;
    const matchesScholarship = !scholarshipOnly || opp.scholarship.toLowerCase().includes('available') || opp.scholarship.toLowerCase().includes('scholarship');
    
    return matchesSearch && matchesCountry && matchesField && matchesLevel && matchesScholarship;
  });

  const sortedOpportunities = [...filteredOpportunities].sort((a, b) => {
    switch (sortBy) {
      case 'match':
        return b.aiMatch - a.aiMatch;
      case 'deadline':
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      case 'ranking':
        return a.ranking - b.ranking;
      case 'popularity':
        return b.popularityScore - a.popularityScore;
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-6 p-6">
      {/* Search Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-2 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Search className="h-6 w-6 text-blue-600" />
              <span>Discover Your Perfect Study Opportunity</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'map' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('map')}
              >
                <Map className="h-4 w-4" />
              </Button>
            </div>
          </CardTitle>
          <CardDescription>
            AI-powered search with {opportunities.length}+ global opportunities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Main Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search programs, universities, fields, or countries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 text-lg py-6"
              />
            </div>
            
            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2"
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span>Advanced Filters</span>
              </Button>
              <Button variant="outline" size="sm" onClick={() => setScholarshipOnly(!scholarshipOnly)}>
                {scholarshipOnly ? '✓' : ''} Scholarships Only
              </Button>
              <Button variant="outline" size="sm">
                <TrendingUp className="h-4 w-4 mr-1" />
                Popular
              </Button>
              <Button variant="outline" size="sm">
                <Award className="h-4 w-4 mr-1" />
                Top Ranked
              </Button>
            </div>

            {/* Advanced Filters Panel */}
            {showFilters && (
              <div className="grid md:grid-cols-4 gap-4 p-4 bg-white rounded-lg border animate-fade-in">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Study Level</label>
                  <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="Bachelors">Bachelor's</SelectItem>
                      <SelectItem value="Masters">Master's</SelectItem>
                      <SelectItem value="PhD">PhD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Field of Study</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Any Field" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Fields</SelectItem>
                      <SelectItem value="Computer Science">Computer Science</SelectItem>
                      <SelectItem value="Data Science">Data Science</SelectItem>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="Business">Business</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Country</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Any Country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Countries</SelectItem>
                      <SelectItem value="USA">United States</SelectItem>
                      <SelectItem value="UK">United Kingdom</SelectItem>
                      <SelectItem value="Canada">Canada</SelectItem>
                      <SelectItem value="Switzerland">Switzerland</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Duration</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Any Duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any Duration</SelectItem>
                      <SelectItem value="1">1 Year</SelectItem>
                      <SelectItem value="2">2 Years</SelectItem>
                      <SelectItem value="3">3+ Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center space-x-2">
            <span>{sortedOpportunities.length} Opportunities Found</span>
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              <Users className="h-3 w-3 mr-1" />
              {Math.floor(Math.random() * 500 + 100)} Applied This Week
            </Badge>
          </h2>
          <p className="text-gray-600">Sorted by {sortBy === 'match' ? 'AI match score' : sortBy}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="match">AI Match</SelectItem>
              <SelectItem value="deadline">Deadline</SelectItem>
              <SelectItem value="ranking">University Ranking</SelectItem>
              <SelectItem value="popularity">Popularity</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Grid */}
      {viewMode === 'grid' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedOpportunities.map((opp) => (
            <Card key={opp.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white overflow-hidden">
              <div className="relative">
                <img 
                  src={opp.image} 
                  alt={opp.university}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 font-semibold">
                    {opp.aiMatch}% Match
                  </Badge>
                </div>
                <div className="absolute top-3 left-3">
                  <Badge variant="outline" className="bg-white/90 text-gray-700">
                    #{opp.ranking} Ranked
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {opp.university}
                    </h3>
                    <p className="text-blue-600 font-semibold">{opp.program}</p>
                  </div>
                  
                  <p className="text-sm text-gray-600 line-clamp-2">{opp.description}</p>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3 text-gray-500" />
                      <span>{opp.city}, {opp.country}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3 text-gray-500" />
                      <span>{opp.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <DollarSign className="h-3 w-3 text-gray-500" />
                      <span>{opp.tuition}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 text-yellow-500" />
                      <span>{opp.rating}/5.0</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    <Badge variant="secondary" className="text-xs">{opp.level}</Badge>
                    <Badge variant="secondary" className="text-xs">{opp.field}</Badge>
                    {opp.scholarship.toLowerCase().includes('available') && (
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-xs">
                        Scholarship
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="text-xs text-gray-500">
                      <Calendar className="h-3 w-3 inline mr-1" />
                      Deadline: {opp.deadline}
                    </div>
                    <div className="flex space-x-1">
                      <Button variant="outline" size="sm" className="p-2">
                        <Heart className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm" className="p-2">
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              
              <div className="px-6 pb-6">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 group-hover:shadow-lg transition-all">
                  View Details & Apply
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Map View */}
      {viewMode === 'map' && (
        <Card className="p-6">
          <div className="h-96 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center border-2 border-dashed border-blue-300">
            <div className="text-center">
              <Map className="h-16 w-16 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Interactive World Map</h3>
              <p className="text-gray-600">Click on countries to discover study opportunities</p>
              <Button className="mt-4" variant="outline">
                Load Interactive Map
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" size="lg" className="px-8">
          Load More Opportunities
        </Button>
      </div>
    </div>
  );
};

export default OpportunitySearchAdvanced;
