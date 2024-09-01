import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import DefaultContainer from '../../components/DefaultContainer';

interface Car {
  id: number;
  image: string;
  name: string;
  description: string;
  price: string;
}

const featuredCars: Car[] = [
  {
    id: 1,
    image: 'https://example.com/car1.jpg', // Replace with your image URL
    name: 'Tesla Model S',
    description: 'Electric, Fast, and Stylish.',
    price: '$80/day',
  },
  {
    id: 2,
    image: 'https://example.com/car2.jpg', // Replace with your image URL
    name: 'BMW X5',
    description: 'Luxury and Comfort.',
    price: '$100/day',
  },
  {
    id: 3,
    image: 'https://example.com/car3.jpg', // Replace with your image URL
    name: 'Audi Q7',
    description: 'Premium and Powerful.',
    price: '$90/day',
  },
  {
    id: 4,
    image: 'https://example.com/car3.jpg', // Replace with your image URL
    name: 'Audi Q7',
    description: 'Premium and Powerful.',
    price: '$90/day',
  },
  {
    id: 5,
    image: 'https://example.com/car3.jpg', // Replace with your image URL
    name: 'Audi Q7',
    description: 'Premium and Powerful.',
    price: '$90/day',
  },
  {
    id: 6,
    image: 'https://example.com/car3.jpg', // Replace with your image URL
    name: 'Audi Q7',
    description: 'Premium and Powerful.',
    price: '$90/day',
  },
  // Add more cars as needed
];

const FeaturedCars: React.FC = () => {
  return (
    <section className="py-16 bg-gray-100">
      <DefaultContainer>
        <h2 className="text-3xl font-bold text-center mb-12">Featured Cars</h2>
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination]}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {featuredCars.map((car) => (
            <SwiperSlide key={car.id}>
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{car.name}</h3>
                  <p className="text-gray-700 mb-4">{car.description}</p>
                  <div className="text-lg font-bold text-indigo-600">{car.price}</div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </DefaultContainer>
    </section>
  );
};

export default FeaturedCars;
