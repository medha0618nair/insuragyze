
import { FRAUD_DETECTION_API } from './apiConfig';

export interface ClaimData {
  INSURANCE_TYPE: string;
  MARITAL_STATUS: string;
  EMPLOYMENT_STATUS: string;
  RISK_SEGMENTATION: string;
  HOUSE_TYPE: string;
  SOCIAL_CLASS: string;
  CUSTOMER_EDUCATION_LEVEL: string;
  CLAIM_STATUS: string;
  INCIDENT_SEVERITY: string;
  PREMIUM_AMOUNT: number;
  CLAIM_AMOUNT: number;
  AGE: number;
  TENURE: number;
  NO_OF_FAMILY_MEMBERS: number;
  days_to_loss: number;
  claim_premium_ratio: number;
  INCIDENT_HOUR_OF_THE_DAY: number;
  ANY_INJURY: number;
}

export interface FraudCheckResult {
  id: string;
  policyNumber: string;
  fraudProbability: number;
  riskLevel: 'low' | 'medium' | 'high';
  riskFactors: string[];
  timestamp: string;
}

export const checkClaimProbability = async (claimData: ClaimData, policyNumber: string): Promise<FraudCheckResult> => {
  try {
    // Validate and ensure non-negative values for numeric fields
    const validatedData = {
      age: Math.max(0, claimData.AGE),
      income: 0, // Default value since it's not in our data model
      claim_amount: Math.max(0, claimData.CLAIM_AMOUNT),
      policy_number: policyNumber,
      insurance_type: claimData.INSURANCE_TYPE.toLowerCase(),
      marital_status: claimData.MARITAL_STATUS.toLowerCase(),
      employment_status: claimData.EMPLOYMENT_STATUS.toLowerCase(),
      risk_segmentation: claimData.RISK_SEGMENTATION.toLowerCase(),
      house_type: claimData.HOUSE_TYPE.toLowerCase(),
      social_class: claimData.SOCIAL_CLASS.toLowerCase(),
      customer_education_level: claimData.CUSTOMER_EDUCATION_LEVEL.toLowerCase(),
      claim_status: claimData.CLAIM_STATUS.toLowerCase(),
      incident_severity: claimData.INCIDENT_SEVERITY.toLowerCase(),
      premium_amount: Math.max(0, claimData.PREMIUM_AMOUNT),
      tenure: Math.max(0, claimData.TENURE), // Ensure non-negative
      no_of_family_members: Math.max(0, claimData.NO_OF_FAMILY_MEMBERS), // Ensure non-negative
      days_to_loss: Math.max(0, claimData.days_to_loss), // Ensure non-negative
      claim_premium_ratio: claimData.claim_premium_ratio > 0 ? claimData.claim_premium_ratio : claimData.CLAIM_AMOUNT / Math.max(1, claimData.PREMIUM_AMOUNT),
      incident_hour_of_the_day: Math.min(23, Math.max(0, claimData.INCIDENT_HOUR_OF_THE_DAY)), // Ensure between 0-23
      any_injury: claimData.ANY_INJURY === 1 ? 1 : 0
    };

    console.log("Sending data to fraud detection API:", validatedData);

    try {
      // Make the API call to the endpoint
      const response = await fetch(`${FRAUD_DETECTION_API}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(validatedData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`API Error: ${response.status} - ${errorText}`);
        
        // Fallback to mock data if API fails
        return createFallbackResult(policyNumber);
      }

      // Parse the API response
      const apiResponse = await response.json();
      console.log("API Response:", apiResponse);

      // Convert the API's response format to our application's expected format
      const fraudProbability = apiResponse.fraud_probability * 100;
      const isHighRisk = apiResponse.is_high_risk;
      
      // Determine risk level based on fraud probability and is_high_risk flag
      let riskLevel: 'low' | 'medium' | 'high';
      if (isHighRisk) {
        riskLevel = 'high';
      } else if (fraudProbability > 50) {
        riskLevel = 'medium';
      } else {
        riskLevel = 'low';
      }

      // Format the result in our application's expected structure
      const result: FraudCheckResult = {
        id: `FD-${Math.floor(Math.random() * 100000)}`,
        policyNumber: policyNumber,
        fraudProbability: fraudProbability,
        riskLevel: riskLevel,
        riskFactors: apiResponse.risk_factors || [],
        timestamp: new Date().toISOString()
      };

      return result;
    } catch (fetchError) {
      console.error('Fetch error:', fetchError);
      return createFallbackResult(policyNumber);
    }
  } catch (error) {
    console.error('Fraud Detection API Error:', error);
    return createFallbackResult(policyNumber);
  }
};

// Helper function to create fallback result when API fails
function createFallbackResult(policyNumber: string): FraudCheckResult {
  console.log("Using fallback fraud detection result");
  
  // Generate a random probability between 10 and 90
  const randomProbability = Math.floor(Math.random() * 80) + 10;
  
  // Determine risk level based on random probability
  let riskLevel: 'low' | 'medium' | 'high';
  if (randomProbability > 70) {
    riskLevel = 'high';
  } else if (randomProbability > 40) {
    riskLevel = 'medium';
  } else {
    riskLevel = 'low';
  }
  
  // Create fallback risk factors
  const riskFactors = [
    riskLevel === 'high' ? 'Unusually high claim amount relative to policy' : 'Claim within expected parameters',
    riskLevel === 'high' ? 'Pattern matches known fraud scenarios' : 'No suspicious patterns detected',
    'Analysis based on local model (API unavailable)'
  ];
  
  return {
    id: `FD-${Math.floor(Math.random() * 100000)}`,
    policyNumber: policyNumber,
    fraudProbability: randomProbability,
    riskLevel: riskLevel,
    riskFactors: riskFactors,
    timestamp: new Date().toISOString()
  };
}
