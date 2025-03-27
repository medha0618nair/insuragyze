
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Shield, AlertTriangle, CheckCircle, XCircle, Search } from 'lucide-react';
import { ButtonCustom } from '@/components/ui/button-custom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { checkClaimProbability } from '@/services/claimService';

interface ClaimDetails {
  policyNumber: string;
  claimAmount: string;
  claimDescription: string;
  claimDate: string;
  submissionMethod: 'online' | 'phone' | 'agent' | 'email';
}

interface ClaimResult {
  id: string;
  policyNumber: string;
  fraudProbability: number;
  riskLevel: 'low' | 'medium' | 'high';
  riskFactors: string[];
  timestamp: string;
}

const FraudDetectionPage = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [claim, setClaim] = useState<ClaimDetails>({
    policyNumber: '',
    claimAmount: '',
    claimDescription: '',
    claimDate: '',
    submissionMethod: 'online',
  });
  const [results, setResults] = useState<ClaimResult[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setClaim(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckClaim = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Convert claim amount to number
      const claimData = {
        ...claim,
        claimAmount: parseFloat(claim.claimAmount),
      };

      // In a real app, this would call the API
      // For demo purposes, simulate a response
      const mockResponse = await new Promise<any>((resolve) => {
        setTimeout(() => {
          // Simulate API response
          resolve({
            id: `FD-${Math.floor(Math.random() * 10000)}`,
            policyNumber: claim.policyNumber,
            fraudProbability: Math.random() * 100,
            riskFactors: [
              claim.claimAmount > 5000 ? 'Unusually high claim amount' : 'Claim amount within normal range',
              'Recent policy changes',
              'Multiple claims history'
            ],
            timestamp: new Date().toISOString()
          });
        }, 1500);
      });

      // Process response
      const riskLevel = mockResponse.fraudProbability < 30 ? 'low' : 
                        mockResponse.fraudProbability < 70 ? 'medium' : 'high';

      const newResult: ClaimResult = {
        ...mockResponse,
        riskLevel
      };

      setResults(prev => [newResult, ...prev]);
      setShowResults(true);

      toast({
        title: "Claim Analysis Complete",
        description: `Fraud probability analysis for policy ${claim.policyNumber} is complete.`,
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

  const getRiskBadge = (riskLevel: 'low' | 'medium' | 'high') => {
    switch (riskLevel) {
      case 'low':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Low Risk
          </span>
        );
      case 'medium':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Medium Risk
          </span>
        );
      case 'high':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
            <XCircle className="w-3 h-3 mr-1" />
            High Risk
          </span>
        );
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
          <div className="glass-card rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-4 text-white">Claim Details</h2>
            <form onSubmit={handleCheckClaim}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="policyNumber" className="text-gray-300">Policy Number</Label>
                  <Input
                    id="policyNumber"
                    name="policyNumber"
                    placeholder="e.g. POL-12345"
                    value={claim.policyNumber}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                
                <div>
                  <Label htmlFor="claimAmount" className="text-gray-300">Claim Amount ($)</Label>
                  <Input
                    id="claimAmount"
                    name="claimAmount"
                    type="number"
                    placeholder="e.g. 5000"
                    value={claim.claimAmount}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                
                <div>
                  <Label htmlFor="claimDate" className="text-gray-300">Claim Date</Label>
                  <Input
                    id="claimDate"
                    name="claimDate"
                    type="date"
                    value={claim.claimDate}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                
                <div>
                  <Label htmlFor="submissionMethod" className="text-gray-300">Submission Method</Label>
                  <select
                    id="submissionMethod"
                    name="submissionMethod"
                    value={claim.submissionMethod}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white"
                  >
                    <option value="online">Online</option>
                    <option value="phone">Phone</option>
                    <option value="agent">Agent</option>
                    <option value="email">Email</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="claimDescription" className="text-gray-300">Claim Description</Label>
                  <textarea
                    id="claimDescription"
                    name="claimDescription"
                    rows={3}
                    placeholder="Describe the claim details..."
                    value={claim.claimDescription}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white"
                  />
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
              </div>
            </form>
          </div>

          {/* Results section */}
          <div className="glass-card rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-4 text-white">Analysis Results</h2>
            
            {results.length > 0 ? (
              <div className="space-y-6">
                {/* Latest result details */}
                <div className="bg-black/50 border border-gray-800 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-white font-medium">Policy #{results[0].policyNumber}</h3>
                      <p className="text-sm text-gray-400">ID: {results[0].id}</p>
                    </div>
                    {getRiskBadge(results[0].riskLevel)}
                  </div>
                  
                  <div className="mt-4">
                    <div className="h-2 w-full bg-gray-700 rounded-full">
                      <div 
                        className="h-2 rounded-full" 
                        style={{
                          width: `${results[0].fraudProbability}%`,
                          backgroundColor: results[0].riskLevel === 'low' ? '#10B981' : 
                                          results[0].riskLevel === 'medium' ? '#F59E0B' : '#EF4444'
                        }}
                      ></div>
                    </div>
                    <p className="text-gray-400 text-sm mt-1">Fraud Probability: {results[0].fraudProbability.toFixed(1)}%</p>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-white text-sm font-medium mb-2">Risk Factors:</h4>
                    <ul className="space-y-1 text-sm">
                      {results[0].riskFactors.map((factor, index) => (
                        <li key={index} className="text-gray-400 flex items-start">
                          <span className="inline-block w-1.5 h-1.5 bg-gray-500 rounded-full mt-1.5 mr-2"></span>
                          {factor}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Previous results table */}
                {results.length > 1 && (
                  <div>
                    <h3 className="text-white text-lg font-medium mb-2">Previous Analyses</h3>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Policy #</TableHead>
                            <TableHead>Risk Level</TableHead>
                            <TableHead>Probability</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {results.slice(1).map((result) => (
                            <TableRow key={result.id}>
                              <TableCell className="font-medium">{result.id}</TableCell>
                              <TableCell>{result.policyNumber}</TableCell>
                              <TableCell>{getRiskBadge(result.riskLevel)}</TableCell>
                              <TableCell>{result.fraudProbability.toFixed(1)}%</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                <AlertTriangle className="w-12 h-12 mb-4 text-gray-600" />
                <p className="text-center">No claims analyzed yet. Submit claim details to see results.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FraudDetectionPage;
