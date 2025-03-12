
import { ReactElement } from 'react';

export interface InsuranceCategory {
  id: string;
  name: string;
  icon: ReactElement;
  description: string;
  longDescription: string;
  coverageOptions: string[];
  commonQuestions: { question: string; answer: string }[];
}

export interface RecommendedPlan {
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
