import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  Users,
  MessageCircle,
  Calendar,
  Star,
  ChevronRight,
  Globe,
  Award,
  BookOpen,
} from "lucide-react";
import AuthModal from "@/components/auth/AuthModal";
import StudentDashboard from "@/components/dashboard/StudentDashboard";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import Chatbot from "@/components/chatbot/Chatbot";

const Index = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [user, setUser] = useState<any>(null);

  const handleLogin = (email: string, password: string, role: string) => {
    // Simulate login
    setUser({
      email,
      role,
      name: role === "admin" ? "Admin User" : "John Doe",
    });
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (user) {
    return user.role === "admin" ? (
      <AdminDashboard user={user} onLogout={handleLogout} />
    ) : (
      <StudentDashboard user={user} onLogout={handleLogout} />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              RA Global
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => {
                setAuthMode("login");
                setShowAuthModal(true);
              }}
              className="hover:bg-blue-50"
            >
              Login
            </Button>
            <Button
              onClick={() => {
                setAuthMode("register");
                setShowAuthModal(true);
              }}
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in">
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">
              🌍 Tunisia ↔ Asia Educational Bridge
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
              North Africa's Gateway to Asian Education
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              RA Global empowers students through personalized scholarships,
              inclusive guidance, and cross-continental academic partnerships,
              unlocking transformative education experiences between Tunisia and
              Asia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => {
                  setAuthMode("register");
                  setShowAuthModal(true);
                }}
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-lg px-8 py-3"
              >
                Begin Your Asian Journey
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-3 border-2 hover:bg-gray-50"
              >
                Explore Asian Universities
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose RA Global?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Bridging North African and Asian education through innovative
              partnerships and personalized guidance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Globe className="h-12 w-12 text-blue-600" />,
                title: "Tunisia-Asia Bridge",
                description:
                  "Exclusive access to top Asian universities with specialized programs for North African students",
              },
              {
                icon: <MessageCircle className="h-12 w-12 text-green-600" />,
                title: "Cultural Guidance",
                description:
                  "Expert support for cultural adaptation and language preparation for Asian academic environments",
              },
              {
                icon: <Award className="h-12 w-12 text-purple-600" />,
                title: "Personalized Scholarships",
                description:
                  "Tailored scholarship opportunities connecting Tunisian students with Asian educational funding",
              },
              {
                icon: <Calendar className="h-12 w-12 text-orange-600" />,
                title: "Academic Partnerships",
                description:
                  "Direct partnerships with leading Asian institutions for streamlined admission processes",
              },
              {
                icon: <BookOpen className="h-12 w-12 text-red-600" />,
                title: "Cross-Continental Networks",
                description:
                  "Build professional networks spanning Tunisia and Asia for future career opportunities",
              },
              {
                icon: <Users className="h-12 w-12 text-indigo-600" />,
                title: "Inclusive Guidance",
                description:
                  "Comprehensive support system ensuring every student's success in their Asian education journey",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 bg-white/80 backdrop-blur-sm"
              >
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 bg-gray-50 rounded-full w-fit">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "2,500+", label: "Tunisian Students in Asia" },
              { number: "150+", label: "Asian Partner Universities" },
              { number: "12", label: "Asian Countries" },
              { number: "98%", label: "Student Satisfaction" },
            ].map((stat, index) => (
              <div key={index} className="animate-fade-in">
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Bridge Continents Through Education?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of Tunisian students who have discovered
            transformative educational experiences in Asia through RA Global
          </p>
          <Button
            size="lg"
            onClick={() => {
              setAuthMode("register");
              setShowAuthModal(true);
            }}
            className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-lg px-8 py-3"
          >
            Start Your Asian Adventure
            <Star className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <GraduationCap className="h-6 w-6" />
            <span className="text-xl font-bold">RA Global</span>
          </div>
          <p className="text-gray-400 mb-4">
            North Africa's gateway to Asian education - Bridging Tunisia and
            Asia through transformative learning experiences
          </p>
          <div className="text-sm text-gray-500">
            © 2025 RA Global - Educational Excellence Across Continents. All
            rights reserved.
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onLogin={handleLogin}
        onModeChange={setAuthMode}
      />

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
};

export default Index;
