
import React, { useState, useRef } from 'react';
import { ButtonCustom } from './ui/button-custom';
import { Upload, FileType, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { analyzePolicyDocument } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

const PolicyAnalyzer = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

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

  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;
    
    setIsAnalyzing(true);
    
    try {
      const formData = new FormData();
      formData.append('policyFile', file);
      
      const result = await analyzePolicyDocument(formData);
      setAnalysisResult(result);
      setIsAnalyzed(true);
      
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
    setIsAnalyzed(false);
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
    <section id="policy-analyzer" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="container mx-auto">
        <div className="cyber-card rounded-2xl overflow-hidden shadow-lg max-w-4xl mx-auto">
          <div className="p-8 md:p-12">
            <div className="text-center mb-10">
              <div className="inline-block px-3 py-1 rounded-full bg-insura-neon/10 text-insura-neon font-medium text-sm mb-4 border border-insura-neon/20">
                AI Policy Analysis
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Decode Your Insurance Policy
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Upload your insurance policy and our AI will translate complex terms into simple language that's easy to understand.
              </p>
            </div>

            <div className="bg-black/30 rounded-lg p-6 border border-gray-800 mb-8">
              <h4 className="font-medium text-white mb-2 flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                How it works
              </h4>
              <p className="text-gray-300 mb-4">
                Our AI reads and analyzes your insurance policy, identifying important terms, coverage limits, exclusions, and conditions.
              </p>
              
              <h4 className="font-medium text-white mb-2 flex items-center">
                <AlertCircle className="w-5 h-5 text-insura-neon mr-2" />
                Privacy guarantee
              </h4>
              <p className="text-gray-300">
                Your document is processed securely. We don't store your policy document after analysis is complete.
              </p>
            </div>
            
            {!isAnalyzed ? (
              <div 
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                  isDragging ? 'border-insura-neon bg-insura-neon/10' : 'border-gray-700 hover:border-gray-500'
                } ${file ? 'bg-black/20' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={!file ? handleFileSelect : undefined}
              >
                <div className="mb-4 flex justify-center">
                  {getFileIcon()}
                </div>
                
                {file ? (
                  <div>
                    <p className="font-medium text-white mb-2">{file.name}</p>
                    <p className="text-gray-400 text-sm mb-4">
                      {(file.size / 1024 / 1024).toFixed(2)} MB • {file.type}
                    </p>
                    
                    <div className="flex justify-center gap-4">
                      <ButtonCustom
                        variant="primary"
                        size="md"
                        className="bg-gradient-to-r from-insura-neon to-insura-purple"
                        onClick={handleAnalyze}
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
                          'Analyze Policy'
                        )}
                      </ButtonCustom>
                      
                      <ButtonCustom
                        variant="outline"
                        size="md"
                        onClick={handleReset}
                      >
                        Choose Different File
                      </ButtonCustom>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="font-medium text-white mb-2">
                      Drag and drop your insurance policy here
                    </p>
                    <p className="text-gray-400 text-sm mb-4">
                      or click to select a file
                    </p>
                    <label htmlFor="file-upload">
                      <ButtonCustom 
                        variant="primary" 
                        size="md"
                        className="bg-gradient-to-r from-insura-neon to-insura-purple"
                      >
                        Select File
                      </ButtonCustom>
                    </label>
                  </>
                )}

                <input
                  ref={fileInputRef}
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                />
              </div>
            ) : (
              <div className="bg-black/30 rounded-lg p-6 border border-gray-800">
                <div className="mb-6 flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                  <h3 className="text-xl font-bold text-white">Analysis Complete</h3>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium text-insura-neon mb-2">Coverage Highlights</h4>
                  <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    <li>Home structure covered up to ${analysisResult?.summary?.coverageAmount?.toLocaleString()}</li>
                    <li>Personal property covered up to ${analysisResult?.summary?.personalProperty?.toLocaleString()}</li>
                    <li>Liability protection up to ${analysisResult?.summary?.liability?.toLocaleString()}</li>
                    {analysisResult?.summary?.waterDamageCovered && <li>Water damage from plumbing issues is covered</li>}
                    {analysisResult?.summary?.theftCovered && <li>Theft and vandalism are covered</li>}
                  </ul>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium text-insura-neon mb-2">Key Exclusions</h4>
                  <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    {analysisResult?.exclusions?.map((exclusion: string, index: number) => (
                      <li key={index}>{exclusion}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium text-insura-neon mb-2">Deductibles</h4>
                  <p className="text-gray-300">
                    Standard deductible: ${analysisResult?.deductibles?.standard}<br />
                    Wind/hail deductible: {analysisResult?.deductibles?.windHail}
                  </p>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium text-insura-neon mb-2">Recommendations</h4>
                  {analysisResult?.recommendations?.map((rec: any, index: number) => (
                    <div key={index} className="flex items-start mb-4">
                      <div className={`p-1 rounded mr-3 flex-shrink-0 mt-1 ${
                        rec.type === 'warning' ? 'bg-yellow-900/30 text-yellow-500' :
                        rec.type === 'success' ? 'bg-green-900/30 text-green-500' :
                        'bg-blue-900/30 text-blue-400'
                      }`}>
                        {rec.type === 'warning' ? (
                          <AlertCircle className="h-5 w-5" />
                        ) : rec.type === 'success' ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          <FileText className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-white">{rec.title}</p>
                        <p className="text-gray-300">{rec.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-center gap-4">
                  <ButtonCustom
                    variant="outline"
                    size="md"
                    onClick={handleReset}
                  >
                    Analyze Another Policy
                  </ButtonCustom>
                  
                  <ButtonCustom
                    variant="primary"
                    size="md"
                    className="bg-gradient-to-r from-insura-neon to-insura-purple"
                    onClick={() => {
                      toast({
                        title: "Download Started",
                        description: "Your policy summary is downloading",
                      });
                    }}
                  >
                    Download Summary
                  </ButtonCustom>
                </div>
              </div>
            )}
            
            <div className="text-center mt-6">
              <Link to="/tools/policy-analysis">
                <ButtonCustom
                  variant="primary"
                  size="lg"
                  className="bg-gradient-to-r from-insura-neon to-insura-purple hover:shadow-lg hover:shadow-insura-purple/20 cursor-pointer"
                >
                  Analyze My Policy Now
                </ButtonCustom>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PolicyAnalyzer;
