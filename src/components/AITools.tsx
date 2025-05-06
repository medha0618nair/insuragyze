
import React from 'react';
import { Link } from 'react-router-dom';
import { FileSearch, Calculator, Maximize, MessageSquare, FileCheck, Shield, Sliders } from 'lucide-react';
import { ButtonCustom } from './ui/button-custom';

const AITools = () => {
  const tools = [
    {
      title: 'Policy Analyzer',
      description: 'Upload your insurance policy documents and our AI will analyze the coverage, exclusions, and limitations.',
      icon: <FileSearch className="w-10 h-10 text-insura-neon" />,
      link: '/tools/policy-analysis',
      color: 'from-blue-500/20 to-blue-600/20',
      buttonText: 'Analyze Policy',
    },
    {
      title: 'Premium Calculator',
      description: 'Calculate your premium costs based on your personal data, coverage needs, and risk profile.',
      icon: <Calculator className="w-10 h-10 text-insura-purple" />,
      link: '/tools/premium-calculator',
      color: 'from-purple-500/20 to-purple-600/20',
      buttonText: 'Calculate Premium',
    },
    {
      title: 'Coverage Optimizer',
      description: 'Get AI recommendations to optimize your coverage based on your specific needs and budget.',
      icon: <Maximize className="w-10 h-10 text-green-400" />,
      link: '/tools/coverage-optimizer',
      color: 'from-green-500/20 to-green-600/20',
      buttonText: 'Optimize Coverage',
    },
    {
      title: 'Coverage Simulator',
      description: 'Simulate how different life factors affect your insurance needs with our interactive tool.',
      icon: <Sliders className="w-10 h-10 text-indigo-400" />,
      link: '/tools/coverage-simulator',
      color: 'from-indigo-500/20 to-indigo-600/20',
      buttonText: 'Simulate Coverage',
    },
    {
      title: 'Claim Checker',
      description: 'Check if your claim is likely to be approved based on your policy terms and claim details.',
      icon: <FileCheck className="w-10 h-10 text-yellow-400" />,
      link: '/tools/claim-checker',
      color: 'from-yellow-500/20 to-yellow-600/20',
      buttonText: 'Check Claim',
    },
    {
      title: 'Fraud Detection',
      description: 'Analyze insurance claims for potential fraud indicators using advanced AI.',
      icon: <Shield className="w-10 h-10 text-red-400" />,
      link: '/tools/fraud-detection',
      color: 'from-red-500/20 to-red-600/20',
      buttonText: 'Detect Fraud',
    },
    {
      title: 'Insurance AI Chat',
      description: 'Chat with our AI assistant to get answers to all your insurance-related questions.',
      icon: <MessageSquare className="w-10 h-10 text-teal-400" />,
      link: '/chat-assistant',
      color: 'from-teal-500/20 to-teal-600/20',
      buttonText: 'Chat Now',
    },
  ];

  return (
    <section id="ai-tools" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">AI-Powered Tools</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Leverage cutting-edge AI technology to simplify your insurance experience and make smarter decisions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <div 
              key={index}
              className="glass-card rounded-xl overflow-hidden hover:border-insura-neon/30 transition-all duration-300"
            >
              <div className={`p-6 bg-gradient-to-br ${tool.color} flex justify-center`}>
                <div className="rounded-full p-4 bg-black/30 backdrop-blur-sm">
                  {tool.icon}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-white">{tool.title}</h3>
                <p className="text-gray-400 mb-6 h-20">{tool.description}</p>
                <Link to={tool.link}>
                  <ButtonCustom 
                    className="w-full bg-gradient-to-r from-insura-blue to-insura-purple"
                  >
                    {tool.buttonText}
                  </ButtonCustom>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AITools;
