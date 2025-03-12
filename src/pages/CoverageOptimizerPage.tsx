
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PieChart, ArrowRight, Check } from 'lucide-react';
import { ButtonCustom } from '@/components/ui/button-custom';

const CoverageOptimizerPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-insura-cyberdark">
      <Navbar />
      <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block px-3 py-1 rounded-full bg-violet-400/10 text-violet-400 font-medium text-sm mb-4 border border-violet-400/20">
              Coverage Optimizer
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 insura-gradient-text">
              Optimize Your Insurance Coverage
            </h1>
            <p className="text-xl text-gray-300">
              Our AI finds coverage gaps and recommends optimizations to protect you better and save you money.
            </p>
          </div>

          <div className="cyber-card rounded-xl p-8 max-w-4xl mx-auto mb-16">
            <div className="text-center mb-10">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-insura-cyberdark to-gray-800 flex items-center justify-center border-2 border-violet-400/30 mx-auto mb-6">
                <PieChart className="w-10 h-10 text-violet-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Upload Your Current Insurance Documents</h2>
              <p className="text-gray-300">
                Upload policy documents from all your insurance providers. Our AI will analyze them together to find gaps and optimization opportunities.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-violet-400/50 transition-colors cursor-pointer">
                <h3 className="font-medium text-white mb-2">Health Insurance Policy</h3>
                <p className="text-gray-400 text-sm mb-4">Upload your current health insurance policy document</p>
                <ButtonCustom 
                  variant="outline" 
                  size="sm"
                  className="text-violet-400 border-violet-400 hover:bg-violet-400/10"
                >
                  Upload Document
                </ButtonCustom>
              </div>
              
              <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-violet-400/50 transition-colors cursor-pointer">
                <h3 className="font-medium text-white mb-2">Life Insurance Policy</h3>
                <p className="text-gray-400 text-sm mb-4">Upload your current life insurance policy document</p>
                <ButtonCustom 
                  variant="outline" 
                  size="sm"
                  className="text-violet-400 border-violet-400 hover:bg-violet-400/10"
                >
                  Upload Document
                </ButtonCustom>
              </div>
              
              <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-violet-400/50 transition-colors cursor-pointer">
                <h3 className="font-medium text-white mb-2">Auto Insurance Policy</h3>
                <p className="text-gray-400 text-sm mb-4">Upload your current auto insurance policy document</p>
                <ButtonCustom 
                  variant="outline" 
                  size="sm"
                  className="text-violet-400 border-violet-400 hover:bg-violet-400/10"
                >
                  Upload Document
                </ButtonCustom>
              </div>
              
              <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-violet-400/50 transition-colors cursor-pointer">
                <h3 className="font-medium text-white mb-2">Other Insurance</h3>
                <p className="text-gray-400 text-sm mb-4">Upload any other insurance policies you have</p>
                <ButtonCustom 
                  variant="outline" 
                  size="sm"
                  className="text-violet-400 border-violet-400 hover:bg-violet-400/10"
                >
                  Upload Document
                </ButtonCustom>
              </div>
            </div>
            
            <div className="text-center">
              <ButtonCustom 
                variant="primary" 
                size="lg"
                className="bg-gradient-to-r from-violet-400 to-insura-purple hover:shadow-lg hover:shadow-insura-purple/20"
              >
                Analyze & Optimize My Coverage
              </ButtonCustom>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center insura-gradient-text">What Our Coverage Optimizer Does</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="cyber-card rounded-xl p-6">
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <Check className="w-5 h-5 text-violet-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">Find Coverage Gaps</h3>
                    <p className="text-gray-300">Identifies areas where you lack coverage and might be exposed to significant financial risks.</p>
                  </div>
                </div>
              </div>
              
              <div className="cyber-card rounded-xl p-6">
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <Check className="w-5 h-5 text-violet-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">Eliminate Redundant Coverage</h3>
                    <p className="text-gray-300">Finds where you're paying for the same coverage twice across different policies.</p>
                  </div>
                </div>
              </div>
              
              <div className="cyber-card rounded-xl p-6">
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <Check className="w-5 h-5 text-violet-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">Adjust Coverage Limits</h3>
                    <p className="text-gray-300">Suggests optimal coverage limits based on your assets, lifestyle, and risk profile.</p>
                  </div>
                </div>
              </div>
              
              <div className="cyber-card rounded-xl p-6">
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <Check className="w-5 h-5 text-violet-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">Find Better Rates</h3>
                    <p className="text-gray-300">Compares your current premiums with market rates to identify potential savings.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="cyber-card p-8 rounded-2xl">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4 insura-gradient-text">Ready to optimize your insurance?</h3>
                  <p className="text-gray-300 mb-6">
                    Most customers find at least 3 optimization opportunities. On average, our customers save 23% on their premiums while improving their coverage.
                  </p>
                  <ButtonCustom 
                    variant="primary" 
                    size="lg"
                    className="bg-gradient-to-r from-violet-400 to-insura-purple hover:shadow-lg hover:shadow-insura-purple/20"
                  >
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </ButtonCustom>
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="relative w-56 h-56">
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-400/20 to-insura-purple/20 rounded-full flex items-center justify-center">
                      <PieChart className="w-20 h-20 text-violet-400 animate-pulse-slow" />
                    </div>
                    <div className="absolute top-0 right-0 w-16 h-16 bg-insura-neon/20 rounded-full flex items-center justify-center animate-float">
                      <span className="text-insura-neon font-bold">23%</span>
                    </div>
                    <div className="absolute bottom-10 left-0 w-20 h-20 bg-insura-purple/20 rounded-full flex items-center justify-center animate-float" style={{ animationDelay: "1s" }}>
                      <span className="text-insura-purple font-bold">3+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CoverageOptimizerPage;
