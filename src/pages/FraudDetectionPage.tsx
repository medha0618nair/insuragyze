
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Shield } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { checkClaimProbability, ClaimData, FraudCheckResult } from '@/services/claimService';
import FraudDetectionForm from '@/components/fraud-detection/FraudDetectionForm';
import AnalysisResults from '@/components/fraud-detection/AnalysisResults';

export interface ClaimDetails {
  policyNumber: string;
  claimDescription: string;
  claimDate: string;
  submissionMethod: 'online' | 'phone' | 'agent' | 'email';
}

const FraudDetectionPage = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [claimData, setClaimData] = useState<ClaimData>({
    INSURANCE_TYPE: '',
    MARITAL_STATUS: '',
    EMPLOYMENT_STATUS: '',
    RISK_SEGMENTATION: '',
    HOUSE_TYPE: '',
    SOCIAL_CLASS: '',
    CUSTOMER_EDUCATION_LEVEL: '',
    CLAIM_STATUS: '',
    INCIDENT_SEVERITY: '',
    PREMIUM_AMOUNT: 0,
    CLAIM_AMOUNT: 0,
    AGE: 0,
    TENURE: 0,
    NO_OF_FAMILY_MEMBERS: 0,
    days_to_loss: 0,
    claim_premium_ratio: 0,
    INCIDENT_HOUR_OF_THE_DAY: 0,
    ANY_INJURY: 0,
  });
  const [claimDetails, setClaimDetails] = useState<ClaimDetails>({
    policyNumber: '',
    claimDescription: '',
    claimDate: '',
    submissionMethod: 'online',
  });
  const [results, setResults] = useState<FraudCheckResult[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Handle ClaimData fields
    if (name in claimData) {
      // Convert numeric fields to numbers
      if (['PREMIUM_AMOUNT', 'CLAIM_AMOUNT', 'AGE', 'TENURE', 'NO_OF_FAMILY_MEMBERS', 
           'days_to_loss', 'claim_premium_ratio', 'INCIDENT_HOUR_OF_THE_DAY', 'ANY_INJURY'].includes(name)) {
        setClaimData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
      } else {
        setClaimData(prev => ({ ...prev, [name]: value }));
      }
    }
    // Handle ClaimDetails fields
    else {
      setClaimDetails(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    // Check if the name is a property of claimData
    if (name in claimData) {
      setClaimData(prev => ({ ...prev, [name]: value }));
    } else {
      setClaimDetails(prev => ({ ...prev, [name as keyof ClaimDetails]: value }));
    }
  };

  const handleCheckClaim = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Calculate claim_premium_ratio if not set manually
      if (claimData.claim_premium_ratio === 0 && claimData.PREMIUM_AMOUNT > 0) {
        claimData.claim_premium_ratio = claimData.CLAIM_AMOUNT / claimData.PREMIUM_AMOUNT;
      }

      // Call the API service with our data and the policy number
      const result = await checkClaimProbability(claimData, claimDetails.policyNumber);
      
      // Add result to our list
      setResults(prev => [result, ...prev]);

      toast({
        title: "Claim Analysis Complete",
        description: `Fraud probability analysis for policy ${claimDetails.policyNumber} is complete.`,
      });
    } catch (error) {
      console.error("Error analyzing claim:", error);
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "We couldn't analyze this claim. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full bg-insura-neon/10 flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-insura-neon" />
          </div>
          <h1 className="text-4xl font-bold mb-2 text-white">Fraud Detection</h1>
          <p className="text-gray-400 text-center max-w-2xl">
            Analyze insurance claims for potential fraud indicators using our advanced AI system.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Claim details form */}
          <FraudDetectionForm 
            claimData={claimData}
            claimDetails={claimDetails}
            isLoading={isLoading}
            onInputChange={handleInputChange}
            onSelectChange={handleSelectChange}
            onSubmit={handleCheckClaim}
          />

          {/* Results section */}
          <AnalysisResults results={results} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FraudDetectionPage;
