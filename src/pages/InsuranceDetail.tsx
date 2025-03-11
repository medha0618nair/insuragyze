
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ButtonCustom } from '@/components/ui/button-custom';
import { Heart, Home, Car, Globe, Briefcase, Shield, User, Check, ArrowRight } from 'lucide-react';

interface InsuranceCategory {
  id: string;
  name: string;
  icon: JSX.Element;
  description: string;
  longDescription: string;
  coverageOptions: string[];
  commonQuestions: { question: string; answer: string }[];
}

const InsuranceDetail = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [activeForm, setActiveForm] = useState<boolean>(false);

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-insura-cyberdark to-black">
      <Navbar />
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          {/* Hero Section */}
          <div className="mb-16 text-center">
            <Link to="/insurance-categories" className="inline-flex items-center text-insura-neon mb-4 hover:underline">
              <ArrowRight className="w-4 h-4 mr-1 rotate-180" /> Back to Categories
            </Link>
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-insura-cyberdark to-gray-800 flex items-center justify-center border-2 border-insura-neon/30">
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

          {activeForm ? (
            <div className="cyber-card p-8 rounded-2xl max-w-4xl mx-auto mb-16 animate-fade-in">
              <h2 className="text-2xl font-bold mb-6 insura-gradient-text text-center">
                Tell Us About Your Needs
              </h2>
              <p className="text-gray-300 mb-8 text-center">
                Fill out this form to get personalized {categoryInfo.name.toLowerCase()} recommendations tailored just for you.
              </p>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Full Name</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-insura-neon focus:ring-1 focus:ring-insura-neon"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Email Address</label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-insura-neon focus:ring-1 focus:ring-insura-neon"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Age</label>
                    <input 
                      type="number" 
                      className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-insura-neon focus:ring-1 focus:ring-insura-neon"
                      placeholder="Enter your age"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Zip Code</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-insura-neon focus:ring-1 focus:ring-insura-neon"
                      placeholder="Enter your zip code"
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
                          className="w-4 h-4 text-insura-neon bg-gray-800 border-gray-700 rounded focus:ring-insura-neon focus:ring-opacity-25"
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
                  <select className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-insura-neon focus:ring-1 focus:ring-insura-neon">
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
                    variant="primary"
                    size="lg"
                    fullWidth
                    className="bg-gradient-to-r from-insura-neon to-insura-purple hover:shadow-lg hover:shadow-insura-purple/20"
                  >
                    Get My Personalized Recommendations
                  </ButtonCustom>
                </div>
              </form>
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
                    <div key={index} className="bg-black/30 rounded-lg p-6 border border-gray-800">
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
