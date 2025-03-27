
import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Calculator, 
  Shield, 
  MessageSquare, 
  Check, 
  Lightbulb, 
  SearchCheck, 
  AlertTriangle 
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <FileText className="h-10 w-10 text-insura-neon" />,
      title: "Policy Analysis",
      description: "Upload any insurance document and get it explained in simple language."
    },
    {
      icon: <Calculator className="h-10 w-10 text-insura-purple" />,
      title: "Premium Calculator",
      description: "Calculate estimated premiums across different providers based on your profile."
    },
    {
      icon: <Shield className="h-10 w-10 text-insura-neon" />,
      title: "Coverage Optimizer",
      description: "Identify gaps in your current coverage and get recommendations."
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-insura-purple" />,
      title: "AI Assistant",
      description: "Chat with our AI to get answers to all your insurance questions."
    },
    {
      icon: <SearchCheck className="h-10 w-10 text-insura-neon" />,
      title: "Claim Checker",
      description: "Verify if a particular scenario would be covered by your policy."
    },
    {
      icon: <AlertTriangle className="h-10 w-10 text-insura-purple" />,
      title: "Fraud Detection",
      description: "Detect potential insurance fraud with advanced AI analysis."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="features" className="py-24 relative">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/80 via-gray-900/80 to-black/80 -z-10"></div>
      <div className="absolute top-40 -left-64 w-96 h-96 bg-insura-neon/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 -right-64 w-96 h-96 bg-insura-purple/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="insura-gradient-text">AI-Powered</span> Tools to Simplify Insurance
          </motion.h2>
          <motion.p 
            className="text-gray-300 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Leverage cutting-edge AI technology to understand, compare, and optimize your insurance policies.
          </motion.p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="feature-card group"
              variants={itemVariants}
            >
              <div className="mb-6 relative">
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-gray-800 to-black flex items-center justify-center relative z-10">
                  {feature.icon}
                </div>
                <div className="absolute top-0 w-16 h-16 bg-insura-neon/10 rounded-lg blur-lg group-hover:blur-xl transition-all"></div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-insura-neon transition-colors">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
              
              <div className="mt-6 flex flex-wrap gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center text-xs text-gray-500">
                    <Check className="w-3 h-3 mr-1 text-insura-neon" />
                    <span>Feature {i}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-20 bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-start md:items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-insura-purple/20 flex items-center justify-center shrink-0">
                <Lightbulb className="w-6 h-6 text-insura-purple" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Ready to get started?</h3>
                <p className="text-gray-400">Try our AI-powered tools to understand your insurance coverage better.</p>
              </div>
            </div>
            <button className="cyber-button whitespace-nowrap">
              Try InsuraAI Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
