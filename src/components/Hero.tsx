
import React from 'react';
import { ButtonCustom } from './ui/button-custom';
import { ArrowRight, FileSearch, Shield, Zap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <section className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 cyber-bg relative overflow-hidden">
      {/* Cyber grid overlay */}
      <div className="absolute inset-0 cyber-grid opacity-20"></div>
      
      {/* Neon accent line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-insura-neon via-insura-purple to-insura-neon"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left Text Section */}
          <div className="w-full lg:w-1/2 mb-12 lg:mb-0 animate-fade-in-left">
            <div className="inline-block px-3 py-1 rounded-full bg-insura-neon/10 text-insura-neon font-medium text-sm mb-6 border border-insura-neon/20 backdrop-blur-sm">
              <span className="mr-2 inline-block"><Zap size={14} className="inline animate-pulse-slow" /></span>
              AI-Powered Insurance Assistant
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight text-white">
              Understand Insurance with 
              <span className="insura-gradient-text neon-glow block"> AI – Fast, Simple, Smart.</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-lg">
              InsuraAI uses artificial intelligence to simplify insurance policies, 
              speed up claims, and find the best coverage for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <ButtonCustom 
                variant="primary" 
                size="lg"
                icon={<ArrowRight size={20} />}
                iconPosition="right"
                onClick={() => navigate('/auth/signin')}
                className="cyber-button"
              >
                Get Started
              </ButtonCustom>
              <Link to="/tools/policy-analysis">
                <ButtonCustom 
                  variant="secondary" 
                  size="lg"
                  icon={<FileSearch size={20} />}
                  iconPosition="left"
                  className="cyber-button-outline"
                >
                  Analyze My Policy
                </ButtonCustom>
              </Link>
            </div>
          </div>

          {/* Right Animation/Image Section */}
          <div className="w-full lg:w-1/2 animate-fade-in-right">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-insura-neon/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-insura-purple/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
              
              <div className="relative glass-card rounded-2xl p-8 animate-float border border-insura-neon/30 cyber-scan">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-insura-neon/20 flex items-center justify-center text-insura-neon border border-insura-neon/30">
                      <FileSearch size={20} />
                    </div>
                    <span className="ml-3 font-semibold text-white">Policy Analyzer</span>
                  </div>
                  <span className="text-sm text-insura-neon font-medium bg-insura-neon/10 px-3 py-1 rounded-full border border-insura-neon/20">AI-Powered</span>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="h-3 bg-gray-700/50 rounded-full w-full"></div>
                  <div className="h-3 bg-gray-700/50 rounded-full w-5/6"></div>
                  <div className="h-3 bg-gray-700/50 rounded-full w-4/6"></div>
                </div>
                
                <div className="p-4 bg-black/50 rounded-lg text-sm text-gray-300 border border-insura-neon/10">
                  <p><span className="font-medium text-insura-neon">Plain Language Summary:</span> Your policy covers water damage from burst pipes with a $500 deductible. Claims must be filed within 14 days.</p>
                </div>
              </div>
              
              <div className="absolute top-1/2 right-0 transform translate-x-1/3 -translate-y-2/3 neo-blur rounded-2xl p-6 w-64 animate-float border border-insura-purple/30" style={{ animationDelay: "1s" }}>
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-green-900/40 flex items-center justify-center text-green-400 border border-green-500/30">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="ml-2 font-medium text-white">Claim Approved</span>
                </div>
                <div className="h-2 bg-green-900/40 rounded-full w-full"></div>
                <div className="h-2 bg-green-900/40 rounded-full w-5/6 mt-2"></div>
              </div>
              
              <div className="absolute bottom-0 left-0 transform -translate-x-1/4 translate-y-1/4 neo-blur rounded-2xl p-6 w-60 animate-float border border-insura-neon/30" style={{ animationDelay: "2s" }}>
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-insura-neon/20 flex items-center justify-center text-insura-neon border border-insura-neon/30">
                    <Shield size={18} className="animate-pulse-slow" />
                  </div>
                  <span className="ml-2 font-medium text-white">Best Value</span>
                </div>
                <div className="h-2 bg-insura-neon/20 rounded-full w-full"></div>
                <div className="h-2 bg-insura-neon/20 rounded-full w-3/4 mt-2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
