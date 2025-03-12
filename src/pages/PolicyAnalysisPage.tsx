
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BrainCircuit, Upload, FileText, Check } from 'lucide-react';
import { ButtonCustom } from '@/components/ui/button-custom';

const PolicyAnalysisPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-insura-cyberdark">
      <Navbar />
      <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block px-3 py-1 rounded-full bg-insura-neon/10 text-insura-neon font-medium text-sm mb-4 border border-insura-neon/20">
              AI Policy Analysis
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 insura-gradient-text">
              Understand Your Insurance Policy In Plain Language
            </h1>
            <p className="text-xl text-gray-300">
              Upload any insurance policy document and our AI will translate complex terms into simple language you can understand.
            </p>
          </div>

          <div className="cyber-card rounded-xl p-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-insura-cyberdark to-gray-800 flex items-center justify-center border-2 border-insura-neon/30 mb-6">
                <BrainCircuit className="w-12 h-12 text-insura-neon" />
              </div>
              
              <div className="w-full border-2 border-dashed border-gray-700 rounded-lg p-8 mb-6 text-center hover:border-insura-neon/50 transition-colors cursor-pointer">
                <Upload className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-white mb-2">Upload Your Policy Document</h3>
                <p className="text-gray-400 mb-4">PDF, DOCX or TXT file (Max 10MB)</p>
                <ButtonCustom 
                  variant="primary" 
                  size="md"
                  className="bg-gradient-to-r from-insura-neon to-insura-purple"
                >
                  Select File
                </ButtonCustom>
              </div>
              
              <div className="text-center">
                <h3 className="text-xl font-medium text-white mb-4">How It Works</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4">
                    <div className="w-12 h-12 rounded-full bg-insura-neon/20 flex items-center justify-center mx-auto mb-3">
                      <Upload className="w-6 h-6 text-insura-neon" />
                    </div>
                    <h4 className="font-medium text-white mb-2">1. Upload Document</h4>
                    <p className="text-gray-400 text-sm">Upload your insurance policy document in any common format</p>
                  </div>
                  
                  <div className="p-4">
                    <div className="w-12 h-12 rounded-full bg-insura-purple/20 flex items-center justify-center mx-auto mb-3">
                      <BrainCircuit className="w-6 h-6 text-insura-purple" />
                    </div>
                    <h4 className="font-medium text-white mb-2">2. AI Processing</h4>
                    <p className="text-gray-400 text-sm">Our AI scans and analyzes your policy language and terms</p>
                  </div>
                  
                  <div className="p-4">
                    <div className="w-12 h-12 rounded-full bg-teal-500/20 flex items-center justify-center mx-auto mb-3">
                      <FileText className="w-6 h-6 text-teal-500" />
                    </div>
                    <h4 className="font-medium text-white mb-2">3. Get Insights</h4>
                    <p className="text-gray-400 text-sm">Receive a simplified breakdown of your policy in plain language</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center insura-gradient-text">What You'll Discover</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="cyber-card rounded-xl p-6">
                <div className="flex items-start">
                  <div className="mr-4">
                    <Check className="w-6 h-6 text-insura-neon" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">Coverage Limitations</h3>
                    <p className="text-gray-400">Find out what's NOT covered in your policy that you might have assumed was included.</p>
                  </div>
                </div>
              </div>
              
              <div className="cyber-card rounded-xl p-6">
                <div className="flex items-start">
                  <div className="mr-4">
                    <Check className="w-6 h-6 text-insura-neon" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">Claim Requirements</h3>
                    <p className="text-gray-400">Learn exactly what documentation and evidence you need to provide when making a claim.</p>
                  </div>
                </div>
              </div>
              
              <div className="cyber-card rounded-xl p-6">
                <div className="flex items-start">
                  <div className="mr-4">
                    <Check className="w-6 h-6 text-insura-neon" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">Hidden Benefits</h3>
                    <p className="text-gray-400">Discover benefits and perks in your policy that you might not have been aware of.</p>
                  </div>
                </div>
              </div>
              
              <div className="cyber-card rounded-xl p-6">
                <div className="flex items-start">
                  <div className="mr-4">
                    <Check className="w-6 h-6 text-insura-neon" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">Policy Gaps</h3>
                    <p className="text-gray-400">Identify areas where your current coverage might leave you exposed to risks.</p>
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

export default PolicyAnalysisPage;
