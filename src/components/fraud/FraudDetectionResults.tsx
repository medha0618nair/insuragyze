
import React from 'react';
import { FraudDetectionResult, FraudFlag } from '@/services/fraudDetectionService';
import { AlertCircle, CheckCircle, XCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import { ButtonCustom } from '@/components/ui/button-custom';

interface FraudDetectionResultsProps {
  result: FraudDetectionResult;
  onReset: () => void;
}

const FraudDetectionResults: React.FC<FraudDetectionResultsProps> = ({ result, onReset }) => {
  // Helper function to get the appropriate icon based on risk level
  const getRiskIcon = () => {
    switch (result.riskLevel) {
      case 'Very High':
        return <XCircle className="h-9 w-9 text-red-500" />;
      case 'High':
        return <AlertCircle className="h-9 w-9 text-orange-500" />;
      case 'Medium':
        return <AlertTriangle className="h-9 w-9 text-yellow-500" />;
      case 'Low':
        return <CheckCircle className="h-9 w-9 text-green-500" />;
      default:
        return <AlertCircle className="h-9 w-9 text-gray-500" />;
    }
  };

  // Helper function to get the color for the risk score gauge
  const getRiskScoreColor = () => {
    if (result.score > 80) return 'bg-red-500';
    if (result.score > 50) return 'bg-orange-500';
    if (result.score > 25) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  // Helper function to get the background color for a flag based on its severity
  const getFlagBgColor = (severity: string) => {
    switch (severity) {
      case 'High':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-white rounded-xl p-6 shadow-md">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            {getRiskIcon()}
            <div className="ml-4">
              <h2 className="text-2xl font-bold text-gray-800">Fraud Analysis Results</h2>
              <p className="text-gray-600">
                Claim analyzed with {result.flags.length} {result.flags.length === 1 ? 'flag' : 'flags'} detected
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">
              {result.score}/100
            </div>
            <p className={`font-semibold ${
              result.riskLevel === 'Very High' ? 'text-red-600' :
              result.riskLevel === 'High' ? 'text-orange-600' :
              result.riskLevel === 'Medium' ? 'text-yellow-600' :
              'text-green-600'
            }`}>
              {result.riskLevel} Risk
            </p>
          </div>
        </div>

        {/* Risk Score Gauge */}
        <div className="mb-8">
          <p className="text-sm text-gray-600 mb-2">Fraud Risk Score</p>
          <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full ${getRiskScoreColor()} rounded-full transition-all duration-1000 ease-out`}
              style={{ width: `${result.score}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0 (Safe)</span>
            <span>50 (Moderate)</span>
            <span>100 (High Risk)</span>
          </div>
        </div>

        {/* Fraud Flags */}
        {result.flags.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Detected Fraud Indicators</h3>
            <div className="space-y-3">
              {result.flags.map((flag, index) => (
                <div key={index} className={`rounded-lg border p-4 ${getFlagBgColor(flag.severity)}`}>
                  <div className="flex items-start">
                    {flag.severity === 'High' ? (
                      <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    ) : flag.severity === 'Medium' ? (
                      <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="font-medium">{flag.type}</p>
                      <p className="text-sm mt-1">{flag.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-xl p-6 shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Recommended Actions</h3>
        <ul className="space-y-3">
          {result.recommendations.map((recommendation, index) => (
            <li key={index} className="flex items-start">
              <ArrowRight className="h-5 w-5 text-insura-blue mr-2 flex-shrink-0 mt-0.5" />
              <span>{recommendation}</span>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex gap-4">
          <ButtonCustom onClick={onReset} variant="outline" size="lg" className="flex-1">
            Analyze Another Claim
          </ButtonCustom>
          <ButtonCustom variant="primary" size="lg" className="flex-1 bg-gradient-to-r from-insura-neon to-insura-purple">
            Save Report
          </ButtonCustom>
        </div>
      </div>
    </div>
  );
};

export default FraudDetectionResults;
