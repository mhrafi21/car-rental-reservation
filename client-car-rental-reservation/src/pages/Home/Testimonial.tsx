import React from 'react';
import img from "../../assets/images/team2.jpg"
import DefaultContainer from '../../components/DefaultContainer';
interface Testimonial {
  id: number;
  name: string;
  review: string;
  rating: number;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'John Doe',
    review: 'Amazing service! The car was in perfect condition, and the process was smooth and hassle-free.',
    rating: 5,
    image: img, // Replace with actual image URL
  },
  {
    id: 2,
    name: 'Jane Smith',
    review: 'Great selection of cars and excellent customer support. I will definitely use their service again!',
    rating: 4,
    image: img, // Replace with actual image URL
  },
  {
    id: 3,
    name: 'Alice Johnson',
    review: 'The best car rental experience I have ever had. Highly recommend!',
    rating: 5,
    image: img, // Replace with actual image URL
  },
  // Add more testimonials as needed
];

const Testimonial: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-black ">
      <DefaultContainer>
        <h2 className="text-3xl dark:text-white font-bold text-center mb-12">Customer Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white dark:bg-gray-700 dark:text-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="text-xl font-semibold dark:text">{testimonial.name}</h3>
                  <div className="flex items-center">
                    {[...Array(testimonial.rating)].map((_, index) => (
                      <svg
                        key={index}
                        className="w-5 h-5 text-yellow-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049.933L7.264 6.168H2.268l4.212 3.056-1.59 5.236L9.049 12l4.16 3.36-1.59-5.236 4.212-3.056H10.84l-1.79-5.235z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 dark:text-white">{testimonial.review}</p>
            </div>
          ))}
        </div>
      </DefaultContainer>
    </section>
  );
};

export default Testimonial;
