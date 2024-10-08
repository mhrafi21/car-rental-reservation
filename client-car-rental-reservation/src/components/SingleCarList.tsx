import React from "react";
import { TCar } from "../interfaces";
import { Link } from "react-router-dom";

const SingleCarList: React.FC<{ product: TCar }> = ({ product }) => {

  return (
    <div className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 flex flex-col">
      {/* Product Image */}
      <img
        className="w-full h-64 object-cover object-center"
        src={product.image}
        alt={product.name}
      />
      <div className="px-6 py-4 flex flex-col flex-grow">
        {/* Product Name */}
        <div className="font-bold text-xl mb-2 dark:text-white text-gray-800">{product.name}</div>
        {/* Product Category */}
        <p className="text-gray-600 text-base dark:text-white  mb-2">{product.category}</p>
        {/* Product Price */}
        <p className="text-gray-900 text-lg dark:text-white font-semibold mb-2">${product.pricePerHour}/hour</p>
        <div className="mt-auto">
          {/* Product Details Button */}
          <Link to={`/product/${product._id}`}>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md w-full">
            View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleCarList;
