
import React from 'react';
import { Check, AlertCircle } from 'lucide-react';

const FeatureDescription: React.FC = () => {
  return (
    <div className="mt-16 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center insura-gradient-text">Key Insurance Insights</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="cyber-card rounded-xl p-6">
          <div className="flex items-start">
            <div className="mr-4">
              <Check className="w-6 h-6 text-insura-neon" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-white mb-2">Policy Benefits</h3>
              <p className="text-gray-400">Discover key benefits in your policy that provide valuable coverage and protection for you.</p>
            </div>
          </div>
        </div>
        
        <div className="cyber-card rounded-xl p-6">
          <div className="flex items-start">
            <div className="mr-4">
              <AlertCircle className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-white mb-2">Major Exclusions</h3>
              <p className="text-gray-400">Learn what's NOT covered in your policy to avoid surprises when making claims.</p>
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
              <AlertCircle className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-white mb-2">Policy Gaps</h3>
              <p className="text-gray-400">Identify areas where your current coverage might leave you exposed to risks.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureDescription;
