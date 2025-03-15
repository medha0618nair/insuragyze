
import React from 'react';
import { ButtonCustom } from './ui/button-custom';
import { BrainCircuit, Calculator, PieChart, Bot, FileSearch, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const AITools = () => {
  const tools = [
    {
      icon: <BrainCircuit className="w-12 h-12 text-insura-neon" />,
      title: "AI Policy Analysis",
      description: "Upload any insurance policy and our AI will translate complex terms into simple language",
      buttonText: "Analyze My Policy",
      color: "bg-black/60 border-insura-neon/30",
      link: "/tools/policy-analysis"
    },
    {
      icon: <Calculator className="w-12 h-12 text-indigo-400" />,
      title: "Premium Calculator",
      description: "Get instant premium estimates based on your specific needs and risk profile",
      buttonText: "Calculate Premium",
      color: "bg-black/60 border-indigo-400/30",
      link: "/tools/premium-calculator"
    },
    {
      icon: <PieChart className="w-12 h-12 text-violet-400" />,
      title: "Coverage Optimizer",
      description: "Our AI finds coverage gaps and recommends optimizations to save you money",
      buttonText: "Optimize Coverage",
      color: "bg-black/60 border-violet-400/30",
      link: "/tools/coverage-optimizer"
    },
    {
      icon: <Bot className="w-12 h-12 text-teal-400" />,
      title: "InsuraBot Assistant",
      description: "Chat with our AI assistant to get instant answers to any insurance questions",
      buttonText: "Chat Now",
      color: "bg-black/60 border-teal-400/30",
      link: "/chat-assistant"
    },
    {
      icon: <FileSearch className="w-12 h-12 text-emerald-400" />,
      title: "Claim Probability Checker",
      description: "Check the likelihood of your claim being approved before you submit it",
      buttonText: "Check My Claim",
      color: "bg-black/60 border-emerald-400/30",
      link: "/tools/claim-checker"
    }
  ];

  return (
    <section id="ai-tools" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-insura-neon/10 text-insura-neon font-medium text-sm mb-4 border border-insura-neon/20">
            AI-Powered Tools
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 insura-gradient-text">
            Insurance Intelligence at Your Fingertips
          </h2>
          <p className="text-xl text-gray-300">
            Our suite of AI-powered tools helps you navigate the complex world of insurance with ease and confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <div 
              key={index}
              className="cyber-card rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className={`p-8 ${tool.color} border-b border-gray-800`}>
                <div className="flex justify-center transition-transform duration-300 group-hover:scale-110">{tool.icon}</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-white">{tool.title}</h3>
                <p className="text-gray-300 mb-6">{tool.description}</p>
                <Link to={tool.link}>
                  <ButtonCustom 
                    variant="primary" 
                    size="md" 
                    fullWidth
                    className="bg-gradient-to-r from-insura-neon to-insura-purple hover:shadow-lg hover:shadow-insura-purple/20"
                  >
                    {tool.buttonText}
                  </ButtonCustom>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 cyber-card p-8 md:p-10 rounded-2xl max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-4 insura-gradient-text">Discover How AI Makes Insurance Simple</h3>
              <p className="text-gray-300 mb-6">
                Our advanced AI systems process thousands of insurance documents and scenarios every day to provide you with accurate, personalized insights.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/insurance-categories">
                  <ButtonCustom 
                    variant="primary" 
                    size="lg"
                    className="bg-gradient-to-r from-insura-neon to-insura-purple hover:shadow-lg hover:shadow-insura-purple/20"
                  >
                    Try All Tools
                  </ButtonCustom>
                </Link>
                <ButtonCustom 
                  variant="outline" 
                  size="lg"
                  className="text-insura-neon border-insura-neon hover:bg-insura-neon/10"
                >
                  Learn More
                </ButtonCustom>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="relative w-64 h-64 bg-gradient-to-br from-insura-neon/20 to-insura-purple/20 rounded-full flex items-center justify-center">
                <BrainCircuit className="w-24 h-24 text-insura-neon animate-pulse-slow" />
                <div className="absolute -top-2 -right-2 w-16 h-16 bg-teal-900/50 rounded-full flex items-center justify-center animate-pulse">
                  <Bot className="w-8 h-8 text-teal-400" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-indigo-900/50 rounded-full flex items-center justify-center animate-pulse" style={{ animationDelay: "0.5s" }}>
                  <Calculator className="w-10 h-10 text-indigo-400" />
                </div>
                <div className="absolute top-10 -left-6 w-12 h-12 bg-violet-900/50 rounded-full flex items-center justify-center animate-pulse" style={{ animationDelay: "1s" }}>
                  <PieChart className="w-6 h-6 text-violet-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AITools;
