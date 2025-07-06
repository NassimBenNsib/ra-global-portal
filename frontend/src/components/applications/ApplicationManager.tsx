
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  Upload,
  MessageSquare,
  TrendingUp,
  Star,
  Calendar,
  User,
  Send,
  Download,
  Edit,
  Eye
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ApplicationManager = () => {
  const [selectedApplication, setSelectedApplication] = useState(1);
  const [newMessage, setNewMessage] = useState('');

  const applications = [
    {
      id: 1,
      university: 'MIT',
      program: 'Master in Computer Science',
      status: 'Under Review',
      progress: 85,
      aiScore: 95,
      submittedDate: '2024-03-15',
      lastUpdate: '2024-03-20',
      deadline: '2024-12-15',
      documents: [
        { name: 'Transcript', status: 'Approved', uploadDate: '2024-03-10' },
        { name: 'Statement of Purpose', status: 'Under Review', uploadDate: '2024-03-12' },
        { name: 'Letters of Recommendation', status: 'Approved', uploadDate: '2024-03-14' },
        { name: 'CV/Resume', status: 'Approved', uploadDate: '2024-03-09' }
      ],
      messages: [
        {
          id: 1,
          sender: 'RA Global Team',
          date: '2024-03-20',
          content: 'Your application is progressing well! The admissions committee has reviewed your transcript and CV. They would like to see a stronger research component in your statement of purpose.',
          type: 'staff'
        },
        {
          id: 2,
          sender: 'You',
          date: '2024-03-18',
          content: 'Hello, I wanted to check on the status of my application. Is there anything additional I need to submit?',
          type: 'student'
        }
      ],
      feedback: {
        strengths: ['Excellent academic record', 'Strong technical background', 'Good test scores'],
        improvements: ['Enhance research experience section', 'Clarify career goals', 'Add more specific examples']
      }
    },
    {
      id: 2,
      university: 'University of Oxford',
      program: 'MSc in Data Science',
      status: 'Pending Documents',
      progress: 60,
      aiScore: 88,
      submittedDate: '2024-03-10',
      lastUpdate: '2024-03-18',
      deadline: '2024-11-30',
      documents: [
        { name: 'Transcript', status: 'Approved', uploadDate: '2024-03-08' },
        { name: 'Statement of Purpose', status: 'Pending', uploadDate: null },
        { name: 'Letters of Recommendation', status: 'Pending', uploadDate: null },
        { name: 'CV/Resume', status: 'Approved', uploadDate: '2024-03-07' }
      ],
      messages: [],
      feedback: {
        strengths: ['Strong quantitative background', 'Relevant work experience'],
        improvements: ['Submit missing documents', 'Improve IELTS score if possible']
      }
    }
  ];

  const currentApp = applications.find(app => app.id === selectedApplication) || applications[0];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'under review':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending':
      case 'pending documents':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return <CheckCircle className="h-4 w-4" />;
      case 'under review':
        return <Clock className="h-4 w-4" />;
      case 'pending':
      case 'pending documents':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Applications</h1>
          <p className="text-gray-600">Track and manage your study abroad applications</p>
        </div>
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          {applications.length} Active Applications
        </Badge>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Applications List */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-xl font-semibold">Applications</h2>
          {applications.map((app) => (
            <Card 
              key={app.id} 
              className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                selectedApplication === app.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
              }`}
              onClick={() => setSelectedApplication(app.id)}
            >
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-sm">{app.university}</h3>
                    <p className="text-xs text-gray-600">{app.program}</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className={getStatusColor(app.status)}>
                      {getStatusIcon(app.status)}
                      <span className="ml-1">{app.status}</span>
                    </Badge>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {app.aiScore}% AI Match
                    </Badge>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{app.progress}%</span>
                    </div>
                    <Progress value={app.progress} className="h-2" />
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    Last updated: {app.lastUpdate}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Application Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Application Overview */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">{currentApp.university}</CardTitle>
                  <CardDescription className="text-lg">{currentApp.program}</CardDescription>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className={`${getStatusColor(currentApp.status)} text-lg px-3 py-1`}>
                    {getStatusIcon(currentApp.status)}
                    <span className="ml-2">{currentApp.status}</span>
                  </Badge>
                  <p className="text-sm text-gray-600 mt-1">Submitted: {currentApp.submittedDate}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">{currentApp.aiScore}%</div>
                  <p className="text-sm text-gray-600">AI Match Score</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">{currentApp.progress}%</div>
                  <p className="text-sm text-gray-600">Application Progress</p>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-orange-600 mb-1">{currentApp.deadline}</div>
                  <p className="text-sm text-gray-600">Application Deadline</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Application Tabs */}
          <Tabs defaultValue="documents" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="feedback">AI Feedback</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
            </TabsList>

            <TabsContent value="documents" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>Required Documents</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {currentApp.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            doc.status === 'Approved' ? 'bg-green-100' : 
                            doc.status === 'Under Review' ? 'bg-blue-100' : 'bg-orange-100'
                          }`}>
                            {doc.status === 'Approved' ? (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : doc.status === 'Under Review' ? (
                              <Clock className="h-5 w-5 text-blue-600" />
                            ) : (
                              <AlertCircle className="h-5 w-5 text-orange-600" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-semibold">{doc.name}</h4>
                            <p className="text-sm text-gray-600">
                              {doc.uploadDate ? `Uploaded: ${doc.uploadDate}` : 'Not uploaded'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className={getStatusColor(doc.status)}>
                            {doc.status}
                          </Badge>
                          {doc.uploadDate ? (
                            <div className="flex space-x-1">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <Button size="sm">
                              <Upload className="h-4 w-4 mr-2" />
                              Upload
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="feedback" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5" />
                    <span>AI Assessment & Feedback</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                    <div className="text-4xl font-bold text-green-600 mb-2">{currentApp.aiScore}%</div>
                    <p className="text-lg font-semibold">Overall AI Match Score</p>
                    <Progress value={currentApp.aiScore} className="mt-4 h-3" />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-green-700 mb-3 flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Strengths
                      </h4>
                      <ul className="space-y-2">
                        {currentApp.feedback.strengths.map((strength, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <Star className="h-4 w-4 text-green-600 mt-0.5" />
                            <span className="text-sm">{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-orange-700 mb-3 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-2" />
                        Areas for Improvement
                      </h4>
                      <ul className="space-y-2">
                        {currentApp.feedback.improvements.map((improvement, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <TrendingUp className="h-4 w-4 text-orange-600 mt-0.5" />
                            <span className="text-sm">{improvement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="messages" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageSquare className="h-5 w-5" />
                    <span>Communication with RA Global</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Messages */}
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {currentApp.messages.map((message) => (
                      <div key={message.id} className={`p-4 rounded-lg ${
                        message.type === 'staff' 
                          ? 'bg-blue-50 border-l-4 border-blue-500' 
                          : 'bg-gray-50 border-l-4 border-gray-500 ml-8'
                      }`}>
                        <div className="flex items-center space-x-2 mb-2">
                          <User className="h-4 w-4" />
                          <span className="font-semibold">{message.sender}</span>
                          <span className="text-sm text-gray-500">{message.date}</span>
                        </div>
                        <p className="text-sm">{message.content}</p>
                      </div>
                    ))}
                  </div>

                  {/* New Message */}
                  <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                    <Textarea
                      placeholder="Type your message to RA Global team..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      rows={3}
                    />
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Attach File
                      </Button>
                      <Button size="sm">
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="timeline" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>Application Timeline</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { date: '2024-03-15', title: 'Application Submitted', status: 'completed' },
                      { date: '2024-03-16', title: 'Initial Review Started', status: 'completed' },
                      { date: '2024-03-20', title: 'Documents Under Review', status: 'current' },
                      { date: 'TBD', title: 'Interview Invitation', status: 'pending' },
                      { date: 'TBD', title: 'Final Decision', status: 'pending' }
                    ].map((step, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className={`w-4 h-4 rounded-full ${
                          step.status === 'completed' ? 'bg-green-600' :
                          step.status === 'current' ? 'bg-blue-600' : 'bg-gray-300'
                        }`} />
                        <div className="flex-1">
                          <h4 className="font-semibold">{step.title}</h4>
                          <p className="text-sm text-gray-600">{step.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ApplicationManager;
