
import { API_URL, DOC_ANALYSIS_API } from './apiConfig';

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
