
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const { insuranceRecommendations } = require('./data/insuranceData');

// Load environment variables
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// MongoDB Connection
const connectDB = async () => {
  try {
    // For demo purposes, we're using a MongoDB URI that would be defined in .env in production
    // If MongoDB URI is not defined, we'll fall back to mock data operations
    if (process.env.MONGODB_URI) {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('MongoDB Connected');
    } else {
      console.log('MongoDB URI not defined, using mock data');
    }
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Connect to MongoDB if URI is provided
connectDB();

// Define User Schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  dateJoined: {
    type: Date,
    default: Date.now
  },
  preferences: {
    type: Object,
    default: {}
  }
});

// Define Insurance Policy Schema
const PolicySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  policyType: {
    type: String,
    required: true,
    enum: ['home', 'auto', 'life', 'health', 'rental']
  },
  filename: {
    type: String,
    required: true
  },
  uploadDate: {
    type: Date,
    default: Date.now
  },
  analysisResults: {
    type: Object,
    default: null
  }
});

// Create models if MongoDB is connected
let User, Policy;
if (mongoose.connection.readyState === 1) {
  User = mongoose.model('User', UserSchema);
  Policy = mongoose.model('Policy', PolicySchema);
}

// Configure file storage for policy uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    // Accept only specific file types
    const filetypes = /pdf|doc|docx|jpg|jpeg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only PDF, DOC, DOCX, and image files are allowed'));
  }
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// JWT Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ success: false, error: 'Access denied. No token provided.' });
  }
  
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_for_development');
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ success: false, error: 'Invalid token' });
  }
};

// Routes

// User Registration
app.post('/api/auth/signup', async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    // Check if MongoDB is connected before using it
    if (mongoose.connection.readyState !== 1) {
      // Simulate successful registration without DB
      setTimeout(() => {
        res.json({
          success: true,
          data: {
            user: {
              id: "usr_" + Math.random().toString(36).substr(2, 9),
              email,
              name,
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=" + email
            },
            token: "sample_jwt_token_" + Date.now()
          }
        });
      }, 1000);
      return;
    }
    
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, error: 'User already exists' });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword
    });
    
    await user.save();
    
    // Create JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || 'your_jwt_secret_for_development',
      { expiresIn: '1d' }
    );
    
    res.status(201).json({
      success: true,
      data: {
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=" + email
        },
        token
      }
    });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ success: false, error: 'Server error during registration' });
  }
});

// User Login
app.post('/api/auth/signin', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Check if MongoDB is connected before using it
    if (mongoose.connection.readyState !== 1) {
      // Use the existing mock login for development
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
      return;
    }
    
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, error: 'Invalid email or password' });
    }
    
    // Validate password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ success: false, error: 'Invalid email or password' });
    }
    
    // Create JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || 'your_jwt_secret_for_development',
      { expiresIn: '1d' }
    );
    
    res.json({
      success: true,
      data: {
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=" + email
        },
        token
      }
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, error: 'Server error during login' });
  }
});

// Insurance Recommendations API
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

// New insurance recommendation endpoint with ML model integration
app.post('/api/recommend', (req, res) => {
  const { age, income, coverageType, riskFactors } = req.body;
  
  try {
    console.log(`Received request for AI-powered recommendations`);
    console.log(`User details: Age ${age}, Income ${income}, Coverage ${coverageType}`);
    
    // Simulate AI/ML model processing
    // In production, this would call your Flask ML service
    
    // Mock AI-enhanced recommendation logic
    let recommendationScore = 0;
    let recommendedPlans = [];
    
    // Basic scoring model based on user inputs
    if (coverageType === 'home' || coverageType === 'rental') {
      // Get home or rental plans and apply scoring
      const basePlans = insuranceRecommendations(coverageType === 'home' ? 'home' : 'home', {
        age: age.toString(),
        budget: income > 80000 ? '300-500' : '150-300',
        features: riskFactors
      });
      
      // Apply additional ML-like filtering
      recommendedPlans = basePlans.map(plan => {
        // Calculate a personalized fit score
        let fitScore = plan.suitabilityScore;
        
        // Adjust score based on income
        if (income > 100000 && plan.monthlyPremium.startsWith('$2')) {
          fitScore += 5; // Premium plans better for high income
        } else if (income < 50000 && plan.monthlyPremium.startsWith('$1')) {
          fitScore += 8; // Budget plans better for lower income
        }
        
        // Adjust for risk factors
        if (riskFactors.includes('flood') && plan.benefits.some(b => b.toLowerCase().includes('disaster'))) {
          fitScore += 10;
        }
        
        if (riskFactors.includes('theft') && plan.benefits.some(b => b.toLowerCase().includes('security'))) {
          fitScore += 7;
        }
        
        return {
          ...plan,
          aiScore: Math.min(100, fitScore), // Cap at 100
          aiRecommendation: fitScore > 90 ? 'Highly Recommended' : 
                           fitScore > 75 ? 'Recommended' : 'Good Match'
        };
      });
      
      // Sort by the new AI score
      recommendedPlans.sort((a, b) => b.aiScore - a.aiScore);
      
    } else if (coverageType === 'auto') {
      // Similar logic for auto insurance
      const basePlans = insuranceRecommendations('auto', {
        age: age.toString(),
        budget: income > 80000 ? '300-500' : '150-300',
        features: riskFactors
      });
      
      recommendedPlans = basePlans.map(plan => {
        let fitScore = plan.suitabilityScore;
        
        // Age-related scoring for auto insurance
        if (age < 25 && plan.benefits.some(b => b.toLowerCase().includes('young driver'))) {
          fitScore += 12;
        } else if (age > 60 && plan.benefits.some(b => b.toLowerCase().includes('senior'))) {
          fitScore += 8;
        }
        
        // Risk factor adjustments
        if (riskFactors.includes('accident') && plan.benefits.some(b => b.toLowerCase().includes('accident forgiveness'))) {
          fitScore += 15;
        }
        
        return {
          ...plan,
          aiScore: Math.min(100, fitScore),
          aiRecommendation: fitScore > 90 ? 'Highly Recommended' : 
                           fitScore > 75 ? 'Recommended' : 'Good Match'
        };
      });
      
      recommendedPlans.sort((a, b) => b.aiScore - a.aiScore);
    }
    
    // Enhanced response with AI insights
    setTimeout(() => {
      res.json({ 
        success: true, 
        data: {
          recommendations: recommendedPlans,
          insights: {
            summary: `Based on your profile as a ${age}-year-old with ${income > 80000 ? 'high' : 'moderate'} income, we've identified the top insurance plans for your ${coverageType} needs.`,
            riskAssessment: `Your risk profile indicates ${riskFactors.length > 2 ? 'higher than average' : 'average'} needs for protection in the following areas: ${riskFactors.join(', ')}.`,
            coverageSuggestion: `We recommend a coverage amount of ${income > 100000 ? '$500,000+' : '$300,000+'} for optimal protection.`
          }
        }
      });
    }, 2000); // Simulate ML processing time
    
  } catch (error) {
    console.error('Error in AI recommendation:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to generate AI-powered recommendations'
    });
  }
});

// Policy Upload Endpoint
app.post('/api/policy/upload', authenticateToken, upload.single('policyFile'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }
    
    // Check if MongoDB is connected before using it
    if (mongoose.connection.readyState !== 1) {
      // Simulate successful policy upload without DB
      setTimeout(() => {
        res.json({
          success: true,
          data: {
            policyId: "pol_" + Math.random().toString(36).substr(2, 9),
            fileName: req.file.originalname,
            uploadDate: new Date().toISOString()
          }
        });
      }, 1000);
      return;
    }
    
    // Store policy info in DB
    const { policyType } = req.body;
    
    const newPolicy = new Policy({
      userId: req.user.id,
      policyType,
      filename: req.file.filename
    });
    
    await newPolicy.save();
    
    res.json({
      success: true,
      data: {
        policyId: newPolicy._id,
        fileName: req.file.originalname,
        uploadDate: newPolicy.uploadDate
      }
    });
    
  } catch (error) {
    console.error('Error uploading policy:', error);
    res.status(500).json({ success: false, error: 'Failed to upload policy' });
  }
});

// Policy Analysis Endpoint (existing)
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

// Get user's saved policies
app.get('/api/user/policies', authenticateToken, async (req, res) => {
  try {
    // Check if MongoDB is connected before using it
    if (mongoose.connection.readyState !== 1) {
      // Simulate response without DB
      setTimeout(() => {
        res.json({
          success: true,
          data: [
            {
              id: "pol_sample1",
              policyType: "home",
              fileName: "home_policy_2023.pdf",
              uploadDate: new Date(Date.now() - 30*24*60*60*1000).toISOString()
            },
            {
              id: "pol_sample2",
              policyType: "auto",
              fileName: "auto_insurance_2023.pdf",
              uploadDate: new Date(Date.now() - 15*24*60*60*1000).toISOString()
            }
          ]
        });
      }, 800);
      return;
    }
    
    // Find all policies for the authenticated user
    const policies = await Policy.find({ userId: req.user.id });
    
    res.json({
      success: true,
      data: policies.map(policy => ({
        id: policy._id,
        policyType: policy.policyType,
        fileName: policy.filename,
        uploadDate: policy.uploadDate
      }))
    });
    
  } catch (error) {
    console.error('Error fetching user policies:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch policies' });
  }
});

// Coverage Optimizer Endpoint (existing)
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

// Claim Checker Endpoint (existing)
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

// Basic health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'not connected'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
