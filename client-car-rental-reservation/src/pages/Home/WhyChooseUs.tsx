import React from 'react';
import DefaultContainer from '../../components/DefaultContainer';

const WhyChooseUs: React.FC = () => {
  const features = [
    {
      title: 'Best Prices',
      description: 'We offer competitive pricing on all our car rentals, ensuring you get the best value for your money.',
      icon: (
        <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v8m4-4H8m6-4h4v16H6V4h4m6 0h-6v2m0 0H6m0 0h6v2m0 0H6m0 0h6v2" />
        </svg>
      ),
    },
    {
      title: 'Wide Selection',
      description: 'Choose from a diverse range of vehicles to suit all your needs, from economy to luxury cars.',
      icon: (
        <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-7 7-7-7" />
        </svg>
      ),
    },
    {
      title: '24/7 Support',
      description: 'Our customer support team is available 24/7 to assist you with any questions or issues.',
      icon: (
        <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 20a2 2 0 01-2 2H8a2 2 0 01-2-2V4a2 2 0 012-2h8a2 2 0 012 2v16z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-16">
      <DefaultContainer>
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-100 p-8 rounded-lg shadow-md text-center">
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </DefaultContainer>
    </section>
  );
};

export default WhyChooseUs;
