
import React, { useState } from 'react';
import { ButtonCustom } from './ui/button-custom';
import { Upload, FileType, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

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
            
            <div className="text-center">
              <Link to="/tools/policy-analysis">
                <ButtonCustom
                  variant="primary"
                  size="lg"
                  className="bg-gradient-to-r from-insura-neon to-insura-purple hover:shadow-lg hover:shadow-insura-purple/20"
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
