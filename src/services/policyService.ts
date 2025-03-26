
import { API_URL, DOC_ANALYSIS_API } from './apiConfig';

export interface PolicyAnalysisResult {
  policyName?: string;
  policyNumber?: string;
  providerName?: string;
  summary: {
    coverageAmount: number;
    personalProperty: number;
    liability: number;
    waterDamageCovered: boolean;
    theftCovered: boolean;
  };
  exclusions: string[];
  deductibles: {
    standard: number | string;
    windHail: string;
  };
  recommendations: Array<{
    type: 'warning' | 'success' | 'info';
    title: string;
    description: string;
  }>;
}

export const analyzePolicyDocument = async (formData: FormData): Promise<PolicyAnalysisResult> => {
  try {
    const response = await fetch(DOC_ANALYSIS_API, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in policy analysis:', error);
    
    // Re-throw the error to be handled by the component
    throw error;
  }
};
