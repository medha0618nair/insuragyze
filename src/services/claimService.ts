
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
    // Call to the fraud detection API
    const response = await fetch(`${FRAUD_DETECTION_API}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(claimData),
    });

    if (!response.ok) {
      throw new Error(`Failed to check claim: ${response.status} ${response.statusText}`);
    }

    // Parse the API response
    const apiResponse = await response.json();
    console.log("API Response:", apiResponse);
    
    // Calculate risk level based on probability
    const probability = parseFloat(apiResponse.fraud_probability) * 100;
    const riskLevel = probability < 30 ? 'low' : probability < 70 ? 'medium' : 'high';
    
    // Determine risk factors
    const riskFactors = [];
    
    if (claimData.CLAIM_AMOUNT > 5000) {
      riskFactors.push('Unusually high claim amount');
    }
    
    if (claimData.claim_premium_ratio > 1.5) {
      riskFactors.push('High claim to premium ratio');
    }
    
    if (claimData.days_to_loss < 30) {
      riskFactors.push('Claim submitted shortly after policy purchase');
    }
    
    if (claimData.INCIDENT_HOUR_OF_THE_DAY < 6 || claimData.INCIDENT_HOUR_OF_THE_DAY > 22) {
      riskFactors.push('Incident occurred during unusual hours');
    }
    
    // Format the result
    const result: FraudCheckResult = {
      id: `FD-${Math.floor(Math.random() * 10000)}`,
      policyNumber,
      fraudProbability: probability,
      riskLevel,
      riskFactors,
      timestamp: new Date().toISOString()
    };
    
    return result;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
