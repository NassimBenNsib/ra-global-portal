
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  BookOpen, 
  Calendar, 
  Settings,
  LogOut,
  GraduationCap,
  TrendingUp,
  UserPlus,
  FileText,
  Star,
  Clock,
  CheckCircle,
  X
} from "lucide-react";

interface AdminDashboardProps {
  user: any;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState("overview");

  const students = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      applications: 3,
      status: "Active",
      profileComplete: 85,
      joinDate: "2024-01-15"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      applications: 5,
      status: "Active",
      profileComplete: 92,
      joinDate: "2024-01-10"
    }
  ];

  const applications = [
    {
      id: 1,
      student: "John Doe",
      university: "MIT",
      program: "Computer Science",
      status: "Pending Review",
      aiScore: 8.5,
      submittedDate: "2024-02-01"
    },
    {
      id: 2,
      student: "Jane Smith",
      university: "Stanford",
      program: "AI & Machine Learning",
      status: "Interview Scheduled",
      aiScore: 9.2,
      submittedDate: "2024-01-28"
    }
  ];

  const meetings = [
    {
      id: 1,
      student: "John Doe",
      advisor: "Sarah Johnson",
      date: "2024-02-15",
      time: "14:00",
      type: "Application Review",
      status: "Scheduled"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              RA Global Admin
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Admin Panel - {user.name}</span>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="students" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Students</span>
            </TabsTrigger>
            <TabsTrigger value="applications" className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4" />
              <span>Applications</span>
            </TabsTrigger>
            <TabsTrigger value="meetings" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Meetings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Admin Welcome */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-lg">
              <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-purple-100">Manage students, applications, and opportunities</p>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{students.length}</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Applications</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{applications.length}</div>
                  <p className="text-xs text-muted-foreground">2 require attention</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg AI Score</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8.9</div>
                  <p className="text-xs text-muted-foreground">High quality applications</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">94%</div>
                  <p className="text-xs text-muted-foreground">Excellent placement rate</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Applications</CardTitle>
                  <CardDescription>Latest student submissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {applications.slice(0, 3).map((app) => (
                      <div key={app.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-semibold">{app.student}</h4>
                          <p className="text-sm text-gray-600">{app.university} - {app.program}</p>
                        </div>
                        <Badge variant={app.status === "Pending Review" ? "secondary" : "default"}>
                          {app.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Meetings</CardTitle>
                  <CardDescription>Scheduled consultations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {meetings.map((meeting) => (
                      <div key={meeting.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-semibold">{meeting.student}</h4>
                          <p className="text-sm text-gray-600">{meeting.type}</p>
                          <p className="text-sm text-blue-600">{meeting.date} at {meeting.time}</p>
                        </div>
                        <Badge>{meeting.status}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Student Management</CardTitle>
                  <CardDescription>View and manage all registered students</CardDescription>
                </div>
                <Button>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Student
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {students.map((student) => (
                    <Card key={student.id} className="border-l-4 border-l-green-500">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold">{student.name}</h3>
                            <p className="text-gray-600">{student.email}</p>
                          </div>
                          <Badge variant={student.status === "Active" ? "default" : "secondary"}>
                            {student.status}
                          </Badge>
                        </div>
                        
                        <div className="grid md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <span className="text-sm text-gray-500">Applications</span>
                            <p className="font-semibold">{student.applications}</p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">Profile Complete</span>
                            <p className="font-semibold">{student.profileComplete}%</p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">Join Date</span>
                            <p className="font-semibold">{student.joinDate}</p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">Status</span>
                            <p className="font-semibold text-green-600">Active</p>
                          </div>
                        </div>

                        <div className="flex space-x-3">
                          <Button size="sm" variant="outline">View Profile</Button>
                          <Button size="sm" variant="outline">Send Message</Button>
                          <Button size="sm">Schedule Meeting</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Application Management</CardTitle>
                <CardDescription>Review and manage student applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {applications.map((app) => (
                    <Card key={app.id} className="border-l-4 border-l-blue-500">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold">{app.university}</h3>
                            <p className="text-gray-600">{app.program}</p>
                            <p className="text-sm text-gray-500">Student: {app.student}</p>
                          </div>
                          <Badge variant={app.status === "Pending Review" ? "secondary" : "default"}>
                            {app.status}
                          </Badge>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center space-x-2">
                            <Star className="h-5 w-5 text-yellow-500" />
                            <span className="font-medium">AI Score: {app.aiScore}/10</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-5 w-5 text-blue-500" />
                            <span>Submitted: {app.submittedDate}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <FileText className="h-5 w-5 text-green-500" />
                            <span>Documents: Complete</span>
                          </div>
                        </div>

                        <div className="flex space-x-3">
                          <Button size="sm" variant="outline">Review Details</Button>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve
                          </Button>
                          <Button size="sm" variant="destructive">
                            <X className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="meetings" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Meeting Management</CardTitle>
                  <CardDescription>Schedule and manage student consultations</CardDescription>
                </div>
                <Button>
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Meeting
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {meetings.map((meeting) => (
                    <div key={meeting.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{meeting.type}</h3>
                          <p className="text-sm text-gray-600">Student: {meeting.student}</p>
                          <p className="text-sm text-gray-600">Advisor: {meeting.advisor}</p>
                          <p className="text-sm text-blue-600">{meeting.date} at {meeting.time}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Badge>{meeting.status}</Badge>
                          <Button size="sm" variant="outline">Reschedule</Button>
                          <Button size="sm">Join Meeting</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No other meetings scheduled today</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
