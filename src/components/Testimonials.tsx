
import React from 'react';
import { Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah J.",
      role: "Homeowner",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      content: "InsuraAI helped me understand exactly what my home insurance covers. I discovered I needed additional coverage for my home office equipment, which my agent never mentioned!",
      rating: 5
    },
    {
      id: 2,
      name: "Michael T.",
      role: "Small Business Owner",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      content: "The policy comparison tool saved me $3,200 on business insurance. It found coverage gaps in my existing policy and suggested a better option with more comprehensive protection.",
      rating: 5
    },
    {
      id: 3,
      name: "Rebecca L.",
      role: "Healthcare Professional",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
      content: "After a minor car accident, I used the claims simulator to see what to expect. My claim was processed exactly as predicted, with no surprises. Highly recommend!",
      rating: 4
    },
    {
      id: 4,
      name: "David K.",
      role: "Family of Four",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
      content: "The AI chatbot answered all my questions about health insurance options for my family. It explained deductibles and copays in a way that finally made sense to me.",
      rating: 5
    }
  ];

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, index) => (
      <Star 
        key={index}
        className={`w-4 h-4 ${index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-insura-lightblue">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-insura-blue/10 text-insura-blue font-medium text-sm mb-4">
            Success Stories
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-600">
            Thousands of people have simplified their insurance experience with InsuraAI. Here's what some of them have to say.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id} 
              className="glass-card rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-white shadow-sm"
                />
                <div>
                  <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <div className="flex mt-1 mb-3">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 italic">&ldquo;{testimonial.content}&rdquo;</p>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 bg-white rounded-xl shadow-md max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:mr-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Case Study: BlueShield Insurance</h3>
              <p className="text-gray-700 mb-4">
                BlueShield Insurance integrated InsuraAI's policy analysis tools into their customer portal, resulting in:
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">42% reduction in customer service calls</span>
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">28% faster claim processing time</span>
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">91% customer satisfaction rating</span>
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">$1.2M annual savings in operational costs</span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2 bg-insura-lightblue rounded-lg p-6">
              <blockquote className="text-gray-700 italic mb-4">
                "Implementing InsuraAI's technology has transformed how we communicate with our customers. Complex policies are now easily understood, claims are processed faster, and our customers feel more confident in their coverage."
              </blockquote>
              <div className="flex items-center">
                <img 
                  src="https://randomuser.me/api/portraits/women/65.jpg" 
                  alt="Jennifer Reynolds" 
                  className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-white shadow-sm"
                />
                <div>
                  <h4 className="font-bold text-gray-900">Jennifer Reynolds</h4>
                  <p className="text-sm text-gray-600">CTO, BlueShield Insurance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
