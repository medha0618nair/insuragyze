
import React from 'react';
import { BrainCircuit } from 'lucide-react';

const PageHeader: React.FC = () => {
  return (
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
  );
};

export default PageHeader;
