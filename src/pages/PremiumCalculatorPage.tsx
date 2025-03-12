
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calculator, DollarSign, ArrowRight, Check } from 'lucide-react';
import { ButtonCustom } from '@/components/ui/button-custom';

const PremiumCalculatorPage = () => {
  const [formData, setFormData] = useState({
    insuranceType: '',
    age: '',
    coverage: '',
    location: '',
    healthStatus: '',
    occupation: '',
  });
  
  const [result, setResult] = useState<{
    monthlyPremium: number;
    yearlyPremium: number;
    coverageAmount: number;
  } | null>(null);
  
  const [currency, setCurrency] = useState<'USD' | 'INR'>('USD');
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const calculatePremium = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock calculation logic - in a real app this would be more sophisticated
    const baseRate = formData.insuranceType === 'health' ? 250 : 
                    formData.insuranceType === 'life' ? 350 : 
                    formData.insuranceType === 'auto' ? 180 : 
                    formData.insuranceType === 'home' ? 220 : 200;
    
    const ageMultiplier = parseInt(formData.age) < 30 ? 0.8 : 
                          parseInt(formData.age) < 50 ? 1 : 
                          parseInt(formData.age) < 65 ? 1.4 : 1.8;
    
    const coverageMultiplier = parseInt(formData.coverage) / 100000;
    
    const healthMultiplier = formData.healthStatus === 'excellent' ? 0.8 :
                            formData.healthStatus === 'good' ? 1 :
                            formData.healthStatus === 'fair' ? 1.3 : 1.6;
    
    const calculatedMonthly = baseRate * ageMultiplier * coverageMultiplier * healthMultiplier;
    
    setResult({
      monthlyPremium: parseFloat(calculatedMonthly.toFixed(2)),
      yearlyPremium: parseFloat((calculatedMonthly * 12).toFixed(2)),
      coverageAmount: parseInt(formData.coverage)
    });
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
            <div className="inline-block px-3 py-1 rounded-full bg-indigo-400/10 text-indigo-400 font-medium text-sm mb-4 border border-indigo-400/20">
              Premium Calculator
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 insura-gradient-text">
              Calculate Your Insurance Premium
            </h1>
            <p className="text-xl text-gray-300">
              Get instant premium estimates based on your specific needs and risk profile.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="cyber-card rounded-xl p-8">
              <div className="flex items-center mb-6">
                <Calculator className="w-8 h-8 text-indigo-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">Calculator</h2>
              </div>
              
              <form onSubmit={calculatePremium} className="space-y-6">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Insurance Type</label>
                  <select 
                    name="insuranceType" 
                    value={formData.insuranceType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
                  >
                    <option value="">Select insurance type</option>
                    <option value="health">Health Insurance</option>
                    <option value="life">Life Insurance</option>
                    <option value="auto">Auto Insurance</option>
                    <option value="home">Home Insurance</option>
                    <option value="disability">Disability Insurance</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Age</label>
                    <input 
                      type="number" 
                      name="age"
                      min="18"
                      max="100"
                      placeholder="Enter your age"
                      value={formData.age}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Coverage Amount</label>
                    <input 
                      type="number" 
                      name="coverage"
                      min="50000"
                      step="50000"
                      placeholder="e.g. 500000"
                      value={formData.coverage}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Location</label>
                  <input 
                    type="text" 
                    name="location"
                    placeholder="Enter your city/state"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
                  />
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Health Status</label>
                  <select 
                    name="healthStatus" 
                    value={formData.healthStatus}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
                  >
                    <option value="">Select health status</option>
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                    <option value="poor">Poor</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Occupation</label>
                  <input 
                    type="text" 
                    name="occupation"
                    placeholder="Enter your occupation"
                    value={formData.occupation}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
                  />
                </div>
                
                <div className="pt-4">
                  <ButtonCustom
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    className="bg-gradient-to-r from-indigo-400 to-insura-purple hover:shadow-lg hover:shadow-insura-purple/20"
                  >
                    Calculate Premium
                  </ButtonCustom>
                </div>
              </form>
            </div>
            
            <div>
              {result ? (
                <div className="cyber-card rounded-xl p-8 animate-fade-in">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <DollarSign className="w-8 h-8 text-insura-neon mr-3" />
                      <h2 className="text-2xl font-bold text-white">Your Estimate</h2>
                    </div>
                    <button
                      onClick={toggleCurrency}
                      className="px-3 py-1 text-sm rounded-full bg-gray-800 text-white hover:bg-gray-700"
                    >
                      {currency === 'USD' ? 'Show in INR' : 'Show in USD'}
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                      <p className="text-gray-400 mb-1">Monthly Premium</p>
                      <p className="text-3xl font-bold text-white flex items-center">
                        {currency === 'USD' ? (
                          <>${result.monthlyPremium}</>
                        ) : (
                          <>₹{convertToINR(result.monthlyPremium)}</>
                        )}
                      </p>
                    </div>
                    
                    <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                      <p className="text-gray-400 mb-1">Annual Premium</p>
                      <p className="text-3xl font-bold text-white">
                        {currency === 'USD' ? (
                          <>${result.yearlyPremium}</>
                        ) : (
                          <>₹{convertToINR(result.yearlyPremium)}</>
                        )}
                      </p>
                    </div>
                    
                    <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                      <p className="text-gray-400 mb-1">Coverage Amount</p>
                      <p className="text-3xl font-bold text-white">
                        {currency === 'USD' ? (
                          <>${result.coverageAmount.toLocaleString()}</>
                        ) : (
                          <>₹{convertToINR(result.coverageAmount).toLocaleString()}</>
                        )}
                      </p>
                    </div>
                    
                    <div className="pt-4">
                      <ButtonCustom
                        variant="outline"
                        size="lg"
                        fullWidth
                        className="text-insura-neon border-insura-neon hover:bg-insura-neon/10"
                      >
                        Compare Insurance Plans <ArrowRight className="ml-2 h-4 w-4" />
                      </ButtonCustom>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="cyber-card rounded-xl p-8 h-full flex flex-col justify-center items-center text-center">
                  <Calculator className="w-16 h-16 text-gray-700 mb-4" />
                  <h3 className="text-xl font-medium text-white mb-3">No Estimate Yet</h3>
                  <p className="text-gray-400 mb-6">Fill out the form to see your personalized premium estimate.</p>
                  
                  <div className="w-full space-y-4 max-w-md">
                    <div className="flex items-start">
                      <Check className="w-5 h-5 text-indigo-400 mr-3 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-300 text-sm">Customized to your specific risk profile</p>
                    </div>
                    <div className="flex items-start">
                      <Check className="w-5 h-5 text-indigo-400 mr-3 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-300 text-sm">Instant calculations with no personal information stored</p>
                    </div>
                    <div className="flex items-start">
                      <Check className="w-5 h-5 text-indigo-400 mr-3 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-300 text-sm">Compare rates across different coverage levels</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PremiumCalculatorPage;
