import { RecommendedPlan } from '@/types/insurance';

// Use environment variable or default to localhost for development
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
const DOC_ANALYSIS_API = 'https://doc-analyser.onrender.com/process_brochure'; // Updated to the correct endpoint path

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

export interface UserCredentials {
  email: string;
  password: string;
}

export interface SignUpData extends UserCredentials {
  name: string;
}

export interface PolicyAnalysisResult {
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
  recommendations: {
    type: 'warning' | 'success' | 'info';
    title: string;
    description: string;
  }[];
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

export const analyzePolicyDocument = async (formData: FormData): Promise<PolicyAnalysisResult> => {
  try {
    // Adding proper content type headers and using the correct endpoint
    const response = await fetch(DOC_ANALYSIS_API, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      body: formData,
    });

    if (!response.ok) {
      // For debugging - check what error message we're getting
      const errorText = await response.text();
      console.log("API Error response:", errorText);
      throw new Error(`Failed to analyze policy: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to analyze policy');
    }
    
    // Map the API response to our expected format
    return {
      summary: {
        coverageAmount: result.data?.coverage?.amount || 250000,
        personalProperty: result.data?.coverage?.personalProperty || 100000,
        liability: result.data?.coverage?.liability || 300000,
        waterDamageCovered: result.data?.coverage?.includes?.waterDamage || false,
        theftCovered: result.data?.coverage?.includes?.theft || true,
      },
      exclusions: result.data?.exclusions || [
        "Flood damage",
        "Earthquake damage",
        "Neglect or intentional damage",
        "War or nuclear hazard",
        "Government action"
      ],
      deductibles: {
        standard: result.data?.deductibles?.standard || 1000,
        windHail: result.data?.deductibles?.windHail || "2% of dwelling coverage",
      },
      recommendations: result.data?.recommendations || [
        {
          type: "warning",
          title: "Increase Liability Coverage",
          description: "Your current liability coverage may be inadequate for your assets. Consider increasing to at least $500,000."
        },
        {
          type: "success",
          title: "Good Theft Coverage",
          description: "Your policy includes comprehensive theft coverage which is appropriate for your area."
        },
        {
          type: "info",
          title: "Consider Flood Insurance",
          description: "Your policy doesn't cover flood damage. Consider adding a separate flood insurance policy."
        }
      ]
    };
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const uploadPolicyDocument = async (formData: FormData) => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('Authentication required');
    }
    
    const response = await fetch(`${API_URL}/policy/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload policy');
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to upload policy');
    }
    
    return result.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const getUserPolicies = async () => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('Authentication required');
    }
    
    const response = await fetch(`${API_URL}/user/policies`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user policies');
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch user policies');
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
    
    localStorage.setItem('user', JSON.stringify(result.data.user));
    localStorage.setItem('token', result.data.token);
    
    return result.data;
  } catch (error) {
    console.error('Authentication Error:', error);
    throw error;
  }
};

export const signUp = async (data: SignUpData) => {
  try {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to sign up');
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to sign up');
    }
    
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
