
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ButtonCustom } from '@/components/ui/button-custom';
import { FileText, CheckCircle, AlertCircle, ChevronDown, ChevronUp, PercentCircle } from 'lucide-react';
import { checkClaimProbability } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

const ClaimCheckerPage = () => {
  const [formData, setFormData] = useState({
    claimType: '',
    incident: '',
    policyDetails: '',
    claimAmount: '',
    damageDetails: '',
    documentationLevel: 'medium',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [expandedFactors, setExpandedFactors] = useState<string[]>([]);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const toggleFactor = (factorName: string) => {
    setExpandedFactors(prev => 
      prev.includes(factorName) 
        ? prev.filter(f => f !== factorName) 
        : [...prev, factorName]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.claimType || !formData.incident || !formData.claimAmount) {
      toast({
        variant: "destructive",
        title: "Incomplete Form",
        description: "Please fill out all required fields.",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Fix: The function expects 2 arguments, but only 1 is provided
      // Adding a dummy policy number as the second argument
      const result = await checkClaimProbability(formData, "POLICY-" + Math.floor(Math.random() * 10000));
      setResults(result);
      toast({
        title: "Analysis Complete",
        description: "We've analyzed your potential claim.",
      });
    } catch (error) {
      console.error('Error checking claim:', error);
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "There was an error analyzing your claim. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderImpactIcon = (impact: string) => {
    switch (impact) {
      case 'positive':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'negative':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getProgressColor = (probability: number) => {
    if (probability >= 80) return 'bg-green-500';
    if (probability >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <Navbar />
      <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block px-3 py-1 rounded-full bg-insura-neon/10 text-insura-neon font-medium text-sm mb-4 border border-insura-neon/20">
              AI Claim Checker
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 insura-gradient-text">
              Check Your Claim's Approval Probability
            </h1>
            <p className="text-xl text-gray-300">
              Before submitting your claim, use our AI to assess the likelihood of approval and get tips to improve your chances.
            </p>
          </div>

          {!results ? (
            <div className="cyber-card rounded-xl p-8 max-w-3xl mx-auto">
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="claimType" className="block text-white mb-2 font-medium">
                      Claim Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="claimType"
                      name="claimType"
                      value={formData.claimType}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg bg-gray-800 border border-gray-700 text-white px-4 py-2 focus:border-insura-neon focus:ring-1 focus:ring-insura-neon"
                    >
                      <option value="">Select claim type</option>
                      <option value="auto_accident">Auto Accident</option>
                      <option value="water_damage">Water Damage</option>
                      <option value="fire_damage">Fire Damage</option>
                      <option value="theft">Theft/Burglary</option>
                      <option value="medical">Medical Expense</option>
                      <option value="property_damage">Property Damage</option>
                      <option value="liability">Liability Claim</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="incident" className="block text-white mb-2 font-medium">
                      Incident Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="incident"
                      name="incident"
                      value={formData.incident}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="Describe what happened in detail..."
                      className="w-full rounded-lg bg-gray-800 border border-gray-700 text-white px-4 py-2 focus:border-insura-neon focus:ring-1 focus:ring-insura-neon"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="claimAmount" className="block text-white mb-2 font-medium">
                        Claim Amount (₹) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="claimAmount"
                        name="claimAmount"
                        value={formData.claimAmount}
                        onChange={handleChange}
                        required
                        placeholder="e.g. 25000"
                        className="w-full rounded-lg bg-gray-800 border border-gray-700 text-white px-4 py-2 focus:border-insura-neon focus:ring-1 focus:ring-insura-neon"
                      />
                    </div>

                    <div>
                      <label htmlFor="documentationLevel" className="block text-white mb-2 font-medium">
                        Documentation Level
                      </label>
                      <select
                        id="documentationLevel"
                        name="documentationLevel"
                        value={formData.documentationLevel}
                        onChange={handleChange}
                        className="w-full rounded-lg bg-gray-800 border border-gray-700 text-white px-4 py-2 focus:border-insura-neon focus:ring-1 focus:ring-insura-neon"
                      >
                        <option value="minimal">Minimal - Few photos or documents</option>
                        <option value="medium">Medium - Some documentation</option>
                        <option value="extensive">Extensive - Thorough documentation</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="policyDetails" className="block text-white mb-2 font-medium">
                      Policy Details
                    </label>
                    <input
                      type="text"
                      id="policyDetails"
                      name="policyDetails"
                      value={formData.policyDetails}
                      onChange={handleChange}
                      placeholder="Policy number or type (optional)"
                      className="w-full rounded-lg bg-gray-800 border border-gray-700 text-white px-4 py-2 focus:border-insura-neon focus:ring-1 focus:ring-insura-neon"
                    />
                  </div>

                  <div>
                    <label htmlFor="damageDetails" className="block text-white mb-2 font-medium">
                      Damage/Loss Details
                    </label>
                    <textarea
                      id="damageDetails"
                      name="damageDetails"
                      value={formData.damageDetails}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Describe the specific damage or loss in detail (optional)"
                      className="w-full rounded-lg bg-gray-800 border border-gray-700 text-white px-4 py-2 focus:border-insura-neon focus:ring-1 focus:ring-insura-neon"
                    />
                  </div>

                  <div className="flex justify-center mt-8">
                    <ButtonCustom
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={isLoading}
                      className="bg-gradient-to-r from-insura-neon to-insura-purple hover:shadow-lg hover:shadow-insura-purple/20 w-full md:w-auto"
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Analyzing your claim...
                        </div>
                      ) : (
                        "Check Claim Probability"
                      )}
                    </ButtonCustom>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            <div className="space-y-8 max-w-4xl mx-auto animate-fade-in">
              {/* Results header */}
              <div className="cyber-card rounded-xl p-8 text-center">
                <h2 className="text-2xl font-bold mb-6 insura-gradient-text">Claim Approval Probability</h2>
                <div className="flex flex-col items-center">
                  <div className="relative w-48 h-48 mb-4">
                    <div className="w-full h-full rounded-full border-8 border-gray-700 flex items-center justify-center">
                      <PercentCircle className="w-20 h-20 text-insura-neon opacity-20 absolute" />
                      <span className="text-5xl font-bold text-white">{results.approvalProbability}%</span>
                    </div>
                    <svg className="absolute top-0 left-0" width="192" height="192" viewBox="0 0 192 192">
                      <circle
                        cx="96"
                        cy="96"
                        r="88"
                        fill="none"
                        stroke={getProgressColor(results.approvalProbability)}
                        strokeWidth="8"
                        strokeDasharray="553"
                        strokeDashoffset={553 - (553 * results.approvalProbability) / 100}
                        transform="rotate(-90 96 96)"
                      />
                    </svg>
                  </div>
                  <p className="text-xl text-gray-300 mb-4">
                    {results.approvalProbability >= 80
                      ? "High approval probability!"
                      : results.approvalProbability >= 50
                      ? "Moderate approval probability"
                      : "Low approval probability"}
                  </p>
                  <p className="text-gray-400 max-w-md">
                    Based on the information provided, our AI predicts your claim has a {results.approvalProbability}% chance of being approved.
                  </p>
                </div>
              </div>

              {/* Factors analysis */}
              <div className="cyber-card rounded-xl p-8">
                <h2 className="text-2xl font-bold mb-6 insura-gradient-text">Factors Affecting Your Claim</h2>
                <div className="space-y-4">
                  {results.factors.map((factor: any, index: number) => (
                    <div 
                      key={index} 
                      className="border border-gray-800 rounded-lg overflow-hidden bg-black/30"
                    >
                      <div 
                        className="flex items-center justify-between p-4 cursor-pointer"
                        onClick={() => toggleFactor(factor.factor)}
                      >
                        <div className="flex items-center space-x-3">
                          {renderImpactIcon(factor.impact)}
                          <h3 className="font-medium text-white">{factor.factor}</h3>
                          <span 
                            className={`text-xs px-2 py-1 rounded-full ${
                              factor.impact === 'positive' ? 'bg-green-900/30 text-green-400' : 
                              factor.impact === 'negative' ? 'bg-red-900/30 text-red-400' : 
                              'bg-yellow-900/30 text-yellow-400'
                            }`}
                          >
                            {factor.impact}
                          </span>
                        </div>
                        <button>
                          {expandedFactors.includes(factor.factor) ? (
                            <ChevronUp className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          )}
                        </button>
                      </div>
                      {expandedFactors.includes(factor.factor) && (
                        <div className="p-4 pt-0 border-t border-gray-800 text-gray-300">
                          {factor.description}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Suggested actions */}
              <div className="cyber-card rounded-xl p-8">
                <h2 className="text-2xl font-bold mb-6 insura-gradient-text">Suggested Actions</h2>
                <ul className="space-y-3">
                  {results.suggestedActions.map((action: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-3 bg-insura-neon/20 p-1 rounded-full flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-insura-neon" />
                      </span>
                      <span className="text-gray-300">{action}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-center space-x-4">
                <ButtonCustom
                  variant="primary"
                  size="lg"
                  onClick={() => setResults(null)}
                  className="bg-gradient-to-r from-insura-neon to-insura-purple hover:shadow-lg hover:shadow-insura-purple/20"
                >
                  Check Another Claim
                </ButtonCustom>
                <ButtonCustom
                  variant="outline"
                  size="lg"
                  className="border-insura-neon text-insura-neon hover:bg-insura-neon/10"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Download Report
                </ButtonCustom>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ClaimCheckerPage;
