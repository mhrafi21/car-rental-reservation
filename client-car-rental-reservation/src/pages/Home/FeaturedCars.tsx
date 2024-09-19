import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import DefaultContainer from '../../components/DefaultContainer';
import { useGetAllCarsQuery } from '../../redux/baseApi';
import { TCar } from '../../interfaces';
import SingleCarList from '../../components/SingleCarList';

const FeaturedCars: React.FC = () => {

  const {data, isLoading} = useGetAllCarsQuery(undefined);

  return (
    <section className="py-16 bg-gray-100 dark:bg-black">
      <DefaultContainer>
        <h2 className="text-3xl font-bold text-center mb-12">Featured Cars</h2>
        {isLoading && <div>Loading...</div>}
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          navigation
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
          {data?.data?.map((car: TCar) => (
            <SwiperSlide key={car._id}>
                <SingleCarList product={car} />
            </SwiperSlide>
          ))}
        </Swiper>
      </DefaultContainer>
    </section>
  );
};

export default FeaturedCars;
