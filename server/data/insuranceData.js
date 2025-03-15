
const exchangeRate = 83.5; // 1 USD = 83.5 INR (approximate)

const convertToINR = (usdAmount) => {
  if (typeof usdAmount === 'string') {
    const numericValue = parseFloat(usdAmount.replace(/[$,]/g, ''));
    return numericValue * exchangeRate;
  }
  return usdAmount * exchangeRate;
};

// Sample insurance plan data
const insurancePlans = {
  health: [
    {
      id: '1',
      name: 'Premium Health Plan',
      provider: 'Secure Life Insurance',
      monthlyPremium: 285,
      coverageAmount: 300000,
      benefits: ['Comprehensive coverage', '24/7 support', 'Fast claims processing', 'No waiting period'],
      suitabilityScore: 95,
      description: 'Top-tier health plan with extensive benefits.'
    },
    {
      id: '2',
      name: 'Standard Health Plan',
      provider: 'SafeGuard Insurance',
      monthlyPremium: 195,
      coverageAmount: 200000,
      benefits: ['Essential coverage', 'Customizable options', 'Family discount available'],
      suitabilityScore: 87,
      description: 'Well-balanced health protection for most needs.'
    },
    {
      id: '3',
      name: 'Basic Health Plan',
      provider: 'TrustWorthy Insurance',
      monthlyPremium: 120,
      coverageAmount: 100000,
      benefits: ['Affordable protection', 'Easy application', 'Quick approval'],
      suitabilityScore: 75,
      description: 'Budget-friendly health option without compromising essential protection.'
    },
    {
      id: '4',
      name: 'Family Health Shield',
      provider: 'Family First Insurance',
      monthlyPremium: 320,
      coverageAmount: 350000,
      benefits: ['Family-wide coverage', 'Child protection included', 'Additional benefits for dependents'],
      suitabilityScore: 83,
      description: 'Designed specifically for families needing health protection.'
    }
  ],
  life: [
    // Similar structure for life insurance plans
    {
      id: '1',
      name: 'Premium Life Plan',
      provider: 'Secure Life Insurance',
      monthlyPremium: 350,
      coverageAmount: 500000,
      benefits: ['High coverage amount', 'Accidental death benefit', 'Critical illness rider', 'Premium waiver'],
      suitabilityScore: 94,
      description: 'Comprehensive life insurance with maximum protection.'
    },
    // Add more life insurance plans
  ],
  auto: [
    // Auto insurance plans
    {
      id: '1',
      name: 'Premium Auto Plan',
      provider: 'Drive Secure Insurance',
      monthlyPremium: 180,
      coverageAmount: 250000,
      benefits: ['Comprehensive coverage', 'Roadside assistance', 'Zero depreciation', 'No claim bonus protection'],
      suitabilityScore: 92,
      description: 'Full coverage auto insurance for complete peace of mind.'
    },
    // Add more auto insurance plans
  ],
  home: [
    // Home insurance plans
    {
      id: '1',
      name: 'Premium Home Plan',
      provider: 'Home Shield Insurance',
      monthlyPremium: 210,
      coverageAmount: 400000,
      benefits: ['Structure & contents coverage', 'Natural disaster protection', '24/7 emergency assistance', 'Temporary accommodation'],
      suitabilityScore: 90,
      description: 'Comprehensive home insurance with extensive coverage options.'
    },
    // Add more home insurance plans
  ]
};

// Function to get recommendations based on user input
const insuranceRecommendations = (categoryId, userParams) => {
  const { age, budget, zipCode, features } = userParams;
  const plans = insurancePlans[categoryId] || [];
  
  // Apply some basic filtering logic based on user parameters
  // This could be expanded with more sophisticated recommendation algorithms
  let filteredPlans = [...plans];
  
  // Filter by budget if provided
  if (budget) {
    const maxBudget = parseInt(budget.split('-')[1] || '1000');
    filteredPlans = filteredPlans.filter(plan => plan.monthlyPremium <= maxBudget);
  }
  
  // Sort by suitability score
  filteredPlans.sort((a, b) => b.suitabilityScore - a.suitabilityScore);
  
  // Format the plans for the frontend
  return filteredPlans.map(plan => ({
    ...plan,
    monthlyPremium: `$${plan.monthlyPremium}`,
    monthlyPremiumINR: `₹${convertToINR(plan.monthlyPremium).toLocaleString('en-IN')}`,
    coverageAmount: `$${plan.coverageAmount.toLocaleString('en-US')}`,
    coverageAmountINR: `₹${convertToINR(plan.coverageAmount).toLocaleString('en-IN')}`,
  }));
};

module.exports = {
  insuranceRecommendations
};
