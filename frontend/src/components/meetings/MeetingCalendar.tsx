
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, Plus, MessageSquare } from "lucide-react";

interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  advisor: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  type: 'consultation' | 'application-review' | 'interview';
}

interface MeetingCalendarProps {
  meetings: Meeting[];
  onScheduleMeeting: () => void;
  onJoinMeeting: (meetingId: string) => void;
}

const MeetingCalendar: React.FC<MeetingCalendarProps> = ({
  meetings,
  onScheduleMeeting,
  onJoinMeeting
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'consultation': return 'border-l-blue-500';
      case 'application-review': return 'border-l-green-500';
      case 'interview': return 'border-l-purple-500';
      default: return 'border-l-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Meeting Schedule Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-6 w-6 text-blue-600" />
              <span>Meeting Schedule</span>
            </CardTitle>
            <Button onClick={onScheduleMeeting} className="bg-gradient-to-r from-blue-600 to-green-600">
              <Plus className="h-4 w-4 mr-2" />
              Schedule Meeting
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-800">Upcoming</h3>
              <p className="text-2xl font-bold text-blue-600">
                {meetings.filter(m => m.status === 'scheduled').length}
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-800">Completed</h3>
              <p className="text-2xl font-bold text-green-600">
                {meetings.filter(m => m.status === 'completed').length}
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-semibold text-purple-800">This Month</h3>
              <p className="text-2xl font-bold text-purple-600">{meetings.length}</p>
            </div>
          </div>

          {/* Meetings List */}
          <div className="space-y-3">
            {meetings.map((meeting) => (
              <div key={meeting.id} className={`p-4 border-l-4 ${getTypeColor(meeting.type)} bg-white rounded-lg shadow-sm`}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-semibold text-gray-900">{meeting.title}</h4>
                      <Badge className={getStatusColor(meeting.status)}>
                        {meeting.status}
                      </Badge>
                      <Badge variant="outline">
                        {meeting.type}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {meeting.date}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {meeting.time}
                      </span>
                      <span className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {meeting.advisor}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Chat
                    </Button>
                    {meeting.status === 'scheduled' && (
                      <Button 
                        size="sm" 
                        onClick={() => onJoinMeeting(meeting.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Join
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MeetingCalendar;
