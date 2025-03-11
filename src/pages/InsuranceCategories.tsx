
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ButtonCustom } from '@/components/ui/button-custom';
import { Heart, Home, Car, Globe, Briefcase, Shield, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const InsuranceCategories = () => {
  const categories = [
    {
      id: 'health',
      name: 'Health Insurance',
      icon: <Heart className="w-10 h-10 text-red-400" />,
      description: 'Coverage for medical expenses, doctor visits, hospital stays, and medications.',
      color: 'from-red-500/20 to-red-700/20',
      borderColor: 'border-red-400/30',
      popular: true
    },
    {
      id: 'life',
      name: 'Life Insurance',
      icon: <User className="w-10 h-10 text-blue-400" />,
      description: 'Financial protection for your loved ones in case of your death.',
      color: 'from-blue-500/20 to-blue-700/20',
      borderColor: 'border-blue-400/30'
    },
    {
      id: 'home',
      name: 'Home Insurance',
      icon: <Home className="w-10 h-10 text-green-400" />,
      description: 'Protection for your house and belongings against damage and theft.',
      color: 'from-green-500/20 to-green-700/20',
      borderColor: 'border-green-400/30'
    },
    {
      id: 'auto',
      name: 'Auto Insurance',
      icon: <Car className="w-10 h-10 text-yellow-400" />,
      description: 'Coverage for accidents, theft, and liability for your vehicles.',
      color: 'from-yellow-500/20 to-yellow-700/20',
      borderColor: 'border-yellow-400/30'
    },
    {
      id: 'travel',
      name: 'Travel Insurance',
      icon: <Globe className="w-10 h-10 text-purple-400" />,
      description: 'Protection against travel-related accidents, cancellations, and medical emergencies.',
      color: 'from-purple-500/20 to-purple-700/20',
      borderColor: 'border-purple-400/30'
    },
    {
      id: 'business',
      name: 'Business Insurance',
      icon: <Briefcase className="w-10 h-10 text-orange-400" />,
      description: 'Comprehensive coverage to protect your business assets and operations.',
      color: 'from-orange-500/20 to-orange-700/20',
      borderColor: 'border-orange-400/30'
    },
    {
      id: 'renters',
      name: 'Renters Insurance',
      icon: <Home className="w-10 h-10 text-teal-400" />,
      description: 'Protection for your personal belongings and liability coverage while renting.',
      color: 'from-teal-500/20 to-teal-700/20',
      borderColor: 'border-teal-400/30'
    },
    {
      id: 'disability',
      name: 'Disability Insurance',
      icon: <Shield className="w-10 h-10 text-indigo-400" />,
      description: 'Financial support if you become disabled and unable to work.',
      color: 'from-indigo-500/20 to-indigo-700/20',
      borderColor: 'border-indigo-400/30'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-insura-cyberdark to-black">
      <Navbar />
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block px-3 py-1 rounded-full bg-insura-neon/10 text-insura-neon font-medium text-sm mb-4 border border-insura-neon/20">
              Find Your Perfect Coverage
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 insura-gradient-text">
              Choose an Insurance Category
            </h1>
            <p className="text-xl text-gray-300">
              Select an insurance type to find personalized plans tailored to your needs, powered by advanced AI recommendations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link 
                to={`/insurance/${category.id}`} 
                key={category.id}
                className="group"
              >
                <div className={`cyber-card rounded-xl overflow-hidden transition-all duration-300 group-hover:-translate-y-2 h-full flex flex-col relative ${
                  category.popular ? 'ring-2 ring-insura-neon' : ''
                }`}>
                  {category.popular && (
                    <div className="absolute top-3 right-3 bg-insura-neon text-black text-xs font-bold px-2 py-1 rounded-full">
                      Popular
                    </div>
                  )}
                  <div className={`p-6 bg-gradient-to-br ${category.color} ${category.borderColor} border-b flex justify-center`}>
                    <div className="transition-transform duration-300 group-hover:scale-110 flex justify-center">
                      {category.icon}
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-3 text-white">{category.name}</h3>
                    <p className="text-gray-300 mb-6 flex-1">{category.description}</p>
                    <ButtonCustom 
                      variant="primary" 
                      size="sm" 
                      fullWidth
                      className="bg-gradient-to-r from-insura-neon via-insura-blue to-insura-purple group-hover:shadow-md group-hover:shadow-insura-purple/20 mt-auto"
                    >
                      Find {category.name}
                    </ButtonCustom>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-16 cyber-card p-8 rounded-2xl max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center gap-6">
              <div className="w-16 h-16 bg-insura-neon/20 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-insura-neon" />
              </div>
              <h3 className="text-2xl font-bold insura-gradient-text">Not Sure Which Insurance You Need?</h3>
              <p className="text-gray-300 max-w-2xl">
                Let our AI assistant analyze your lifestyle, assets, and risk factors to recommend the perfect insurance coverage for you.
              </p>
              <Link to="/insurance-recommender">
                <ButtonCustom 
                  variant="primary" 
                  size="lg"
                  className="bg-gradient-to-r from-insura-neon to-insura-purple hover:shadow-lg hover:shadow-insura-purple/20"
                >
                  Get Personalized Recommendations
                </ButtonCustom>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default InsuranceCategories;
