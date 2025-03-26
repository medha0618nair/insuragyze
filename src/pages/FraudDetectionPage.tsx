
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AlertTriangle, Shield, FileSearch } from 'lucide-react';

const FraudDetectionPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-24">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/20 mb-4">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Fraud Detection System</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our advanced AI-powered system identifies potential insurance fraud and false claims to protect both customers and providers.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 shadow-xl">
            <div className="rounded-full w-12 h-12 bg-blue-500/20 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Fraud Prevention</h3>
            <p className="text-gray-300">
              Using advanced machine learning algorithms, we can detect patterns and anomalies that indicate potential fraudulent behavior.
            </p>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 shadow-xl">
            <div className="rounded-full w-12 h-12 bg-purple-500/20 flex items-center justify-center mb-4">
              <FileSearch className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Claim Analysis</h3>
            <p className="text-gray-300">
              Our system analyzes claims in real-time, comparing them against historical data and known fraud indicators to assess risk.
            </p>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 shadow-xl">
            <div className="rounded-full w-12 h-12 bg-green-500/20 flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Risk Scoring</h3>
            <p className="text-gray-300">
              Each claim receives a risk score based on multiple factors, helping insurance providers prioritize investigation efforts.
            </p>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-insura-neon/10 to-insura-purple/10 rounded-xl p-8 border border-insura-neon/20 mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">How Our Fraud Detection Works</h2>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-insura-neon/20 flex items-center justify-center mr-4">
                <span className="text-insura-neon font-bold">1</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Data Collection</h3>
                <p className="text-gray-300">
                  We collect and analyze data from multiple sources, including claim details, customer information, and policy history.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-insura-neon/20 flex items-center justify-center mr-4">
                <span className="text-insura-neon font-bold">2</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Pattern Recognition</h3>
                <p className="text-gray-300">
                  Our AI algorithms identify suspicious patterns and red flags based on historical fraud cases and industry knowledge.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-insura-neon/20 flex items-center justify-center mr-4">
                <span className="text-insura-neon font-bold">3</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Risk Assessment</h3>
                <p className="text-gray-300">
                  Each claim receives a comprehensive risk assessment, highlighting potential areas of concern for further investigation.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-6">Key Features</h2>
          
          <ul className="space-y-4 text-gray-300">
            <li className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                <span className="text-green-400 text-sm">✓</span>
              </div>
              <span>Real-time fraud detection during claim submission</span>
            </li>
            <li className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                <span className="text-green-400 text-sm">✓</span>
              </div>
              <span>Advanced machine learning models trained on millions of insurance claims</span>
            </li>
            <li className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                <span className="text-green-400 text-sm">✓</span>
              </div>
              <span>Detailed risk reports with specific fraud indicators</span>
            </li>
            <li className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                <span className="text-green-400 text-sm">✓</span>
              </div>
              <span>Integration with existing insurance systems and processes</span>
            </li>
            <li className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                <span className="text-green-400 text-sm">✓</span>
              </div>
              <span>Ongoing model refinement to adapt to new fraud techniques</span>
            </li>
          </ul>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default FraudDetectionPage;
