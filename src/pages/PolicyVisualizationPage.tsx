
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BarChart3, PieChart, LineChart, Languages } from 'lucide-react';
import { PolicyAnalysisResult } from '@/services/policyService';
import { 
  ChartContainer, 
  ChartLegend,
  ChartLegendContent
} from '@/components/ui/chart';
import {
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend as RechartsLegend,
  ResponsiveContainer
} from 'recharts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { translateText } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

// Custom type for translated content
interface TranslatedContent {
  title: string;
  description: string;
  keyPoints: string[];
  keyInsights: {
    title: string;
    content: string;
  }[];
}

const PolicyVisualizationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const analysisResult = location.state?.analysisResult as PolicyAnalysisResult | null;
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [translatedContent, setTranslatedContent] = useState<TranslatedContent | null>(null);

  // Language options
  const languages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'zh', label: 'Chinese' },
    { value: 'ja', label: 'Japanese' },
    { value: 'ko', label: 'Korean' },
    { value: 'ar', label: 'Arabic' },
    { value: 'ru', label: 'Russian' },
    { value: 'pt', label: 'Portuguese' }
  ];

  // Navigate back to analysis page if there's no data
  useEffect(() => {
    if (!analysisResult) {
      navigate('/tools/policy-analysis');
    }
  }, [analysisResult, navigate]);

  // Translate content when language changes
  useEffect(() => {
    if (selectedLanguage === 'en') {
      setTranslatedContent(null);
      return;
    }
    
    const translateContent = async () => {
      if (!analysisResult) return;
      
      setIsTranslating(true);
      try {
        // Prepare texts for translation
        const textsToTranslate = [
          "Policy Analysis Visualization", 
          "Visual breakdown of your policy analysis results"
        ];
        
        // Add key points
        if (analysisResult.keyPoints) {
          textsToTranslate.push(...analysisResult.keyPoints);
        }
        
        // Add insight titles and content
        textsToTranslate.push("Coverage Gaps");
        textsToTranslate.push("Your policy has potential coverage gaps in personal property protection.");
        textsToTranslate.push("Premium Assessment");
        textsToTranslate.push("Your premium is within the expected range for your coverage level.");
        textsToTranslate.push("Recommendations");
        textsToTranslate.push("Consider increasing liability coverage for better protection.");
        
        // Call translation service
        const translatedTexts = await translateText(textsToTranslate, selectedLanguage);
        
        // Update state with translated content
        if (translatedTexts && translatedTexts.length >= 2) {
          const translatedKeyPoints = analysisResult.keyPoints 
            ? translatedTexts.slice(2, 2 + analysisResult.keyPoints.length)
            : [];
          
          let startIdx = 2 + (analysisResult.keyPoints?.length || 0);
          
          setTranslatedContent({
            title: translatedTexts[0],
            description: translatedTexts[1],
            keyPoints: translatedKeyPoints,
            keyInsights: [
              { 
                title: translatedTexts[startIdx], 
                content: translatedTexts[startIdx + 1] 
              },
              { 
                title: translatedTexts[startIdx + 2], 
                content: translatedTexts[startIdx + 3] 
              },
              { 
                title: translatedTexts[startIdx + 4], 
                content: translatedTexts[startIdx + 5] 
              }
            ]
          });
        }
        
        toast({
          title: "Translation Complete",
          description: "The content has been translated successfully.",
        });
      } catch (error) {
        console.error("Translation error:", error);
        toast({
          title: "Translation Error",
          description: "There was an error translating the content. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsTranslating(false);
      }
    };
    
    translateContent();
  }, [selectedLanguage, analysisResult, toast]);

  if (!analysisResult) {
    return null;
  }

  // Generate sample chart data based on the analysis result
  const generateChartData = () => {
    // Risk score breakdown
    const riskScoreData = [
      { name: 'Coverage Adequacy', value: analysisResult.riskScore?.coverageScore || 75 },
      { name: 'Policy Clarity', value: analysisResult.riskScore?.clarityScore || 60 },
      { name: 'Exclusion Risk', value: analysisResult.riskScore?.exclusionRisk || 45 },
      { name: 'Premium Value', value: analysisResult.riskScore?.premiumValue || 80 }
    ];

    // Coverage comparison
    const coverageComparisonData = [
      { name: 'Medical', current: analysisResult.coverage?.medical || 5000, recommended: 8000 },
      { name: 'Property', current: analysisResult.coverage?.property || 200000, recommended: 250000 },
      { name: 'Liability', current: analysisResult.coverage?.liability || 100000, recommended: 150000 },
      { name: 'Personal', current: analysisResult.coverage?.personal || 25000, recommended: 35000 }
    ];

    // Risk trend (simulated data)
    const riskTrendData = Array.from({ length: 12 }, (_, i) => {
      const baseRisk = analysisResult.overallRiskScore || 65;
      const variation = Math.sin(i / 2) * 10;
      return {
        month: new Date(2024, i, 1).toLocaleString('default', { month: 'short' }),
        risk: Math.max(0, Math.min(100, baseRisk + variation))
      };
    });

    return {
      riskScoreData,
      coverageComparisonData,
      riskTrendData
    };
  };

  const chartData = generateChartData();
  
  // Colors for charts
  const COLORS = ['#9b87f5', '#7E69AB', '#6E59A5', '#D6BCFA'];
  const CHART_CONFIG = {
    bar1: { color: "#9b87f5", label: "Current" },
    bar2: { color: "#D6BCFA", label: "Recommended" },
    line: { color: "#7E69AB" }
  };

  const customTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black/80 border border-gray-700 p-2 rounded-md text-xs">
          <p className="text-white">{`${label || ''}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`item-${index}`} className="text-white">
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <Navbar />
      <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/tools/policy-analysis')}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Back to Analysis
            </Button>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-black/40 p-2 rounded-md border border-gray-700">
                <Languages size={18} className="text-insura-neon" />
                <Select
                  value={selectedLanguage}
                  onValueChange={setSelectedLanguage}
                >
                  <SelectTrigger className="w-[180px] bg-transparent border-none focus:ring-0 focus:ring-offset-0">
                    <SelectValue placeholder="Select Language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="text-right">
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  {translatedContent ? translatedContent.title : "Policy Analysis Visualization"}
                </h1>
                <p className="text-gray-400">
                  {translatedContent ? translatedContent.description : "Visual breakdown of your policy analysis results"}
                </p>
                {isTranslating && (
                  <span className="text-xs text-insura-neon animate-pulse">Translating...</span>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Risk Score Breakdown */}
            <div className="cyber-card rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">Risk Score Breakdown</h2>
                <PieChart className="h-5 w-5 text-insura-neon" />
              </div>
              <div className="h-80">
                <ChartContainer 
                  config={CHART_CONFIG}
                  className="h-full"
                >
                  <RechartsPieChart>
                    <Pie
                      data={chartData.riskScoreData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {chartData.riskScoreData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip content={customTooltip} />
                    <RechartsLegend />
                  </RechartsPieChart>
                </ChartContainer>
              </div>
              <div className="mt-4">
                <div className="p-3 rounded-md bg-black/30 border border-insura-neon/20">
                  <p className="text-gray-300 text-sm">
                    Overall Risk Score: <span className="text-insura-neon font-semibold text-lg">{analysisResult.overallRiskScore || 65}</span>/100
                  </p>
                </div>
              </div>
            </div>

            {/* Coverage Comparison */}
            <div className="cyber-card rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">Coverage Comparison</h2>
                <BarChart3 className="h-5 w-5 text-insura-purple" />
              </div>
              <div className="h-80">
                <ChartContainer 
                  config={CHART_CONFIG}
                  className="h-full"
                >
                  <RechartsBarChart
                    data={chartData.coverageComparisonData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="name" stroke="#888" />
                    <YAxis stroke="#888" />
                    <RechartsTooltip content={customTooltip} />
                    <RechartsLegend />
                    <Bar dataKey="current" name="Current Coverage" fill={CHART_CONFIG.bar1.color} barSize={30} />
                    <Bar dataKey="recommended" name="Recommended" fill={CHART_CONFIG.bar2.color} barSize={30} />
                  </RechartsBarChart>
                </ChartContainer>
              </div>
              <div className="mt-4">
                <div className="p-3 rounded-md bg-black/30 border border-purple-500/20">
                  <p className="text-gray-300 text-sm">
                    Coverage adequacy: <span className="text-purple-400 font-semibold">{analysisResult.coverageAdequacy || "Moderate"}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Risk Trend */}
            <div className="cyber-card rounded-xl p-6 lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">Policy Risk Trend Analysis</h2>
                <LineChart className="h-5 w-5 text-green-400" />
              </div>
              <div className="h-80">
                <ChartContainer 
                  config={CHART_CONFIG}
                  className="h-full"
                >
                  <RechartsLineChart
                    data={chartData.riskTrendData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="month" stroke="#888" />
                    <YAxis stroke="#888" />
                    <RechartsTooltip content={customTooltip} />
                    <RechartsLegend />
                    <Line
                      type="monotone"
                      dataKey="risk"
                      name="Risk Score"
                      stroke={CHART_CONFIG.line.color}
                      strokeWidth={3}
                      dot={{ r: 6 }}
                      activeDot={{ r: 8 }}
                    />
                  </RechartsLineChart>
                </ChartContainer>
              </div>
            </div>
          </div>

          {/* Key Insights */}
          <div className="cyber-card rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Key Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {translatedContent && translatedContent.keyPoints.length > 0 ? (
                // Translated key points if available
                translatedContent.keyPoints.map((point, index) => (
                  <div 
                    key={index} 
                    className="p-4 rounded-lg bg-black/30 border border-insura-neon/20"
                  >
                    <h3 className="font-medium text-insura-neon mb-2">Key Point {index + 1}</h3>
                    <p className="text-gray-300">{point}</p>
                  </div>
                ))
              ) : analysisResult.keyPoints?.map((point, index) => (
                // Original key points
                <div 
                  key={index} 
                  className="p-4 rounded-lg bg-black/30 border border-insura-neon/20"
                >
                  <h3 className="font-medium text-insura-neon mb-2">Key Point {index + 1}</h3>
                  <p className="text-gray-300">{point}</p>
                </div>
              )) || (
                // Fallback insights if no key points available
                translatedContent ? (
                  <>
                    <div className="p-4 rounded-lg bg-black/30 border border-insura-neon/20">
                      <h3 className="font-medium text-insura-neon mb-2">{translatedContent.keyInsights[0].title}</h3>
                      <p className="text-gray-300">{translatedContent.keyInsights[0].content}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-black/30 border border-insura-purple/20">
                      <h3 className="font-medium text-insura-purple mb-2">{translatedContent.keyInsights[1].title}</h3>
                      <p className="text-gray-300">{translatedContent.keyInsights[1].content}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-black/30 border border-green-500/20">
                      <h3 className="font-medium text-green-400 mb-2">{translatedContent.keyInsights[2].title}</h3>
                      <p className="text-gray-300">{translatedContent.keyInsights[2].content}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-4 rounded-lg bg-black/30 border border-insura-neon/20">
                      <h3 className="font-medium text-insura-neon mb-2">Coverage Gaps</h3>
                      <p className="text-gray-300">Your policy has potential coverage gaps in personal property protection.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-black/30 border border-insura-purple/20">
                      <h3 className="font-medium text-insura-purple mb-2">Premium Assessment</h3>
                      <p className="text-gray-300">Your premium is within the expected range for your coverage level.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-black/30 border border-green-500/20">
                      <h3 className="font-medium text-green-400 mb-2">Recommendations</h3>
                      <p className="text-gray-300">Consider increasing liability coverage for better protection.</p>
                    </div>
                  </>
                )
              )}
            </div>
          </div>

          {/* Download Report Button */}
          <div className="flex justify-center">
            <Button
              className="bg-gradient-to-r from-insura-neon to-insura-purple text-white px-8 py-2"
              onClick={() => {
                toast({
                  title: "Report Download",
                  description: "Report download functionality would be implemented here",
                });
              }}
            >
              Download Full Visualization Report
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PolicyVisualizationPage;
