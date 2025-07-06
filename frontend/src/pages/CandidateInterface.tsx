
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OpportunitySearchAdvanced from "@/components/opportunities/OpportunitySearchAdvanced";
import OpportunityDetail from "@/components/opportunities/OpportunityDetail";
import ApplicationManager from "@/components/applications/ApplicationManager";
import WelcomeChatbot from "@/components/chatbot/WelcomeChatbot";
import ProfileSectionMain from "@/components/dashboard/ProfileSection";
import MeetingCalendar from "@/components/meetings/MeetingCalendar";
import { GraduationCap, Search, FileText, MessageCircle, User, LogOut, Calendar } from "lucide-react";

interface CandidateInterfaceProps {
  user: any;
  onLogout: () => void;
}

const CandidateInterface: React.FC<CandidateInterfaceProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('search');

  const userProfile = {
    completionScore: 75,
    activeApplications: 2,
    upcomingDeadlines: 1
  };

  // Sample meetings data
  const sampleMeetings = [
    {
      id: '1',
      title: 'Application Review - MIT',
      date: '2024-12-25',
      time: '10:00 AM',
      advisor: 'Sarah Johnson',
      status: 'scheduled' as const,
      type: 'application-review' as const
    },
    {
      id: '2',
      title: 'Study Abroad Consultation',
      date: '2024-12-22',
      time: '2:00 PM',
      advisor: 'Michael Chen',
      status: 'completed' as const,
      type: 'consultation' as const
    }
  ];

  const handleScheduleMeeting = () => {
    console.log('Schedule new meeting');
  };

  const handleJoinMeeting = (meetingId: string) => {
    console.log('Join meeting:', meetingId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              RA Global
            </span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Button 
              variant={activeTab === 'search' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('search')}
              className="flex items-center space-x-2"
            >
              <Search className="h-4 w-4" />
              <span>Search Opportunities</span>
            </Button>
            <Button 
              variant={activeTab === 'applications' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('applications')}
              className="flex items-center space-x-2"
            >
              <FileText className="h-4 w-4" />
              <span>My Applications</span>
            </Button>
            <Button 
              variant={activeTab === 'meetings' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('meetings')}
              className="flex items-center space-x-2"
            >
              <Calendar className="h-4 w-4" />
              <span>Meetings</span>
            </Button>
            <Button 
              variant={activeTab === 'profile' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('profile')}
              className="flex items-center space-x-2"
            >
              <User className="h-4 w-4" />
              <span>Profile</span>
            </Button>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
            <Button variant="outline" onClick={onLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsContent value="search" className="space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">Discover Your Perfect Study Opportunity</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Use our AI-powered search to find programs that match your profile and goals
              </p>
            </div>
            <OpportunitySearchAdvanced />
          </TabsContent>

          <TabsContent value="applications" className="space-y-6">
            <ApplicationManager />
          </TabsContent>

          <TabsContent value="meetings" className="space-y-6">
            <MeetingCalendar 
              meetings={sampleMeetings}
              onScheduleMeeting={handleScheduleMeeting}
              onJoinMeeting={handleJoinMeeting}
            />
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <ProfileSectionMain />
          </TabsContent>

          <TabsContent value="detail" className="space-y-6">
            <OpportunityDetail />
          </TabsContent>
        </Tabs>
      </main>

      {/* Welcome Chatbot */}
      <WelcomeChatbot 
        userName={user.name} 
        userProfile={userProfile}
      />
    </div>
  );
};

export default CandidateInterface;
