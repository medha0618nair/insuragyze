
import React, { useState } from 'react';
import { ClaimFraudData, FraudDetectionResult, detectFraud } from '@/services/fraudDetectionService';
import FraudDetectionForm from '@/components/fraud/FraudDetectionForm';
import FraudDetectionResults from '@/components/fraud/FraudDetectionResults';
import { Shield, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

const FraudDetectionPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<FraudDetectionResult | null>(null);

  const handleSubmit = async (data: ClaimFraudData) => {
    setIsLoading(true);
    
    try {
      // In production, this would call an API endpoint
      // For now, we'll use our local detection service
      setTimeout(() => {
        const detectionResult = detectFraud(data);
        setResult(detectionResult);
        setIsLoading(false);
        
        if (detectionResult.riskLevel === 'Very High' || detectionResult.riskLevel === 'High') {
          toast.warning("High fraud risk detected in this claim", {
            description: "Review the analysis for more details."
          });
        }
      }, 1500); // Simulate API delay
    } catch (error) {
      console.error('Error analyzing claim:', error);
      toast.error('Failed to analyze claim');
      setIsLoading(false);
    }
  };

  const resetAnalysis = () => {
    setResult(null);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header section */}
        <div className="text-center mb-10">
          <div className="inline-block p-2 rounded-full bg-insura-blue/10 text-insura-blue mb-4">
            <Shield className="h-7 w-7" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Insurance Fraud Detection</h1>
          <p className="text-xl text-gray-600">
            Analyze insurance claims for potential fraud indicators and risk assessment
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

        {/* Main content */}
        {result ? (
          <FraudDetectionResults result={result} onReset={resetAnalysis} />
        ) : (
          <FraudDetectionForm onSubmit={handleSubmit} isLoading={isLoading} />
        )}
      </div>
    </div>
  );
};

export default FraudDetectionPage;
