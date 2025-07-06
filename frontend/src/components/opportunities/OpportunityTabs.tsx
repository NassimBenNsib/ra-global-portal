
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  BookOpen,
  CheckCircle,
  Calendar,
  FileText,
  Mail,
  Phone,
  Globe,
  Clock,
  Video,
  Download,
  MessageSquare,
  Building,
  Award,
  Send,
  Heart
} from "lucide-react";

interface OpportunityTabsProps {
  opportunity: any;
  comments: any[];
  comment: string;
  setComment: (value: string) => void;
}

const OpportunityTabs = ({ opportunity, comments, comment, setComment }: OpportunityTabsProps) => {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList className="grid w-full grid-cols-6">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="requirements">Requirements</TabsTrigger>
        <TabsTrigger value="scholarships">Scholarships</TabsTrigger>
        <TabsTrigger value="process">Process</TabsTrigger>
        <TabsTrigger value="contact">Contact</TabsTrigger>
        <TabsTrigger value="comments">Q&A</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6" />
              <span>Program Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700 text-lg leading-relaxed">{opportunity.description}</p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold mb-4 flex items-center">
                  <Award className="h-5 w-5 mr-2 text-blue-600" />
                  Research Areas
                </h4>
                <ul className="space-y-3">
                  {opportunity.researchAreas.map((area: string, index: number) => (
                    <li key={index} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="font-medium">{area}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-4 flex items-center">
                  <Building className="h-5 w-5 mr-2 text-green-600" />
                  Campus Facilities
                </h4>
                <ul className="space-y-3">
                  {opportunity.facilities.map((facility: string, index: number) => (
                    <li key={index} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="font-medium">{facility}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{opportunity.totalStudents}</div>
                <div className="text-sm text-gray-600">Total Students</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{opportunity.facultyRatio}</div>
                <div className="text-sm text-gray-600">Faculty Ratio</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{opportunity.campusSize}</div>
                <div className="text-sm text-gray-600">Campus Size</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{opportunity.established}</div>
                <div className="text-sm text-gray-600">Established</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="requirements" className="space-y-6">
        {opportunity.requirements.map((reqCategory: any, index: number) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-xl">{reqCategory.type} Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {reqCategory.details.map((req: string, reqIndex: number) => (
                  <div key={reqIndex} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-800">{req}</span>
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </TabsContent>

      <TabsContent value="scholarships" className="space-y-6">
        <div className="grid gap-6">
          {opportunity.scholarships.map((scholarship: any, index: number) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">{scholarship.name}</h4>
                    <p className="text-2xl font-bold text-green-600 mb-2">{scholarship.amount}</p>
                    <p className="text-gray-600 mb-3">{scholarship.criteria}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Deadline: {scholarship.deadline}
                      </span>
                      <Badge variant={scholarship.renewable ? "default" : "secondary"}>
                        {scholarship.renewable ? "Renewable" : "One-time"}
                      </Badge>
                    </div>
                  </div>
                  <Button className="bg-gradient-to-r from-blue-600 to-green-600">
                    Apply Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="process" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-6 w-6" />
              <span>Application Process</span>
            </CardTitle>
            <CardDescription>
              Complete these steps to submit your application
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {opportunity.applicationProcess.map((step: any, index: number) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900">{step.title}</h4>
                    <p className="text-gray-600 mb-1">{step.description}</p>
                    <span className="text-sm text-blue-600 font-medium">
                      ⏱️ Estimated time: {step.duration}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Important Dates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {opportunity.keyDates.map((date: any, index: number) => (
                <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                  <span className="font-medium">{date.event}</span>
                  <Badge variant="outline">{date.date}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="contact" className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-6 w-6" />
                <span>Contact Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-500" />
                <span>{opportunity.contactInfo.admissionsEmail}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-500" />
                <span>{opportunity.contactInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="h-5 w-5 text-gray-500" />
                <a href={opportunity.contactInfo.website} className="text-blue-600 hover:underline">
                  Visit Program Website
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-gray-500" />
                <span>{opportunity.contactInfo.officeHours}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" variant="outline">
                <Video className="h-4 w-4 mr-2" />
                Schedule Virtual Tour
              </Button>
              <Button className="w-full" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download Brochure
              </Button>
              <Button className="w-full" variant="outline">
                <MessageSquare className="h-4 w-4 mr-2" />
                Chat with Current Students
              </Button>
              <Button className="w-full" variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Attend Info Session
              </Button>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="comments" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="h-6 w-6" />
              <span>Student Questions & Answers</span>
              <Badge variant="outline">{comments.length} discussions</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Add Comment */}
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold">Ask a Question</h4>
              <Textarea
                placeholder="Ask anything about this program - admission requirements, campus life, research opportunities..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
              />
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  Questions are answered by RA Global staff and current students
                </span>
                <Button>
                  <Send className="h-4 w-4 mr-2" />
                  Post Question
                </Button>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="border-l-4 border-blue-200 pl-6 py-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {comment.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="font-semibold">{comment.author}</span>
                        <span className="text-sm text-gray-500">{comment.date}</span>
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <Heart className="h-4 w-4" />
                          <span>{comment.likes}</span>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-3 leading-relaxed">{comment.content}</p>
                      
                      {/* Replies */}
                      {comment.replies.map((reply: any, index: number) => (
                        <div key={index} className="ml-4 p-4 bg-blue-50 rounded-lg mt-3">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                              {reply.avatar}
                            </div>
                            <span className={`font-semibold ${reply.isStaff ? 'text-blue-700' : 'text-gray-700'}`}>
                              {reply.author}
                            </span>
                            {reply.isStaff && (
                              <Badge variant="outline" className="text-xs">Staff</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-700 leading-relaxed">{reply.content}</p>
                        </div>
                      ))}
                      
                      <Button variant="ghost" size="sm" className="mt-2">
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default OpportunityTabs;
