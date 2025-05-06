
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonCustom } from '@/components/ui/button-custom';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Check, AlertCircle, BarChart3 } from 'lucide-react';
import { PolicyAnalysisResult } from '@/services/policyService';

interface AnalysisResultsProps {
  result: PolicyAnalysisResult;
  onReset: () => void;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ result, onReset }) => {
  const navigate = useNavigate();

  const handleViewVisualizations = () => {
    navigate('/tools/policy-visualization', { state: { analysisResult: result } });
  };

  // Determine coverage status
  const getCoverageStatus = () => {
    const score = result.coverageScore || 75;
    if (score >= 80) return { text: "Excellent", color: "text-green-500", bg: "bg-green-500/10" };
    if (score >= 60) return { text: "Good", color: "text-blue-500", bg: "bg-blue-500/10" };
    if (score >= 40) return { text: "Average", color: "text-yellow-500", bg: "bg-yellow-500/10" };
    return { text: "Poor", color: "text-red-500", bg: "bg-red-500/10" };
  };
  
  const coverageStatus = getCoverageStatus();

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="cyber-card rounded-xl p-8 mb-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Policy Analysis Results</h2>
          <div className={`px-3 py-1 rounded-full ${coverageStatus.bg} ${coverageStatus.color} text-xs font-medium`}>
            {coverageStatus.text} Coverage
          </div>
        </div>
        
        {/* Simplified Version */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-white">In Simple Terms</h3>
          <div className="p-5 rounded-lg bg-black/40 border border-insura-neon/30">
            <p className="text-gray-300">{result.simplifiedExplanation}</p>
          </div>
        </div>
        
        {/* Key Points */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-white">Key Points</h3>
          <div className="space-y-3">
            {result.keyPoints?.map((point, index) => (
              <div key={index} className="flex items-start">
                <div className="p-1 rounded-full bg-green-500/20 mt-1 mr-3">
                  <Check className="h-4 w-4 text-green-500" />
                </div>
                <p className="text-gray-300">{point}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Coverage Details */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-white">Coverage Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-black/30 border border-gray-700">
              <h4 className="font-medium text-white mb-2">What's Covered</h4>
              <ul className="list-disc pl-5 space-y-1">
                {result.covered?.map((item, index) => (
                  <li key={index} className="text-gray-300">{item}</li>
                ))}
              </ul>
            </div>
            
            <div className="p-4 rounded-lg bg-black/30 border border-gray-700">
              <h4 className="font-medium text-white mb-2">What's Not Covered</h4>
              <ul className="list-disc pl-5 space-y-1">
                {result.notCovered?.map((item, index) => (
                  <li key={index} className="text-gray-300">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Potential Issues */}
        {result.potentialIssues && result.potentialIssues.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-white">Potential Issues</h3>
            <Alert variant="destructive" className="border-destructive/20 bg-destructive/10">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Important</AlertTitle>
              <AlertDescription className="space-y-2">
                {result.potentialIssues.map((issue, index) => (
                  <p key={index}>{issue}</p>
                ))}
              </AlertDescription>
            </Alert>
          </div>
        )}
        
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <ButtonCustom 
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-800"
            onClick={onReset}
          >
            Analyze Another Document
          </ButtonCustom>
          
          <ButtonCustom 
            variant="primary"
            className="bg-gradient-to-r from-insura-neon to-insura-purple"
            onClick={() => {
              // Download functionality would be here
              console.log("Downloading report...");
            }}
          >
            Download Analysis Report
          </ButtonCustom>
          
          <ButtonCustom 
            variant="primary"
            className="bg-gradient-to-r from-insura-purple to-blue-600 flex items-center gap-2"
            onClick={handleViewVisualizations}
          >
            <BarChart3 className="h-5 w-5" />
            View Data Visualizations
          </ButtonCustom>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;
