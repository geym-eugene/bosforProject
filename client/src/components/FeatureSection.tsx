
import React from 'react';
import { Cpu, Eye, Palette, Shield } from 'lucide-react';

const FeatureSection = () => {
  const features = [
    {
      icon: Eye,
      title: '3D Visualization',
      description: 'Experience your future home with stunning 3D renderings and virtual walkthroughs',
      color: 'text-blue-600'
    },
    {
      icon: Cpu,
      title: 'AI-Powered Design',
      description: 'Generate personalized interior designs using cutting-edge artificial intelligence',
      color: 'text-purple-600'
    },
    {
      icon: Palette,
      title: 'Custom Plans',
      description: 'Tailor every detail to your vision with our comprehensive customization tools',
      color: 'text-green-600'
    },
    {
      icon: Shield,
      title: 'Quality Assured',
      description: 'All plans are professionally designed and meet the highest construction standards',
      color: 'text-red-600'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-gray-900 mb-4">
            Why Choose <span className="font-bold">Bosfor</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We combine traditional architectural excellence with modern technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-sm group-hover:shadow-md transition-shadow duration-300 mb-6">
                <feature.icon className={`h-8 w-8 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-3xl p-12 shadow-sm">
            <h3 className="text-3xl font-light text-gray-900 mb-4">
              Ready to Build Your <span className="font-bold">Dream Home?</span>
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have brought their visions to life with Bosfor
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gray-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-colors">
                Start Your Project
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-full font-semibold hover:bg-gray-50 transition-colors">
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
