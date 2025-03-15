
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

// Basic health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
