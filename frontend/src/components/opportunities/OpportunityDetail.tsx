import React, { useState } from 'react';
import OpportunityHero from './OpportunityHero';
import AIAssessmentCard from './AIAssessmentCard';
import OpportunityTabs from './OpportunityTabs';
import OpportunitySidebar from './OpportunitySidebar';

const OpportunityDetail = () => {
  const [isApplying, setIsApplying] = useState(false);
  const [applicationStep, setApplicationStep] = useState(1);
  const [comment, setComment] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);

  const opportunity = {
    id: 1,
    university: 'Massachusetts Institute of Technology (MIT)',
    program: 'Master of Science in Computer Science',
    country: 'United States',
    city: 'Cambridge, Massachusetts',
    level: 'Masters',
    field: 'Computer Science & Engineering',
    duration: '2 years',
    tuition: '$55,000/year',
    scholarship: 'Available up to 50%',
    deadline: '2024-12-15',
    aiMatch: 95,
    description: 'World-renowned program in artificial intelligence and machine learning with cutting-edge research opportunities and access to leading industry partnerships. Join a community of innovators and work alongside Nobel laureates and industry leaders.',
    requirements: [
      { type: 'Academic', details: ['GRE: 320+ (Quantitative: 165+, Verbal: 155+)', 'GPA: 3.5+ on 4.0 scale', 'Bachelor\'s degree in Computer Science or related field'] },
      { type: 'Language', details: ['TOEFL: 100+ (Speaking: 23+, Writing: 25+)', 'IELTS: 7.0+ (All sections: 6.5+)', 'Duolingo: 120+'] },
      { type: 'Documents', details: ['Statement of Purpose (500-1000 words)', '3 Letters of Recommendation', 'Official Transcripts', 'CV/Resume', 'Portfolio (if applicable)'] }
    ],
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=800&h=400&fit=crop',
    ranking: 1,
    acceptanceRate: 6.7,
    totalStudents: 11000,
    internationalStudents: 35,
    averageSalary: '$150,000',
    facultyRatio: '1:8',
    campusSize: '168 acres',
    established: '1861',
    researchAreas: [
      'Artificial Intelligence & Machine Learning',
      'Computer Vision & Robotics',
      'Natural Language Processing',
      'Cybersecurity & Privacy',
      'Human-Computer Interaction',
      'Distributed Systems & Networks'
    ],
    facilities: [
      'State-of-the-art Computer Science labs',
      '24/7 library access with 5 million books',
      'Career services and industry connections',
      'Research opportunities with faculty',
      'Maker spaces and fabrication labs',
      'High-performance computing clusters'
    ],
    scholarships: [
      { 
        name: 'MIT Presidential Fellowship', 
        amount: 'Full tuition + $40,000 stipend', 
        criteria: 'Outstanding academic achievement and research potential',
        deadline: '2024-12-01',
        renewable: true
      },
      { 
        name: 'Merit-based Scholarship', 
        amount: 'Up to 50% tuition coverage', 
        criteria: 'Academic excellence (GPA 3.8+, GRE 325+)',
        deadline: '2024-12-15',
        renewable: true
      },
      { 
        name: 'Research Assistantship', 
        amount: 'Full tuition + $35,000 stipend', 
        criteria: 'Research experience and faculty recommendation',
        deadline: '2024-11-30',
        renewable: true
      },
      { 
        name: 'International Student Grant', 
        amount: 'Up to $25,000', 
        criteria: 'Financial need demonstration',
        deadline: '2024-12-10',
        renewable: false
      }
    ],
    applicationProcess: [
      { step: 1, title: 'Online Application', description: 'Complete the online application form with personal and academic details', duration: '30 minutes' },
      { step: 2, title: 'Document Upload', description: 'Upload all required documents including transcripts and recommendations', duration: '1-2 hours' },
      { step: 3, title: 'Application Review', description: 'Initial review by admissions committee', duration: '2-4 weeks' },
      { step: 4, title: 'Interview (if selected)', description: 'Virtual or in-person interview with faculty', duration: '1 hour' },
      { step: 5, title: 'Final Decision', description: 'Admission decision notification', duration: '1-2 weeks' }
    ],
    contactInfo: {
      admissionsEmail: 'grad-admissions@csail.mit.edu',
      phone: '+1 (617) 253-4700',
      website: 'https://www.csail.mit.edu/academics/graduate-programs',
      officeHours: 'Monday-Friday: 9:00 AM - 5:00 PM EST'
    },
    keyDates: [
      { event: 'Application Deadline', date: '2024-12-15' },
      { event: 'Scholarship Deadline', date: '2024-12-01' },
      { event: 'Decision Notification', date: '2025-03-15' },
      { event: 'Reply Deadline', date: '2025-04-30' },
      { event: 'Program Start', date: '2025-09-01' }
    ]
  };

  const aiAssessment = {
    score: 95,
    strengths: [
      'Your GPA (3.8) exceeds the minimum requirement',
      'Strong programming background aligns perfectly with the program',
      'Test scores (GRE: 325, TOEFL: 110) are highly competitive',
      'Research experience in AI/ML is a significant advantage',
      'Leadership roles demonstrate well-rounded profile'
    ],
    improvements: [
      'Consider strengthening your statement of purpose with specific research interests',
      'Add more details about your coding projects and technical skills',
      'Highlight any publications or conference presentations',
      'Connect with MIT faculty whose research aligns with your interests'
    ],
    matchReasons: [
      'Program focus aligns 95% with your academic interests',
      'Your academic background is exceptionally well-suited',
      'Strong chance of scholarship eligibility (Presidential Fellowship)',
      'Research experience makes you a competitive candidate',
      'Profile suggests excellent fit for MIT\'s rigorous environment'
    ],
    recommendedActions: [
      'Apply for Presidential Fellowship by December 1st',
      'Contact Prof. Regina Barzilay for AI research opportunities',
      'Schedule an informational interview with current students',
      'Attend MIT\'s virtual information session on November 20th'
    ]
  };

  const similarOpportunities = [
    { university: 'Stanford University', program: 'MS Computer Science', match: 92, location: 'California, USA', tuition: '$52,000' },
    { university: 'Carnegie Mellon University', program: 'MS Machine Learning', match: 89, location: 'Pennsylvania, USA', tuition: '$48,000' },
    { university: 'UC Berkeley', program: 'MS EECS', match: 87, location: 'California, USA', tuition: '$44,000' },
    { university: 'University of Toronto', program: 'MScAC', match: 85, location: 'Ontario, Canada', tuition: '$25,000' }
  ];

  const comments = [
    {
      id: 1,
      author: 'Sarah M.',
      avatar: 'SM',
      date: '2 days ago',
      content: 'Amazing program! The research opportunities are incredible. I\'m particularly excited about the AI lab facilities. Has anyone heard about the housing situation for graduate students?',
      likes: 12,
      replies: [
        { 
          author: 'RA Global Staff', 
          avatar: 'RG',
          content: 'Housing is guaranteed for first-year graduate students through the MIT Housing Office. We can help you with the application process and provide guidance on the best options based on your preferences!',
          isStaff: true
        },
        {
          author: 'Alex K.',
          avatar: 'AK',
          content: 'I lived in Graduate Tower during my first year. Great community and close to campus. Highly recommend!'
        }
      ]
    },
    {
      id: 2,
      author: 'Ahmed K.',
      avatar: 'AK',
      date: '1 week ago',
      content: 'What are my chances with a 3.6 GPA and 315 GRE? I have 2 years of industry experience in machine learning. Should I retake the GRE?',
      likes: 8,
      replies: [
        {
          author: 'Dr. Jennifer Martinez',
          avatar: 'JM',
          content: 'Your industry experience is valuable! While higher test scores help, MIT looks at the complete profile. Focus on a strong statement of purpose that highlights your ML experience and research interests.',
          isStaff: true
        }
      ]
    },
    {
      id: 3,
      author: 'Priya S.',
      avatar: 'PS',
      date: '2 weeks ago',
      content: 'Just got accepted with a 50% scholarship! Happy to answer questions about the application process. The key is really showing genuine passion for research in your statement.',
      likes: 24,
      replies: []
    }
  ];

  const handleApply = () => {
    setIsApplying(true);
    setApplicationStep(1);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <OpportunityHero 
        opportunity={opportunity}
        isBookmarked={isBookmarked}
        onBookmark={handleBookmark}
      />

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <AIAssessmentCard aiAssessment={aiAssessment} />
          <OpportunityTabs 
            opportunity={opportunity}
            comments={comments}
            comment={comment}
            setComment={setComment}
          />
        </div>

        <OpportunitySidebar 
          opportunity={opportunity}
          aiAssessment={aiAssessment}
          similarOpportunities={similarOpportunities}
          onApply={handleApply}
        />
      </div>
    </div>
  );
};

export default OpportunityDetail;
