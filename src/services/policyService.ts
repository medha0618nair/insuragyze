
import { apiClient } from './apiConfig';

export interface PolicyAnalysisResult {
  simplifiedExplanation: string;
  keyPoints?: string[];
  covered?: string[];
  notCovered?: string[];
  potentialIssues?: string[];
  coverageScore?: number;
  overallRiskScore?: number;
  coverageAdequacy?: string;
  riskScore?: {
    coverageScore?: number;
    clarityScore?: number;
    exclusionRisk?: number;
    premiumValue?: number;
  };
  coverage?: {
    medical?: number;
    property?: number;
    liability?: number;
    personal?: number;
  };
}

export const analyzePolicyDocument = async (formData: FormData): Promise<PolicyAnalysisResult> => {
  try {
    console.log('Sending document for analysis...');
    const response = await apiClient.post('/policy/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    console.log('Analysis response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error analyzing policy document:', error);
    throw error;
  }
};
