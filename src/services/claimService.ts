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

// Placeholder function for the new API integration
export const checkClaimProbability = async (claimData: ClaimData, policyNumber: string): Promise<FraudCheckResult> => {
  try {
    // This is a placeholder implementation until the new API is integrated
    console.log("Placeholder for new API integration - data received:", { claimData, policyNumber });
    
    // For now, return a mock result to prevent UI errors
    const mockResult: FraudCheckResult = {
      id: `MOCK-${Math.floor(Math.random() * 10000)}`,
      policyNumber,
      fraudProbability: 25, // Mock low probability
      riskLevel: 'low',
      riskFactors: [
        'Mock risk factor - this is a placeholder',
        'New API integration needed'
      ],
      timestamp: new Date().toISOString()
    };
    
    return mockResult;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
