
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { RecommendedPlan } from '@/types/insurance';
import { insuranceData } from '@/data/insuranceData';
import { convertToINR } from '@/utils/currencyUtils';
import InsuranceHeader from '@/components/insurance/InsuranceHeader';
import CoverageOptions from '@/components/insurance/CoverageOptions';
import FAQSection from '@/components/insurance/FAQSection';
import InsuranceForm from '@/components/insurance/InsuranceForm';
import ResultsHeader from '@/components/insurance/ResultsHeader';
import PlanCard from '@/components/insurance/PlanCard';
import WhyRecommendations from '@/components/insurance/WhyRecommendations';

const InsuranceDetail = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [activeForm, setActiveForm] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [recommendedPlans, setRecommendedPlans] = useState<RecommendedPlan[]>([]);
  const [currency, setCurrency] = useState<'USD' | 'INR'>('USD');
  const [exchangeRate] = useState<number>(83.5); // 1 USD = 83.5 INR (approximate)

  const categoryInfo = categoryId ? insuranceData[categoryId] : null;

  useEffect(() => {
    if (categoryId && !insuranceData[categoryId]) {
      window.location.href = '/insurance-categories';
    }
  }, [categoryId]);

  if (!categoryInfo) {
    return null;
  }

  const toggleCurrency = () => {
    setCurrency(prev => prev === 'USD' ? 'INR' : 'USD');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      const mockPlans: RecommendedPlan[] = [
        {
          id: '1',
          name: `Premium ${categoryInfo.name} Plan`,
          provider: 'Secure Life Insurance',
          monthlyPremium: '$285',
          monthlyPremiumINR: convertToINR('$285', exchangeRate),
          coverageAmount: '$300,000',
          coverageAmountINR: convertToINR('$300,000', exchangeRate),
          benefits: ['Comprehensive coverage', '24/7 support', 'Fast claims processing', 'No waiting period'],
          suitabilityScore: 95,
          description: `Top-tier ${categoryInfo.name.toLowerCase()} plan with extensive benefits.`
        },
        {
          id: '2',
          name: `Standard ${categoryInfo.name} Plan`,
          provider: 'SafeGuard Insurance',
          monthlyPremium: '$195',
          monthlyPremiumINR: convertToINR('$195', exchangeRate),
          coverageAmount: '$200,000',
          coverageAmountINR: convertToINR('$200,000', exchangeRate),
          benefits: ['Essential coverage', 'Customizable options', 'Family discount available'],
          suitabilityScore: 87,
          description: `Well-balanced ${categoryInfo.name.toLowerCase()} protection for most needs.`
        },
        {
          id: '3',
          name: `Basic ${categoryInfo.name} Plan`,
          provider: 'TrustWorthy Insurance',
          monthlyPremium: '$120',
          monthlyPremiumINR: convertToINR('$120', exchangeRate),
          coverageAmount: '$100,000',
          coverageAmountINR: convertToINR('$100,000', exchangeRate),
          benefits: ['Affordable protection', 'Easy application', 'Quick approval'],
          suitabilityScore: 75,
          description: `Budget-friendly ${categoryInfo.name.toLowerCase()} option without compromising essential protection.`
        },
        {
          id: '4',
          name: `Family ${categoryInfo.name} Shield`,
          provider: 'Family First Insurance',
          monthlyPremium: '$320',
          monthlyPremiumINR: convertToINR('$320', exchangeRate),
          coverageAmount: '$350,000',
          coverageAmountINR: convertToINR('$350,000', exchangeRate),
          benefits: ['Family-wide coverage', 'Child protection included', 'Additional benefits for dependents'],
          suitabilityScore: 83,
          description: `Designed specifically for families needing ${categoryInfo.name.toLowerCase()} protection.`
        }
      ];

      setRecommendedPlans(mockPlans);
      setIsLoading(false);
      setShowResults(true);
    }, 2000);
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
