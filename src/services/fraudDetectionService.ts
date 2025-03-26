
import { API_URL } from './apiConfig';

export interface ClaimFraudData {
  // Basic Transaction Information
  policyNumber: string;
  policyStartDate: string;
  lossDate: string;
  reportDate: string;
  
  // Insurance Details
  insuranceType: string;
  premiumAmount: number;
  claimAmount: number;
  incidentSeverity: 'Minor Loss' | 'Major Loss' | 'Total Loss';
  
  // Incident Information
  policeReportAvailable: boolean;
  incidentHour: number;
  authorityContacted: string;
  anyInjury: boolean;
  
  // Customer Demographics
  customerAge: number;
  employmentStatus: 'Employed' | 'Self-employed' | 'Unemployed';
  maritalStatus: 'Single' | 'Married' | 'Divorced';
  socialClass: 'Upper' | 'Middle' | 'Lower';
  educationLevel: 'High School' | 'Bachelor' | 'Master' | 'PhD';
  
  // Property & Family Information
  houseType: 'Own' | 'Rent' | 'Company Provided';
  familyMembers: number;
  riskSegmentation: 'L' | 'M' | 'H';
  tenure: number;
}

export interface FraudDetectionResult {
  score: number;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Very High';
  flags: FraudFlag[];
  recommendations: string[];
}

export interface FraudFlag {
  type: string;
  description: string;
  severity: 'Low' | 'Medium' | 'High';
}

// For development/demo, we'll create a local fraud detection algorithm
export const detectFraud = (data: ClaimFraudData): FraudDetectionResult => {
  // Initialize fraud flags and score
  const flags: FraudFlag[] = [];
  let fraudScore = 0;
  
  // Calculate days between policy start and loss
  const policyStartDate = new Date(data.policyStartDate);
  const lossDate = new Date(data.lossDate);
  const daysToLoss = Math.floor((lossDate.getTime() - policyStartDate.getTime()) / (1000 * 60 * 60 * 24));
  
  // Calculate days between loss and report
  const reportDate = new Date(data.reportDate);
  const daysToReport = Math.floor((reportDate.getTime() - lossDate.getTime()) / (1000 * 60 * 60 * 24));
  
  // Check for suspiciously soon claim after policy starts
  if (daysToLoss < 30) {
    flags.push({
      type: 'Recent Policy',
      description: `Claim filed only ${daysToLoss} days after policy start date`,
      severity: 'High'
    });
    fraudScore += 25;
  }
  
  // Check for delayed reporting
  if (daysToReport > 7) {
    flags.push({
      type: 'Delayed Reporting',
      description: `Incident reported ${daysToReport} days after occurrence`,
      severity: 'Medium'
    });
    fraudScore += 15;
  }
  
  // Check for high claim to premium ratio
  const claimToPremiumRatio = data.claimAmount / data.premiumAmount;
  if (claimToPremiumRatio > 10) {
    flags.push({
      type: 'High Claim Amount',
      description: `Claim amount is ${claimToPremiumRatio.toFixed(1)}x the premium amount`,
      severity: 'High'
    });
    fraudScore += 20;
  }
  
  // Check for suspicious incident hour (late night claims)
  if (data.incidentHour >= 23 || data.incidentHour <= 4) {
    flags.push({
      type: 'Late Night Incident',
      description: 'Incident occurred during late night hours',
      severity: 'Medium'
    });
    fraudScore += 10;
  }
  
  // Check for lack of police report for major incidents
  if (!data.policeReportAvailable && (data.incidentSeverity !== 'Minor Loss')) {
    flags.push({
      type: 'Missing Police Report',
      description: 'No police report for a significant incident',
      severity: 'High'
    });
    fraudScore += 20;
  }
  
  // Check high-risk segmentation
  if (data.riskSegmentation === 'H') {
    flags.push({
      type: 'High Risk Profile',
      description: 'Customer is in a high-risk segment',
      severity: 'Medium'
    });
    fraudScore += 15;
  }
  
  // Check for new customer with large claim
  if (data.tenure < 2 && data.claimAmount > 5000) {
    flags.push({
      type: 'New Customer, Large Claim',
      description: 'Customer with less than 2 years tenure filing a large claim',
      severity: 'Medium'
    });
    fraudScore += 15;
  }
  
  // Determine risk level based on fraud score
  let riskLevel: 'Low' | 'Medium' | 'High' | 'Very High' = 'Low';
  if (fraudScore > 80) riskLevel = 'Very High';
  else if (fraudScore > 50) riskLevel = 'High';
  else if (fraudScore > 25) riskLevel = 'Medium';
  
  // Generate recommendations based on flags
  const recommendations: string[] = [];
  
  if (flags.some(flag => flag.severity === 'High')) {
    recommendations.push('Conduct detailed investigation with claims adjuster');
  }
  
  if (flags.some(flag => flag.type === 'Missing Police Report')) {
    recommendations.push('Request police report or written explanation for its absence');
  }
  
  if (flags.some(flag => flag.type === 'Delayed Reporting')) {
    recommendations.push('Request detailed timeline of events between incident and reporting');
  }
  
  if (flags.some(flag => flag.type === 'High Claim Amount')) {
    recommendations.push('Verify all claimed items with detailed receipts/documentation');
  }
  
  if (riskLevel === 'Very High' || riskLevel === 'High') {
    recommendations.push('Consider on-site investigation of the claim');
  }
  
  if (recommendations.length === 0) {
    recommendations.push('Proceed with standard claim processing');
  }
  
  return {
    score: fraudScore,
    riskLevel,
    flags,
    recommendations
  };
};

// API-based fraud detection service (for when backend is available)
export const detectFraudAPI = async (data: ClaimFraudData): Promise<FraudDetectionResult> => {
  try {
    // First try the API
    const response = await fetch(`${API_URL}/fraud/detect`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to detect fraud via API');
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to detect fraud');
    }
    
    return result.data;
  } catch (error) {
    console.warn('API error, falling back to local fraud detection:', error);
    // Fall back to local detection if API fails
    return detectFraud(data);
  }
};
