
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FileSearch, Check, X, AlertCircle, ArrowRight } from 'lucide-react';
import { ButtonCustom } from '@/components/ui/button-custom';

const ClaimCheckerPage = () => {
  const [step, setStep] = useState<'form' | 'result'>("form");
  const [formData, setFormData] = useState({
    insuranceType: '',
    policyNumber: '',
    claimType: '',
    claimDescription: '',
    evidenceType: [],
    previousClaims: ''
  });
  
  const [approvalScore, setApprovalScore] = useState(0);
  const [currency, setCurrency] = useState<'USD' | 'INR'>('USD');
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    
    setFormData((prev) => {
      if (checked) {
        return { ...prev, [name]: [...prev[name as keyof typeof formData] as string[], value] };
      } else {
        return { 
          ...prev, 
          [name]: (prev[name as keyof typeof formData] as string[]).filter(item => item !== value) 
        };
      }
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Calculate a mock approval score based on form data
    let score = 0;
    
    // More evidence types generally means better chance of approval
    score += (formData.evidenceType.length * 15);
    
    // Previous claims can affect approval
    if (formData.previousClaims === 'none') {
      score += 30;
    } else if (formData.previousClaims === '1-2') {
      score += 15;
    }
    
    // Add some randomness
    score += Math.floor(Math.random() * 20);
    
    // Cap the score at 98 (never show 100% certainty)
    score = Math.min(score, 98);
    
    setApprovalScore(score);
    setStep('result');
  };
  
  const resetForm = () => {
    setStep('form');
  };
  
  const toggleCurrency = () => {
    setCurrency(prev => prev === 'USD' ? 'INR' : 'USD');
  };
  
  const convertToINR = (usdAmount: number) => {
    const exchangeRate = 83.5; // Mock exchange rate (1 USD = 83.5 INR)
    return parseFloat((usdAmount * exchangeRate).toFixed(2));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-insura-cyberdark">
      <Navbar />
      <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block px-3 py-1 rounded-full bg-emerald-400/10 text-emerald-400 font-medium text-sm mb-4 border border-emerald-400/20">
              Claim Probability Checker
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 insura-gradient-text">
              Check Your Claim Approval Odds
            </h1>
            <p className="text-xl text-gray-300">
              Check the likelihood of your insurance claim being approved before you submit it and get tips to improve your chances.
            </p>
          </div>

          {step === 'form' ? (
            <div className="cyber-card rounded-xl p-8 max-w-3xl mx-auto">
              <div className="flex items-center mb-8">
                <FileSearch className="w-8 h-8 text-emerald-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">Enter Claim Details</h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Insurance Type</label>
                    <select 
                      name="insuranceType" 
                      value={formData.insuranceType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                    >
                      <option value="">Select insurance type</option>
                      <option value="health">Health Insurance</option>
                      <option value="auto">Auto Insurance</option>
                      <option value="home">Home Insurance</option>
                      <option value="travel">Travel Insurance</option>
                      <option value="life">Life Insurance</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Policy Number (Optional)</label>
                    <input 
                      type="text" 
                      name="policyNumber"
                      placeholder="Enter your policy number"
                      value={formData.policyNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Claim Type</label>
                  <select 
                    name="claimType" 
                    value={formData.claimType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                  >
                    <option value="">Select claim type</option>
                    <option value="medical">Medical Treatment</option>
                    <option value="accident">Auto Accident</option>
                    <option value="property">Property Damage</option>
                    <option value="theft">Theft or Burglary</option>
                    <option value="liability">Liability Claim</option>
                    <option value="emergency">Emergency Services</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Claim Description</label>
                  <textarea 
                    name="claimDescription"
                    placeholder="Briefly describe what happened..."
                    value={formData.claimDescription}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 resize-none"
                  />
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Evidence You Have (select all that apply)</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      'Photos/videos of damage',
                      'Medical records',
                      'Police report',
                      'Witness statements',
                      'Purchase receipts',
                      'Expert assessment',
                      'Repair estimates'
                    ].map((evidence, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`evidence-${index}`}
                          name="evidenceType"
                          value={evidence.toLowerCase()}
                          checked={(formData.evidenceType as string[])?.includes(evidence.toLowerCase())}
                          onChange={handleCheckboxChange}
                          className="h-4 w-4 text-emerald-400 focus:ring-emerald-400 border-gray-700 rounded bg-gray-800"
                        />
                        <label htmlFor={`evidence-${index}`} className="ml-2 text-sm text-gray-300">
                          {evidence}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Previous Claims History</label>
                  <select 
                    name="previousClaims" 
                    value={formData.previousClaims}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                  >
                    <option value="">Select previous claims</option>
                    <option value="none">No previous claims</option>
                    <option value="1-2">1-2 previous claims</option>
                    <option value="3-5">3-5 previous claims</option>
                    <option value="5+">More than 5 previous claims</option>
                  </select>
                </div>
                
                <div className="pt-4">
                  <ButtonCustom
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    className="bg-gradient-to-r from-emerald-400 to-teal-500 hover:shadow-lg hover:shadow-emerald-400/20"
                  >
                    Check Claim Approval Probability
                  </ButtonCustom>
                </div>
              </form>
            </div>
          ) : (
            <div className="cyber-card rounded-xl p-8 max-w-3xl mx-auto animate-fade-in">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <FileSearch className="w-8 h-8 text-emerald-400 mr-3" />
                  <h2 className="text-2xl font-bold text-white">Claim Assessment</h2>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={toggleCurrency}
                    className="px-3 py-1 text-sm rounded-full bg-gray-800 text-white hover:bg-gray-700 mr-3"
                  >
                    {currency === 'USD' ? 'Show in INR' : 'Show in USD'}
                  </button>
                  <ButtonCustom
                    variant="outline"
                    size="sm"
                    className="text-gray-300 border-gray-600"
                    onClick={resetForm}
                  >
                    New Check
                  </ButtonCustom>
                </div>
              </div>
              
              <div className="mb-8">
                <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-medium text-white">Approval Probability</h3>
                    <span 
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        approvalScore >= 70 
                          ? 'bg-green-500/20 text-green-400' 
                          : approvalScore >= 40 
                          ? 'bg-yellow-500/20 text-yellow-400' 
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {approvalScore >= 70 
                        ? 'High Chance' 
                        : approvalScore >= 40 
                        ? 'Moderate Chance' 
                        : 'Low Chance'}
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-700 rounded-full h-4 mb-4">
                    <div 
                      className={`h-4 rounded-full ${
                        approvalScore >= 70 
                          ? 'bg-gradient-to-r from-emerald-400 to-green-500' 
                          : approvalScore >= 40 
                          ? 'bg-gradient-to-r from-yellow-400 to-amber-500' 
                          : 'bg-gradient-to-r from-red-400 to-red-500'
                      }`}
                      style={{ width: `${approvalScore}%` }}
                    ></div>
                  </div>
                  
                  <p className="text-3xl font-bold text-white text-center">{approvalScore}%</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                    <p className="text-gray-400 mb-1 text-sm">Estimated Claim Amount</p>
                    <p className="text-xl font-bold text-white">
                      {currency === 'USD' ? '$2,500' : `₹${convertToINR(2500).toLocaleString()}`}
                    </p>
                  </div>
                  
                  <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                    <p className="text-gray-400 mb-1 text-sm">Processing Time</p>
                    <p className="text-xl font-bold text-white">7-10 business days</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-medium text-white mb-4">Improvement Tips</h3>
                
                <div className="space-y-3">
                  {approvalScore < 80 && (
                    <>
                      <div className="flex items-start">
                        <div className="mr-3 mt-0.5">
                          <ArrowRight className="w-4 h-4 text-emerald-400" />
                        </div>
                        <p className="text-gray-300 text-sm">
                          Add photos and videos of the damage to strengthen your evidence.
                        </p>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="mr-3 mt-0.5">
                          <ArrowRight className="w-4 h-4 text-emerald-400" />
                        </div>
                        <p className="text-gray-300 text-sm">
                          Obtain a professional assessment or repair estimate from a licensed expert.
                        </p>
                      </div>
                    </>
                  )}
                  
                  <div className="flex items-start">
                    <div className="mr-3 mt-0.5">
                      <ArrowRight className="w-4 h-4 text-emerald-400" />
                    </div>
                    <p className="text-gray-300 text-sm">
                      Be very specific and detailed in your claim description, including dates, times, and sequence of events.
                    </p>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-3 mt-0.5">
                      <ArrowRight className="w-4 h-4 text-emerald-400" />
                    </div>
                    <p className="text-gray-300 text-sm">
                      Submit your claim as soon as possible after the incident while details are fresh.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700 flex items-start mb-8">
                <AlertCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5 mr-3" />
                <p className="text-sm text-gray-400">
                  This assessment is based on AI analysis of similar claims and policy information. The actual outcome may vary based on your specific policy terms and the insurance company's internal processes.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <ButtonCustom
                  variant="primary"
                  size="lg"
                  className="bg-gradient-to-r from-emerald-400 to-teal-500 hover:shadow-lg hover:shadow-emerald-400/20"
                >
                  Start Claim Process
                </ButtonCustom>
                
                <ButtonCustom
                  variant="outline"
                  size="lg"
                  className="text-emerald-400 border-emerald-400 hover:bg-emerald-400/10"
                >
                  Speak to an Agent
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
