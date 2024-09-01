import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import heroImage from "../../assets/images/hero.webp";
import AOS from "aos";
import "aos/dist/aos.css";
import DefaultContainer from "../../components/DefaultContainer";

const HeroSection: React.FC = () => {
  useEffect(() => {
    AOS.init({ once: true }); // Initialize AOS on component mount
  }, []);

  return (
    <div>
      <div className="relative h-[75vh] md:h-[88vh]">
        {/* Static Background Image */}
        <img
          src={heroImage}
          alt="Hero Background"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div
          className="absolute inset-0 flex items-center justify-center text-center text-white z-10"
          data-aos="fade-up"
        >
          <DefaultContainer>
            <div className="px-1">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
                Find Your Perfect Car
              </h1>
              <p className="text-lg md:text-2xl mb-8">
                Browse through a variety of cars and book your ride today!
              </p>
              <div className="bg-white text-black rounded-md shadow-md p-4 w-full max-w-3xl mb-6">
                <form className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Location
                    </label>
                    <input
                      type="text"
                      placeholder="Enter location"
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Pick-up Date
                    </label>
                    <input
                      type="date"
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Drop-off Date
                    </label>
                    <input
                      type="date"
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors mt-4 sm:mt-0"
                  >
                    Search
                  </button>
                </form>
              </div>
              <Link
                to="/product"
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300"
              >
                Book Now
              </Link>
            </div>
          </DefaultContainer>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
