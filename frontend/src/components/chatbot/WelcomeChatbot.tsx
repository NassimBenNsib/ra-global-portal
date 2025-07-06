
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User,
  Minimize2,
  Maximize2,
  Sparkles,
  Bell,
  Star,
  Calendar,
  FileText
} from "lucide-react";

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'welcome' | 'suggestion' | 'notification';
}

interface WelcomeChatbotProps {
  userName?: string;
  userProfile?: {
    completionScore: number;
    activeApplications: number;
    upcomingDeadlines: number;
  };
}

const WelcomeChatbot: React.FC<WelcomeChatbotProps> = ({ 
  userName = "John",
  userProfile = { completionScore: 75, activeApplications: 2, upcomingDeadlines: 1 }
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);

  // Show welcome popup after login
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
      setShowWelcome(true);
      addWelcomeMessage();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const addWelcomeMessage = () => {
    const welcomeMessage: Message = {
      id: 1,
      content: `Welcome back, ${userName}! 🎉 I'm here to help you with your study abroad journey. 

Here's what's happening with your profile:
• Profile completion: ${userProfile.completionScore}%
• Active applications: ${userProfile.activeApplications}
• Upcoming deadlines: ${userProfile.upcomingDeadlines}

How can I assist you today?`,
      sender: 'bot',
      timestamp: new Date(),
      type: 'welcome'
    };
    setMessages([welcomeMessage]);
  };

  const quickActions = [
    { icon: FileText, text: "Check application status", action: "application-status" },
    { icon: Star, text: "Find new opportunities", action: "find-opportunities" },
    { icon: Calendar, text: "Upcoming deadlines", action: "deadlines" },
    { icon: User, text: "Complete my profile", action: "profile" },
    { icon: Bell, text: "Set reminder", action: "reminder" }
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        content: getPersonalizedResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (action: string) => {
    let response = "";
    
    switch (action) {
      case "application-status":
        response = `Great! Let me check your applications:

📊 **MIT - Master in Computer Science**
   Status: Under Review (85% complete)
   Next step: Submit final recommendation letter

📊 **Oxford - MSc Data Science**
   Status: Pending Documents (60% complete)
   Next step: Upload statement of purpose

Would you like detailed information about any specific application?`;
        break;
        
      case "find-opportunities":
        response = `Based on your profile, I found some exciting new opportunities! 🌟

🎓 **Top Matches for You:**
• Stanford - MS AI (96% match)
• ETH Zurich - Computer Science (94% match)
• University of Toronto - Data Science (91% match)

These programs align perfectly with your background. Want to explore any of these?`;
        break;
        
      case "deadlines":
        response = `⏰ **Upcoming Important Deadlines:**

🔴 **URGENT** - Oxford MSc Data Science
   Statement of Purpose due in 3 days (Nov 27)

🟡 **THIS WEEK** - MIT Recommendation Letter
   Final letter needed by Dec 1

🟢 **UPCOMING** - Stanford Application
   Complete application by Dec 15

Need help prioritizing or setting reminders?`;
        break;
        
      case "profile":
        response = `Your profile is ${userProfile.completionScore}% complete! 📈

**Missing sections:**
✅ Personal Information (Complete)
✅ Academic Background (Complete)
⏳ Test Scores (Add IELTS score)
⏳ Statement of Purpose (Draft needed)
⏳ Work Experience (Optional but recommended)

Completing these sections could increase your match scores by up to 15%! Which would you like to work on first?`;
        break;
        
      case "reminder":
        response = `I'd be happy to set up reminders for you! 🔔

**Quick reminder options:**
• Daily application progress check
• Weekly deadline alerts
• New opportunity notifications
• Profile completion reminders

What type of reminder would you like to set up?`;
        break;
        
      default:
        response = "I'm here to help! How can I assist you with your study abroad journey?";
    }

    const botMessage: Message = {
      id: messages.length + 1,
      content: response,
      sender: 'bot',
      timestamp: new Date(),
      type: 'suggestion'
    };

    setMessages(prev => [...prev, botMessage]);
  };

  const getPersonalizedResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('application') || lowerQuery.includes('status')) {
      return `Let me check your application status:

🎯 **MIT Application**: Under review - looking great! Your GPA and test scores are above their average. 

💡 **AI Tip**: Consider highlighting your programming projects in your follow-up email to admissions.

🎯 **Oxford Application**: Waiting for your statement of purpose. 

Would you like me to provide some personalized writing tips for your statement?`;
    }
    
    if (lowerQuery.includes('scholarship') || lowerQuery.includes('funding')) {
      return `Great news about scholarships! 💰

Based on your profile, you're eligible for:
• MIT Merit Scholarship (up to 50% tuition)
• Oxford International Excellence Award (£10,000)
• Country-specific grants for Tunisian students

Your AI score indicates a high chance of receiving merit-based funding. Want me to help you apply for these?`;
    }
    
    if (lowerQuery.includes('improve') || lowerQuery.includes('better')) {
      return `Here are personalized improvement suggestions for you:

📈 **Quick Wins:**
• Complete your profile (currently ${userProfile.completionScore}%) → +10% match boost
• Add 2 more technical projects → +5% match boost
• Get LinkedIn recommendations → +3% match boost

🎯 **Long-term:**
• Consider taking GRE Subject Test in CS
• Gain research experience through remote projects

Which area would you like to focus on first?`;
    }

    return `I understand you're asking about "${query}". Let me help you with that!

As your AI assistant, I can help you with:
🎓 Finding the perfect study programs
📝 Application guidance and tips  
💰 Scholarship opportunities
📅 Deadline management
📊 Profile optimization

What specific aspect would you like to explore further?`;
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
        >
          <MessageCircle className="h-8 w-8" />
          <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
            !
          </Badge>
        </Button>
      </div>
    );
  }

  return (
    <Card className={`fixed bottom-6 right-6 z-50 shadow-2xl border-2 border-blue-200 transition-all duration-300 ${
      isMinimized ? 'w-80 h-16' : 'w-[420px] h-[600px]'
    }`}>
      <CardHeader className="pb-3 bg-gradient-to-r from-blue-50 to-green-50">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center relative">
              <Bot className="h-6 w-6 text-white" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
            </div>
            <div>
              <span className="text-lg">AI Assistant</span>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Personalized
                </Badge>
              </div>
            </div>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {!isMinimized && (
        <CardContent className="flex flex-col h-full pb-4">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto pr-2 mb-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-[85%] ${
                  message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.sender === 'user' 
                      ? 'bg-blue-600' 
                      : 'bg-gradient-to-r from-green-600 to-blue-600'
                  }`}>
                    {message.sender === 'user' ? (
                      <User className="h-4 w-4 text-white" />
                    ) : (
                      <Bot className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <div className={`px-4 py-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900 border'
                  }`}>
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                    {message.type === 'welcome' && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-xs text-gray-600 mb-2">Quick actions:</p>
                        <div className="grid grid-cols-2 gap-1">
                          {quickActions.slice(0, 4).map((action, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              onClick={() => handleQuickAction(action.action)}
                              className="text-xs h-8 px-2 bg-white hover:bg-gray-50"
                            >
                              <action.icon className="h-3 w-3 mr-1" />
                              {action.text}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-gray-100 px-4 py-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickAction(action.action)}
                  className="text-xs h-7 px-2"
                >
                  <action.icon className="h-3 w-3 mr-1" />
                  {action.text}
                </Button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Ask me anything about your applications..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button 
              onClick={handleSendMessage}
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default WelcomeChatbot;
