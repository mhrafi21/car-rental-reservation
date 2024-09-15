import React from "react";
import Hero from "./Hero";
import FeaturedCars from "./FeaturedCars";
import WhyChooseUs from "./WhyChooseUs";
import Testimonial from "./Testimonial";

const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />
      <FeaturedCars />
      <WhyChooseUs />
      <Testimonial />
    </div>
  );
};

export default HomePage;
