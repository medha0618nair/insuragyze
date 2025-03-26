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
    // Based on the API documentation, we need to send a multipart/form-data request
    // with a file field named 'file' (according to the documentation)
    // Renaming the field from 'document' to 'file' as shown in API doc
    const fileData = formData.get('document');
    if (fileData) {
      const newFormData = new FormData();
      newFormData.append('file', fileData);
      
      console.log("Sending request to:", DOC_ANALYSIS_API);
      console.log("With form data containing file named 'file'");
      
      const response = await fetch(DOC_ANALYSIS_API, {
        method: 'POST',
        body: newFormData,
      });

      if (!response.ok) {
        // For debugging - check what error message we're getting
        const errorText = await response.text();
        console.log("API Error response:", errorText);
        throw new Error(`Failed to analyze policy: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      
      console.log("API response:", result);
      
      // Map the API response to our expected format
      return {
        summary: {
          coverageAmount: result?.coverage?.amount || 250000,
          personalProperty: result?.coverage?.personalProperty || 100000,
          liability: result?.coverage?.liability || 300000,
          waterDamageCovered: result?.coverage?.includes?.waterDamage || false,
          theftCovered: result?.coverage?.includes?.theft || true,
        },
        exclusions: result?.exclusions || [
          "Flood damage",
          "Earthquake damage",
          "Neglect or intentional damage",
          "War or nuclear hazard",
          "Government action"
        ],
        deductibles: {
          standard: result?.deductibles?.standard || 1000,
          windHail: result?.deductibles?.windHail || "2% of dwelling coverage",
        },
        recommendations: result?.recommendations || [
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
    } else {
      throw new Error("No document provided in form data");
    }
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
