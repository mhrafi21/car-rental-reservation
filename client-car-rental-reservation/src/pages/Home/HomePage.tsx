import React from "react";
import Hero from "./Hero";
import Category from "./Category";
import FeaturedCars from "./FeaturedCars";
import WhyChooseUs from "./WhyChooseUs";
import Testimonial from "./Testimonial";

const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />
      <Category />
      <FeaturedCars />
      <WhyChooseUs />
      <Testimonial />
    </div>
  );
};

export default HomePage;
