
import React, { useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BrainCircuit, Upload, FileText, Check, FileType, AlertCircle, CheckCircle } from 'lucide-react';
import { ButtonCustom } from '@/components/ui/button-custom';
import { analyzePolicyDocument, PolicyAnalysisResult } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

const PolicyAnalysisPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<PolicyAnalysisResult | null>(null);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSelectFileClick = () => {
    // Programmatically click the file input
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileUpload = async () => {
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
      formData.append('policyFile', file);
      
      const result = await analyzePolicyDocument(formData);
      setAnalysisResult(result);
      
      toast({
        title: "Analysis Complete",
        description: "Your policy has been successfully analyzed",
      });
    } catch (error) {
      console.error("Error analyzing document:", error);
      setIsAnalyzing(false);
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

  const getFileIcon = () => {
    if (!file) return <Upload className="w-16 h-16 text-insura-neon" />;
    
    const fileType = file.name.split('.').pop()?.toLowerCase();
    
    if (fileType === 'pdf') {
      return <FileType className="w-16 h-16 text-red-500" />;
    } else if (['doc', 'docx'].includes(fileType || '')) {
      return <FileText className="w-16 h-16 text-blue-600" />;
    } else if (['jpg', 'jpeg', 'png'].includes(fileType || '')) {
      return <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
    }
    
    return <FileText className="w-16 h-16 text-gray-500" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <Navbar />
      <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block px-3 py-1 rounded-full bg-insura-neon/10 text-insura-neon font-medium text-sm mb-4 border border-insura-neon/20">
              AI Policy Analysis
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 insura-gradient-text">
              Understand Your Insurance Policy In Plain Language
            </h1>
            <p className="text-xl text-gray-300">
              Upload any insurance policy document and our AI will translate complex terms into simple language you can understand.
            </p>
          </div>

          {!analysisResult ? (
            <div className="cyber-card rounded-xl p-8 max-w-3xl mx-auto">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-insura-neon/30 to-insura-purple/30 flex items-center justify-center border border-insura-neon/30 mb-6 shadow-lg shadow-insura-neon/10">
                  <BrainCircuit className="w-12 h-12 text-insura-neon" />
                </div>
                
                <div 
                  className={`w-full border-2 border-dashed rounded-lg p-8 mb-6 text-center transition-all duration-300 cursor-pointer ${
                    isDragging 
                      ? 'border-insura-neon bg-insura-neon/5' 
                      : file 
                        ? 'border-green-500 bg-green-900/10' 
                        : 'border-gray-700 hover:border-insura-neon/50'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={!file ? handleSelectFileClick : undefined}
                >
                  <div className="mb-6 flex justify-center">
                    {getFileIcon()}
                  </div>
                  
                  <h3 className="text-xl font-medium text-white mb-2">
                    {file 
                      ? `Selected file: ${file.name}` 
                      : 'Upload Your Policy Document'}
                  </h3>
                  
                  <p className="text-gray-400 mb-6">
                    {file 
                      ? `Type: ${file.type || 'Unknown'} · Size: ${(file.size / (1024 * 1024)).toFixed(2)} MB` 
                      : 'PDF, DOCX or TXT file (Max 10MB)'}
                  </p>
                  
                  {!file ? (
                    <label htmlFor="file-upload">
                      <ButtonCustom 
                        variant="primary" 
                        size="md"
                        className="bg-gradient-to-r from-insura-neon to-insura-purple"
                      >
                        Select File
                      </ButtonCustom>
                    </label>
                  ) : (
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                      <ButtonCustom 
                        variant="primary" 
                        size="md"
                        className="bg-gradient-to-r from-insura-neon to-insura-purple"
                        onClick={handleFileUpload}
                        disabled={isAnalyzing}
                      >
                        {isAnalyzing ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Analyzing...
                          </>
                        ) : (
                          'Analyze Document'
                        )}
                      </ButtonCustom>
                      
                      <ButtonCustom 
                        variant="outline" 
                        size="md"
                        className="border-gray-600 text-gray-300 hover:bg-gray-800"
                        onClick={handleReset}
                      >
                        Choose Different File
                      </ButtonCustom>
                    </div>
                  )}
                  
                  {/* Hidden file input */}
                  <input 
                    ref={fileInputRef}
                    id="file-upload" 
                    type="file" 
                    className="hidden" 
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                  />
                </div>
                
                <div className="text-center mt-12">
                  <h3 className="text-xl font-medium text-white mb-4">How It Works</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 bg-black/40 rounded-lg border border-gray-800">
                      <div className="w-12 h-12 rounded-full bg-insura-neon/20 flex items-center justify-center mx-auto mb-3">
                        <Upload className="w-6 h-6 text-insura-neon" />
                      </div>
                      <h4 className="font-medium text-white mb-2">1. Upload Document</h4>
                      <p className="text-gray-400 text-sm">Upload your insurance policy document in any common format</p>
                    </div>
                    
                    <div className="p-4 bg-black/40 rounded-lg border border-gray-800">
                      <div className="w-12 h-12 rounded-full bg-insura-purple/20 flex items-center justify-center mx-auto mb-3">
                        <BrainCircuit className="w-6 h-6 text-insura-purple" />
                      </div>
                      <h4 className="font-medium text-white mb-2">2. AI Processing</h4>
                      <p className="text-gray-400 text-sm">Our AI scans and analyzes your policy language and terms</p>
                    </div>
                    
                    <div className="p-4 bg-black/40 rounded-lg border border-gray-800">
                      <div className="w-12 h-12 rounded-full bg-teal-500/20 flex items-center justify-center mx-auto mb-3">
                        <FileText className="w-6 h-6 text-teal-500" />
                      </div>
                      <h4 className="font-medium text-white mb-2">3. Get Insights</h4>
                      <p className="text-gray-400 text-sm">Receive a simplified breakdown of your policy in plain language</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
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
                      <li>Home structure covered up to ${analysisResult.summary.coverageAmount.toLocaleString()}</li>
                      <li>Personal property covered up to ${analysisResult.summary.personalProperty.toLocaleString()}</li>
                      <li>Liability protection up to ${analysisResult.summary.liability.toLocaleString()}</li>
                      {analysisResult.summary.waterDamageCovered && <li>Water damage from plumbing issues is covered</li>}
                      {analysisResult.summary.theftCovered && <li>Theft and vandalism are covered</li>}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-insura-neon mb-2">Key Exclusions</h4>
                    <ul className="list-disc pl-5 space-y-2 text-gray-300">
                      {analysisResult.exclusions.map((item: string, index: number) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-insura-neon mb-2">Deductibles</h4>
                    <p className="text-gray-300">
                      Standard deductible: {typeof analysisResult.deductibles.standard === 'number' ? 
                        `$${analysisResult.deductibles.standard.toLocaleString()}` : 
                        analysisResult.deductibles.standard}<br />
                      Wind/hail deductible: {analysisResult.deductibles.windHail}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-insura-neon/5 rounded-lg p-6 border border-insura-neon/20 shadow-md">
                <h3 className="text-xl font-bold mb-4 text-white">AI Recommendations</h3>
                <ul className="space-y-4">
                  {analysisResult.recommendations.map((rec: any, index: number) => (
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
                  onClick={() => {
                    // Download functionality would go here
                    toast({
                      title: "Download Started",
                      description: "Your policy summary is downloading",
                    });
                  }}
                >
                  Download Summary
                </ButtonCustom>
                
                <ButtonCustom
                  variant="outline"
                  size="lg"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                  onClick={handleReset}
                >
                  Analyze Another Document
                </ButtonCustom>
              </div>
            </div>
          )}

          <div className="mt-16 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center insura-gradient-text">What You'll Discover</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="cyber-card rounded-xl p-6">
                <div className="flex items-start">
                  <div className="mr-4">
                    <Check className="w-6 h-6 text-insura-neon" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">Coverage Limitations</h3>
                    <p className="text-gray-400">Find out what's NOT covered in your policy that you might have assumed was included.</p>
                  </div>
                </div>
              </div>
              
              <div className="cyber-card rounded-xl p-6">
                <div className="flex items-start">
                  <div className="mr-4">
                    <Check className="w-6 h-6 text-insura-neon" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">Claim Requirements</h3>
                    <p className="text-gray-400">Learn exactly what documentation and evidence you need to provide when making a claim.</p>
                  </div>
                </div>
              </div>
              
              <div className="cyber-card rounded-xl p-6">
                <div className="flex items-start">
                  <div className="mr-4">
                    <Check className="w-6 h-6 text-insura-neon" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">Hidden Benefits</h3>
                    <p className="text-gray-400">Discover benefits and perks in your policy that you might not have been aware of.</p>
                  </div>
                </div>
              </div>
              
              <div className="cyber-card rounded-xl p-6">
                <div className="flex items-start">
                  <div className="mr-4">
                    <Check className="w-6 h-6 text-insura-neon" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">Policy Gaps</h3>
                    <p className="text-gray-400">Identify areas where your current coverage might leave you exposed to risks.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PolicyAnalysisPage;
