
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { analyzePolicyDocument, PolicyAnalysisResult } from '@/services/policyService';
import { useToast } from '@/hooks/use-toast';
import DocumentUploader from '@/components/policy-analysis/DocumentUploader';
import AnalysisResults from '@/components/policy-analysis/AnalysisResults';
import FeatureDescription from '@/components/policy-analysis/FeatureDescription';
import PageHeader from '@/components/policy-analysis/PageHeader';
import { BrainCircuit } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PolicyAnalysisPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<PolicyAnalysisResult | null>(null);
  const [rawResponse, setRawResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [showRawJson, setShowRawJson] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = (selectedFile: File) => {
    console.log('File selected:', selectedFile.name, selectedFile.type, selectedFile.size);
    setFile(selectedFile);
    setError(null); // Clear any previous errors
  };

  const handleAnalyzeDocument = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a file to analyze",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setRawResponse(null);
    
    try {
      const formData = new FormData();
      formData.append('document', file);
      
      console.log('Analyzing document:', file.name, file.type, file.size);
      console.log('FormData keys:', [...formData.keys()]);
      
      const result = await analyzePolicyDocument(formData);
      console.log('Analysis result received:', result);
      
      setAnalysisResult(result);
      setRawResponse(result); // Store the raw response
      
      toast({
        title: "Analysis Complete",
        description: "Your policy has been successfully simplified and analyzed",
      });
    } catch (error) {
      console.error("Error analyzing document:", error);
      setError("There was an error analyzing your document. The API endpoint may require specific file formats. Please try a PDF file or try again later.");
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your document. Please try a different file format or try again later.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setAnalysisResult(null);
    setRawResponse(null);
    setError(null);
    setShowRawJson(false);
  };

  const toggleRawJson = () => {
    setShowRawJson(!showRawJson);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <Navbar />
      <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <PageHeader />

          {!analysisResult ? (
            <div className="cyber-card rounded-xl p-8 max-w-3xl mx-auto">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-insura-neon/30 to-insura-purple/30 flex items-center justify-center border border-insura-neon/30 mb-6 shadow-lg shadow-insura-neon/10">
                  <BrainCircuit className="w-12 h-12 text-insura-neon" />
                </div>
                
                {error && (
                  <Alert variant="destructive" className="mb-6 w-full">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                <DocumentUploader 
                  onUpload={handleFileUpload}
                  isAnalyzing={isAnalyzing}
                  file={file}
                  onReset={handleReset}
                  onAnalyze={handleAnalyzeDocument}
                />
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-end mb-4">
                <Button 
                  onClick={toggleRawJson} 
                  variant="outline"
                  className="text-insura-neon border-insura-neon hover:bg-insura-neon/10"
                >
                  {showRawJson ? "Hide Raw JSON" : "Show Raw JSON"}
                </Button>
              </div>
              
              {showRawJson && rawResponse && (
                <div className="cyber-card rounded-xl p-6 mb-6 overflow-x-auto">
                  <h2 className="text-xl font-semibold text-white mb-4">Raw API Response</h2>
                  <pre className="bg-black/40 p-4 rounded-lg text-sm text-gray-300 overflow-x-auto whitespace-pre-wrap">
                    {JSON.stringify(rawResponse, null, 2)}
                  </pre>
                </div>
              )}
              
              <AnalysisResults result={analysisResult} onReset={handleReset} />
            </div>
          )}

          <FeatureDescription />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PolicyAnalysisPage;
