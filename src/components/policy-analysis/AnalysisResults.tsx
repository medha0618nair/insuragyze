
import React from 'react';
import { Check, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { ButtonCustom } from '@/components/ui/button-custom';
import { PolicyAnalysisResult } from '@/services/policyService';
import { useToast } from '@/hooks/use-toast';

interface AnalysisResultsProps {
  result: PolicyAnalysisResult;
  onReset: () => void;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ result, onReset }) => {
  const { toast } = useToast();

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Your policy summary is downloading",
    });
  };

  return (
    <div className="cyber-card rounded-xl p-8 max-w-4xl mx-auto animate-fade-in">
      <div className="mb-8 p-6 bg-green-900/20 border border-green-500/30 rounded-lg flex items-start">
        <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
        <div>
          <h4 className="font-medium text-white mb-2">Analysis Complete</h4>
          <p className="text-gray-300">
            We've analyzed your policy and simplified the key terms and conditions. See the breakdown below.
          </p>
        </div>
      </div>
      
      <div className="bg-black/60 rounded-lg border border-gray-800 p-6 mb-6 shadow-md">
        <h3 className="text-xl font-bold mb-4 text-white">Policy Summary</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-insura-neon mb-2">Coverage Highlights</h4>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
              <li>Home structure covered up to ${result.summary.coverageAmount.toLocaleString()}</li>
              <li>Personal property covered up to ${result.summary.personalProperty.toLocaleString()}</li>
              <li>Liability protection up to ${result.summary.liability.toLocaleString()}</li>
              {result.summary.waterDamageCovered && <li>Water damage from plumbing issues is covered</li>}
              {result.summary.theftCovered && <li>Theft and vandalism are covered</li>}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-insura-neon mb-2">Key Exclusions</h4>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
              {result.exclusions.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-insura-neon mb-2">Deductibles</h4>
            <p className="text-gray-300">
              Standard deductible: {typeof result.deductibles.standard === 'number' ? 
                `$${result.deductibles.standard.toLocaleString()}` : 
                result.deductibles.standard}<br />
              Wind/hail deductible: {result.deductibles.windHail}
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-insura-neon/5 rounded-lg p-6 border border-insura-neon/20 shadow-md">
        <h3 className="text-xl font-bold mb-4 text-white">AI Recommendations</h3>
        <ul className="space-y-4">
          {result.recommendations.map((rec: any, index: number) => (
            <li key={index} className="flex items-start">
              <div className={`p-1 rounded mr-3 flex-shrink-0 mt-1 ${
                rec.type === 'warning' ? 'bg-yellow-900/30 text-yellow-500' :
                rec.type === 'success' ? 'bg-green-900/30 text-green-500' :
                'bg-blue-900/30 text-blue-400'
              }`}>
                {rec.type === 'warning' ? (
                  <AlertCircle className="h-5 w-5" />
                ) : rec.type === 'success' ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <FileText className="h-5 w-5" />
                )}
              </div>
              <div>
                <p className="font-medium text-white">{rec.title}</p>
                <p className="text-gray-300">{rec.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
        <ButtonCustom
          variant="primary"
          size="lg"
          className="bg-gradient-to-r from-insura-neon to-insura-purple"
          onClick={handleDownload}
        >
          Download Summary
        </ButtonCustom>
        
        <ButtonCustom
          variant="outline"
          size="lg"
          className="border-gray-600 text-gray-300 hover:bg-gray-800"
          onClick={onReset}
        >
          Analyze Another Document
        </ButtonCustom>
      </div>
    </div>
  );
};

export default AnalysisResults;
