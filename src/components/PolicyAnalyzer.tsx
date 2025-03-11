
import React, { useState } from 'react';
import { ButtonCustom } from './ui/button-custom';
import { Upload, FileType, FileText, CheckCircle, AlertCircle } from 'lucide-react';

const PolicyAnalyzer = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);

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

  const handleAnalyze = () => {
    if (!file) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis process
    setTimeout(() => {
      setIsAnalyzing(false);
      setIsAnalyzed(true);
    }, 2500);
  };

  const handleReset = () => {
    setFile(null);
    setIsAnalyzed(false);
  };

  const getFileIcon = () => {
    if (!file) return <Upload className="w-16 h-16 text-insura-blue" />;
    
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
    <section id="policy-analyzer" className="py-20 px-4 sm:px-6 lg:px-8 bg-insura-lightblue">
      <div className="container mx-auto">
        <div className="glass-card rounded-2xl overflow-hidden shadow-lg max-w-4xl mx-auto">
          <div className="p-8 md:p-12">
            <div className="text-center mb-10">
              <div className="inline-block px-3 py-1 rounded-full bg-insura-blue/10 text-insura-blue font-medium text-sm mb-4">
                AI Policy Analysis
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                Decode Your Insurance Policy
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Upload your insurance policy and our AI will translate complex terms into simple language that's easy to understand.
              </p>
            </div>

            {!isAnalyzed ? (
              <>
                <div 
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                    isDragging 
                      ? 'border-insura-blue bg-insura-blue/5' 
                      : file 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-300 hover:border-insura-blue'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className="mb-6 flex justify-center">
                    {getFileIcon()}
                  </div>
                  
                  <h3 className="text-xl font-medium mb-3 text-gray-900">
                    {file 
                      ? `Selected file: ${file.name}` 
                      : 'Drag and drop your policy document here'}
                  </h3>
                  
                  <p className="text-gray-600 mb-6">
                    {file 
                      ? `Type: ${file.type || 'Unknown'} · Size: ${(file.size / (1024 * 1024)).toFixed(2)} MB` 
                      : 'Supported formats: PDF, DOC, DOCX, JPG, PNG'}
                  </p>
                  
                  {!file && (
                    <label 
                      htmlFor="file-upload" 
                      className="cursor-pointer"
                    >
                      <div className="insura-button-secondary inline-flex">
                        <Upload className="w-5 h-5 mr-2" />
                        Browse Files
                      </div>
                      <input 
                        id="file-upload" 
                        type="file" 
                        className="hidden" 
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                      />
                    </label>
                  )}
                  
                  {file && (
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                      <ButtonCustom
                        variant="primary"
                        size="lg"
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
                          'Analyze Document'
                        )}
                      </ButtonCustom>
                      
                      <ButtonCustom
                        variant="outline"
                        size="lg"
                        onClick={handleReset}
                      >
                        Choose Different File
                      </ButtonCustom>
                    </div>
                  )}
                </div>
                
                <div className="mt-8 bg-white/50 rounded-lg p-6 border border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    How it works
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Our AI reads and analyzes your insurance policy, identifying important terms, coverage limits, exclusions, and conditions.
                  </p>
                  
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                    <AlertCircle className="w-5 h-5 text-insura-blue mr-2" />
                    Privacy guarantee
                  </h4>
                  <p className="text-gray-600">
                    Your document is processed securely. We don't store your policy document after analysis is complete.
                  </p>
                </div>
              </>
            ) : (
              <div className="animate-fade-in">
                <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-lg flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Analysis Complete</h4>
                    <p className="text-gray-600">
                      We've analyzed your policy and simplified the key terms and conditions. See the breakdown below.
                    </p>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Policy Summary</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Coverage Highlights</h4>
                      <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        <li>Home structure covered up to $350,000</li>
                        <li>Personal property covered up to $175,000</li>
                        <li>Liability protection up to $300,000</li>
                        <li>Water damage from plumbing issues is covered</li>
                        <li>Theft and vandalism are covered</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Key Exclusions</h4>
                      <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        <li>Flood damage is not covered (separate policy needed)</li>
                        <li>Earthquake damage is not covered</li>
                        <li>Damage from neglect or poor maintenance</li>
                        <li>Business equipment valued over $2,500</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Deductibles</h4>
                      <p className="text-gray-700">
                        Standard deductible: $1,000<br />
                        Wind/hail deductible: 2% of dwelling coverage
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-insura-blue/5 rounded-lg p-6 border border-insura-blue/20">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">AI Recommendations</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="bg-yellow-100 p-1 rounded text-yellow-600 mr-3 flex-shrink-0 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Consider Flood Insurance</p>
                        <p className="text-gray-600">Your home is in a moderate flood zone, but your policy doesn't cover flood damage.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-green-100 p-1 rounded text-green-600 mr-3 flex-shrink-0 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Good Liability Coverage</p>
                        <p className="text-gray-600">Your liability coverage of $300,000 is adequate for your property value.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-insura-lightblue p-1 rounded text-insura-blue mr-3 flex-shrink-0 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Tip: Inventory Your Possessions</p>
                        <p className="text-gray-600">Creating a home inventory can help ensure you have adequate personal property coverage.</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                  <ButtonCustom
                    variant="primary"
                    size="lg"
                    onClick={() => {
                      // Download functionality would go here
                      console.log('Download summary');
                    }}
                  >
                    Download Summary
                  </ButtonCustom>
                  
                  <ButtonCustom
                    variant="outline"
                    size="lg"
                    onClick={handleReset}
                  >
                    Analyze Another Document
                  </ButtonCustom>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PolicyAnalyzer;
