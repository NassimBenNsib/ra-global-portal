
import React from 'react';
import CandidateInterface from "@/pages/CandidateInterface";

interface StudentDashboardProps {
  user: any;
  onLogout: () => void;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ user, onLogout }) => {
  return <CandidateInterface user={user} onLogout={onLogout} />;
};

export default StudentDashboard;
