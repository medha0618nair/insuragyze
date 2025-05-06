
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BarChart3, PieChart, LineChart } from 'lucide-react';
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
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const PolicyVisualizationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const analysisResult = location.state?.analysisResult as PolicyAnalysisResult | null;

  // Navigate back to analysis page if there's no data
  if (!analysisResult) {
    React.useEffect(() => {
      navigate('/tools/policy-analysis');
    }, [navigate]);
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
          <div className="flex items-center justify-between mb-8">
            <Button 
              variant="outline" 
              onClick={() => navigate('/tools/policy-analysis')}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Back to Analysis
            </Button>
            
            <div className="text-right">
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                Policy Analysis Visualization
              </h1>
              <p className="text-gray-400">
                Visual breakdown of your policy analysis results
              </p>
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
                    <Tooltip content={customTooltip} />
                    <Legend />
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
                    <Tooltip content={customTooltip} />
                    <Legend />
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
                    <Tooltip content={customTooltip} />
                    <Legend />
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
              {analysisResult.keyPoints?.map((point, index) => (
                <div 
                  key={index} 
                  className="p-4 rounded-lg bg-black/30 border border-insura-neon/20"
                >
                  <h3 className="font-medium text-insura-neon mb-2">Key Point {index + 1}</h3>
                  <p className="text-gray-300">{point}</p>
                </div>
              )) || (
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
              )}
            </div>
          </div>

          {/* Download Report Button */}
          <div className="flex justify-center">
            <Button
              className="bg-gradient-to-r from-insura-neon to-insura-purple text-white px-8 py-2"
              onClick={() => {
                alert("Report download functionality would be implemented here");
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
