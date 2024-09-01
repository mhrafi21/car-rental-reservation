import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DefaultContainer from "../../components/DefaultContainer";
import { FaCampground, FaBed, FaFireAlt, FaChair } from "react-icons/fa";
import { GiBackpack, GiCampingTent, GiCampCookingPot, GiLanternFlame, GiWaterBottle, GiFirstAidKit, GiCampfire, GiHiking } from "react-icons/gi";
import { FaShirt } from "react-icons/fa6";
import { CiForkAndKnife } from "react-icons/ci";

// Categories data
const categories = [
  {
    id: 1,
    name: "Camping Tent",
    icon: <GiCampingTent size={40} />,
    link: "camping-tent",
  },
  {
    id: 2,
    name: "Sleeping Bag",
    icon: <FaBed size={40} />,
    link: "sleeping-bag",
  },
  {
    id: 3,
    name: "Backpack",
    icon: <GiBackpack size={40} />,
    link: "backpack",
  },
  {
    id: 4,
    name: "Portable Stove",
    icon: <FaFireAlt size={40} />,
    link: "portable-stove",
  },
  {
    id: 5,
    name: "Hiking Boots",
    icon: <GiHiking size={40} />,
    link: "hiking-boots",
  },
  {
    id: 6,
    name: "Outdoor Clothing",
    icon: <FaShirt size={40} />,
    link: "outdoor-clothing",
  },
  {
    id: 7,
    name: "Camping Cookware",
    icon: <GiCampCookingPot size={40} />,
    link: "camping-cookware",
  },
  {
    id: 8,
    name: "First Aid Kit",
    icon: <GiFirstAidKit size={40} />,
    link: "first-aid-kit",
  },
  {
    id: 9,
    name: "Camping Hammock",
    icon: <FaCampground size={40} />,
    link: "camping-hammock",
  },
  {
    id: 10,
    name: "Camping Cooler",
    icon: <GiCampfire size={40} />,
    link: "camping-cooler",
  },
  {
    id: 11,
    name: "Camping Knife",
    icon: <CiForkAndKnife size={40} />,
    link: "camping-knife",
  },
  {
    id: 12,
    name: "Camping Chair",
    icon: <FaChair size={40} />,
    link: "camping-chair",
  },
  {
    id: 13,
    name: "Lantern",
    icon: <GiLanternFlame size={40} />,
    link: "lantern",
  },
  {
    id: 14,
    name: "Water Bottle",
    icon: <GiWaterBottle size={40} />,
    link: "water-bottle",
  }
];

const Category: React.FC = () => {

  const settings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4.5,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="py-12 bg-gray-200">
      <DefaultContainer>
        <div className="">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Explore Categories
          </h2>
          <Slider {...settings}>
            {categories.map((category) => (
              <div key={category.id}>
                <Link
                  to={`/category/${category.link}`}
                  className="group mr-2 bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 p-4 flex flex-col items-center text-center"
                >
                  <div className="mb-4 flex items-center justify-center mx-auto w-16 h-16">
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">{category.name}</h3>
                    <p className="text-gray-700">Explore {category.name}</p>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </DefaultContainer>
    </section>
  );
};

export default Category;
