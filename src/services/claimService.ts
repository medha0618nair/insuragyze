
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
  PREMIUM_AMOUNT: string | number;
  CLAIM_AMOUNT: string | number;
  AGE: string | number;
  TENURE: string | number;
  NO_OF_FAMILY_MEMBERS: string | number;
  days_to_loss: string | number;
  claim_premium_ratio: string | number;
  INCIDENT_HOUR_OF_THE_DAY: string | number;
  ANY_INJURY: string | number;
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
  // Validate and ensure non-negative values for numeric fields
  const validatedData = {
    age: Math.max(0, Number(claimData.AGE)),
    income: 0, // Default value since it's not in our data model
    claim_amount: Math.max(0, Number(claimData.CLAIM_AMOUNT)),
    policy_number: policyNumber,
    insurance_type: String(claimData.INSURANCE_TYPE).toLowerCase(),
    marital_status: String(claimData.MARITAL_STATUS).toLowerCase(),
    employment_status: String(claimData.EMPLOYMENT_STATUS).toLowerCase(),
    risk_segmentation: String(claimData.RISK_SEGMENTATION).toLowerCase(),
    house_type: String(claimData.HOUSE_TYPE).toLowerCase(),
    social_class: String(claimData.SOCIAL_CLASS).toLowerCase(),
    customer_education_level: String(claimData.CUSTOMER_EDUCATION_LEVEL).toLowerCase(),
    claim_status: String(claimData.CLAIM_STATUS).toLowerCase(),
    incident_severity: String(claimData.INCIDENT_SEVERITY).toLowerCase(),
    premium_amount: Math.max(0, Number(claimData.PREMIUM_AMOUNT)),
    tenure: Math.max(0, Number(claimData.TENURE)), // Ensure non-negative
    no_of_family_members: Math.max(0, Number(claimData.NO_OF_FAMILY_MEMBERS)), // Ensure non-negative
    days_to_loss: Math.max(0, Number(claimData.days_to_loss)), // Ensure non-negative
    claim_premium_ratio: Number(claimData.claim_premium_ratio) > 0 ? 
      Number(claimData.claim_premium_ratio) : 
      Math.max(0, Number(claimData.CLAIM_AMOUNT)) / Math.max(1, Number(claimData.PREMIUM_AMOUNT)),
    incident_hour_of_the_day: Math.min(23, Math.max(0, Number(claimData.INCIDENT_HOUR_OF_THE_DAY))), // Ensure between 0-23
    any_injury: Number(claimData.ANY_INJURY) === 1 ? 1 : 0
  };

  console.log("Sending data to fraud detection API:", validatedData);
  
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
    throw new Error(`Fraud detection service error: ${response.status} ${errorText || 'Unknown error'}`);
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
};
