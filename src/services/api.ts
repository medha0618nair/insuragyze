
import { RecommendedPlan } from '@/types/insurance';

const API_URL = 'http://localhost:3001/api';

export interface InsuranceFormData {
  fullName: string;
  email: string;
  age: string;
  zipCode: string;
  features: string[];
  budget: string;
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

export const checkServerHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/health`);
    return response.ok;
  } catch (error) {
    console.error('Server health check failed:', error);
    return false;
  }
};
