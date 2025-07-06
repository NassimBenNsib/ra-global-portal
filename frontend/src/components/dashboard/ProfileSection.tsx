import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  MapPin, 
  GraduationCap, 
  Languages, 
  Award,
  FileText,
  Edit,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileSection from "@/components/profile/ProfileSection";
import AIRecommendations from "@/components/profile/AIRecommendations";
import { useToast } from "@/hooks/use-toast";

const ProfileSectionMain = () => {
  const { toast } = useToast();
  const [editingSections, setEditingSections] = useState<Record<string, boolean>>({});
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    dateOfBirth: '1995-06-15',
    nationality: 'American',
    currentLocation: 'New York, USA',
    bio: 'Passionate computer science student with a strong interest in artificial intelligence and machine learning.',
    
    // Academic Information
    currentEducation: 'Bachelor of Computer Science',
    institution: 'New York University',
    gpa: '3.8',
    graduationYear: '2024',
    
    // Language Proficiency
    languages: [
      { language: 'English', level: 'Native' },
      { language: 'French', level: 'Intermediate' },
      { language: 'Spanish', level: 'Beginner' }
    ],
    
    // Test Scores
    testScores: [
      { test: 'TOEFL', score: '110', maxScore: '120' },
      { test: 'GRE', score: '325', maxScore: '340' },
      { test: 'IELTS', score: '8.5', maxScore: '9.0' }
    ]
  });

  const completionItems = [
    { name: 'Personal Information', completed: true, weight: 20 },
    { name: 'Academic Background', completed: true, weight: 25 },
    { name: 'Language Proficiency', completed: true, weight: 15 },
    { name: 'Test Scores', completed: true, weight: 15 },
    { name: 'Documents', completed: false, weight: 15 },
    { name: 'Statement of Purpose', completed: false, weight: 10 }
  ];

  const completedWeight = completionItems
    .filter(item => item.completed)
    .reduce((sum, item) => sum + item.weight, 0);

  const aiRecommendations = [
    {
      id: '1',
      type: 'improvement' as const,
      title: 'Add Your GPA',
      description: 'Including your GPA can increase your match score by up to 15% for scholarship opportunities.',
      priority: 'high' as const,
      action: 'Add GPA'
    },
    {
      id: '2',
      type: 'opportunity' as const,
      title: 'New Scholarships Available',
      description: 'Based on your profile, 3 new scholarship opportunities match your criteria.',
      priority: 'medium' as const,
      action: 'View Opportunities'
    },
    {
      id: '3',
      type: 'action' as const,
      title: 'Complete Documents Section',
      description: 'Upload your transcripts and recommendation letters to improve your application strength.',
      priority: 'high' as const,
      action: 'Upload Documents'
    }
  ];

  const handleEdit = (section: string) => {
    setEditingSections(prev => ({ ...prev, [section]: true }));
  };

  const handleSave = (section: string) => {
    setEditingSections(prev => ({ ...prev, [section]: false }));
    toast({
      title: "Profile Updated",
      description: `Your ${section} has been saved successfully.`,
    });
  };

  const handleCancel = (section: string) => {
    setEditingSections(prev => ({ ...prev, [section]: false }));
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <ProfileHeader 
        user={{ name: `${profileData.firstName} ${profileData.lastName}`, email: profileData.email }}
        completionPercentage={completedWeight}
        completedSections={completionItems.filter(item => item.completed).length}
        totalSections={completionItems.length}
      />

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Profile Sections */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <ProfileSection
            title="Personal Information"
            description="Update your basic personal details"
            icon={<User className="h-5 w-5 text-blue-600" />}
            isCompleted={true}
            isEditing={editingSections.personal}
            onEdit={() => handleEdit('personal')}
            onSave={() => handleSave('personal information')}
            onCancel={() => handleCancel('personal')}
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={profileData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  disabled={!editingSections.personal}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={profileData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  disabled={!editingSections.personal}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  disabled={!editingSections.personal}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={profileData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  disabled={!editingSections.personal}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={profileData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  disabled={!editingSections.personal}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nationality">Nationality</Label>
                <Select 
                  value={profileData.nationality} 
                  onValueChange={(value) => handleInputChange('nationality', value)}
                  disabled={!editingSections.personal}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="American">American</SelectItem>
                    <SelectItem value="British">British</SelectItem>
                    <SelectItem value="Canadian">Canadian</SelectItem>
                    <SelectItem value="Australian">Australian</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentLocation">Current Location</Label>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <Input
                  id="currentLocation"
                  value={profileData.currentLocation}
                  onChange={(e) => handleInputChange('currentLocation', e.target.value)}
                  placeholder="City, Country"
                  disabled={!editingSections.personal}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={profileData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                placeholder="Tell us about yourself..."
                rows={4}
                disabled={!editingSections.personal}
              />
            </div>
          </ProfileSection>

          {/* Academic Background */}
          <ProfileSection
            title="Academic Background"
            description="Provide details about your educational background"
            icon={<GraduationCap className="h-5 w-5 text-green-600" />}
            isCompleted={true}
            isEditing={editingSections.academic}
            onEdit={() => handleEdit('academic')}
            onSave={() => handleSave('academic background')}
            onCancel={() => handleCancel('academic')}
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="currentEducation">Current Education Level</Label>
                <Select value={profileData.currentEducation} onValueChange={(value) => handleInputChange('currentEducation', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="High School">High School</SelectItem>
                    <SelectItem value="Bachelor's Degree">Bachelor's Degree</SelectItem>
                    <SelectItem value="Master's Degree">Master's Degree</SelectItem>
                    <SelectItem value="PhD">PhD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="institution">Institution</Label>
                <Input
                  id="institution"
                  value={profileData.institution}
                  onChange={(e) => handleInputChange('institution', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gpa">GPA</Label>
                <Input
                  id="gpa"
                  value={profileData.gpa}
                  onChange={(e) => handleInputChange('gpa', e.target.value)}
                  placeholder="3.8 / 4.0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="graduationYear">Expected Graduation</Label>
                <Input
                  id="graduationYear"
                  value={profileData.graduationYear}
                  onChange={(e) => handleInputChange('graduationYear', e.target.value)}
                  placeholder="2024"
                />
              </div>
            </div>

            {/* Test Scores */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center space-x-2">
                <Award className="h-5 w-5" />
                <span>Test Scores</span>
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {profileData.testScores.map((test, index) => (
                  <Card key={index} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="text-center">
                        <h4 className="font-semibold">{test.test}</h4>
                        <div className="text-2xl font-bold text-blue-600 my-2">
                          {test.score}
                        </div>
                        <div className="text-sm text-gray-600">
                          out of {test.maxScore}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Button className="w-full md:w-auto">Save Academic Information</Button>
          </ProfileSection>

          {/* Language Proficiency */}
          <ProfileSection
            title="Language Proficiency"
            description="Add your language skills and proficiency levels"
            icon={<Languages className="h-5 w-5 text-purple-600" />}
            isCompleted={true}
            isEditing={editingSections.languages}
            onEdit={() => handleEdit('languages')}
            onSave={() => handleSave('language proficiency')}
            onCancel={() => handleCancel('languages')}
          >
            <div className="space-y-4">
              {profileData.languages.map((lang, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Languages className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{lang.language}</h3>
                      <p className="text-sm text-gray-600">Proficiency Level</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant={lang.level === 'Native' ? 'default' : 'secondary'}>
                      {lang.level}
                    </Badge>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full">
              + Add Language
            </Button>
          </ProfileSection>

          {/* Documents */}
          <ProfileSection
            title="Required Documents"
            description="Upload and manage your application documents"
            icon={<FileText className="h-5 w-5 text-orange-600" />}
            isCompleted={false}
            isEditing={editingSections.documents}
            onEdit={() => handleEdit('documents')}
            onSave={() => handleSave('documents')}
            onCancel={() => handleCancel('documents')}
          >
            <div className="space-y-4">
              {[
                { name: 'Transcript', status: 'Uploaded', required: true },
                { name: 'Statement of Purpose', status: 'Pending', required: true },
                { name: 'Letters of Recommendation', status: 'Uploaded', required: true },
                { name: 'Passport Copy', status: 'Uploaded', required: true },
                { name: 'CV/Resume', status: 'Pending', required: false }
              ].map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      doc.status === 'Uploaded' ? 'bg-green-100' : 'bg-orange-100'
                    }`}>
                      {doc.status === 'Uploaded' ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-orange-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">{doc.name}</h3>
                      <p className="text-sm text-gray-600">
                        {doc.required ? 'Required' : 'Optional'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant={doc.status === 'Uploaded' ? 'default' : 'secondary'}>
                      {doc.status}
                    </Badge>
                    <Button variant="outline" size="sm">
                      {doc.status === 'Uploaded' ? 'Replace' : 'Upload'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ProfileSection>
        </div>

        {/* AI Recommendations Sidebar */}
        <div className="lg:col-span-1">
          <AIRecommendations 
            recommendations={aiRecommendations}
            profileScore={completedWeight}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileSectionMain;
