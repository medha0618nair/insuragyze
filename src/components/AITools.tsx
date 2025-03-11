
import React from 'react';
import { ButtonCustom } from './ui/button-custom';
import { BrainCircuit, Calculator, PieChart, Bot, FileSearch, Search } from 'lucide-react';

const AITools = () => {
  const tools = [
    {
      icon: <BrainCircuit className="w-12 h-12 text-insura-blue" />,
      title: "AI Policy Analysis",
      description: "Upload any insurance policy and our AI will translate complex terms into simple language",
      buttonText: "Analyze My Policy",
      color: "bg-blue-50"
    },
    {
      icon: <Calculator className="w-12 h-12 text-indigo-600" />,
      title: "Premium Calculator",
      description: "Get instant premium estimates based on your specific needs and risk profile",
      buttonText: "Calculate Premium",
      color: "bg-indigo-50"
    },
    {
      icon: <PieChart className="w-12 h-12 text-violet-600" />,
      title: "Coverage Optimizer",
      description: "Our AI finds coverage gaps and recommends optimizations to save you money",
      buttonText: "Optimize Coverage",
      color: "bg-violet-50"
    },
    {
      icon: <Bot className="w-12 h-12 text-teal-600" />,
      title: "InsuraBot Assistant",
      description: "Chat with our AI assistant to get instant answers to any insurance questions",
      buttonText: "Chat Now",
      color: "bg-teal-50"
    },
    {
      icon: <FileSearch className="w-12 h-12 text-emerald-600" />,
      title: "Claim Probability Checker",
      description: "Check the likelihood of your claim being approved before you submit it",
      buttonText: "Check My Claim",
      color: "bg-emerald-50"
    },
    {
      icon: <Search className="w-12 h-12 text-rose-600" />,
      title: "Insurance Plan Finder",
      description: "Answer a few questions and our AI will recommend the best plans for you",
      buttonText: "Find Plans",
      color: "bg-rose-50"
    }
  ];

  return (
    <section id="ai-tools" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-insura-lightblue/30">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-insura-blue/10 text-insura-blue font-medium text-sm mb-4">
            AI-Powered Tools
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Insurance Intelligence at Your Fingertips
          </h2>
          <p className="text-xl text-gray-600">
            Our suite of AI-powered tools helps you navigate the complex world of insurance with ease and confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
            >
              <div className={`p-8 ${tool.color} border-b border-gray-100`}>
                <div className="flex justify-center">{tool.icon}</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-900">{tool.title}</h3>
                <p className="text-gray-600 mb-6">{tool.description}</p>
                <ButtonCustom variant="primary" size="md" fullWidth>{tool.buttonText}</ButtonCustom>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white p-8 md:p-10 rounded-2xl shadow-md border border-gray-100 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Discover How AI Makes Insurance Simple</h3>
              <p className="text-gray-600 mb-6">
                Our advanced AI systems process thousands of insurance documents and scenarios every day to provide you with accurate, personalized insights.
              </p>
              <div className="flex flex-wrap gap-3">
                <ButtonCustom variant="primary" size="lg">Try All Tools</ButtonCustom>
                <ButtonCustom variant="outline" size="lg">Learn More</ButtonCustom>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="relative w-64 h-64 bg-insura-lightblue rounded-full flex items-center justify-center">
                <BrainCircuit className="w-24 h-24 text-insura-blue" />
                <div className="absolute -top-2 -right-2 w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center animate-pulse">
                  <Bot className="w-8 h-8 text-teal-600" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center animate-pulse" style={{ animationDelay: "0.5s" }}>
                  <Calculator className="w-10 h-10 text-indigo-600" />
                </div>
                <div className="absolute top-10 -left-6 w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center animate-pulse" style={{ animationDelay: "1s" }}>
                  <PieChart className="w-6 h-6 text-violet-600" />
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
