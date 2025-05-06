
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { ButtonCustom } from '@/components/ui/button-custom';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { SliderRange, Shield, Lightbulb, ArrowRight, Check, Settings, DollarSign, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { translateText } from '@/services/utilityService';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Form schema validation
const formSchema = z.object({
  age: z.string().min(1, "Age is required"),
  income: z.string().min(1, "Income is required"),
  healthStatus: z.string().min(1, "Health status is required"),
  dependents: z.string().min(1, "Number of dependents is required"),
  assets: z.string().min(1, "Total assets value is required"),
  riskTolerance: z.string().min(1, "Risk tolerance is required"),
  existingInsurance: z.string()
});

type CoverageRecommendation = {
  type: string;
  coverageAmount: number; 
  priority: 'High' | 'Medium' | 'Low';
  description: string;
  reason: string;
};

const CoverageSimulatorPage = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [recommendations, setRecommendations] = useState<CoverageRecommendation[]>([]);
  const [currency, setCurrency] = useState<'USD' | 'INR'>('USD');
  const [language, setLanguage] = useState<'en' | 'es' | 'fr' | 'de'>('en');
  const [translations, setTranslations] = useState<Record<string, string>>({});

  // Initialize form with react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: '',
      income: '',
      healthStatus: '',
      dependents: '',
      assets: '',
      riskTolerance: '',
      existingInsurance: '',
    },
  });

  const toggleCurrency = () => {
    setCurrency(prev => prev === 'USD' ? 'INR' : 'USD');
  };

  const convertToINR = (usd: number): number => {
    return Math.round(usd * 83.5); // Using fixed exchange rate for demo
  };

  const formatCurrency = (amount: number): string => {
    if (currency === 'USD') {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    } else {
      return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(convertToINR(amount));
    }
  };

  const simulateCoverage = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    try {
      // In a real app, this would call an API to get AI recommendations
      // For this demo, we're simulating the response with a timeout
      setTimeout(async () => {
        // Calculate recommended coverage based on user inputs
        const age = parseInt(data.age);
        const income = parseInt(data.income);
        const dependents = parseInt(data.dependents);
        const assets = parseInt(data.assets);
        
        // Simulate AI-driven recommendations based on inputs
        const lifeInsuranceAmount = income * (10 - (age / 10)) * (1 + (dependents * 0.5));
        const healthInsuranceAmount = 5000 + (age * 100) + (dependents * 2000);
        const propertyInsuranceAmount = assets * 0.8;
        const disabilityInsuranceAmount = income * 0.6;
        
        const newRecommendations: CoverageRecommendation[] = [
          {
            type: 'Life Insurance',
            coverageAmount: Math.round(lifeInsuranceAmount / 1000) * 1000,
            priority: dependents > 0 ? 'High' : 'Medium',
            description: `Provides financial protection for your ${dependents} dependent${dependents !== 1 ? 's' : ''} in case of your death.`,
            reason: `Based on your age (${age}) and income ($${income.toLocaleString()}), we recommend coverage that can replace your income for multiple years.`
          },
          {
            type: 'Health Insurance',
            coverageAmount: Math.round(healthInsuranceAmount / 1000) * 1000,
            priority: 'High',
            description: 'Covers medical expenses, hospital stays, and prescription medications.',
            reason: `Your health status (${data.healthStatus}) and age suggest comprehensive coverage with manageable deductibles.`
          },
          {
            type: 'Property Insurance',
            coverageAmount: Math.round(propertyInsuranceAmount / 1000) * 1000,
            priority: assets > 100000 ? 'High' : 'Medium',
            description: 'Protects your home, personal belongings, and provides liability coverage.',
            reason: `With assets valued at $${assets.toLocaleString()}, property insurance safeguards your investments from unexpected events.`
          },
          {
            type: 'Disability Insurance',
            coverageAmount: Math.round(disabilityInsuranceAmount / 1000) * 1000,
            priority: 'Medium',
            description: 'Replaces a portion of your income if you become disabled and cannot work.',
            reason: `Based on your income level and ${data.riskTolerance} risk tolerance, this provides essential income protection.`
          }
        ];
        
        setRecommendations(newRecommendations);
        setShowResults(true);
        setIsLoading(false);
        
        toast({
          title: "Simulation Complete",
          description: "Your personalized coverage recommendations are ready.",
        });

        // If language is not English, translate the results
        if (language !== 'en') {
          translateResults(newRecommendations, language);
        }
        
      }, 1500);
    } catch (error) {
      console.error('Error in simulation:', error);
      setIsLoading(false);
      toast({
        title: "Simulation Failed",
        description: "An error occurred during simulation. Please try again.",
        variant: "destructive",
      });
    }
  };

  const translateResults = async (recs: CoverageRecommendation[], targetLang: string) => {
    // Collect all strings that need translation
    const textsToTranslate: string[] = [];
    
    recs.forEach(rec => {
      textsToTranslate.push(rec.type);
      textsToTranslate.push(rec.description);
      textsToTranslate.push(rec.reason);
    });
    
    try {
      // Call the translation service
      const translatedTexts = await translateText(textsToTranslate, targetLang);
      
      // Create a map of original to translated text
      const translationMap: Record<string, string> = {};
      textsToTranslate.forEach((text, index) => {
        translationMap[text] = translatedTexts[index];
      });
      
      setTranslations(translationMap);
    } catch (error) {
      console.error('Translation error:', error);
      toast({
        title: "Translation Failed",
        description: "Could not translate results. Showing in English.",
        variant: "destructive",
      });
    }
  };

  const getTranslatedText = (text: string): string => {
    return translations[text] || text;
  };

  const handleLanguageChange = async (newLanguage: string) => {
    const lang = newLanguage as 'en' | 'es' | 'fr' | 'de';
    setLanguage(lang);
    
    if (lang !== 'en' && showResults) {
      translateResults(recommendations, lang);
    }
  };

  const resetForm = () => {
    form.reset();
    setShowResults(false);
    setRecommendations([]);
  };

  const getPriorityColor = (priority: 'High' | 'Medium' | 'Low') => {
    switch (priority) {
      case 'High': return 'text-red-500';
      case 'Medium': return 'text-yellow-500';
      case 'Low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-insura-cyberdark">
      <Navbar />
      <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block px-3 py-1 rounded-full bg-indigo-400/10 text-indigo-400 font-medium text-sm mb-4 border border-indigo-400/20">
              AI-Powered Tool
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 insura-gradient-text">
              Coverage Simulator
            </h1>
            <p className="text-xl text-gray-300">
              See how different life factors affect your insurance needs with our interactive AI-driven simulator.
            </p>
          </div>

          {!showResults ? (
            <div className="cyber-card rounded-xl p-8 max-w-4xl mx-auto">
              <div className="flex items-center mb-6">
                <SliderRange className="w-8 h-8 text-indigo-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">Insurance Needs Analysis</h2>
              </div>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(simulateCoverage)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="age"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Age</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter your age" 
                              type="number" 
                              min="18" 
                              max="100" 
                              className="bg-gray-800 border-gray-700 text-white"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="income"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Annual Income ($)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g. 60000" 
                              type="number" 
                              min="0" 
                              className="bg-gray-800 border-gray-700 text-white"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="dependents"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Number of Dependents</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                                <SelectValue placeholder="Select number of dependents" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="0">0</SelectItem>
                              <SelectItem value="1">1</SelectItem>
                              <SelectItem value="2">2</SelectItem>
                              <SelectItem value="3">3</SelectItem>
                              <SelectItem value="4">4</SelectItem>
                              <SelectItem value="5">5+</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="healthStatus"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Health Status</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                                <SelectValue placeholder="Select health status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="excellent">Excellent</SelectItem>
                              <SelectItem value="good">Good</SelectItem>
                              <SelectItem value="fair">Fair</SelectItem>
                              <SelectItem value="poor">Poor</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="assets"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Total Assets Value ($)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g. 350000" 
                              type="number" 
                              min="0" 
                              className="bg-gray-800 border-gray-700 text-white"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="riskTolerance"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Risk Tolerance</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                                <SelectValue placeholder="Select risk tolerance" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="low">Low (Risk Averse)</SelectItem>
                              <SelectItem value="moderate">Moderate</SelectItem>
                              <SelectItem value="high">High (Risk Tolerant)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="existingInsurance"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Existing Insurance (Optional)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="E.g., Health $5,000, Life $250,000" 
                            className="bg-gray-800 border-gray-700 text-white"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="pt-4">
                    <ButtonCustom
                      type="submit"
                      variant="primary"
                      size="lg"
                      fullWidth
                      className="bg-gradient-to-r from-indigo-400 to-insura-purple hover:shadow-lg hover:shadow-insura-purple/20"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Analyzing Your Insurance Needs...
                        </>
                      ) : (
                        <>
                          <Settings className="mr-2 h-5 w-5" />
                          Simulate Coverage Needs
                        </>
                      )}
                    </ButtonCustom>
                  </div>
                </form>
              </Form>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto animate-fade-in">
              <div className="cyber-card p-6 mb-8 rounded-xl border border-indigo-400/30">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center">
                    <Shield className="h-6 w-6 text-indigo-400 mr-3" />
                    <h3 className="text-xl font-bold text-white">Your Personalized Coverage Recommendations</h3>
                  </div>
                  <div className="flex space-x-2">
                    <Select onValueChange={handleLanguageChange} value={language}>
                      <SelectTrigger className="w-[100px] bg-gray-800 border-gray-700">
                        <SelectValue placeholder="Language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <ButtonCustom
                      variant="outline"
                      size="sm"
                      className="text-indigo-400 border-indigo-400"
                      onClick={toggleCurrency}
                    >
                      {currency === 'USD' ? 'Show INR' : 'Show USD'}
                    </ButtonCustom>
                    
                    <ButtonCustom
                      variant="outline"
                      size="sm"
                      onClick={resetForm}
                    >
                      New Simulation
                    </ButtonCustom>
                  </div>
                </div>
                <p className="mt-3 text-gray-300">
                  Based on your profile, our AI recommends the following insurance coverage options.
                </p>
              </div>

              <Tabs defaultValue="recommendations" className="space-y-6">
                <TabsList className="grid grid-cols-2 mb-6 bg-gray-900">
                  <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                  <TabsTrigger value="visualization">Visualization</TabsTrigger>
                </TabsList>
                
                <TabsContent value="recommendations" className="space-y-6">
                  {recommendations.map((rec, index) => (
                    <Card key={index} className="bg-gray-900 border border-gray-800 shadow-lg hover:shadow-indigo-400/10">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-xl text-white">{getTranslatedText(rec.type)}</CardTitle>
                          <div className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(rec.priority)}`}>
                            {rec.priority} Priority
                          </div>
                        </div>
                        <CardDescription className="text-gray-400">
                          {getTranslatedText(rec.description)}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-400">Recommended Coverage</span>
                            <span className="text-white font-medium">{formatCurrency(rec.coverageAmount)}</span>
                          </div>
                          <Progress 
                            value={80} 
                            className="h-2 bg-gray-800" 
                            indicatorClassName="bg-gradient-to-r from-indigo-400 to-insura-purple" 
                          />
                        </div>
                        <div className="flex items-start space-x-2 mt-4 bg-gray-800 p-3 rounded-lg">
                          <Lightbulb className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-gray-300">{getTranslatedText(rec.reason)}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  <div className="cyber-card p-6 mt-8 rounded-xl">
                    <h4 className="text-lg font-bold text-white mb-4 flex items-center">
                      <TrendingUp className="h-5 w-5 text-indigo-400 mr-2" />
                      Next Steps for Optimal Protection
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <p className="text-gray-300 text-sm">Compare policies from different providers to find the best coverage at competitive rates</p>
                      </div>
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <p className="text-gray-300 text-sm">Consider bundling multiple insurance types to potentially save on premiums</p>
                      </div>
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <p className="text-gray-300 text-sm">Review and update your coverage annually or after major life events</p>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex flex-wrap gap-4">
                      <ButtonCustom
                        variant="primary"
                        className="bg-gradient-to-r from-indigo-400 to-insura-purple"
                      >
                        <ArrowRight className="mr-2 h-4 w-4" />
                        Find Insurance Providers
                      </ButtonCustom>
                      
                      <ButtonCustom
                        variant="outline"
                        className="text-indigo-400 border-indigo-400"
                        onClick={resetForm}
                      >
                        Run Another Simulation
                      </ButtonCustom>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="visualization">
                  <Card className="bg-gray-900 border border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-xl text-white">Insurance Coverage Distribution</CardTitle>
                      <CardDescription>Visualizing your recommended coverage allocation</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {recommendations.map((rec, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-300">{getTranslatedText(rec.type)}</span>
                            <span className="text-white font-medium">{formatCurrency(rec.coverageAmount)}</span>
                          </div>
                          <div className="h-8 w-full bg-gray-800 rounded-md overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-indigo-400 to-insura-purple flex items-center pl-3"
                              style={{ 
                                width: `${Math.min(100, (rec.coverageAmount / 
                                  Math.max(...recommendations.map(r => r.coverageAmount))) * 100)}%` 
                              }}
                            >
                              <span className="text-xs font-medium text-white truncate">
                                {Math.round((rec.coverageAmount / 
                                  recommendations.reduce((sum, r) => sum + r.coverageAmount, 0)) * 100)}%
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <div className="mt-8 p-4 bg-gray-800 rounded-lg">
                        <h4 className="font-medium text-white mb-2 flex items-center">
                          <DollarSign className="h-4 w-4 text-indigo-400 mr-2" />
                          Estimated Monthly Cost
                        </h4>
                        <p className="text-gray-300 text-sm mb-4">
                          Based on average market rates for your profile, the estimated monthly cost for all recommended coverages is:
                        </p>
                        <div className="text-2xl font-bold text-white">
                          {formatCurrency(
                            recommendations.reduce((sum, rec) => {
                              // Rough estimate of monthly premium based on coverage amount
                              const monthlyRate = rec.type === 'Health Insurance' ? 0.01 : 0.001;
                              return sum + (rec.coverageAmount * monthlyRate);
                            }, 0)
                          )}
                          <span className="text-sm text-gray-400 font-normal ml-2">per month</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CoverageSimulatorPage;
