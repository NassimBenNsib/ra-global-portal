
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User,
  Minimize2,
  Maximize2
} from "lucide-react";

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hello! I'm your AI assistant. I can help you with questions about study opportunities, application processes, deadlines, and more. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);

  const quickQuestions = [
    "What programs match my profile?",
    "How do I improve my application?",
    "What are the deadlines?",
    "Tell me about scholarships",
    "Document requirements?"
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

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        content: getBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('program') || lowerQuery.includes('match')) {
      return "Based on your profile, I found several programs that match your interests! Your Computer Science background with a 3.8 GPA makes you a strong candidate for:\n\n• MIT - Master in Computer Science (95% match)\n• Stanford - AI & Machine Learning (92% match)\n• University of Oxford - MSc Data Science (88% match)\n\nWould you like me to provide more details about any of these programs?";
    }
    
    if (lowerQuery.includes('application') || lowerQuery.includes('improve')) {
      return "Great question! Here are some AI-powered suggestions to strengthen your application:\n\n✅ Your GPA (3.8) is competitive\n📝 Consider adding more research experience\n🏆 Highlight your programming projects\n📊 Your test scores are strong for most programs\n\nYour current AI application score is 8.5/10. Want specific tips for any particular university?";
    }
    
    if (lowerQuery.includes('deadline')) {
      return "Here are upcoming important deadlines:\n\n🗓️ MIT - December 15, 2024\n🗓️ Oxford - November 30, 2024\n🗓️ Stanford - December 1, 2024\n🗓️ University of Toronto - October 1, 2024\n\nI recommend applying 2-3 weeks before deadlines. Would you like me to set reminders for any of these?";
    }
    
    if (lowerQuery.includes('scholarship')) {
      return "Excellent! There are several scholarship opportunities available:\n\n💰 Merit-based scholarships (up to 50% tuition)\n🔬 Research assistantships (full tuition + stipend)\n🌍 International student grants\n🏆 Academic excellence awards\n\nBased on your profile, you're eligible for merit-based scholarships at most universities. Shall I help you find specific opportunities?";
    }
    
    if (lowerQuery.includes('document')) {
      return "Here's your document checklist:\n\n✅ Transcript (Uploaded)\n⏳ Statement of Purpose (Pending)\n✅ Letters of Recommendation (Uploaded)\n✅ CV/Resume (Uploaded)\n⏳ Test Scores (Update needed)\n\nYou're 80% complete! The most important missing document is your Statement of Purpose. Need help writing it?";
    }
    
    return "I'd be happy to help! I can assist you with:\n\n🎓 Finding matching programs\n📝 Application guidance\n📅 Deadline tracking\n💰 Scholarship information\n📄 Document requirements\n🤖 AI scoring insights\n\nJust ask me anything specific, or choose from the quick questions below!";
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
    handleSendMessage();
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 shadow-lg z-50"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className={`fixed bottom-6 right-6 z-50 shadow-2xl border-2 border-blue-200 transition-all duration-300 ${
      isMinimized ? 'w-80 h-16' : 'w-96 h-[500px]'
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg">AI Assistant</span>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Online
            </Badge>
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
          <ScrollArea className="flex-1 pr-4 mb-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${
                    message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      message.sender === 'user' 
                        ? 'bg-blue-600' 
                        : 'bg-gradient-to-r from-green-600 to-blue-600'
                    }`}>
                      {message.sender === 'user' ? (
                        <User className="h-3 w-3 text-white" />
                      ) : (
                        <Bot className="h-3 w-3 text-white" />
                      )}
                    </div>
                    <div className={`px-3 py-2 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Quick Questions */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickQuestion(question)}
                  className="text-xs h-6 px-2"
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Type your message..."
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

export default Chatbot;
