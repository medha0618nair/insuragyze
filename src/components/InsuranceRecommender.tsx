
import React, { useState } from 'react';
import { ButtonCustom } from './ui/button-custom';
import { 
  Check, 
  AlertCircle, 
  Heart, 
  Shield, 
  ThumbsUp, 
  Filter,
} from 'lucide-react';

interface FormData {
  age: string;
  gender: string;
  occupation: string;
  income: string;
  medicalHistory: string[];
  familySize: string;
  location: string;
  coverage: string[];
  budget: string;
}

interface RecommendedPlan {
  id: string;
  name: string;
  provider: string;
  monthlyPremium: string;
  coverageAmount: string;
  benefits: string[];
  suitabilityScore: number;
  description: string;
}

const InsuranceRecommender = () => {
  const [step, setStep] = useState<'form' | 'results'>('form');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    age: '',
    gender: '',
    occupation: '',
    income: '',
    medicalHistory: [],
    familySize: '',
    location: '',
    coverage: [],
    budget: '',
  });
  const [recommendedPlans, setRecommendedPlans] = useState<RecommendedPlan[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    
    setFormData((prev) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call with a timeout
    setTimeout(() => {
      // Mock AI-filtered insurance plans based on user data
      const mockRecommendations: RecommendedPlan[] = [
        {
          id: '1',
          name: 'Premium Health Plus',
          provider: 'BlueCross Insurance',
          monthlyPremium: '$285',
          coverageAmount: '$1,000,000',
          benefits: ['Comprehensive hospital coverage', 'Mental health support', 'Preventive care', 'Prescription drugs', 'Specialist visits'],
          suitabilityScore: 95,
          description: 'Ideal for professionals with high income seeking comprehensive coverage.'
        },
        {
          id: '2',
          name: 'Family Shield Plan',
          provider: 'Harmony Health',
          monthlyPremium: '$340',
          coverageAmount: '$800,000',
          benefits: ['Family doctor visits', 'Maternity care', 'Child wellness', 'Emergency services', 'Dental basics'],
          suitabilityScore: 88,
          description: 'Perfect for families with children, including special coverage for maternity and pediatric care.'
        },
        {
          id: '3',
          name: 'Essential Coverage',
          provider: 'UniHealth',
          monthlyPremium: '$195',
          coverageAmount: '$500,000',
          benefits: ['Hospital care', 'Emergency services', 'Basic diagnostic tests', 'Limited specialist visits'],
          suitabilityScore: 75,
          description: 'Budget-friendly option that covers essential health needs without premium features.'
        },
      ];

      setRecommendedPlans(mockRecommendations);
      setIsLoading(false);
      setStep('results');
    }, 2000);
  };

  const resetForm = () => {
    setStep('form');
    setRecommendedPlans([]);
  };

  return (
    <section id="insurance-recommender" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-block px-3 py-1 rounded-full bg-insura-blue/10 text-insura-blue font-medium text-sm mb-4">
              AI Recommendation Engine
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Find Your Perfect Insurance Plan
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Answer a few questions about yourself and let our AI find the best insurance plans tailored just for you.
            </p>
          </div>

          {step === 'form' ? (
            <div className="bg-white shadow-lg rounded-2xl p-8 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      required
                      min="18"
                      max="100"
                      value={formData.age}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-insura-blue focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <select
                      id="gender"
                      name="gender"
                      required
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-insura-blue focus:border-transparent"
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="non-binary">Non-binary</option>
                      <option value="prefer-not-to-say">Prefer not to say</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
                    <input
                      type="text"
                      id="occupation"
                      name="occupation"
                      required
                      value={formData.occupation}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-insura-blue focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="income" className="block text-sm font-medium text-gray-700 mb-1">Annual Income (USD)</label>
                    <select
                      id="income"
                      name="income"
                      required
                      value={formData.income}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-insura-blue focus:border-transparent"
                    >
                      <option value="">Select income range</option>
                      <option value="below-30k">Below $30,000</option>
                      <option value="30k-50k">$30,000 - $50,000</option>
                      <option value="50k-80k">$50,000 - $80,000</option>
                      <option value="80k-120k">$80,000 - $120,000</option>
                      <option value="above-120k">Above $120,000</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="familySize" className="block text-sm font-medium text-gray-700 mb-1">Family Size</label>
                    <select
                      id="familySize"
                      name="familySize"
                      required
                      value={formData.familySize}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-insura-blue focus:border-transparent"
                    >
                      <option value="">Select family size</option>
                      <option value="1">Just me</option>
                      <option value="2">2 people</option>
                      <option value="3">3 people</option>
                      <option value="4">4 people</option>
                      <option value="5+">5+ people</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      placeholder="City, State"
                      required
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-insura-blue focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">Monthly Budget (USD)</label>
                    <select
                      id="budget"
                      name="budget"
                      required
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-insura-blue focus:border-transparent"
                    >
                      <option value="">Select budget range</option>
                      <option value="below-150">Below $150</option>
                      <option value="150-300">$150 - $300</option>
                      <option value="300-500">$300 - $500</option>
                      <option value="500-800">$500 - $800</option>
                      <option value="above-800">Above $800</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">Medical History (select all that apply)</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {['Diabetes', 'Heart Disease', 'Cancer', 'Asthma', 'High Blood Pressure', 'None'].map((condition) => (
                      <div key={condition} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`medical-${condition}`}
                          name="medicalHistory"
                          value={condition.toLowerCase()}
                          checked={formData.medicalHistory.includes(condition.toLowerCase())}
                          onChange={handleCheckboxChange}
                          className="h-4 w-4 text-insura-blue focus:ring-insura-blue border-gray-300 rounded"
                        />
                        <label htmlFor={`medical-${condition}`} className="ml-2 text-sm text-gray-700">
                          {condition}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">Coverage Preferences (select all that apply)</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      'Hospital Care', 
                      'Prescription Drugs', 
                      'Mental Health', 
                      'Dental', 
                      'Vision', 
                      'Maternity',
                      'Specialist Visits',
                      'Physical Therapy'
                    ].map((coverage) => (
                      <div key={coverage} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`coverage-${coverage}`}
                          name="coverage"
                          value={coverage.toLowerCase()}
                          checked={formData.coverage.includes(coverage.toLowerCase())}
                          onChange={handleCheckboxChange}
                          className="h-4 w-4 text-insura-blue focus:ring-insura-blue border-gray-300 rounded"
                        />
                        <label htmlFor={`coverage-${coverage}`} className="ml-2 text-sm text-gray-700">
                          {coverage}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <ButtonCustom
                    type="submit"
                    fullWidth
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Finding Your Best Plans...
                      </>
                    ) : (
                      <>
                        <Filter className="mr-2 h-5 w-5" />
                        Find My Best Insurance Plans
                      </>
                    )}
                  </ButtonCustom>
                </div>

                <div className="mt-6 bg-insura-blue/5 rounded-lg p-4 border border-insura-blue/10">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-insura-blue flex-shrink-0 mt-0.5 mr-3" />
                    <p className="text-sm text-gray-600">
                      Your privacy matters. We never share your personal information with third parties. This information is only used to provide you with personalized insurance recommendations.
                    </p>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            <div className="animate-fade-in">
              <div className="bg-insura-blue/5 rounded-2xl p-6 mb-8 border border-insura-blue/20">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center">
                    <Shield className="h-6 w-6 text-insura-blue mr-3" />
                    <h3 className="text-xl font-bold text-gray-900">Your Personalized Recommendations</h3>
                  </div>
                  <ButtonCustom
                    variant="outline"
                    size="sm"
                    onClick={resetForm}
                  >
                    Modify Your Details
                  </ButtonCustom>
                </div>
                <p className="mt-3 text-gray-600">
                  Based on your profile as a {formData.age}-year-old {formData.occupation} with a family of {formData.familySize}, 
                  here are your top insurance matches ranked by suitability.
                </p>
              </div>

              <div className="space-y-6">
                {recommendedPlans.map((plan, index) => (
                  <div 
                    key={plan.id} 
                    className={`bg-white rounded-xl shadow-md overflow-hidden border transition-all ${
                      index === 0 ? 'border-insura-blue scale-102 shadow-lg' : 'border-gray-200 hover:shadow-lg hover:-translate-y-1'
                    }`}
                  >
                    <div className="p-6 sm:p-8">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                        <div>
                          {index === 0 && (
                            <div className="inline-block px-3 py-1 rounded-full bg-insura-blue text-white text-xs font-medium mb-2 flex items-center">
                              <Heart className="h-3 w-3 mr-1" />
                              Best Match
                            </div>
                          )}
                          <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                          <p className="text-sm text-gray-500">by {plan.provider}</p>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="bg-insura-blue/10 rounded-lg py-2 px-3 flex items-center">
                            <ThumbsUp className="h-5 w-5 text-insura-blue mr-1" />
                            <span className="font-bold text-insura-blue">{plan.suitabilityScore}% Match</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Monthly Premium</p>
                          <p className="text-xl font-bold text-gray-900">{plan.monthlyPremium}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Coverage Amount</p>
                          <p className="text-xl font-bold text-gray-900">{plan.coverageAmount}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Best For</p>
                          <p className="text-base font-medium text-gray-800">{plan.description}</p>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <p className="text-sm text-gray-500 mb-2">Key Benefits</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                          {plan.benefits.map((benefit, i) => (
                            <div key={i} className="flex items-center">
                              <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-3">
                        <ButtonCustom
                          variant={index === 0 ? "primary" : "outline"}
                          icon={index === 0 ? <Check className="h-4 w-4" /> : undefined}
                          iconPosition="left"
                        >
                          Get More Details
                        </ButtonCustom>
                        
                        <ButtonCustom
                          variant={index === 0 ? "secondary" : "ghost"}
                        >
                          Compare
                        </ButtonCustom>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-10 bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Why These Recommendations?</h3>
                <p className="text-gray-600 mb-4">
                  Our AI analyzes multiple factors to find plans that best match your profile, including:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Your age and family composition</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Medical history and specific coverage needs</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Your budget constraints and value priorities</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Regional factors that affect insurance pricing</span>
                  </li>
                </ul>
                <div className="mt-4">
                  <ButtonCustom
                    variant="primary"
                    size="sm"
                    fullWidth
                    onClick={resetForm}
                  >
                    Start a New Recommendation
                  </ButtonCustom>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default InsuranceRecommender;
