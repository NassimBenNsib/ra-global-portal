
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Camera, Edit, CheckCircle, AlertCircle } from "lucide-react";

interface ProfileHeaderProps {
  user: any;
  completionPercentage: number;
  completedSections: number;
  totalSections: number;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  user,
  completionPercentage,
  completedSections,
  totalSections
}) => {
  return (
    <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-2 border-blue-200 mb-6">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
          {/* Profile Picture */}
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {user?.name ? user.name.split(' ').map((n: string) => n[0]).join('') : 'JD'}
            </div>
            <Button
              size="sm"
              className="absolute -bottom-2 -right-2 rounded-full w-10 h-10 p-0"
              variant="outline"
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>

          {/* User Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{user?.name || 'John Doe'}</h1>
            <p className="text-gray-600 mb-4">{user?.email || 'john.doe@example.com'}</p>
            
            {/* Profile Completion */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-blue-600">Profile Completion</span>
                <span className="text-2xl font-bold text-green-600">{completionPercentage}%</span>
              </div>
              <Progress value={completionPercentage} className="h-3" />
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
                  {completedSections} completed
                </span>
                <span className="flex items-center">
                  <AlertCircle className="h-4 w-4 text-orange-500 mr-1" />
                  {totalSections - completedSections} remaining
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col space-y-2">
            <Button className="bg-gradient-to-r from-blue-600 to-green-600">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
            <Badge variant="outline" className="bg-green-100 text-green-800">
              Active Student
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileHeader;
