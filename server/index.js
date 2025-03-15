
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { insuranceRecommendations } = require('./data/insuranceData');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.post('/api/insurance/recommendations', (req, res) => {
  const { categoryId, age, budget, zipCode, features } = req.body;
  
  try {
    console.log(`Received request for ${categoryId} recommendations`);
    
    // Simulate database lookup based on category and user parameters
    const recommendations = insuranceRecommendations(categoryId, {
      age,
      budget,
      zipCode,
      features
    });
    
    // Simulate processing time
    setTimeout(() => {
      res.json({ success: true, data: recommendations });
    }, 1000);
  } catch (error) {
    console.error('Error generating recommendations:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to generate recommendations'
    });
  }
});

// Policy Analysis Endpoint
app.post('/api/policy/analyze', (req, res) => {
  // Normally this would process the uploaded policy document
  // For now, simulate analysis with a delayed response
  setTimeout(() => {
    res.json({
      success: true,
      data: {
        summary: {
          coverageAmount: 350000,
          personalProperty: 175000,
          liability: 300000,
          waterDamageCovered: true,
          theftCovered: true
        },
        exclusions: [
          "Flood damage is not covered (separate policy needed)",
          "Earthquake damage is not covered",
          "Damage from neglect or poor maintenance",
          "Business equipment valued over $2,500"
        ],
        deductibles: {
          standard: 1000,
          windHail: "2% of dwelling coverage"
        },
        recommendations: [
          {
            type: "warning",
            title: "Consider Flood Insurance",
            description: "Your home is in a moderate flood zone, but your policy doesn't cover flood damage."
          },
          {
            type: "success",
            title: "Good Liability Coverage",
            description: "Your liability coverage of $300,000 is adequate for your property value."
          },
          {
            type: "info",
            title: "Tip: Inventory Your Possessions",
            description: "Creating a home inventory can help ensure you have adequate personal property coverage."
          }
        ]
      }
    });
  }, 2000);
});

// Coverage Optimizer Endpoint
app.post('/api/coverage/optimize', (req, res) => {
  const { currentCoverage, assets, risks } = req.body;
  
  // Simulate optimization calculation
  setTimeout(() => {
    res.json({
      success: true,
      data: {
        optimizedCoverage: {
          dwelling: 450000,
          personalProperty: 225000,
          liability: 500000,
          medicalPayments: 10000,
          additionalLivingExpense: 90000
        },
        potentialSavings: 320,
        recommendations: [
          {
            category: "liability",
            recommendation: "Increase liability coverage to $500,000",
            reason: "Your assets and risk factors suggest you need higher liability protection.",
            impact: "Increases premium by $45/year but provides 66% more protection"
          },
          {
            category: "deductible",
            recommendation: "Increase deductible to $2,000",
            reason: "You have adequate emergency savings to cover a higher deductible.",
            impact: "Decreases premium by $215/year"
          },
          {
            category: "bundling",
            recommendation: "Bundle with auto insurance",
            reason: "You can receive a multi-policy discount.",
            impact: "Decreases premium by $150/year"
          }
        ]
      }
    });
  }, 2000);
});

// Claim Checker Endpoint
app.post('/api/claim/check', (req, res) => {
  const { claimType, incident, policyDetails, claimAmount } = req.body;
  
  // Simulate claim assessment
  setTimeout(() => {
    res.json({
      success: true,
      data: {
        approvalProbability: 87,
        factors: [
          {
            factor: "Policy Coverage",
            impact: "positive",
            description: "Your policy explicitly covers this type of incident."
          },
          {
            factor: "Claim Documentation",
            impact: "neutral",
            description: "The documentation provided is adequate but could be improved with additional photos."
          },
          {
            factor: "Claim History",
            impact: "positive",
            description: "You have no recent claims, which improves the likelihood of approval."
          },
          {
            factor: "Incident Timing",
            impact: "positive",
            description: "The claim was filed promptly after the incident occurred."
          }
        ],
        suggestedActions: [
          "Provide additional photographs of the damaged items",
          "Include repair estimates from at least two contractors",
          "Submit a detailed inventory list of damaged items with approximate purchase dates"
        ]
      }
    });
  }, 1500);
});

// Authentication Endpoint
app.post('/api/auth/signin', (req, res) => {
  const { email, password } = req.body;
  
  // In a real app, would validate credentials against a database
  // For demo purposes, any credentials will work
  setTimeout(() => {
    res.json({
      success: true,
      data: {
        user: {
          id: "usr_123456",
          email: email,
          name: "Sample User",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=" + email
        },
        token: "sample_jwt_token_would_be_here"
      }
    });
  }, 1000);
});

// Basic health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
