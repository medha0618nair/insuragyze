import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ButtonCustom } from '@/components/ui/button-custom';
import { PieChart, LineChart, BarChart, Loader, Check, AlertTriangle, Info } from 'lucide-react';
import { optimizeCoverage } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

const CoverageOptimizerPage = () => {
  const [formData, setFormData] = useState({
    age: '',
    zipCode: '',
    propertyValue: '',
    carValue: '',
    healthConditions: [],
    assetsValue: '',
    dependents: '',
    currentPremiums: {
      home: '',
      auto: '',
      health: '',
      life: ''
    },
    currentCoverage: {
      home: '',
      auto: '',
      health: '',
      life: ''
    }
  });

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const { toast } = useToast();

  const healthConditionOptions = [
    "None", "High Blood Pressure", "Diabetes", "Heart Disease", 
    "Cancer", "Asthma", "Arthritis", "Obesity"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent as keyof typeof formData] as any,
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleCheckboxChange = (condition: string) => {
    const updatedConditions = [...formData.healthConditions];
    
    if (updatedConditions.includes(condition)) {
      const index = updatedConditions.indexOf(condition);
      updatedConditions.splice(index, 1);
    } else {
      if (condition === "None") {
        updatedConditions.length = 0;
      } else {
        const noneIndex = updatedConditions.indexOf("None");
        if (noneIndex !== -1) {
          updatedConditions.splice(noneIndex, 1);
        }
      }
      updatedConditions.push(condition);
    }
    
    setFormData({
      ...formData,
      healthConditions: updatedConditions
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      
      setResults({
        recommendations: [
          {
            type: "increase",
            coverage: "home",
            current: convertToINR(parseInt(formData.currentCoverage.home)),
            recommended: convertToINR(parseInt(formData.currentCoverage.home) * 1.2),
            reason: "Your home insurance coverage is below the recommended amount for your property value."
          },
          {
            type: "decrease",
            coverage: "auto",
            current: convertToINR(parseInt(formData.currentCoverage.auto)),
            recommended: convertToINR(parseInt(formData.currentCoverage.auto) * 0.85),
            reason: "Your auto insurance coverage is higher than necessary for your vehicle value."
          },
          {
            type: "maintain",
            coverage: "health",
            current: convertToINR(parseInt(formData.currentCoverage.health)),
            recommended: convertToINR(parseInt(formData.currentCoverage.health)),
            reason: "Your health insurance coverage is appropriate for your needs."
          },
          {
            type: "increase",
            coverage: "life",
            current: convertToINR(parseInt(formData.currentCoverage.life)),
            recommended: convertToINR(parseInt(formData.currentCoverage.life) * 1.5),
            reason: "With your number of dependents, you should increase your life insurance coverage."
          }
        ],
        savings: {
          current: {
            monthly: convertToINR(parseInt(formData.currentPremiums.home) + 
                     parseInt(formData.currentPremiums.auto) + 
                     parseInt(formData.currentPremiums.health) + 
                     parseInt(formData.currentPremiums.life)),
            annual: convertToINR((parseInt(formData.currentPremiums.home) + 
                     parseInt(formData.currentPremiums.auto) + 
                     parseInt(formData.currentPremiums.health) + 
                     parseInt(formData.currentPremiums.life)) * 12)
          },
          optimized: {
            monthly: convertToINR((parseInt(formData.currentPremiums.home) * 1.1) + 
                     (parseInt(formData.currentPremiums.auto) * 0.8) + 
                     parseInt(formData.currentPremiums.health) + 
                     (parseInt(formData.currentPremiums.life) * 1.3)),
            annual: convertToINR(((parseInt(formData.currentPremiums.home) * 1.1) + 
                     (parseInt(formData.currentPremiums.auto) * 0.8) + 
                     parseInt(formData.currentPremiums.health) + 
                     (parseInt(formData.currentPremiums.life) * 1.3)) * 12)
          }
        },
        riskScore: {
          current: 65,
          optimized: 82
        }
      });
      
      toast({
        title: "Coverage Analysis Complete",
        description: "We've analyzed your current coverage and found opportunities to optimize.",
      });
    }, 2000);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  const convertToINR = (usdValue: number): number => {
    const exchangeRate = 83.5;
    return usdValue * exchangeRate;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <Navbar />
      <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block px-3 py-1 rounded-full bg-insura-purple/10 text-insura-purple font-medium text-sm mb-4 border border-insura-purple/20">
              AI Coverage Optimizer
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-insura-neon to-insura-purple bg-clip-text text-transparent">
              Optimize Your Insurance Coverage
            </h1>
            <p className="text-xl text-gray-300">
              Our AI analyzes your current coverage and recommends adjustments to save money while ensuring you're properly protected.
            </p>
          </div>

          {!results ? (
            <div className="cyber-card rounded-xl p-8 max-w-4xl mx-auto">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold mb-6 text-white">Personal Information</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-300 mb-2">Age</label>
                        <input
                          type="number"
                          name="age"
                          value={formData.age}
                          onChange={handleInputChange}
                          className="w-full bg-black/40 border border-gray-700 rounded-md px-4 py-2 text-white focus:border-insura-purple focus:ring-1 focus:ring-insura-purple outline-none"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-300 mb-2">ZIP Code</label>
                        <input
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          className="w-full bg-black/40 border border-gray-700 rounded-md px-4 py-2 text-white focus:border-insura-purple focus:ring-1 focus:ring-insura-purple outline-none"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-300 mb-2">Number of Dependents</label>
                        <input
                          type="number"
                          name="dependents"
                          value={formData.dependents}
                          onChange={handleInputChange}
                          className="w-full bg-black/40 border border-gray-700 rounded-md px-4 py-2 text-white focus:border-insura-purple focus:ring-1 focus:ring-insura-purple outline-none"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-300 mb-2">Health Conditions</label>
                        <div className="grid grid-cols-2 gap-2">
                          {healthConditionOptions.map((condition) => (
                            <div key={condition} className="flex items-center">
                              <input
                                type="checkbox"
                                id={`condition-${condition}`}
                                checked={formData.healthConditions.includes(condition)}
                                onChange={() => handleCheckboxChange(condition)}
                                className="mr-2 h-4 w-4 rounded border-gray-700 text-insura-purple focus:ring-insura-purple"
                              />
                              <label htmlFor={`condition-${condition}`} className="text-gray-300 text-sm">
                                {condition}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold mt-8 mb-6 text-white">Asset Values</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-300 mb-2">Property Value ($)</label>
                        <input
                          type="number"
                          name="propertyValue"
                          value={formData.propertyValue}
                          onChange={handleInputChange}
                          className="w-full bg-black/40 border border-gray-700 rounded-md px-4 py-2 text-white focus:border-insura-purple focus:ring-1 focus:ring-insura-purple outline-none"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-300 mb-2">Vehicle Value ($)</label>
                        <input
                          type="number"
                          name="carValue"
                          value={formData.carValue}
                          onChange={handleInputChange}
                          className="w-full bg-black/40 border border-gray-700 rounded-md px-4 py-2 text-white focus:border-insura-purple focus:ring-1 focus:ring-insura-purple outline-none"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-300 mb-2">Other Assets Value ($)</label>
                        <input
                          type="number"
                          name="assetsValue"
                          value={formData.assetsValue}
                          onChange={handleInputChange}
                          className="w-full bg-black/40 border border-gray-700 rounded-md px-4 py-2 text-white focus:border-insura-purple focus:ring-1 focus:ring-insura-purple outline-none"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold mb-6 text-white">Current Coverage</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-300 mb-2">Home Insurance Coverage ($)</label>
                        <input
                          type="number"
                          name="currentCoverage.home"
                          value={formData.currentCoverage.home}
                          onChange={handleInputChange}
                          className="w-full bg-black/40 border border-gray-700 rounded-md px-4 py-2 text-white focus:border-insura-purple focus:ring-1 focus:ring-insura-purple outline-none"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-300 mb-2">Auto Insurance Coverage ($)</label>
                        <input
                          type="number"
                          name="currentCoverage.auto"
                          value={formData.currentCoverage.auto}
                          onChange={handleInputChange}
                          className="w-full bg-black/40 border border-gray-700 rounded-md px-4 py-2 text-white focus:border-insura-purple focus:ring-1 focus:ring-insura-purple outline-none"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-300 mb-2">Health Insurance Coverage ($)</label>
                        <input
                          type="number"
                          name="currentCoverage.health"
                          value={formData.currentCoverage.health}
                          onChange={handleInputChange}
                          className="w-full bg-black/40 border border-gray-700 rounded-md px-4 py-2 text-white focus:border-insura-purple focus:ring-1 focus:ring-insura-purple outline-none"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-300 mb-2">Life Insurance Coverage ($)</label>
                        <input
                          type="number"
                          name="currentCoverage.life"
                          value={formData.currentCoverage.life}
                          onChange={handleInputChange}
                          className="w-full bg-black/40 border border-gray-700 rounded-md px-4 py-2 text-white focus:border-insura-purple focus:ring-1 focus:ring-insura-purple outline-none"
                          required
                        />
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold mt-8 mb-6 text-white">Current Premiums</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-300 mb-2">Monthly Home Insurance Premium ($)</label>
                        <input
                          type="number"
                          name="currentPremiums.home"
                          value={formData.currentPremiums.home}
                          onChange={handleInputChange}
                          className="w-full bg-black/40 border border-gray-700 rounded-md px-4 py-2 text-white focus:border-insura-purple focus:ring-1 focus:ring-insura-purple outline-none"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-300 mb-2">Monthly Auto Insurance Premium ($)</label>
                        <input
                          type="number"
                          name="currentPremiums.auto"
                          value={formData.currentPremiums.auto}
                          onChange={handleInputChange}
                          className="w-full bg-black/40 border border-gray-700 rounded-md px-4 py-2 text-white focus:border-insura-purple focus:ring-1 focus:ring-insura-purple outline-none"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-300 mb-2">Monthly Health Insurance Premium ($)</label>
                        <input
                          type="number"
                          name="currentPremiums.health"
                          value={formData.currentPremiums.health}
                          onChange={handleInputChange}
                          className="w-full bg-black/40 border border-gray-700 rounded-md px-4 py-2 text-white focus:border-insura-purple focus:ring-1 focus:ring-insura-purple outline-none"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-300 mb-2">Monthly Life Insurance Premium ($)</label>
                        <input
                          type="number"
                          name="currentPremiums.life"
                          value={formData.currentPremiums.life}
                          onChange={handleInputChange}
                          className="w-full bg-black/40 border border-gray-700 rounded-md px-4 py-2 text-white focus:border-insura-purple focus:ring-1 focus:ring-insura-purple outline-none"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 text-center">
                  <ButtonCustom
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="bg-gradient-to-r from-insura-neon to-insura-purple"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader className="w-5 h-5 mr-2 animate-spin" />
                        Analyzing Coverage...
                      </>
                    ) : (
                      'Optimize My Coverage'
                    )}
                  </ButtonCustom>
                </div>
              </form>
            </div>
          ) : (
            <div className="space-y-8 max-w-4xl mx-auto animate-fade-in">
              <div className="cyber-card rounded-xl p-8">
                <h2 className="text-2xl font-bold mb-6 text-white">Coverage Recommendations</h2>
                
                <div className="space-y-6">
                  {results.recommendations.map((rec: any, index: number) => (
                    <div key={index} className="p-4 rounded-lg border flex items-start gap-4 bg-black/30" style={{
                      borderColor: rec.type === 'increase' ? 'rgba(239, 68, 68, 0.3)' : 
                                  rec.type === 'decrease' ? 'rgba(34, 197, 94, 0.3)' : 
                                  'rgba(59, 130, 246, 0.3)'
                    }}>
                      <div className={`p-2 rounded-full ${
                        rec.type === 'increase' ? 'bg-red-900/30 text-red-500' : 
                        rec.type === 'decrease' ? 'bg-green-900/30 text-green-500' : 
                        'bg-blue-900/30 text-blue-500'
                      }`}>
                        {rec.type === 'increase' ? (
                          <AlertTriangle className="w-6 h-6" />
                        ) : rec.type === 'decrease' ? (
                          <Check className="w-6 h-6" />
                        ) : (
                          <Info className="w-6 h-6" />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-medium capitalize text-white">
                            {rec.coverage} Insurance
                          </h3>
                          <div className={`px-2 py-1 rounded text-sm ${
                            rec.type === 'increase' ? 'bg-red-900/30 text-red-400' : 
                            rec.type === 'decrease' ? 'bg-green-900/30 text-green-400' : 
                            'bg-blue-900/30 text-blue-400'
                          }`}>
                            {rec.type === 'increase' ? 'Increase Coverage' : 
                             rec.type === 'decrease' ? 'Decrease Coverage' : 
                             'Maintain Coverage'}
                          </div>
                        </div>
                        
                        <p className="text-gray-300 my-2">{rec.reason}</p>
                        
                        <div className="flex flex-wrap gap-4 mt-3">
                          <div>
                            <p className="text-gray-400 text-sm">Current</p>
                            <p className="text-white font-medium">{formatCurrency(rec.current)}</p>
                          </div>
                          
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                              <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                          </div>
                          
                          <div>
                            <p className="text-gray-400 text-sm">Recommended</p>
                            <p className={`font-medium ${
                              rec.type === 'increase' ? 'text-red-400' : 
                              rec.type === 'decrease' ? 'text-green-400' : 
                              'text-blue-400'
                            }`}>{formatCurrency(rec.recommended)}</p>
                          </div>
                          
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                              <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                          </div>
                          
                          <div>
                            <p className="text-gray-400 text-sm">Difference</p>
                            <p className={`font-medium ${
                              rec.recommended > rec.current ? 'text-red-400' : 
                              rec.recommended < rec.current ? 'text-green-400' : 
                              'text-blue-400'
                            }`}>
                              {rec.recommended > rec.current ? '+' : rec.recommended < rec.current ? '-' : ''}
                              {formatCurrency(Math.abs(rec.recommended - rec.current))}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="cyber-card rounded-xl p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white">Premium Comparison</h2>
                    <PieChart className="w-6 h-6 text-insura-purple" />
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <p className="text-gray-400 mb-2">Current Monthly Premium</p>
                      <p className="text-2xl font-bold text-white">{formatCurrency(results.savings.current.monthly)}</p>
                      <p className="text-gray-400 text-sm">{formatCurrency(results.savings.current.annual)} annually</p>
                    </div>
                    
                    <div>
                      <p className="text-gray-400 mb-2">Optimized Monthly Premium</p>
                      <p className="text-2xl font-bold text-insura-purple">{formatCurrency(results.savings.optimized.monthly)}</p>
                      <p className="text-gray-400 text-sm">{formatCurrency(results.savings.optimized.annual)} annually</p>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-black/30 border border-green-500/30">
                      <p className="text-gray-300 mb-1">Potential Savings</p>
                      <p className={`text-xl font-bold ${results.savings.current.monthly > results.savings.optimized.monthly ? 'text-green-500' : 'text-red-500'}`}>
                        {results.savings.current.monthly > results.savings.optimized.monthly ? 
                          formatCurrency(results.savings.current.monthly - results.savings.optimized.monthly) + ' per month' : 
                          'No monthly savings'}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {results.savings.current.annual > results.savings.optimized.annual ? 
                          formatCurrency(results.savings.current.annual - results.savings.optimized.annual) + ' annually' : 
                          'No annual savings'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="cyber-card rounded-xl p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white">Risk Protection Score</h2>
                    <LineChart className="w-6 h-6 text-insura-neon" />
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <p className="text-gray-400 mb-4">Current Protection Level</p>
                      <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${results.riskScore.current < 50 ? 'bg-red-500' : results.riskScore.current < 70 ? 'bg-yellow-500' : 'bg-green-500'}`}
                          style={{ width: `${results.riskScore.current}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-2">
                        <p className="text-gray-400 text-sm">0</p>
                        <p className={`font-medium ${results.riskScore.current < 50 ? 'text-red-400' : results.riskScore.current < 70 ? 'text-yellow-400' : 'text-green-400'}`}>
                          {results.riskScore.current}/100
                        </p>
                        <p className="text-gray-400 text-sm">100</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-gray-400 mb-4">Optimized Protection Level</p>
                      <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${results.riskScore.optimized < 50 ? 'bg-red-500' : results.riskScore.optimized < 70 ? 'bg-yellow-500' : 'bg-green-500'}`}
                          style={{ width: `${results.riskScore.optimized}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-2">
                        <p className="text-gray-400 text-sm">0</p>
                        <p className={`font-medium ${results.riskScore.optimized < 50 ? 'text-red-400' : results.riskScore.optimized < 70 ? 'text-yellow-400' : 'text-green-400'}`}>
                          {results.riskScore.optimized}/100
                        </p>
                        <p className="text-gray-400 text-sm">100</p>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-black/30 border border-insura-neon/30">
                      <p className="text-gray-300">What This Means</p>
                      <p className="text-gray-400 text-sm mt-1">
                        Our optimized coverage plan increases your risk protection score from 
                        <span className={`font-medium ${results.riskScore.current < 50 ? 'text-red-400' : results.riskScore.current < 70 ? 'text-yellow-400' : 'text-green-400'}`}> {results.riskScore.current} </span>
                        to 
                        <span className={`font-medium ${results.riskScore.optimized < 50 ? 'text-red-400' : results.riskScore.optimized < 70 ? 'text-yellow-400' : 'text-green-400'}`}> {results.riskScore.optimized}</span>, 
                        providing better protection against potential risks.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center gap-4">
                <ButtonCustom
                  variant="primary"
                  size="lg"
                  className="bg-gradient-to-r from-insura-neon to-insura-purple"
                  onClick={() => {
                    toast({
                      title: "Report Generated",
                      description: "Your coverage optimization report has been downloaded",
                    });
                  }}
                >
                  Download Full Report
                </ButtonCustom>
                
                <ButtonCustom
                  variant="outline"
                  size="lg"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                  onClick={() => setResults(null)}
                >
                  Start Over
                </ButtonCustom>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CoverageOptimizerPage;
