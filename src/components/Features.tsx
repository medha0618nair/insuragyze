
import React from 'react';
import { FileSearch, Shield, MessageCircle, Timer, BarChart, Star, Zap, Cpu, Bot } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <FileSearch className="w-10 h-10 text-insura-neon" />,
      title: "AI-Powered Policy Analyzer",
      description: "Upload your policy document and our AI will simplify complex terms into plain language you can understand.",
      delay: "0s"
    },
    {
      icon: <Shield className="w-10 h-10 text-insura-neon" />,
      title: "Fraud Detection & Risk Assessment",
      description: "AI evaluates your profile and suggests the best insurance plans based on your specific needs and risk profile.",
      delay: "0.1s"
    },
    {
      icon: <Bot className="w-10 h-10 text-insura-neon" />,
      title: "Chatbot Assistant",
      description: "Get instant answers to your insurance queries through our AI chatbot that provides personalized recommendations.",
      delay: "0.2s"
    },
    {
      icon: <Timer className="w-10 h-10 text-insura-neon" />,
      title: "Claim Processing Simulator",
      description: "Simulate the claim process to see expected approval time and chances, with fraud indicators automatically checked.",
      delay: "0.3s"
    },
    {
      icon: <Cpu className="w-10 h-10 text-insura-neon" />,
      title: "Comparison Tool",
      description: "Compare different insurance plans side by side with AI recommendations for the best value based on your priorities.",
      delay: "0.4s"
    },
    {
      icon: <Star className="w-10 h-10 text-insura-neon" />,
      title: "Testimonials & Case Studies",
      description: "Read success stories from users who saved money and time by using InsuraAI's intelligent features.",
      delay: "0.5s"
    }
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-insura-cyberdark to-black relative">
      <div className="absolute inset-0 cyber-grid-bg opacity-30 pointer-events-none"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-insura-neon/10 text-insura-neon font-medium text-sm mb-4 border border-insura-neon/20">
            <Zap size={14} className="inline-block mr-1 animate-pulse-slow" />
            Powerful Features
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            AI-Powered <span className="text-insura-neon neon-glow">Insurance Tools</span>
          </h2>
          <p className="text-xl text-gray-300">
            InsuraAI combines cutting-edge artificial intelligence with insurance expertise to provide tools that save you time and money.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="cyber-card rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-insura-neon/20 hover:border-insura-neon/40 hover:-translate-y-1 bg-black/60 backdrop-blur-md"
              style={{ animationDelay: feature.delay }}
            >
              <div className="p-4 bg-insura-neon/10 rounded-xl inline-block mb-6 border border-insura-neon/30">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
