
import { RecommendedPlan } from '@/types/insurance';
import { API_URL, RECOMMENDATION_MODEL_API } from './apiConfig';

export interface InsuranceFormData {
  fullName: string;
  email: string;
  age: string;
  zipCode: string;
  features: {
    emergency_services: boolean;
    preventive_care_and_screenings: boolean;
    hospital_stays_and_treatments: boolean;
    prescription_medication: boolean;
    pre_existing_health_conditions: boolean;
  };
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
    
    // Convert params to query parameters for the API
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
    
    // Process the API response
    let recommendations: ModelRecommendationResponse[] = [];
    
    if (Array.isArray(result)) {
      recommendations = result;
    } else if (result && typeof result === 'object') {
      // API might return an object with recommendations array
      if (Array.isArray(result.recommendations)) {
        recommendations = result.recommendations;
      } else {
        // Or it might return a single recommendation object
        recommendations = [result as ModelRecommendationResponse];
      }
    }
    
    console.log('Processed recommendations:', recommendations);
    
    // If we got empty recommendations, use defaults
    if (recommendations.length === 0) {
      console.warn('Empty recommendations received, using fallback data');
      recommendations = getDefaultRecommendations(params);
    }
    
    return recommendations;
  } catch (error) {
    console.error('Recommendation Model API Error:', error);
    // Return default recommendations in case of error
    return getDefaultRecommendations(params);
  }
};

function getDefaultRecommendations(params: RecommendationModelParams): ModelRecommendationResponse[] {
  const budget = params.Budget_in_INR;
  
  // Adjust plans based on budget
  const budgetFactor = Math.max(0.5, Math.min(2, budget / 10000)); // Scale factor based on budget
  
  return [
    {
      Plan_Name: 'Premium Health Care',
      Insurance_Provider: 'CareShield',
      Monthly_Premium: Math.round(budget * 0.8), // 80% of budget
      Coverage_Amount: Math.round(budget * 100),
      Coverage_Details: 'Comprehensive coverage including specialized treatments',
      Additional_Benefits: 'International coverage, annual health checkups',
      Network_Type: 'Extensive network with premium hospitals',
      Match_Score: 95,
      Plan_Description: 'Top-tier health insurance with extensive coverage'
    },
    {
      Plan_Name: 'Standard Care Plan',
      Insurance_Provider: 'HealthGuard',
      Monthly_Premium: Math.round(budget * 0.6), // 60% of budget
      Coverage_Amount: Math.round(budget * 75),
      Coverage_Details: 'Standard medical coverage',
      Additional_Benefits: 'Limited dental and vision',
      Network_Type: 'Standard network with good hospital coverage',
      Match_Score: 87,
      Plan_Description: 'Well-balanced health plan for most needs'
    },
    {
      Plan_Name: 'Basic Health Protection',
      Insurance_Provider: 'TrustCare',
      Monthly_Premium: Math.round(budget * 0.4), // 40% of budget
      Coverage_Amount: Math.round(budget * 50),
      Coverage_Details: 'Basic healthcare needs',
      Additional_Benefits: 'Preventive care coverage',
      Network_Type: 'Limited hospital network',
      Match_Score: 75,
      Plan_Description: 'Budget-friendly option with essential coverage'
    }
  ];
}

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
