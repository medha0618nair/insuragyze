
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Search, Filter, Check, ThumbsUp, Shield, ArrowRight } from 'lucide-react';
import { ButtonCustom } from '@/components/ui/button-custom';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  insuranceType: string;
  age: string;
  healthStatus: string;
  location: string;
  coverage: string[];
  budget: string;
}

interface PlanResult {
  id: string;
  name: string;
  provider: string;
  monthlyPremium: string;
  monthlyPremiumINR: string;
  coverageAmount: string;
  coverageAmountINR: string;
  benefits: string[];
  suitabilityScore: number;
  description: string;
}

const InsurancePlanFinderPage = () => {
  const [step, setStep] = useState<'form' | 'results'>('form');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    insuranceType: '',
    age: '',
    healthStatus: '',
    location: '',
    coverage: [],
    budget: '',
  });
  const [results, setResults] = useState<PlanResult[]>([]);
  const [currency, setCurrency] = useState<'USD' | 'INR'>('USD');
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    
    setFormData(prev => {
      if (checked) {
        return { ...prev, [name]: [...prev[name as keyof FormData] as string[], value] };
      } else {
        return { 
          ...prev, 
          [name]: (prev[name as keyof FormData] as string[]).filter(item => item !== value) 
        };
      }
    });
  };

  const toggleCurrency = () => {
    setCurrency(prev => prev === 'USD' ? 'INR' : 'USD');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validate form
    if (!formData.insuranceType || !formData.age || !formData.budget) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    // Simulate API call with setTimeout
    setTimeout(() => {
      // Generate mock results
      const mockResults: PlanResult[] = [
        {
          id: '1',
          name: 'Premium Health Shield',
          provider: 'SafeGuard Insurance',
          monthlyPremium: '$185',
          monthlyPremiumINR: '₹15,447',
          coverageAmount: '$500,000',
          coverageAmountINR: '₹41,750,000',
          benefits: ['Comprehensive coverage', '24/7 support', 'Fast claims processing', 'No waiting period', 'International coverage'],
          suitabilityScore: 95,
          description: 'Top-tier health plan tailored for your specific needs.'
        },
        {
          id: '2',
          name: 'Value Care Plus',
          provider: 'TrustLife Insurance',
          monthlyPremium: '$120',
          monthlyPremiumINR: '₹10,020',
          coverageAmount: '$300,000',
          coverageAmountINR: '₹25,050,000',
          benefits: ['Essential coverage', 'Wellness programs', 'Digital claims', 'Preventive care'],
          suitabilityScore: 87,
          description: 'Balanced protection that fits your budget without compromising on quality.'
        },
        {
          id: '3',
          name: 'Basic Shield',
          provider: 'SecureCare',
          monthlyPremium: '$80',
          monthlyPremiumINR: '₹6,680',
          coverageAmount: '$150,000',
          coverageAmountINR: '₹12,525,000',
          benefits: ['Hospital coverage', 'Emergency care', 'Basic checkups'],
          suitabilityScore: 75,
          description: 'Affordable entry-level protection for essential health needs.'
        },
      ];
      
      setResults(mockResults);
      setIsLoading(false);
      setStep('results');
      
      toast({
        title: "Plans Found!",
        description: "We've found insurance plans that match your criteria."
      });
    }, 2000);
  };

  const resetSearch = () => {
    setStep('form');
    setResults([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <Navbar />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 insura-gradient-text">
              AI Insurance Plan Finder
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Tell us about your needs, and our AI will match you with the perfect insurance plans from top providers.
            </p>
          </div>

          {step === 'form' ? (
            <div className="cyber-card p-8 rounded-2xl max-w-4xl mx-auto animate-fade-in">
              <div className="flex items-center justify-center mb-8">
                <div className="w-16 h-16 bg-indigo-900/30 rounded-full flex items-center justify-center">
                  <Search className="w-8 h-8 text-indigo-400" />
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Type of Insurance</label>
                    <select 
                      name="insuranceType"
                      value={formData.insuranceType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
                      required
                    >
                      <option value="">Select insurance type</option>
                      <option value="health">Health Insurance</option>
                      <option value="life">Life Insurance</option>
                      <option value="auto">Auto Insurance</option>
                      <option value="home">Home Insurance</option>
                      <option value="travel">Travel Insurance</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Age</label>
                    <input 
                      type="text" 
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
                      placeholder="Enter your age"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Health Status</label>
                    <select 
                      name="healthStatus"
                      value={formData.healthStatus}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
                    >
                      <option value="">Select health status</option>
                      <option value="excellent">Excellent</option>
                      <option value="good">Good</option>
                      <option value="fair">Fair</option>
                      <option value="poor">Poor</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Location</label>
                    <input 
                      type="text" 
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
                      placeholder="City, State or ZIP code"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">Coverage Preferences</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      'Comprehensive Coverage', 
                      'Family Protection', 
                      'Emergency Services', 
                      'Preventive Care', 
                      'Specialist Services', 
                      'International Coverage',
                      'Digital Claims Processing',
                      'Mental Health Support'
                    ].map((option) => (
                      <div key={option} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`coverage-${option}`}
                          name="coverage"
                          value={option.toLowerCase()}
                          checked={formData.coverage.includes(option.toLowerCase())}
                          onChange={handleCheckboxChange}
                          className="w-4 h-4 text-indigo-400 bg-gray-900 border-gray-700 rounded focus:ring-indigo-400 focus:ring-opacity-25"
                        />
                        <label htmlFor={`coverage-${option}`} className="ml-2 text-sm text-gray-300">
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">Monthly Budget</label>
                  <select 
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400" 
                    required
                  >
                    <option value="">Select your budget range</option>
                    <option value="0-100">$0 - $100 per month</option>
                    <option value="100-200">$100 - $200 per month</option>
                    <option value="200-300">$200 - $300 per month</option>
                    <option value="300-500">$300 - $500 per month</option>
                    <option value="500+">$500+ per month</option>
                  </select>
                </div>

                <div className="pt-4">
                  <ButtonCustom
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    className="bg-gradient-to-r from-indigo-400 to-purple-500 hover:shadow-lg hover:shadow-purple-500/20"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Finding Best Plans...
                      </>
                    ) : (
                      <>
                        <Filter className="mr-2 h-5 w-5" />
                        Find My Insurance Plans
                      </>
                    )}
                  </ButtonCustom>
                </div>
              </form>
            </div>
          ) : (
            <div className="animate-fade-in">
              <div className="cyber-card p-6 mb-8 rounded-2xl border border-indigo-400/30">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center">
                    <Shield className="h-6 w-6 text-indigo-400 mr-3" />
                    <h3 className="text-xl font-bold text-white">Your Personalized Plan Recommendations</h3>
                  </div>
                  <div className="flex space-x-4">
                    <ButtonCustom
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1 text-indigo-400 border-indigo-400"
                      onClick={toggleCurrency}
                    >
                      {currency === 'USD' ? 'Show INR' : 'Show USD'}
                    </ButtonCustom>
                    <ButtonCustom
                      variant="outline"
                      size="sm"
                      onClick={resetSearch}
                    >
                      Modify Search
                    </ButtonCustom>
                  </div>
                </div>
                <p className="mt-3 text-gray-300">
                  Based on your {formData.age}-year-old profile and budget of {formData.budget.split('-')[0]}-{formData.budget.split('-')[1] || '+'} per month, 
                  here are your best insurance matches ranked by suitability.
                </p>
              </div>

              <div className="space-y-6">
                {results.map((plan, index) => (
                  <div 
                    key={plan.id} 
                    className={`cyber-card rounded-xl overflow-hidden border transition-all ${
                      index === 0 ? 'border-indigo-400/70 shadow-lg shadow-indigo-400/20 scale-[1.02]' : 'border-gray-800 hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1'
                    }`}
                  >
                    <div className="p-6 sm:p-8">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                        <div>
                          {index === 0 && (
                            <div className="inline-block px-3 py-1 rounded-full bg-indigo-400 text-black text-xs font-medium mb-2 flex items-center">
                              <Check className="h-3 w-3 mr-1" />
                              Best Match
                            </div>
                          )}
                          <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                          <p className="text-sm text-gray-400">by {plan.provider}</p>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="bg-indigo-400/10 rounded-lg py-2 px-3 flex items-center">
                            <ThumbsUp className="h-5 w-5 text-indigo-400 mr-1" />
                            <span className="font-bold text-indigo-400">{plan.suitabilityScore}% Match</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                        <div>
                          <p className="text-sm text-gray-400 mb-1">Monthly Premium</p>
                          <p className="text-xl font-bold text-white">
                            {currency === 'USD' ? plan.monthlyPremium : plan.monthlyPremiumINR}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400 mb-1">Coverage Amount</p>
                          <p className="text-xl font-bold text-white">
                            {currency === 'USD' ? plan.coverageAmount : plan.coverageAmountINR}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400 mb-1">Best For</p>
                          <p className="text-base font-medium text-gray-300">{plan.description}</p>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <p className="text-sm text-gray-400 mb-2">Key Benefits</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                          {plan.benefits.map((benefit, i) => (
                            <div key={i} className="flex items-center">
                              <Check className="h-4 w-4 text-indigo-400 mr-2 flex-shrink-0" />
                              <span className="text-sm text-gray-300">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-3">
                        <ButtonCustom
                          variant={index === 0 ? "primary" : "outline"}
                          className={index === 0 ? "bg-gradient-to-r from-indigo-400 to-purple-500" : "text-indigo-400 border-indigo-400"}
                        >
                          Get More Details
                        </ButtonCustom>
                        
                        <ButtonCustom
                          variant={index === 0 ? "outline" : "ghost"}
                          className={index === 0 ? "text-indigo-400 border-indigo-400" : "text-gray-300"}
                        >
                          Compare
                        </ButtonCustom>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 cyber-card p-8 rounded-2xl border border-gray-800">
                <h3 className="text-xl font-bold text-white mb-4">Why These Recommendations?</h3>
                <p className="text-gray-300 mb-6">
                  Our AI analyzes multiple factors to find plans that best match your profile and preferences:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-indigo-400 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-white">Personal Factors</h4>
                      <p className="text-sm text-gray-400">Your age, health status, and location</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-indigo-400 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-white">Coverage Needs</h4>
                      <p className="text-sm text-gray-400">Specific protections important to you</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-indigo-400 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-white">Budget Alignment</h4>
                      <p className="text-sm text-gray-400">Plans within your specified budget range</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-indigo-400 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-white">Provider Quality</h4>
                      <p className="text-sm text-gray-400">Provider reputation and customer satisfaction</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-black/40 rounded-lg border border-gray-800">
                  <div>
                    <h4 className="font-medium text-white">Not finding what you're looking for?</h4>
                    <p className="text-sm text-gray-400">Try adjusting your search parameters or speak with our AI assistant</p>
                  </div>
                  <ButtonCustom
                    variant="primary"
                    className="whitespace-nowrap bg-gradient-to-r from-indigo-400 to-purple-500"
                    onClick={resetSearch}
                  >
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Start a New Search
                  </ButtonCustom>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default InsurancePlanFinderPage;
