
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
  avg_claim_amount?: string | number;
  quick_claim?: string | number;
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
  // Create the payload for the new API based on the screenshot
  const claimAmount = typeof claimData.CLAIM_AMOUNT === 'number' ? 
    claimData.CLAIM_AMOUNT : 
    parseFloat(String(claimData.CLAIM_AMOUNT)) || 0;
    
  const daysToLoss = typeof claimData.days_to_loss === 'number' ? 
    claimData.days_to_loss : 
    parseFloat(String(claimData.days_to_loss)) || 0;
    
  let claimPremiumRatio: number;
  if (claimData.claim_premium_ratio) {
    claimPremiumRatio = typeof claimData.claim_premium_ratio === 'number' ? 
      claimData.claim_premium_ratio : 
      parseFloat(String(claimData.claim_premium_ratio)) || 0;
  } else {
    const premiumAmount = typeof claimData.PREMIUM_AMOUNT === 'number' ? 
      claimData.PREMIUM_AMOUNT : 
      parseFloat(String(claimData.PREMIUM_AMOUNT)) || 1;
    claimPremiumRatio = claimAmount / premiumAmount;
  }
  
  const avgClaimAmount = typeof claimData.avg_claim_amount === 'number' ? 
    claimData.avg_claim_amount : 
    parseFloat(String(claimData.avg_claim_amount)) || claimAmount;
    
  const quickClaim = typeof claimData.quick_claim === 'number' ? 
    claimData.quick_claim : 
    parseInt(String(claimData.quick_claim)) || 0;

  // Prepare the request payload according to the API documentation
  const payload = {
    CLAIM_AMOUNT: claimAmount,
    days_to_loss: daysToLoss,
    claim_premium_ratio: claimPremiumRatio,
    avg_claim_amount: avgClaimAmount,
    quick_claim: quickClaim
  };

  console.log("Sending data to fraud detection API:", payload);
  
  // Make the API call to the endpoint
  const response = await fetch(`${FRAUD_DETECTION_API}/predict`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`API Error: ${response.status} - ${errorText}`);
    throw new Error(`Fraud detection service error: ${response.status} ${errorText || 'Unknown error'}`);
  }

  // Parse the API response
  const apiResponse = await response.json();
  console.log("API Response:", apiResponse);

  // Determine risk level based on fraud probability
  let riskLevel: 'low' | 'medium' | 'high';
  const fraudProbability = apiResponse.fraud_probability * 100;
  
  if (fraudProbability > 70) {
    riskLevel = 'high';
  } else if (fraudProbability > 30) {
    riskLevel = 'medium';
  } else {
    riskLevel = 'low';
  }

  // Generate risk factors based on the input data
  const riskFactors: string[] = [];
  
  if (claimPremiumRatio > 2) {
    riskFactors.push("High claim to premium ratio");
  }
  
  if (daysToLoss < 30) {
    riskFactors.push("Very short time between policy start and claim");
  }
  
  if (quickClaim === 1) {
    riskFactors.push("Claim filed unusually quickly after incident");
  }
  
  if (claimAmount > avgClaimAmount * 1.5) {
    riskFactors.push("Claim amount significantly above average");
  }

  // Format the result in our application's expected structure
  const result: FraudCheckResult = {
    id: `FD-${Math.floor(Math.random() * 100000)}`,
    policyNumber: policyNumber,
    fraudProbability: fraudProbability,
    riskLevel: riskLevel,
    riskFactors: riskFactors,
    timestamp: new Date().toISOString()
  };

  return result;
};
