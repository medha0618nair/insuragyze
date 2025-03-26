
import React from 'react';
import { Shield, AlertTriangle } from 'lucide-react';
import Navbar from '@/components/Navbar';

const FraudDetectionPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header section */}
          <div className="text-center mb-10">
            <div className="inline-block p-2 rounded-full bg-insura-blue/10 text-insura-blue mb-4">
              <Shield className="h-7 w-7" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Insurance Fraud Detection</h1>
            <p className="text-xl text-gray-600">
              Analyze insurance claims for potential fraud indicators
            </p>
          </div>

          {/* Warning banner */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  This tool provides initial fraud risk assessment. All high-risk claims should be further investigated by trained professionals.
                </p>
              </div>
            </div>
          </div>

          {/* Coming soon placeholder */}
          <div className="bg-white p-8 shadow-md rounded-lg text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Fraud Detection System</h2>
            <p className="text-gray-600 mb-6">
              Our advanced fraud detection system helps identify potentially fraudulent insurance claims 
              using machine learning algorithms and industry best practices.
            </p>
            <div className="flex justify-center space-x-6 mb-8">
              <div className="text-center">
                <div className="bg-blue-100 text-blue-800 p-3 rounded-full inline-block mb-2">
                  <Shield className="h-6 w-6" />
                </div>
                <p className="font-medium">Early Detection</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 text-green-800 p-3 rounded-full inline-block mb-2">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <p className="font-medium">Risk Assessment</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 text-purple-800 p-3 rounded-full inline-block mb-2">
                  <Shield className="h-6 w-6" />
                </div>
                <p className="font-medium">Fraud Prevention</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FraudDetectionPage;
