import React, { useState } from "react";
import {
  Phone,
  Users,
  ShieldCheck,
  ArrowLeft,
  ExternalLink,
  Zap,
  Heart,
  Shield,
  File
} from "lucide-react";
import { Link } from "react-router-dom";

// Enhanced resource data with icons and priorities
const resourceSections = [
  {
    id: "awareness",
    label: "Safety Tips",
    icon: ShieldCheck,
    color: "from-pink-500 to-red-600",
    bgColor: "bg-gradient-to-br from-pink-50 to-red-50",
    resources: [
      { 
        title: "Types of Crimes", 
        description: "Learn about harassment, assault, theft, and cybercrime prevention", 
        type: "article", 
        priority: "high",
        icon: "🚨",
        action: "http://victimsupport.org.uk/crime-info/types-crime/" 
      },
      { 
        title: "Home Safety", 
        description: "Essential tips for securing your home and staying safe", 
        type: "article", 
        priority: "high",
        icon: "🏠",
        action: "https://blog.vingapp.com/top-10-home-safety-tips-for-you-and-your-friends" 
      },
      { 
        title: "Self-Defense", 
        description: "Basic techniques for personal protection and safety", 
        type: "video", 
        priority: "medium",
        icon: "🥋",
        action: "https://youtu.be/ZUrr5MU4Z4Y?si=wSZCaXV0tXFu0yjN" 
      },
      { 
        title: "Digital Safety", 
        description: "Stay safe online - avoid scams and protect your privacy", 
        type: "article", 
        priority: "high",
        icon: "🛡️",
        action: "https://safety.google/intl/en_in/security/security-tips/" 
      },
      { 
        title: "Workplace Safety", 
        description: "Know your rights and create a safe work environment", 
        type: "article", 
        priority: "medium",
        icon: "💼",
        action: "https://www.indeed.com/career-advice/career-development/workplace-safety-tips" 
      },
      { 
        title: "Safety Checklist", 
        description: "Daily safety habits and precautions for everyday life", 
        type: "checklist", 
        priority: "medium",
        icon: "✅",
        action: "https://www.cityofboise.org/departments/police/crime-prevention-and-safety/personal-safety/" 
      },
    ],
  },
  {
    id: "emergency",
    label: "Emergency",
    icon: Phone,
    color: "from-red-500 to-pink-600",
    bgColor: "bg-gradient-to-br from-red-50 to-pink-50",
    resources: [
      { title: "Police", description: "Immediate help for crimes and emergencies", priority: "critical", icon: "👮", action: "tel:100" },
      { title: "Medical Emergency", description: "Ambulance and medical assistance", priority: "critical", icon: "🚑", action: "tel:108" },
      { title: "Women's Helpline", description: "24/7 support for women in crisis", priority: "critical", icon: "👩", action: "tel:1091" },
      { title: "Child Helpline", description: "Report child abuse and get help", priority: "critical", icon: "🧒", action: "tel:1098" },
      { title: "Cyber Crime", description: "Report online harassment and fraud", priority: "high", icon: "💻", action: "tel:1930" },
      { title: "Fire Emergency", description: "Fire and rescue services", priority: "critical", icon: "🚒", action: "tel:101" },
      { title: "Mental Health Crisis", description: "Suicide prevention and mental health support", priority: "critical", icon: "🧠", action: "tel:9152987821" },
      { title: "Find Hospitals", description: "Locate nearby medical facilities", priority: "high", icon: "🏥", action: "https://www.medicare.gov/care-compare/?providerType=Hospital&redirect=true" },
    ],
  },
  {
    id: "support",
    label: "Support",
    icon: Users,
    color: "from-red-500 to-pink-600",
    bgColor: "bg-gradient-to-br from-red-50 to-pink-50",
    resources: [
      { title: "Counseling", description: "Professional therapy and trauma support", priority: "high", icon: "💙", action: "https://www.felicity.care/" },
      { title: "Legal Aid", description: "Free legal assistance for victims", priority: "high", icon: "⚖️", action: "https://insaaf99.com/" },
      { title: "Community Forums", description: "Connect with others and share experiences", priority: "medium", icon: "💬", action: "https://www.reddit.com/" },
    ],
  },
];

export default function Resources() {
  const [activeTab, setActiveTab] = useState("awareness");
  const activeSection = resourceSections.find((s) => s.id === activeTab);

  const getPriorityStyle = (priority) => {
    switch(priority) {
      case 'critical':
        return 'bg-red-100 text-red-700 animate-pulse';
      case 'high':
        return 'bg-orange-100 text-orange-700';
      case 'medium':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Floating background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-400 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-pulse"></div>
        <div className="absolute top-40 left-1/2 w-60 h-60 bg-rose-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-6 space-y-8">
        {/* Navigation */}
        <div className="flex items-center justify-between">
            <Link to="/">   <button className="cursor-pointer group flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <ArrowLeft className="w-4 h-4 text-gray-600 group-hover:text-pink-600 transition-colors" />
            <span className="text-gray-700 font-medium group-hover:text-pink-600 transition-colors">Home</span>
          </button></Link>
       
          <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg">
            <File
             className="w-4 h-4 text-pink-600" />
            <span className="text-sm font-medium text-gray-700">Resources</span>
          </div>
        </div>

        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="relative">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-600 via-red-500 to-rose-600 bg-clip-text text-transparent animate-gradient-x">
              Safety Resources
            </h1>
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 via-red-500 to-rose-600 rounded-lg blur opacity-10"></div>
          </div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Your comprehensive guide to safety, support, and emergency assistance - because your wellbeing matters
          </p>
          <div className="flex justify-center gap-6 mt-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full">
              <Zap className="w-4 h-4 text-yellow-600" />
              <span className="text-sm font-medium text-gray-700">Quick Access</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full">
              <Heart className="w-4 h-4 text-red-500" />
              <span className="text-sm font-medium text-gray-700">24/7 Support</span>
            </div>
          </div>
        </div>

        {/* Enhanced Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-2 shadow-2xl border border-white/20">
            <div className="flex gap-2">
              {resourceSections.map((section) => {
                const IconComponent = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveTab(section.id)}
                    className={`relative flex items-center gap-3 px-6 py-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
                      activeTab === section.id
                        ? `bg-gradient-to-r ${section.color} text-white shadow-lg transform scale-105`
                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span>{section.label}</span>
                    {activeTab === section.id && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Enhanced Resource Grid */}
        <div className={`${activeSection?.bgColor} rounded-3xl p-8 shadow-xl border border-white/30`}>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {activeSection?.resources.map((resource, idx) => (
              <div
                key={idx}
                className="group bg-gray-300 backdrop-blur-sm rounded-2xl p-6 border border-white/40 hover:border-white/60 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105"
                style={{
                  animationDelay: `${idx * 100}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{resource.icon}</span>
                      <h3 className="font-bold text-gray-800 group-hover:text-pink-600 transition-colors text-lg">
                        {resource.title}
                      </h3>
                    </div>
                    <div className="flex flex-col gap-2">
                      {resource.type && (
                        <span className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full font-medium">
                          {resource.type}
                        </span>
                      )}
                      {resource.priority && (
                        <span className={`text-xs px-3 py-1 rounded-full font-bold ${getPriorityStyle(resource.priority)}`}>
                          {resource.priority}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed">{resource.description}</p>
                  
                  <a
                    href={resource.action}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group/button inline-flex items-center justify-center gap-2 w-full px-4 py-3 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 ${
                      resource.action?.startsWith('tel:')
                        ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-red-500/25'
                        : 'bg-gradient-to-r from-pink-500 to-red-600 hover:from-pink-600 hover:to-red-700 text-white shadow-lg hover:shadow-pink-500/25'
                    }`}
                  >
                    <span>
                      {resource.action?.startsWith('tel:') ? '📞 Call Now' : 
                       resource.type === "video" ? "📺 Watch" :
                       resource.type === "checklist" ? "✅ View" :
                       "📖 Read More"}
                    </span>
                    <ExternalLink className="w-4 h-4 group-hover/button:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </div>
  );
}