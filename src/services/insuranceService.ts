
import { RecommendedPlan } from '@/types/insurance';
import { API_URL } from './apiConfig';

export interface InsuranceFormData {
  fullName: string;
  email: string;
  age: string;
  zipCode: string;
  features: string[];
  budget: string;
}

export interface AIRecommendationData {
  age: number;
  income: number;
  coverageType: 'home' | 'auto' | 'rental';
  riskFactors: string[];
}

export const fetchInsuranceRecommendations = async (
  categoryId: string,
  formData: InsuranceFormData
): Promise<RecommendedPlan[]> => {
  try {
    const response = await fetch(`${API_URL}/insurance/recommendations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        categoryId,
        age: formData.age,
        budget: formData.budget,
        zipCode: formData.zipCode,
        features: formData.features,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch recommendations');
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to get recommendations');
    }
    
    return result.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const fetchAIRecommendations = async (data: AIRecommendationData) => {
  try {
    const response = await fetch(`${API_URL}/recommend`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch AI recommendations');
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to get AI recommendations');
    }
    
    return result.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const optimizeCoverage = async (coverageData: any) => {
  try {
    const response = await fetch(`${API_URL}/coverage/optimize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(coverageData),
    });

    if (!response.ok) {
      throw new Error('Failed to optimize coverage');
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to optimize coverage');
    }
    
    return result.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
