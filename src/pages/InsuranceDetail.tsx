import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { RecommendedPlan } from '@/types/insurance';
import { insuranceData } from '@/data/insuranceData';
import InsuranceHeader from '@/components/insurance/InsuranceHeader';
import CoverageOptions from '@/components/insurance/CoverageOptions';
import FAQSection from '@/components/insurance/FAQSection';
import InsuranceForm from '@/components/insurance/InsuranceForm';
import ResultsHeader from '@/components/insurance/ResultsHeader';
import PlanCard from '@/components/insurance/PlanCard';
import WhyRecommendations from '@/components/insurance/WhyRecommendations';
import { fetchInsuranceRecommendations, InsuranceFormData, checkServerHealth } from '@/services/api';
import { toast } from 'sonner';

const InsuranceDetail = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [activeForm, setActiveForm] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [recommendedPlans, setRecommendedPlans] = useState<RecommendedPlan[]>([]);
  const [currency, setCurrency] = useState<'USD' | 'INR'>('INR');
  const [isServerConnected, setIsServerConnected] = useState<boolean>(true);

  const categoryInfo = categoryId ? insuranceData[categoryId] : null;

  useEffect(() => {
    if (categoryId && !insuranceData[categoryId]) {
      window.location.href = '/insurance-categories';
    }
    
    checkServerHealth().then(isHealthy => {
      setIsServerConnected(isHealthy);
      if (!isHealthy) {
        console.warn('Backend server is not available. Falling back to mock data.');
      }
    });
  }, [categoryId]);

  if (!categoryInfo) {
    return null;
  }

  const toggleCurrency = () => {
    setCurrency(prev => prev === 'USD' ? 'INR' : 'USD');
  };

  const handleFormSubmit = async (formData: InsuranceFormData) => {
    setIsLoading(true);
    
    try {
      if (isServerConnected) {
        const plans = await fetchInsuranceRecommendations(categoryId || 'health', formData);
        setRecommendedPlans(plans);
        setShowResults(true);
      } else {
        setTimeout(() => {
          const mockPlans: RecommendedPlan[] = [
            {
              id: '1',
              name: `Premium ${categoryInfo.name} Plan`,
              provider: 'Secure Life Insurance',
              monthlyPremium: '$285',
              monthlyPremiumINR: '₹23,798',
              coverageAmount: '$300,000',
              coverageAmountINR: '₹25,050,000',
              benefits: ['Comprehensive coverage', '24/7 support', 'Fast claims processing', 'No waiting period'],
              suitabilityScore: 95,
              description: `Top-tier ${categoryInfo.name.toLowerCase()} plan with extensive benefits.`
            },
            {
              id: '2',
              name: `Standard ${categoryInfo.name} Plan`,
              provider: 'SafeGuard Insurance',
              monthlyPremium: '$195',
              monthlyPremiumINR: '₹15,595',
              coverageAmount: '$200,000',
              coverageAmountINR: '₹18,110,000',
              benefits: ['Essential coverage', 'Customizable options', 'Family discount available'],
              suitabilityScore: 87,
              description: `Well-balanced ${categoryInfo.name.toLowerCase()} protection for most needs.`
            },
            {
              id: '3',
              name: `Basic ${categoryInfo.name} Plan`,
              provider: 'TrustWorthy Insurance',
              monthlyPremium: '$120',
              monthlyPremiumINR: '₹9,792',
              coverageAmount: '$100,000',
              coverageAmountINR: '₹12,318,000',
              benefits: ['Affordable protection', 'Easy application', 'Quick approval'],
              suitabilityScore: 75,
              description: `Budget-friendly ${categoryInfo.name.toLowerCase()} option without compromising essential protection.`
            },
            {
              id: '4',
              name: `Family ${categoryInfo.name} Shield`,
              provider: 'Family First Insurance',
              monthlyPremium: '$320',
              monthlyPremiumINR: '₹26,088',
              coverageAmount: '$350,000',
              coverageAmountINR: '₹37,614,000',
              benefits: ['Family-wide coverage', 'Child protection included', 'Additional benefits for dependents'],
              suitabilityScore: 83,
              description: `Designed specifically for families needing ${categoryInfo.name.toLowerCase()} protection.`
            }
          ];
  
          setRecommendedPlans(mockPlans);
          setShowResults(true);
        }, 2000);
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      toast.error('Failed to fetch recommendations. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-insura-cyberdark">
      <Navbar />
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <InsuranceHeader 
            categoryInfo={categoryInfo} 
            setActiveForm={setActiveForm} 
          />

          {activeForm && !showResults ? (
            <InsuranceForm
              categoryInfo={categoryInfo}
              isLoading={isLoading}
              handleFormSubmit={handleFormSubmit}
            />
          ) : showResults ? (
            <div className="animate-fade-in">
              <ResultsHeader
                currency={currency}
                toggleCurrency={toggleCurrency}
                setShowResults={setShowResults}
                setActiveForm={setActiveForm}
              />

              <div className="space-y-6">
                {recommendedPlans.map((plan, index) => (
                  <PlanCard
                    key={plan.id}
                    plan={plan}
                    index={index}
                    currency={currency}
                  />
                ))}
              </div>
              
              <WhyRecommendations 
                setShowResults={setShowResults} 
                setActiveForm={setActiveForm} 
              />
            </div>
          ) : (
            <>
              <CoverageOptions 
                categoryInfo={categoryInfo} 
                setActiveForm={setActiveForm} 
              />

              <FAQSection 
                categoryInfo={categoryInfo} 
                setActiveForm={setActiveForm} 
              />
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default InsuranceDetail;
