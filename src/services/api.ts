
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

export const analyzePolicyDocument = async (formData: FormData) => {
  try {
    const response = await fetch(`${API_URL}/policy/analyze`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to analyze policy');
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to analyze policy');
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

export const checkClaimProbability = async (claimData: any) => {
  try {
    const response = await fetch(`${API_URL}/claim/check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(claimData),
    });

    if (!response.ok) {
      throw new Error('Failed to check claim');
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to check claim');
    }
    
    return result.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Failed to sign in');
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to sign in');
    }
    
    // Store user data in localStorage for persistence
    localStorage.setItem('user', JSON.stringify(result.data.user));
    localStorage.setItem('token', result.data.token);
    
    return result.data;
  } catch (error) {
    console.error('Authentication Error:', error);
    throw error;
  }
};

export const signOut = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
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
