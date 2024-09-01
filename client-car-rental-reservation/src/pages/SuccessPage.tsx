import React from "react";
import { Link } from "react-router-dom";

const SuccessPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-bold mb-4 text-green-600">
          Payment Successful!
        </h2>
        <p className="text-lg mb-6">
          Thank you for your purchase. Your order has been placed successfully.
        </p>
        <div className="flex justify-center">
          <Link to={"/"}>
            <button className='className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-300'>
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
