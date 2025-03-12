
import { Heart, Home, Car, Globe, Briefcase, Shield, User } from 'lucide-react';
import { InsuranceCategory } from '@/types/insurance';

export const insuranceData: Record<string, InsuranceCategory> = {
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
