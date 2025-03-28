
import React, { useState, useRef } from 'react';
import { Upload, FileType, FileText } from 'lucide-react';
import { ButtonCustom } from '@/components/ui/button-custom';
import { useToast } from '@/hooks/use-toast';

interface DocumentUploaderProps {
  onUpload: (file: File) => void;
  onAnalyze: () => Promise<void>;
  isAnalyzing: boolean;
  file: File | null;
  onReset: () => void;
}

const DocumentUploader: React.FC<DocumentUploaderProps> = ({
  onUpload,
  onAnalyze,
  isAnalyzing,
  file,
  onReset
}) => {
  const [isDragging, setIsDragging] = useState(false);
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
      onFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelected(e.target.files[0]);
    }
  };

  const onFileSelected = (selectedFile: File) => {
    if (selectedFile.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select a file smaller than 10MB",
        variant: "destructive",
      });
      return;
    }
    
    console.log('File selected in DocumentUploader:', selectedFile.name);
    onUpload(selectedFile);
  };

  const handleSelectFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
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
    <div>
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
              onClick={onAnalyze}
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
              onClick={onReset}
            >
              Choose Different File
            </ButtonCustom>
          </div>
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
              <FileText className="w-6 h-6 text-insura-purple" />
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
  );
};

export default DocumentUploader;
