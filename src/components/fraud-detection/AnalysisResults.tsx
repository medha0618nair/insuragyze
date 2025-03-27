
import React from 'react';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { FraudCheckResult } from '@/services/claimService';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface AnalysisResultsProps {
  results: FraudCheckResult[];
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ results }) => {
  const getRiskBadge = (riskLevel: 'low' | 'medium' | 'high') => {
    switch (riskLevel) {
      case 'low':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Low Risk
          </span>
        );
      case 'medium':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Medium Risk
          </span>
        );
      case 'high':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
            <XCircle className="w-3 h-3 mr-1" />
            High Risk
          </span>
        );
    }
  };

  return (
    <div className="glass-card rounded-xl p-6">
      <h2 className="text-2xl font-semibold mb-4 text-white">Analysis Results</h2>
      
      {results.length > 0 ? (
        <div className="space-y-6">
          {/* Latest result details */}
          <div className="bg-black/50 border border-gray-800 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-white font-medium">Policy #{results[0].policyNumber}</h3>
                <p className="text-sm text-gray-400">ID: {results[0].id}</p>
              </div>
              {getRiskBadge(results[0].riskLevel)}
            </div>
            
            <div className="mt-4">
              <div className="h-2 w-full bg-gray-700 rounded-full">
                <div 
                  className="h-2 rounded-full" 
                  style={{
                    width: `${results[0].fraudProbability}%`,
                    backgroundColor: results[0].riskLevel === 'low' ? '#10B981' : 
                                    results[0].riskLevel === 'medium' ? '#F59E0B' : '#EF4444'
                  }}
                ></div>
              </div>
              <p className="text-gray-400 text-sm mt-1">Fraud Probability: {results[0].fraudProbability.toFixed(1)}%</p>
            </div>
            
            <div className="mt-4">
              <h4 className="text-white text-sm font-medium mb-2">Risk Factors:</h4>
              <ul className="space-y-1 text-sm">
                {results[0].riskFactors.map((factor, index) => (
                  <li key={index} className="text-gray-400 flex items-start">
                    <span className="inline-block w-1.5 h-1.5 bg-gray-500 rounded-full mt-1.5 mr-2"></span>
                    {factor}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Previous results table */}
          {results.length > 1 && (
            <div>
              <h3 className="text-white text-lg font-medium mb-2">Previous Analyses</h3>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Policy #</TableHead>
                      <TableHead>Risk Level</TableHead>
                      <TableHead>Probability</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.slice(1).map((result) => (
                      <TableRow key={result.id}>
                        <TableCell className="font-medium">{result.id}</TableCell>
                        <TableCell>{result.policyNumber}</TableCell>
                        <TableCell>{getRiskBadge(result.riskLevel)}</TableCell>
                        <TableCell>{result.fraudProbability.toFixed(1)}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
          <AlertTriangle className="w-12 h-12 mb-4 text-gray-600" />
          <p className="text-center">No claims analyzed yet. Submit claim details to see results.</p>
        </div>
      )}
    </div>
  );
};

export default AnalysisResults;
