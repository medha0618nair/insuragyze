
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ButtonCustom } from '@/components/ui/button-custom';
import { Heart, Home, Car, Globe, Briefcase, Shield, User, Check, ArrowRight, RefreshCw } from 'lucide-react';

interface InsuranceCategory {
  id: string;
  name: string;
  icon: JSX.Element;
  description: string;
  longDescription: string;
  coverageOptions: string[];
  commonQuestions: { question: string; answer: string }[];
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

const InsuranceDetail = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [activeForm, setActiveForm] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [recommendedPlans, setRecommendedPlans] = useState<RecommendedPlan[]>([]);
  const [currency, setCurrency] = useState<'USD' | 'INR'>('USD');
  const [exchangeRate] = useState<number>(83.5); // 1 USD = 83.5 INR (approximate)

  const insuranceData: Record<string, InsuranceCategory> = {
    health: {
      id: 'health',
      name: 'Health Insurance',
      icon: <Heart className="w-12 h-12 text-red-400" />,
      description: 'Coverage for medical expenses, doctor visits, hospital stays, and medications.',
      longDescription: 'Health insurance provides financial coverage for medical expenses, including doctor visits, hospital stays, surgeries, and prescription medications. It helps protect you from high healthcare costs and ensures access to necessary medical care.',
      coverageOptions: [
        'Doctor visits and consultations',
        'Hospital stays and treatments',
        'Emergency services',
        'Prescription medications',
        'Preventive care and screenings',
        'Mental health services',
        'Maternity and newborn care',
        'Chronic disease management'
      ],
      commonQuestions: [
        {
          question: 'What does health insurance typically cover?',
          answer: 'Health insurance typically covers doctor visits, hospital stays, emergency services, prescription drugs, preventive care, and sometimes dental and vision care depending on the plan.'
        },
        {
          question: 'How do I choose the right health insurance plan?',
          answer: 'Consider your health needs, budget, preferred doctors, prescription medications, and whether you need additional coverage for dental or vision care.'
        },
        {
          question: 'What is the difference between HMO and PPO plans?',
          answer: 'HMO plans require you to choose a primary care physician and get referrals for specialists, while PPO plans offer more flexibility to see specialists without referrals but often at a higher cost.'
        }
      ]
    },
    life: {
      id: 'life',
      name: 'Life Insurance',
      icon: <User className="w-12 h-12 text-blue-400" />,
      description: 'Financial protection for your loved ones in case of your death.',
      longDescription: 'Life insurance provides financial protection to your beneficiaries in the event of your death. It can help cover funeral expenses, pay off debts, replace lost income, and ensure your loved ones maintain their standard of living.',
      coverageOptions: [
        'Death benefit payout',
        'Term life coverage',
        'Whole life coverage',
        'Universal life options',
        'Critical illness riders',
        'Accidental death benefits',
        'Cash value accumulation',
        'Premium waivers for disability'
      ],
      commonQuestions: [
        {
          question: 'What is the difference between term and whole life insurance?',
          answer: 'Term life insurance provides coverage for a specific period (like 10, 20, or 30 years) while whole life insurance provides lifetime coverage and includes a cash value component.'
        },
        {
          question: 'How much life insurance do I need?',
          answer: 'Consider your financial obligations, income replacement needs, mortgage balance, children\'s education costs, and funeral expenses. A common rule of thumb is 10-15 times your annual income.'
        },
        {
          question: 'Can I have multiple life insurance policies?',
          answer: 'Yes, you can have multiple life insurance policies from different companies as long as the total coverage amount is reasonable based on your financial situation and needs.'
        }
      ]
    },
    home: {
      id: 'home',
      name: 'Home Insurance',
      icon: <Home className="w-12 h-12 text-green-400" />,
      description: 'Protection for your house and belongings against damage and theft.',
      longDescription: 'Home insurance protects your home and personal belongings against damage, theft, and other covered perils. It also includes liability coverage if someone is injured on your property.',
      coverageOptions: [
        'Dwelling coverage',
        'Personal property protection',
        'Liability coverage',
        'Additional living expenses',
        'Medical payments',
        'Natural disaster coverage',
        'Theft and vandalism protection',
        'Detached structures coverage'
      ],
      commonQuestions: [
        {
          question: 'What does home insurance typically cover?',
          answer: 'Home insurance typically covers damage to your home and belongings from fire, theft, vandalism, and some natural disasters. It also includes liability coverage and additional living expenses if your home becomes uninhabitable.'
        },
        {
          question: 'Do I need flood insurance if I have home insurance?',
          answer: 'Most standard home insurance policies do not cover flood damage, so you may need separate flood insurance if you live in a flood-prone area.'
        },
        {
          question: 'How is home insurance premium calculated?',
          answer: 'Premiums are calculated based on the replacement cost of your home, location, home age and condition, deductible amount, coverage limits, claims history, and credit score.'
        }
      ]
    },
    auto: {
      id: 'auto',
      name: 'Auto Insurance',
      icon: <Car className="w-12 h-12 text-yellow-400" />,
      description: 'Coverage for accidents, theft, and liability for your vehicles.',
      longDescription: 'Auto insurance provides financial protection against physical damage and bodily injury resulting from traffic accidents, as well as liability that could arise from incidents in your vehicle.',
      coverageOptions: [
        'Liability coverage',
        'Collision coverage',
        'Comprehensive coverage',
        'Personal injury protection',
        'Uninsured motorist coverage',
        'Roadside assistance',
        'Rental car reimbursement',
        'Gap insurance'
      ],
      commonQuestions: [
        {
          question: 'What are the different types of auto insurance coverage?',
          answer: 'Common types include liability (for damage you cause to others), collision (for your vehicle regardless of fault), comprehensive (for non-collision incidents like theft), personal injury protection, uninsured motorist coverage, and gap insurance.'
        },
        {
          question: 'How are auto insurance rates determined?',
          answer: 'Rates are based on driving record, age, gender, credit score, vehicle type, location, annual mileage, coverage limits, deductibles, and claims history.'
        },
        {
          question: 'Does auto insurance cover other drivers of my car?',
          answer: 'Generally, your auto insurance covers permitted drivers using your vehicle occasionally. However, regular drivers should be listed on your policy.'
        }
      ]
    },
    travel: {
      id: 'travel',
      name: 'Travel Insurance',
      icon: <Globe className="w-12 h-12 text-purple-400" />,
      description: 'Protection against travel-related accidents, cancellations, and medical emergencies.',
      longDescription: 'Travel insurance provides coverage for unexpected events while traveling, such as trip cancellations, medical emergencies, lost luggage, and travel delays.',
      coverageOptions: [
        'Trip cancellation/interruption',
        'Emergency medical coverage',
        'Emergency evacuation',
        'Lost/delayed baggage',
        'Travel delay compensation',
        'Rental car damage',
        '24/7 worldwide assistance',
        'Adventure sports coverage'
      ],
      commonQuestions: [
        {
          question: 'What does travel insurance typically cover?',
          answer: 'Travel insurance typically covers trip cancellation/interruption, emergency medical expenses, evacuation, lost luggage, travel delays, and sometimes rental car damage.'
        },
        {
          question: 'Do I need travel insurance if I already have health insurance?',
          answer: 'Many health insurance plans offer limited or no coverage outside your home country, so travel insurance can provide essential medical coverage while abroad.'
        },
        {
          question: 'When should I purchase travel insurance?',
          answer: 'It\'s best to purchase travel insurance shortly after making your initial trip deposit to maximize coverage for pre-trip cancellations.'
        }
      ]
    },
    business: {
      id: 'business',
      name: 'Business Insurance',
      icon: <Briefcase className="w-12 h-12 text-orange-400" />,
      description: 'Comprehensive coverage to protect your business assets and operations.',
      longDescription: 'Business insurance helps protect your company from financial losses due to property damage, liability claims, business interruption, and other covered risks.',
      coverageOptions: [
        'General liability',
        'Property insurance',
        'Professional liability/E&O',
        'Workers\' compensation',
        'Business interruption',
        'Cyber liability',
        'Commercial auto',
        'Directors and officers liability'
      ],
      commonQuestions: [
        {
          question: 'What types of business insurance do I need?',
          answer: 'Common types include general liability, property insurance, professional liability, workers\' compensation, business interruption, cyber liability, commercial auto, and directors and officers liability.'
        },
        {
          question: 'How much does business insurance cost?',
          answer: 'Cost varies based on business type, size, location, number of employees, coverage types and limits, claims history, and industry risk factors.'
        },
        {
          question: 'Is business insurance tax deductible?',
          answer: 'Most business insurance premiums are considered necessary business expenses and are tax-deductible. Consult with a tax professional for specific guidance.'
        }
      ]
    },
    renters: {
      id: 'renters',
      name: 'Renters Insurance',
      icon: <Home className="w-12 h-12 text-teal-400" />,
      description: 'Protection for your personal belongings and liability coverage while renting.',
      longDescription: 'Renters insurance covers your personal belongings against theft, fire, and other covered perils. It also provides liability coverage if someone is injured in your rented home.',
      coverageOptions: [
        'Personal property coverage',
        'Liability protection',
        'Additional living expenses',
        'Medical payments',
        'Theft coverage',
        'Water damage (some causes)',
        'Electronics and valuables',
        'Off-premises coverage'
      ],
      commonQuestions: [
        {
          question: 'Why do I need renters insurance if my landlord has insurance?',
          answer: 'Your landlord\'s insurance only covers the building structure, not your personal belongings or personal liability. Renters insurance protects your possessions and provides liability coverage.'
        },
        {
          question: 'How much does renters insurance cost?',
          answer: 'Renters insurance is relatively affordable, typically ranging from $15-30 per month depending on location, coverage amount, and deductible.'
        },
        {
          question: 'Does renters insurance cover my roommate\'s belongings?',
          answer: 'No, unless they are listed on your policy. Each roommate should have their own renters insurance policy to cover their personal belongings.'
        }
      ]
    },
    disability: {
      id: 'disability',
      name: 'Disability Insurance',
      icon: <Shield className="w-12 h-12 text-indigo-400" />,
      description: 'Financial support if you become disabled and unable to work.',
      longDescription: 'Disability insurance replaces a portion of your income if you become disabled and cannot work. It helps you maintain your standard of living and pay bills while you recover.',
      coverageOptions: [
        'Short-term disability',
        'Long-term disability',
        'Own-occupation coverage',
        'Residual disability benefits',
        'Cost-of-living adjustments',
        'Future increase options',
        'Return-to-work benefits',
        'Rehabilitation coverage'
      ],
      commonQuestions: [
        {
          question: 'What\'s the difference between short-term and long-term disability insurance?',
          answer: 'Short-term disability typically covers 3-6 months after a brief waiting period, while long-term disability begins after short-term ends and can cover you until retirement age.'
        },
        {
          question: 'How much of my income does disability insurance replace?',
          answer: 'Typically, disability insurance replaces 60-80% of your pre-disability income, depending on the policy and insurer.'
        },
        {
          question: 'Is disability insurance worth it if I have savings?',
          answer: 'Even substantial savings can be quickly depleted during a long-term disability. Disability insurance provides ongoing income protection that savings alone may not sustain.'
        }
      ]
    }
  };

  const categoryInfo = categoryId ? insuranceData[categoryId] : null;

  // Redirect if category doesn't exist
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

  const convertToINR = (usdAmount: string): string => {
    // Remove $ symbol and convert to number
    const amount = parseFloat(usdAmount.replace(/[$,]/g, ''));
    if (isNaN(amount)) return usdAmount;
    
    // Convert to INR and format
    const inrAmount = amount * exchangeRate;
    return `₹${inrAmount.toLocaleString('en-IN')}`;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call with a timeout
    setTimeout(() => {
      // Generate mock insurance plans based on selected category
      const mockPlans: RecommendedPlan[] = [
        {
          id: '1',
          name: `Premium ${categoryInfo.name} Plan`,
          provider: 'Secure Life Insurance',
          monthlyPremium: '$285',
          monthlyPremiumINR: convertToINR('$285'),
          coverageAmount: '$300,000',
          coverageAmountINR: convertToINR('$300,000'),
          benefits: ['Comprehensive coverage', '24/7 support', 'Fast claims processing', 'No waiting period'],
          suitabilityScore: 95,
          description: `Top-tier ${categoryInfo.name.toLowerCase()} plan with extensive benefits.`
        },
        {
          id: '2',
          name: `Standard ${categoryInfo.name} Plan`,
          provider: 'SafeGuard Insurance',
          monthlyPremium: '$195',
          monthlyPremiumINR: convertToINR('$195'),
          coverageAmount: '$200,000',
          coverageAmountINR: convertToINR('$200,000'),
          benefits: ['Essential coverage', 'Customizable options', 'Family discount available'],
          suitabilityScore: 87,
          description: `Well-balanced ${categoryInfo.name.toLowerCase()} protection for most needs.`
        },
        {
          id: '3',
          name: `Basic ${categoryInfo.name} Plan`,
          provider: 'TrustWorthy Insurance',
          monthlyPremium: '$120',
          monthlyPremiumINR: convertToINR('$120'),
          coverageAmount: '$100,000',
          coverageAmountINR: convertToINR('$100,000'),
          benefits: ['Affordable protection', 'Easy application', 'Quick approval'],
          suitabilityScore: 75,
          description: `Budget-friendly ${categoryInfo.name.toLowerCase()} option without compromising essential protection.`
        },
        {
          id: '4',
          name: `Family ${categoryInfo.name} Shield`,
          provider: 'Family First Insurance',
          monthlyPremium: '$320',
          monthlyPremiumINR: convertToINR('$320'),
          coverageAmount: '$350,000',
          coverageAmountINR: convertToINR('$350,000'),
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
          {/* Hero Section */}
          <div className="mb-16 text-center">
            <Link to="/insurance-categories" className="inline-flex items-center text-insura-neon mb-4 hover:underline">
              <ArrowRight className="w-4 h-4 mr-1 rotate-180" /> Back to Categories
            </Link>
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-black to-gray-900 flex items-center justify-center border-2 border-insura-neon/30">
                {categoryInfo.icon}
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 insura-gradient-text">
              {categoryInfo.name}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {categoryInfo.longDescription}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <ButtonCustom 
                variant="primary" 
                size="lg"
                className="bg-gradient-to-r from-insura-neon to-insura-purple hover:shadow-lg hover:shadow-insura-purple/20"
                onClick={() => setActiveForm(true)}
              >
                Find {categoryInfo.name} Plans
              </ButtonCustom>
              <ButtonCustom 
                variant="outline" 
                size="lg"
                className="text-insura-neon border-insura-neon hover:bg-insura-neon/10"
              >
                Learn More
              </ButtonCustom>
            </div>
          </div>

          {activeForm && !showResults ? (
            <div className="cyber-card p-8 rounded-2xl max-w-4xl mx-auto mb-16 animate-fade-in">
              <h2 className="text-2xl font-bold mb-6 insura-gradient-text text-center">
                Tell Us About Your Needs
              </h2>
              <p className="text-gray-300 mb-8 text-center">
                Fill out this form to get personalized {categoryInfo.name.toLowerCase()} recommendations tailored just for you.
              </p>
              
              <form className="space-y-6" onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Full Name</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-insura-neon focus:ring-1 focus:ring-insura-neon"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Email Address</label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-insura-neon focus:ring-1 focus:ring-insura-neon"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Age</label>
                    <input 
                      type="number" 
                      className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-insura-neon focus:ring-1 focus:ring-insura-neon"
                      placeholder="Enter your age"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Zip Code</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-insura-neon focus:ring-1 focus:ring-insura-neon"
                      placeholder="Enter your zip code"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">Which features are most important to you?</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {categoryInfo.coverageOptions.slice(0, 6).map((option, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`option-${index}`}
                          className="w-4 h-4 text-insura-neon bg-gray-900 border-gray-700 rounded focus:ring-insura-neon focus:ring-opacity-25"
                        />
                        <label htmlFor={`option-${index}`} className="ml-2 text-sm text-gray-300">
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">Monthly Budget</label>
                  <select className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-insura-neon focus:ring-1 focus:ring-insura-neon" required>
                    <option value="">Select your budget range</option>
                    <option value="budget1">$0 - $50 per month</option>
                    <option value="budget2">$50 - $100 per month</option>
                    <option value="budget3">$100 - $200 per month</option>
                    <option value="budget4">$200 - $300 per month</option>
                    <option value="budget5">$300+ per month</option>
                  </select>
                </div>

                <div className="pt-4">
                  <ButtonCustom
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    className="bg-gradient-to-r from-insura-neon to-insura-purple hover:shadow-lg hover:shadow-insura-purple/20"
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
                    ) : "Get My Personalized Recommendations"}
                  </ButtonCustom>
                </div>
              </form>
            </div>
          ) : showResults ? (
            <div className="animate-fade-in">
              <div className="cyber-card p-6 mb-8 rounded-2xl border border-insura-neon/30">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center">
                    <Shield className="h-6 w-6 text-insura-neon mr-3" />
                    <h3 className="text-xl font-bold text-white">Your Personalized Recommendations</h3>
                  </div>
                  <div className="flex space-x-4">
                    <ButtonCustom
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1 text-insura-neon border-insura-neon"
                      onClick={toggleCurrency}
                    >
                      <RefreshCw className="h-4 w-4" />
                      {currency === 'USD' ? 'Show INR' : 'Show USD'}
                    </ButtonCustom>
                    <ButtonCustom
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setShowResults(false);
                        setActiveForm(true);
                      }}
                    >
                      Modify Your Details
                    </ButtonCustom>
                  </div>
                </div>
                <p className="mt-3 text-gray-300">
                  Based on your profile, here are your top insurance matches ranked by suitability.
                </p>
              </div>

              <div className="space-y-6">
                {recommendedPlans.map((plan, index) => (
                  <div 
                    key={plan.id} 
                    className={`cyber-card rounded-xl overflow-hidden border transition-all ${
                      index === 0 ? 'border-insura-neon/70 shadow-lg shadow-insura-neon/20 scale-[1.02]' : 'border-gray-800 hover:shadow-lg hover:shadow-insura-purple/10 hover:-translate-y-1'
                    }`}
                  >
                    <div className="p-6 sm:p-8">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                        <div>
                          {index === 0 && (
                            <div className="inline-block px-3 py-1 rounded-full bg-insura-neon text-black text-xs font-medium mb-2 flex items-center">
                              <Heart className="h-3 w-3 mr-1" />
                              Best Match
                            </div>
                          )}
                          <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                          <p className="text-sm text-gray-400">by {plan.provider}</p>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="bg-insura-neon/10 rounded-lg py-2 px-3 flex items-center">
                            <ThumbsUp className="h-5 w-5 text-insura-neon mr-1" />
                            <span className="font-bold text-insura-neon">{plan.suitabilityScore}% Match</span>
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
                              <Check className="h-4 w-4 text-insura-neon mr-2 flex-shrink-0" />
                              <span className="text-sm text-gray-300">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-3">
                        <ButtonCustom
                          variant={index === 0 ? "primary" : "outline"}
                          className={index === 0 ? "bg-gradient-to-r from-insura-neon to-insura-purple" : "text-insura-neon border-insura-neon"}
                        >
                          Get More Details
                        </ButtonCustom>
                        
                        <ButtonCustom
                          variant={index === 0 ? "outline" : "ghost"}
                          className={index === 0 ? "text-insura-neon border-insura-neon" : "text-gray-300"}
                        >
                          Compare
                        </ButtonCustom>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-10 bg-black/50 rounded-lg p-6 border border-gray-800">
                <h3 className="text-lg font-medium text-white mb-3">Why These Recommendations?</h3>
                <p className="text-gray-300 mb-4">
                  Our AI analyzes multiple factors to find plans that best match your profile, including:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-insura-neon mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">Your age and family composition</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-insura-neon mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">Medical history and specific coverage needs</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-insura-neon mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">Your budget constraints and value priorities</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-insura-neon mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">Regional factors that affect insurance pricing</span>
                  </li>
                </ul>
                <div className="mt-4">
                  <ButtonCustom
                    variant="primary"
                    size="sm"
                    fullWidth
                    className="bg-gradient-to-r from-insura-neon to-insura-purple"
                    onClick={() => {
                      setShowResults(false);
                      setActiveForm(false);
                    }}
                  >
                    Start a New Recommendation
                  </ButtonCustom>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Coverage Options */}
              <div className="cyber-card p-8 rounded-2xl max-w-4xl mx-auto mb-16">
                <h2 className="text-2xl font-bold mb-6 insura-gradient-text text-center">
                  What {categoryInfo.name} Typically Covers
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categoryInfo.coverageOptions.map((option, index) => (
                    <div key={index} className="flex items-start">
                      <div className="mr-3 mt-1">
                        <Check className="w-5 h-5 text-insura-neon" />
                      </div>
                      <p className="text-gray-300">{option}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex justify-center">
                  <ButtonCustom 
                    variant="primary" 
                    size="lg"
                    className="bg-gradient-to-r from-insura-neon to-insura-purple hover:shadow-lg hover:shadow-insura-purple/20"
                    onClick={() => setActiveForm(true)}
                  >
                    Find {categoryInfo.name} Plans
                  </ButtonCustom>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="cyber-card p-8 rounded-2xl max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 insura-gradient-text text-center">
                  Common Questions About {categoryInfo.name}
                </h2>
                <div className="space-y-6">
                  {categoryInfo.commonQuestions.map((qa, index) => (
                    <div key={index} className="bg-black/60 rounded-lg p-6 border border-gray-800">
                      <h3 className="text-lg font-semibold mb-3 text-white">{qa.question}</h3>
                      <p className="text-gray-300">{qa.answer}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex justify-center">
                  <ButtonCustom 
                    variant="outline" 
                    size="lg"
                    className="text-insura-neon border-insura-neon hover:bg-insura-neon/10"
                    onClick={() => setActiveForm(true)}
                  >
                    Compare {categoryInfo.name} Plans
                  </ButtonCustom>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default InsuranceDetail;
