import React, { useState } from 'react';
import { ButtonCustom } from './ui/button-custom';
import { 
  Check, 
  AlertCircle, 
  Heart, 
  Shield, 
  ThumbsUp, 
  Filter,
  TrendingUp,
  Info,
  Star
} from 'lucide-react';
import { toast } from 'sonner';
import RecommendationResults from './insurance/RecommendationResultsComponent';
import { 
  fetchRecommendationModel, 
  RecommendationModelParams, 
  ModelRecommendationResponse 
} from '@/services/insuranceService';
import { RecommendedPlan } from '@/types/insurance';
import { convertToINR } from '@/utils/currencyUtils';

interface FormData {
  fullName: string;
  age: string;
  email: string;
  zipCode: string;
  budget: string;
  emergencyServices: boolean;
  preventiveCare: boolean;
  hospitalStays: boolean;
  prescriptionMedication: boolean;
  smokingStatus: string;
  preExistingConditions: boolean;
}

interface RecommendedPlan {
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

const InsuranceRecommender = () => {
  const [step, setStep] = useState<'form' | 'results'>('form');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    age: '',
    email: '',
    zipCode: '',
    budget: '',
    emergencyServices: false,
    preventiveCare: false,
    hospitalStays: false,
    prescriptionMedication: false,
    smokingStatus: 'Non-Smoker',
    preExistingConditions: false
  });
  const [recommendedPlans, setRecommendedPlans] = useState<RecommendedPlan[]>([]);
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [currency, setCurrency] = useState<'USD' | 'INR'>('USD');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const convertApiResponseToRecommendedPlans = (apiResponse: ModelRecommendationResponse[]): RecommendedPlan[] => {
    if (!apiResponse || !Array.isArray(apiResponse) || apiResponse.length === 0) {
      toast.warning("Using fallback data due to empty API response");
      return getDefaultRecommendedPlans();
    }
    
    return apiResponse.map((plan, index) => {
      const benefits = [];
      if (plan.Coverage_Details) benefits.push(plan.Coverage_Details);
      if (plan.Additional_Benefits) benefits.push(plan.Additional_Benefits);
      if (plan.Network_Type) benefits.push(plan.Network_Type);
      
      if (benefits.length < 3) {
        const defaultBenefits = [
          'Comprehensive coverage',
          'Standard network access',
          'Basic preventive care'
        ];
        
        for (let i = benefits.length; i < 3; i++) {
          benefits.push(defaultBenefits[i]);
        }
      }
      
      // Get the dollar amount as a number for conversion
      const monthlyPremium = plan.Monthly_Premium || (95 - index * 7);
      const coverageAmount = plan.Coverage_Amount || 1000000 - (index * 200000);
      
      // Format amounts correctly with currency symbols
      const formattedMonthlyPremium = `$${monthlyPremium.toFixed(2)}`;
      const formattedCoverageAmount = `$${coverageAmount.toLocaleString()}`;
      
      // Create INR versions with currency conversion
      const monthlyPremiumINR = `₹${convertToINR(monthlyPremium).toLocaleString()}`;
      const coverageAmountINR = `₹${convertToINR(coverageAmount).toLocaleString()}`;
      
      return {
        id: `plan-${index + 1}`,
        name: plan.Plan_Name || `Health Plan ${index + 1}`,
        provider: plan.Insurance_Provider || 'Insurance Provider',
        monthlyPremium: formattedMonthlyPremium,
        monthlyPremiumINR: monthlyPremiumINR,
        coverageAmount: formattedCoverageAmount,
        coverageAmountINR: coverageAmountINR,
        benefits: benefits,
        suitabilityScore: plan.Match_Score || (95 - index * 7),
        description: plan.Plan_Description || 'A comprehensive health insurance plan.'
      };
    });
  };

  const getDefaultRecommendedPlans = (): RecommendedPlan[] => {
    return [
      {
        id: '1',
        name: 'Premium Health Plus',
        provider: 'BlueCross Insurance',
        monthlyPremium: '$285',
        monthlyPremiumINR: '₹23,700',
        coverageAmount: '$1,000,000',
        coverageAmountINR: '₹83,000,000',
        benefits: ['Comprehensive hospital coverage', 'Mental health support', 'Preventive care', 'Prescription drugs', 'Specialist visits'],
        suitabilityScore: 95,
        description: 'Ideal for professionals with high income seeking comprehensive coverage.'
      },
      {
        id: '2',
        name: 'Family Shield Plan',
        provider: 'Harmony Health',
        monthlyPremium: '$340',
        monthlyPremiumINR: '₹28,220',
        coverageAmount: '$800,000',
        coverageAmountINR: '₹66,400,000',
        benefits: ['Family doctor visits', 'Maternity care', 'Child wellness', 'Emergency services', 'Dental basics'],
        suitabilityScore: 88,
        description: 'Perfect for families with children, including special coverage for maternity and pediatric care.'
      },
      {
        id: '3',
        name: 'Essential Coverage',
        provider: 'UniHealth',
        monthlyPremium: '$195',
        monthlyPremiumINR: '₹16,185',
        coverageAmount: '$500,000',
        coverageAmountINR: '₹41,500,000',
        benefits: ['Hospital care', 'Emergency services', 'Basic diagnostic tests', 'Limited specialist visits'],
        suitabilityScore: 75,
        description: 'Budget-friendly option that covers essential health needs without premium features.'
      },
    ];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const modelParams: RecommendationModelParams = {
        Full_Name: formData.fullName,
        Age: parseInt(formData.age, 10),
        Budget_in_INR: parseInt(formData.budget, 10),
        Zip_Code: formData.zipCode,
        Email: formData.email,
        Emergency_Services: formData.emergencyServices,
        Preventive_Care_and_Screenings: formData.preventiveCare,
        Hospital_Stays_and_Treatments: formData.hospitalStays,
        Prescription_Medication: formData.prescriptionMedication,
        Smoking_Status: formData.smokingStatus,
        Pre_existing_Health_Conditions: formData.preExistingConditions
      };
      
      console.log('Submitting model parameters:', modelParams);
      
      const response = await fetchRecommendationModel(modelParams);
      console.log('API response:', response);
      setApiResponse(response);
      
      const transformedPlans = convertApiResponseToRecommendedPlans(response);
      setRecommendedPlans(transformedPlans);
      setStep('results');
      
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      toast.error('Failed to fetch recommendations. Using default recommendations.');
      
      const mockRecommendations = getDefaultRecommendedPlans();
      setRecommendedPlans(mockRecommendations);
      setStep('results');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setStep('form');
    setRecommendedPlans([]);
    setApiResponse(null);
  };

  const toggleCurrency = () => {
    setCurrency(prev => prev === 'USD' ? 'INR' : 'USD');
  };

  return (
    <section id="insurance-recommender" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-slate-900">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-insura-blue/20 to-insura-neon/20 text-insura-neon font-medium text-sm mb-4 border border-insura-neon/30">
              AI Recommendation Engine
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Find Your Perfect Insurance Plan
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Answer a few questions about yourself and let our AI find the best insurance plans tailored just for you.
            </p>
          </div>

          {step === 'form' ? (
            <div className="glass-card rounded-2xl p-8 md:p-10 border border-gray-800">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-insura-blue focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-insura-blue focus:border-transparent"
                    />
                  </div>

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
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      required
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-insura-blue focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">Budget (in INR)</label>
                    <input
                      type="number"
                      id="budget"
                      name="budget"
                      required
                      min="1000"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-insura-blue focus:border-transparent"
                      placeholder="Enter budget in INR"
                    />
                  </div>

                  <div>
                    <label htmlFor="smokingStatus" className="block text-sm font-medium text-gray-700 mb-1">Smoking Status</label>
                    <select
                      id="smokingStatus"
                      name="smokingStatus"
                      required
                      value={formData.smokingStatus}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-insura-blue focus:border-transparent"
                    >
                      <option value="Non-Smoker">Non-Smoker</option>
                      <option value="Smoker">Smoker</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">Health Preferences</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="emergencyServices"
                        name="emergencyServices"
                        checked={formData.emergencyServices}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 text-insura-blue focus:ring-insura-blue border-gray-300 rounded"
                      />
                      <label htmlFor="emergencyServices" className="ml-2 text-sm text-gray-700">
                        Emergency Services
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="preventiveCare"
                        name="preventiveCare"
                        checked={formData.preventiveCare}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 text-insura-blue focus:ring-insura-blue border-gray-300 rounded"
                      />
                      <label htmlFor="preventiveCare" className="ml-2 text-sm text-gray-700">
                        Preventive Care and Screenings
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="hospitalStays"
                        name="hospitalStays"
                        checked={formData.hospitalStays}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 text-insura-blue focus:ring-insura-blue border-gray-300 rounded"
                      />
                      <label htmlFor="hospitalStays" className="ml-2 text-sm text-gray-700">
                        Hospital Stays and Treatments
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="prescriptionMedication"
                        name="prescriptionMedication"
                        checked={formData.prescriptionMedication}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 text-insura-blue focus:ring-insura-blue border-gray-300 rounded"
                      />
                      <label htmlFor="prescriptionMedication" className="ml-2 text-sm text-gray-700">
                        Prescription Medication
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="preExistingConditions"
                        name="preExistingConditions"
                        checked={formData.preExistingConditions}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 text-insura-blue focus:ring-insura-blue border-gray-300 rounded"
                      />
                      <label htmlFor="preExistingConditions" className="ml-2 text-sm text-gray-700">
                        Pre-existing Health Conditions
                      </label>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <ButtonCustom
                    type="submit"
                    fullWidth
                    size="lg"
                    disabled={isLoading}
                    className="bg-gradient-to-r from-insura-blue to-insura-neon"
                  >
                    {isLoading ? (
                      <>
                        <div className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin mr-3"></div>
                        Finding Your Best Plans...
                      </>
                    ) : (
                      <>
                        <TrendingUp className="mr-2 h-5 w-5" />
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
            <RecommendationResults 
              recommendedPlans={recommendedPlans}
              formData={{ age: formData.age, smokingStatus: formData.smokingStatus }}
              currency={currency} 
              onResetForm={resetForm}
              onToggleCurrency={toggleCurrency}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default InsuranceRecommender;
