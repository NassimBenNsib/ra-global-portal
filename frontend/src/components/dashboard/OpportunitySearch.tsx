
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Calendar
} from "lucide-react";

const OpportunitySearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedField, setSelectedField] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');

  const opportunities = [
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
      description: 'World-renowned program in artificial intelligence and machine learning.',
      requirements: ['GRE: 320+', 'TOEFL: 100+', 'GPA: 3.5+'],
      rating: 4.9
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
      description: 'Intensive program combining statistics, machine learning, and big data.',
      requirements: ['IELTS: 7.5+', 'GPA: 3.7+', 'Quantitative background'],
      rating: 4.8
    },
    {
      id: 3,
      university: 'University of Toronto',
      program: 'MEng in Software Engineering',
      country: 'Canada',
      city: 'Toronto',
      level: 'Masters',
      field: 'Engineering',
      duration: '16 months',
      tuition: 'CAD $45,000/year',
      scholarship: 'Research assistantship',
      deadline: '2024-10-01',
      aiMatch: 82,
      description: 'Professional program with industry partnerships and co-op opportunities.',
      requirements: ['TOEFL: 93+', 'GPA: 3.3+', 'Work experience preferred'],
      rating: 4.7
    }
  ];

  const filteredOpportunities = opportunities.filter(opp => {
    const matchesSearch = opp.program.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         opp.university.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCountry = !selectedCountry || opp.country === selectedCountry;
    const matchesField = !selectedField || opp.field === selectedField;
    const matchesLevel = !selectedLevel || opp.level === selectedLevel;
    
    return matchesSearch && matchesCountry && matchesField && matchesLevel;
  });

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-2 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="h-6 w-6 text-blue-600" />
            <span>Find Your Perfect Opportunity</span>
          </CardTitle>
          <CardDescription>
            Discover thousands of programs worldwide with AI-powered matching
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search programs, universities, or fields..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
            </div>
            
            <div className="grid md:grid-cols-4 gap-4">
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger>
                  <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Countries</SelectItem>
                  <SelectItem value="USA">United States</SelectItem>
                  <SelectItem value="UK">United Kingdom</SelectItem>
                  <SelectItem value="Canada">Canada</SelectItem>
                  <SelectItem value="Australia">Australia</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedField} onValueChange={setSelectedField}>
                <SelectTrigger>
                  <SelectValue placeholder="Field of Study" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Fields</SelectItem>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                  <SelectItem value="Data Science">Data Science</SelectItem>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Business">Business</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Levels</SelectItem>
                  <SelectItem value="Bachelors">Bachelor's</SelectItem>
                  <SelectItem value="Masters">Master's</SelectItem>
                  <SelectItem value="PhD">PhD</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="flex items-center space-x-2">
                <Filter className="h-4 w-4" />
                <span>More Filters</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            {filteredOpportunities.length} Opportunities Found
          </h2>
          <p className="text-gray-600">Sorted by AI match score</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <Select defaultValue="match">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="match">AI Match</SelectItem>
              <SelectItem value="deadline">Deadline</SelectItem>
              <SelectItem value="tuition">Tuition</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Opportunity Cards */}
      <div className="space-y-6">
        {filteredOpportunities.map((opp) => (
          <Card key={opp.id} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-bold">{opp.university}</h3>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {opp.aiMatch}% Match
                    </Badge>
                  </div>
                  <h4 className="text-lg text-blue-600 font-semibold mb-2">{opp.program}</h4>
                  <p className="text-gray-600 mb-3">{opp.description}</p>
                  
                  <div className="grid md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{opp.city}, {opp.country}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{opp.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{opp.tuition}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">{opp.rating}/5.0</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 mb-4">
                    <Badge variant="secondary">{opp.level}</Badge>
                    <Badge variant="secondary">{opp.field}</Badge>
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                      {opp.scholarship}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <h5 className="font-semibold text-sm">Key Requirements:</h5>
                    <div className="flex flex-wrap gap-2">
                      {opp.requirements.map((req, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="ml-6 text-right">
                  <div className="mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                      <Calendar className="h-4 w-4" />
                      <span>Deadline: {opp.deadline}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                      Apply Now
                    </Button>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* AI Insights */}
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h5 className="font-semibold text-blue-900 mb-2">🤖 AI Insights</h5>
                <p className="text-sm text-blue-800">
                  Based on your profile, this program is an excellent match. Your GPA and test scores align well with their requirements. 
                  Consider highlighting your relevant project experience in your application.
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" size="lg">
          Load More Opportunities
        </Button>
      </div>
    </div>
  );
};

export default OpportunitySearch;
