
import { RecommendedPlan } from '@/types/insurance';
import { API_URL, RECOMMENDATION_MODEL_API } from './apiConfig';

export interface InsuranceFormData {
  fullName: string;
  email: string;
  age: string;
  zipCode: string;
  features: string[];
  budget: string;
  smokingStatus?: string;
}

export interface AIRecommendationData {
  age: number;
  income: number;
  coverageType: 'home' | 'auto' | 'rental';
  riskFactors: string[];
}

// Define the new recommendation model interface based on provided API docs
export interface RecommendationModelParams {
  Full_Name: string;
  Age: number;
  Budget_in_INR: number;
  Zip_Code: string;
  Email: string;
  Emergency_Services: boolean;
  Preventive_Care_and_Screenings: boolean;
  Hospital_Stays_and_Treatments: boolean;
  Prescription_Medication: boolean;
  Smoking_Status: string;
  Pre_existing_Health_Conditions: boolean;
}

// Interface to represent the model API response
export interface ModelRecommendationResponse {
  Plan_Name: string;
  Insurance_Provider: string;
  Monthly_Premium: number;
  Coverage_Amount: number;
  Coverage_Details?: string;
  Additional_Benefits?: string;
  Network_Type?: string;
  Match_Score: number;
  Plan_Description?: string;
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

export const fetchRecommendationModel = async (params: RecommendationModelParams): Promise<ModelRecommendationResponse[]> => {
  try {
    console.log('Fetching recommendations from model API with params:', params);
    
    // Convert boolean values to strings as required by the API
    const queryParams = new URLSearchParams({
      Full_Name: params.Full_Name,
      Age: params.Age.toString(),
      Budget_in_INR: params.Budget_in_INR.toString(),
      Zip_Code: params.Zip_Code,
      Email: params.Email,
      Emergency_Services: params.Emergency_Services.toString(),
      Preventive_Care_and_Screenings: params.Preventive_Care_and_Screenings.toString(),
      Hospital_Stays_and_Treatments: params.Hospital_Stays_and_Treatments.toString(),
      Prescription_Medication: params.Prescription_Medication.toString(),
      Smoking_Status: params.Smoking_Status,
      Pre_existing_Health_Conditions: params.Pre_existing_Health_Conditions.toString()
    });
    
    const url = `${RECOMMENDATION_MODEL_API}?${queryParams.toString()}`;
    console.log('Request URL:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Model API error response:', errorText);
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log('Recommendation model API response:', result);
    
    // Ensure the result is processed correctly
    if (Array.isArray(result)) {
      return result as ModelRecommendationResponse[];
    } else if (result && typeof result === 'object') {
      // In case the API returns a wrapper object
      return Array.isArray(result.recommendations) ? result.recommendations : [result];
    }
    
    // Return empty array if the response format is unexpected
    console.warn('Unexpected response format:', result);
    return [];
  } catch (error) {
    console.error('Recommendation Model API Error:', error);
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
