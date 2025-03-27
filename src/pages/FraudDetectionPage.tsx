
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Shield } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { checkClaimProbability, ClaimData, FraudCheckResult } from '@/services/claimService';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { ButtonCustom } from '@/components/ui/button-custom';
import { Search } from 'lucide-react';
import AnalysisResults from '@/components/fraud-detection/AnalysisResults';

export interface ClaimDetails {
  policyNumber: string;
}

const FraudDetectionPage = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
    PREMIUM_AMOUNT: '',
    CLAIM_AMOUNT: '',
    AGE: '',
    TENURE: '',
    NO_OF_FAMILY_MEMBERS: '',
    days_to_loss: '',
    claim_premium_ratio: '',
    INCIDENT_HOUR_OF_THE_DAY: '',
    ANY_INJURY: 0,
    avg_claim_amount: '',
    quick_claim: 0
  });
  const [policyNumber, setPolicyNumber] = useState('');
  const [results, setResults] = useState<FraudCheckResult[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClaimData(prev => ({ ...prev, [name]: value }));
  };

  const handleQuickClaimToggle = (checked: boolean) => {
    setClaimData(prev => ({ ...prev, quick_claim: checked ? 1 : 0 }));
  };

  const handleCheckClaim = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Create a copy of the data to convert values
      const numericClaimData = {...claimData};
      
      // Convert needed string values to numbers
      const claimAmount = parseFloat(numericClaimData.CLAIM_AMOUNT as string) || 0;
      const daysToLoss = parseFloat(numericClaimData.days_to_loss as string) || 0;
      
      // Calculate claim/premium ratio if not provided
      let claimPremiumRatio: number;
      if (numericClaimData.claim_premium_ratio && numericClaimData.claim_premium_ratio !== '') {
        claimPremiumRatio = parseFloat(numericClaimData.claim_premium_ratio as string) || 0;
      } else {
        const premiumAmount = parseFloat(numericClaimData.PREMIUM_AMOUNT as string) || 1;
        claimPremiumRatio = claimAmount / premiumAmount;
      }
      numericClaimData.claim_premium_ratio = claimPremiumRatio.toString();
      
      // Convert avg_claim_amount
      const avgClaimAmount = parseFloat(numericClaimData.avg_claim_amount as string) || claimAmount;
      numericClaimData.avg_claim_amount = avgClaimAmount.toString();

      const result = await checkClaimProbability(numericClaimData, policyNumber);
      
      setResults(prev => [result, ...prev]);

      toast({
        title: "Claim Analysis Complete",
        description: `Fraud probability analysis for policy ${policyNumber} is complete.`,
      });
    } catch (error) {
      console.error("Error analyzing claim:", error);
      setError(error instanceof Error ? error.message : "An unknown error occurred during analysis");
      
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "We couldn't analyze this claim. Please try again.",
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

        {error && (
          <Alert variant="destructive" className="mb-8">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass-card rounded-xl p-6 overflow-y-auto">
            <h2 className="text-2xl font-semibold mb-4 text-white">Fraud Detection Parameters</h2>
            <p className="text-sm text-gray-400 mb-6">
              Please provide these 5 key parameters required by our fraud detection AI model.
            </p>
            
            <form onSubmit={handleCheckClaim} className="space-y-6">
              <div>
                <Label htmlFor="policyNumber" className="text-gray-300">Policy Number</Label>
                <Input
                  id="policyNumber"
                  placeholder="e.g. POL-12345"
                  value={policyNumber}
                  onChange={(e) => setPolicyNumber(e.target.value)}
                  required
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              
              <div>
                <Label htmlFor="CLAIM_AMOUNT" className="text-gray-300">1. Claim Amount ($)</Label>
                <Input
                  id="CLAIM_AMOUNT"
                  name="CLAIM_AMOUNT"
                  type="number"
                  placeholder="e.g. 5000"
                  value={claimData.CLAIM_AMOUNT || ''}
                  onChange={handleInputChange}
                  required
                  className="bg-gray-800 border-gray-700 text-white"
                />
                <p className="text-xs text-gray-400 mt-1">
                  The total amount being claimed in USD
                </p>
              </div>

              <div>
                <Label htmlFor="days_to_loss" className="text-gray-300">2. Days to Loss</Label>
                <Input
                  id="days_to_loss"
                  name="days_to_loss"
                  type="number"
                  placeholder="e.g. 30"
                  value={claimData.days_to_loss || ''}
                  onChange={handleInputChange}
                  required
                  className="bg-gray-800 border-gray-700 text-white"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Number of days between policy start date and the incident
                </p>
              </div>

              <div>
                <Label htmlFor="claim_premium_ratio" className="text-gray-300">3. Claim/Premium Ratio</Label>
                <Input
                  id="claim_premium_ratio"
                  name="claim_premium_ratio"
                  type="number"
                  step="0.01"
                  placeholder="e.g. 1.5"
                  value={claimData.claim_premium_ratio || ''}
                  onChange={handleInputChange}
                  className="bg-gray-800 border-gray-700 text-white"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Ratio of claim amount to premium amount (leave empty to auto-calculate)
                </p>
              </div>

              <div>
                <Label htmlFor="avg_claim_amount" className="text-gray-300">4. Average Claim Amount ($)</Label>
                <Input
                  id="avg_claim_amount"
                  name="avg_claim_amount"
                  type="number"
                  placeholder="e.g. 4000"
                  value={claimData.avg_claim_amount || ''}
                  onChange={handleInputChange}
                  className="bg-gray-800 border-gray-700 text-white"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Average claim amount for similar incidents
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="quick_claim" className="text-gray-300">5. Quick Claim Filing</Label>
                  <Switch 
                    id="quick_claim"
                    checked={claimData.quick_claim === 1 || claimData.quick_claim === '1'}
                    onCheckedChange={handleQuickClaimToggle}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Was the claim filed unusually quickly after the incident?
                </p>
              </div>
              
              <ButtonCustom
                type="submit"
                className="w-full bg-gradient-to-r from-insura-neon to-insura-purple hover:shadow-lg hover:shadow-insura-purple/20 mt-4"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Search className="w-5 h-5 mr-2" />
                    Check for Fraud
                  </span>
                )}
              </ButtonCustom>
            </form>
          </div>

          <AnalysisResults results={results} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FraudDetectionPage;
