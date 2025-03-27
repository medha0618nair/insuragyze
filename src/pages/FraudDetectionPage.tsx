
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Shield, AlertTriangle, CheckCircle, XCircle, Search } from 'lucide-react';
import { ButtonCustom } from '@/components/ui/button-custom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { checkClaimProbability, ClaimData, FraudCheckResult } from '@/services/claimService';

interface ClaimDetails {
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
  const [showResults, setShowResults] = useState(false);

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

      // Call the API service with our data
      const result = await checkClaimProbability(claimData, claimDetails.policyNumber);
      
      // Add result to our list
      setResults(prev => [result, ...prev]);
      setShowResults(true);

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
          <div className="glass-card rounded-xl p-6 overflow-y-auto max-h-[800px]">
            <h2 className="text-2xl font-semibold mb-4 text-white">Claim Details</h2>
            <form onSubmit={handleCheckClaim} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Policy Information */}
                <div className="md:col-span-2">
                  <h3 className="text-xl font-semibold mb-2 text-white">Policy Information</h3>
                </div>
                
                <div>
                  <Label htmlFor="policyNumber" className="text-gray-300">Policy Number</Label>
                  <Input
                    id="policyNumber"
                    name="policyNumber"
                    placeholder="e.g. POL-12345"
                    value={claimDetails.policyNumber}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                
                <div>
                  <Label htmlFor="INSURANCE_TYPE" className="text-gray-300">Insurance Type</Label>
                  <Select 
                    value={claimData.INSURANCE_TYPE} 
                    onValueChange={(value) => handleSelectChange('INSURANCE_TYPE', value)}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select insurance type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Auto">Auto</SelectItem>
                      <SelectItem value="Home">Home</SelectItem>
                      <SelectItem value="Life">Life</SelectItem>
                      <SelectItem value="Health">Health</SelectItem>
                      <SelectItem value="Travel">Travel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="PREMIUM_AMOUNT" className="text-gray-300">Premium Amount ($)</Label>
                  <Input
                    id="PREMIUM_AMOUNT"
                    name="PREMIUM_AMOUNT"
                    type="number"
                    placeholder="e.g. 1200"
                    value={claimData.PREMIUM_AMOUNT || ''}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="TENURE" className="text-gray-300">Tenure (years)</Label>
                  <Input
                    id="TENURE"
                    name="TENURE"
                    type="number"
                    placeholder="e.g. 3"
                    value={claimData.TENURE || ''}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                {/* Customer Information */}
                <div className="md:col-span-2 mt-4">
                  <h3 className="text-xl font-semibold mb-2 text-white">Customer Information</h3>
                </div>

                <div>
                  <Label htmlFor="AGE" className="text-gray-300">Age</Label>
                  <Input
                    id="AGE"
                    name="AGE"
                    type="number"
                    placeholder="e.g. 35"
                    value={claimData.AGE || ''}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="MARITAL_STATUS" className="text-gray-300">Marital Status</Label>
                  <Select 
                    value={claimData.MARITAL_STATUS} 
                    onValueChange={(value) => handleSelectChange('MARITAL_STATUS', value)}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Single">Single</SelectItem>
                      <SelectItem value="Married">Married</SelectItem>
                      <SelectItem value="Divorced">Divorced</SelectItem>
                      <SelectItem value="Widowed">Widowed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="EMPLOYMENT_STATUS" className="text-gray-300">Employment Status</Label>
                  <Select 
                    value={claimData.EMPLOYMENT_STATUS} 
                    onValueChange={(value) => handleSelectChange('EMPLOYMENT_STATUS', value)}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select employment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Employed">Employed</SelectItem>
                      <SelectItem value="Self-employed">Self-employed</SelectItem>
                      <SelectItem value="Unemployed">Unemployed</SelectItem>
                      <SelectItem value="Retired">Retired</SelectItem>
                      <SelectItem value="Student">Student</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="CUSTOMER_EDUCATION_LEVEL" className="text-gray-300">Education Level</Label>
                  <Select 
                    value={claimData.CUSTOMER_EDUCATION_LEVEL} 
                    onValueChange={(value) => handleSelectChange('CUSTOMER_EDUCATION_LEVEL', value)}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select education" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High School">High School</SelectItem>
                      <SelectItem value="College">College</SelectItem>
                      <SelectItem value="Bachelor">Bachelor</SelectItem>
                      <SelectItem value="Master">Master</SelectItem>
                      <SelectItem value="PhD">PhD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="SOCIAL_CLASS" className="text-gray-300">Social Class</Label>
                  <Select 
                    value={claimData.SOCIAL_CLASS} 
                    onValueChange={(value) => handleSelectChange('SOCIAL_CLASS', value)}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Working">Working</SelectItem>
                      <SelectItem value="Middle">Middle</SelectItem>
                      <SelectItem value="Upper-middle">Upper-middle</SelectItem>
                      <SelectItem value="Upper">Upper</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="HOUSE_TYPE" className="text-gray-300">House Type</Label>
                  <Select 
                    value={claimData.HOUSE_TYPE} 
                    onValueChange={(value) => handleSelectChange('HOUSE_TYPE', value)}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select house type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Apartment">Apartment</SelectItem>
                      <SelectItem value="Condominium">Condominium</SelectItem>
                      <SelectItem value="Single Family">Single Family</SelectItem>
                      <SelectItem value="Townhouse">Townhouse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="NO_OF_FAMILY_MEMBERS" className="text-gray-300">Number of Family Members</Label>
                  <Input
                    id="NO_OF_FAMILY_MEMBERS"
                    name="NO_OF_FAMILY_MEMBERS"
                    type="number"
                    placeholder="e.g. 4"
                    value={claimData.NO_OF_FAMILY_MEMBERS || ''}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                {/* Claim Information */}
                <div className="md:col-span-2 mt-4">
                  <h3 className="text-xl font-semibold mb-2 text-white">Claim Information</h3>
                </div>

                <div>
                  <Label htmlFor="CLAIM_AMOUNT" className="text-gray-300">Claim Amount ($)</Label>
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
                </div>

                <div>
                  <Label htmlFor="claimDate" className="text-gray-300">Claim Date</Label>
                  <Input
                    id="claimDate"
                    name="claimDate"
                    type="date"
                    value={claimDetails.claimDate}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="days_to_loss" className="text-gray-300">Days to Loss</Label>
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
                </div>

                <div>
                  <Label htmlFor="claim_premium_ratio" className="text-gray-300">Claim/Premium Ratio</Label>
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
                    Optional: Auto-calculated if left empty
                  </p>
                </div>

                <div>
                  <Label htmlFor="CLAIM_STATUS" className="text-gray-300">Claim Status</Label>
                  <Select 
                    value={claimData.CLAIM_STATUS} 
                    onValueChange={(value) => handleSelectChange('CLAIM_STATUS', value)}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Open">Open</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Under Review">Under Review</SelectItem>
                      <SelectItem value="Pending Documentation">Pending Documentation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="submissionMethod" className="text-gray-300">Submission Method</Label>
                  <Select 
                    value={claimDetails.submissionMethod} 
                    onValueChange={(value: 'online' | 'phone' | 'agent' | 'email') => handleSelectChange('submissionMethod', value)}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="online">Online</SelectItem>
                      <SelectItem value="phone">Phone</SelectItem>
                      <SelectItem value="agent">Agent</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Incident Information */}
                <div className="md:col-span-2 mt-4">
                  <h3 className="text-xl font-semibold mb-2 text-white">Incident Information</h3>
                </div>

                <div>
                  <Label htmlFor="INCIDENT_SEVERITY" className="text-gray-300">Incident Severity</Label>
                  <Select 
                    value={claimData.INCIDENT_SEVERITY} 
                    onValueChange={(value) => handleSelectChange('INCIDENT_SEVERITY', value)}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Minor">Minor</SelectItem>
                      <SelectItem value="Moderate">Moderate</SelectItem>
                      <SelectItem value="Major">Major</SelectItem>
                      <SelectItem value="Severe">Severe</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="INCIDENT_HOUR_OF_THE_DAY" className="text-gray-300">Incident Hour (0-23)</Label>
                  <Input
                    id="INCIDENT_HOUR_OF_THE_DAY"
                    name="INCIDENT_HOUR_OF_THE_DAY"
                    type="number"
                    min="0"
                    max="23"
                    placeholder="e.g. 14"
                    value={claimData.INCIDENT_HOUR_OF_THE_DAY || ''}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="ANY_INJURY" className="text-gray-300">Any Injury (0 = No, 1 = Yes)</Label>
                  <RadioGroup 
                    value={claimData.ANY_INJURY.toString()} 
                    onValueChange={(value) => handleSelectChange('ANY_INJURY', value)}
                    className="flex space-x-4 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="0" id="injury-no" />
                      <Label htmlFor="injury-no" className="text-gray-300">No</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1" id="injury-yes" />
                      <Label htmlFor="injury-yes" className="text-gray-300">Yes</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="RISK_SEGMENTATION" className="text-gray-300">Risk Segmentation</Label>
                  <Select 
                    value={claimData.RISK_SEGMENTATION} 
                    onValueChange={(value) => handleSelectChange('RISK_SEGMENTATION', value)}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select risk level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low Risk">Low Risk</SelectItem>
                      <SelectItem value="Medium Risk">Medium Risk</SelectItem>
                      <SelectItem value="High Risk">High Risk</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="claimDescription" className="text-gray-300">Claim Description</Label>
                  <Textarea
                    id="claimDescription"
                    name="claimDescription"
                    rows={3}
                    placeholder="Describe the claim details..."
                    value={claimDetails.claimDescription}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white"
                  />
                </div>
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
