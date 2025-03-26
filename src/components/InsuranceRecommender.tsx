
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
import { fetchRecommendationModel, RecommendationModelParams } from '@/services/insuranceService';

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
  coverageAmount: string;
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Prepare params for the recommendation model API
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
      
      // Call the API
      const response = await fetchRecommendationModel(modelParams);
      console.log('API response:', response);
      setApiResponse(response);
      
      // Transform the API response into our application's format
      let transformedPlans: RecommendedPlan[] = [];
      
      if (response && Array.isArray(response)) {
        transformedPlans = response.map((plan: any, index: number) => ({
          id: `plan-${index + 1}`,
          name: plan.Plan_Name || `Health Plan ${index + 1}`,
          provider: plan.Insurance_Provider || 'Insurance Provider',
          monthlyPremium: `$${plan.Monthly_Premium || '0'}`,
          coverageAmount: `$${plan.Coverage_Amount || '0'}`,
          benefits: [
            plan.Coverage_Details || 'Comprehensive coverage',
            plan.Additional_Benefits || 'Standard benefits',
            plan.Network_Type || 'Standard network'
          ].filter(Boolean),
          suitabilityScore: plan.Match_Score || (95 - index * 7),
          description: plan.Plan_Description || 'A comprehensive health insurance plan.'
        }));
      } else {
        // Fallback to mock data if API doesn't return expected format
        toast.warning("Using sample data due to API format issues");
        transformedPlans = [
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
      }

      setRecommendedPlans(transformedPlans);
      setStep('results');
      
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      toast.error('Failed to fetch recommendations. Please try again.');
      
      // Use mock data as fallback
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
                  Based on your profile as a {formData.age}-year-old {formData.smokingStatus.toLowerCase()}, 
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
                    <span className="text-gray-700">Your age and health preferences</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Smoking status and pre-existing conditions</span>
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
