
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
    // Format the data for the new API
    const apiRequestData = {
      policy: {
        number: policyNumber,
        insuranceType: claimData.INSURANCE_TYPE,
        premiumAmount: claimData.PREMIUM_AMOUNT,
        tenure: claimData.TENURE
      },
      claim: {
        amount: claimData.CLAIM_AMOUNT,
        status: claimData.CLAIM_STATUS,
        incidentSeverity: claimData.INCIDENT_SEVERITY,
        daysToLoss: claimData.days_to_loss,
        claimPremiumRatio: claimData.claim_premium_ratio,
        incidentHour: claimData.INCIDENT_HOUR_OF_THE_DAY,
        anyInjury: claimData.ANY_INJURY === 1
      },
      customer: {
        age: claimData.AGE,
        maritalStatus: claimData.MARITAL_STATUS,
        employmentStatus: claimData.EMPLOYMENT_STATUS,
        riskSegmentation: claimData.RISK_SEGMENTATION,
        houseType: claimData.HOUSE_TYPE,
        socialClass: claimData.SOCIAL_CLASS,
        educationLevel: claimData.CUSTOMER_EDUCATION_LEVEL,
        familyMembers: claimData.NO_OF_FAMILY_MEMBERS
      }
    };

    // Call to the new fraud detection API with the formatted data
    const response = await fetch(`${FRAUD_DETECTION_API}/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': 'your-api-key-here' // Replace with proper API key management
      },
      body: JSON.stringify(apiRequestData),
    });

    if (!response.ok) {
      throw new Error(`Failed to check claim: ${response.status} ${response.statusText}`);
    }

    // Parse the API response
    const apiResponse = await response.json();
    console.log("API Response:", apiResponse);
    
    // Map the API response to our internal format
    const fraudProbability = apiResponse.fraudScore * 100;
    const riskLevel = fraudProbability < 30 ? 'low' : fraudProbability < 70 ? 'medium' : 'high';
    
    // Extract risk factors from API response
    const riskFactors = apiResponse.riskIndicators || [];
    
    // Add additional risk factors based on our internal logic
    if (claimData.CLAIM_AMOUNT > 5000 && !riskFactors.includes('High claim amount')) {
      riskFactors.push('Unusually high claim amount');
    }
    
    if (claimData.claim_premium_ratio > 1.5 && !riskFactors.includes('High claim to premium ratio')) {
      riskFactors.push('High claim to premium ratio');
    }
    
    if (claimData.days_to_loss < 30 && !riskFactors.includes('Recent policy purchase')) {
      riskFactors.push('Claim submitted shortly after policy purchase');
    }
    
    if ((claimData.INCIDENT_HOUR_OF_THE_DAY < 6 || claimData.INCIDENT_HOUR_OF_THE_DAY > 22) && 
        !riskFactors.includes('Unusual incident time')) {
      riskFactors.push('Incident occurred during unusual hours');
    }
    
    // Format the result
    const result: FraudCheckResult = {
      id: apiResponse.checkId || `FD-${Math.floor(Math.random() * 10000)}`,
      policyNumber,
      fraudProbability,
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
