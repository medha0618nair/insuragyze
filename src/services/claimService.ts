
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
    // Format data according to the new API's expected structure
    const apiRequestData = {
      age: claimData.AGE,
      income: 0, // This isn't in our original data, so we'll default to 0
      claim_amount: claimData.CLAIM_AMOUNT,
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
      premium_amount: claimData.PREMIUM_AMOUNT,
      tenure: claimData.TENURE,
      no_of_family_members: claimData.NO_OF_FAMILY_MEMBERS,
      days_to_loss: claimData.days_to_loss,
      claim_premium_ratio: claimData.claim_premium_ratio,
      incident_hour_of_the_day: claimData.INCIDENT_HOUR_OF_THE_DAY,
      any_injury: claimData.ANY_INJURY
    };

    console.log("Sending data to fraud detection API:", apiRequestData);

    // Make the API call to the new endpoint
    const response = await fetch(`${FRAUD_DETECTION_API}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiRequestData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error: ${response.status} - ${errorText}`);
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
  } catch (error) {
    console.error('Fraud Detection API Error:', error);
    throw error;
  }
};
