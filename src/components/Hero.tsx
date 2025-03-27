
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, FileText, Brain } from 'lucide-react';
import { ButtonCustom } from '@/components/ui/button-custom';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative pt-20 pb-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black to-gray-900"></div>
      <div className="absolute top-40 -left-64 w-96 h-96 bg-insura-neon/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 -right-64 w-96 h-96 bg-insura-purple/5 rounded-full blur-3xl"></div>
      
      <div className="container px-4 mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Text Content */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
              <span className="insura-gradient-text">Understand</span> Your Insurance <span className="insura-gradient-text">with AI</span>
            </h1>
            
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              InsuraAI simplifies complex insurance policies, demystifies coverage options, and helps you make informed decisions with AI-powered tools.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <ButtonCustom 
                className="cyber-button group"
                onClick={() => navigate('/insurance-recommender')}
              >
                Find Your Perfect Plan
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </ButtonCustom>
              
              <ButtonCustom 
                variant="outline"
                className="cyber-button-outline"
                onClick={() => navigate('/tools/policy-analysis')}
              >
                Analyze Your Policy
              </ButtonCustom>
            </div>
            
            <div className="flex flex-wrap items-center gap-6 mt-10">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-insura-neon/10 mr-3">
                  <Shield className="w-5 h-5 text-insura-neon" />
                </div>
                <span className="text-gray-300">Secure &amp; Confidential</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-insura-purple/10 mr-3">
                  <Brain className="w-5 h-5 text-insura-purple" />
                </div>
                <span className="text-gray-300">AI-Powered Analysis</span>
              </div>
            </div>
          </motion.div>
          
          {/* Visual Content */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="hero-card relative">
              <div className="absolute inset-0 bg-gradient-to-br from-insura-neon/5 to-insura-purple/5 rounded-2xl"></div>
              
              <h3 className="text-2xl font-bold mb-6 text-white">AI Insurance Assistant</h3>
              
              <div className="space-y-6">
                <div className="glass-card p-4 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-insura-neon/20 shrink-0">
                    <FileText className="w-5 h-5 text-insura-neon" />
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1 text-white">Policy Analysis</p>
                    <p className="text-xs text-gray-400">Upload your policy document and get an instant breakdown in simple language</p>
                  </div>
                </div>
                
                <div className="glass-card p-4 flex items-start gap-4 ml-6 animate-float">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-insura-purple/20 shrink-0">
                    <Shield className="w-5 h-5 text-insura-purple" />
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1 text-white">Coverage Analyzer</p>
                    <p className="text-xs text-gray-400">Understand what's covered and identify potential gaps in your insurance</p>
                  </div>
                </div>
                
                <div className="glass-card p-4 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-insura-neon/20 shrink-0">
                    <Brain className="w-5 h-5 text-insura-neon" />
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1 text-white">Smart Recommendations</p>
                    <p className="text-xs text-gray-400">Get personalized insurance plan recommendations based on your profile</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-12 right-4 w-24 h-24 bg-insura-neon/10 rounded-full blur-2xl animate-pulse-slow"></div>
            <div className="absolute -bottom-8 left-8 w-32 h-32 bg-insura-purple/10 rounded-full blur-2xl animate-pulse-slow"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
