
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Edit, Save, X } from "lucide-react";

interface ProfileSectionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  isCompleted: boolean;
  isEditing?: boolean;
  onEdit?: () => void;
  onSave?: () => void;
  onCancel?: () => void;
  children: React.ReactNode;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
  title,
  description,
  icon,
  isCompleted,
  isEditing = false,
  onEdit,
  onSave,
  onCancel,
  children
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${isCompleted ? 'bg-green-100' : 'bg-orange-100'}`}>
                  {icon}
                </div>
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <span>{title}</span>
                    <Badge variant={isCompleted ? 'default' : 'secondary'}>
                      {isCompleted ? 'Complete' : 'Incomplete'}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{description}</CardDescription>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {!isEditing && (
                  <Button variant="ghost" size="sm" onClick={(e) => {
                    e.stopPropagation();
                    onEdit?.();
                  }}>
                    <Edit className="h-4 w-4" />
                  </Button>
                )}
                <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0">
            {isEditing && (
              <div className="flex space-x-2 mb-4">
                <Button size="sm" onClick={onSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
                <Button variant="outline" size="sm" onClick={onCancel}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            )}
            {children}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default ProfileSection;
