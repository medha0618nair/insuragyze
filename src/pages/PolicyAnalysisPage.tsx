
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { analyzePolicyDocument, PolicyAnalysisResult } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import DocumentUploader from '@/components/policy-analysis/DocumentUploader';
import AnalysisResults from '@/components/policy-analysis/AnalysisResults';
import FeatureDescription from '@/components/policy-analysis/FeatureDescription';
import PageHeader from '@/components/policy-analysis/PageHeader';
import { BrainCircuit } from 'lucide-react';

const PolicyAnalysisPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<PolicyAnalysisResult | null>(null);
  const { toast } = useToast();

  const handleFileUpload = async (selectedFile: File) => {
    setFile(selectedFile);
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
    
    try {
      const formData = new FormData();
      formData.append('document', file);
      
      const result = await analyzePolicyDocument(formData);
      setAnalysisResult(result);
      
      toast({
        title: "Analysis Complete",
        description: "Your policy has been successfully analyzed",
      });
    } catch (error) {
      console.error("Error analyzing document:", error);
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your document. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setAnalysisResult(null);
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
                
                <DocumentUploader 
                  onUpload={handleFileUpload}
                  isAnalyzing={isAnalyzing}
                  file={file}
                  onReset={handleReset}
                />
              </div>
            </div>
          ) : (
            <AnalysisResults result={analysisResult} onReset={handleReset} />
          )}

          <FeatureDescription />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PolicyAnalysisPage;
