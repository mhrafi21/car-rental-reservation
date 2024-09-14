import React from 'react';
import { useForm } from 'react-hook-form';

interface CarDetails {
  name: string;
  description: string;
  features: string[];
  insurance: string;
  cancellationPolicy: string;
}

const carDetails: CarDetails = {
  name: 'Tesla Model 3',
  description: 'An electric sedan with top-notch features and autopilot capabilities.',
  features: ['Autopilot', 'Electric Engine', 'GPS Navigation', 'Luxury Interior'],
  insurance: 'Full coverage insurance included.',
  cancellationPolicy: 'Free cancellation up to 24 hours before pick-up.',
};

const CarDetailsPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    console.log('Form data:', data);
    // Handle booking submission
  };

  return (
    <div className="container mx-auto p-6">
      {/* Car Details Section */}
      <div className="car-details bg-white shadow-lg rounded-md p-6 mb-6">
        <h1 className="text-4xl font-bold mb-4">{carDetails.name}</h1>
        <p className="text-gray-700 text-lg mb-6">{carDetails.description}</p>

        <div className="features mb-6">
          <h2 className="text-xl font-semibold mb-2">Features:</h2>
          <ul className="list-disc list-inside">
            {carDetails.features.map((feature, index) => (
              <li key={index} className="text-gray-600 text-md">
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="insurance mb-6">
          <h2 className="text-xl font-semibold mb-2">Insurance:</h2>
          <p className="text-gray-600 text-md">{carDetails.insurance}</p>
        </div>

        <div className="cancellation-policy mb-6">
          <h2 className="text-xl font-semibold mb-2">Cancellation Policy:</h2>
          <p className="text-gray-600 text-md">{carDetails.cancellationPolicy}</p>
        </div>
      </div>

      {/* Booking Form */}
      <div className="booking-form bg-white shadow-lg rounded-md p-6">
        <h2 className="text-2xl font-bold mb-4">Booking Form</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Details */}
          <div>
            <label htmlFor="nid" className="block text-gray-700 font-medium">
              NID/Passport
            </label>
            <input
              type="text"
              id="nid"
              className="w-full border-gray-300 rounded-md p-3 mt-1"
              {...register('nid', { required: true })}
            />
            {errors.nid && (
              <p className="text-red-500 text-sm">NID/Passport is required.</p>
            )}
          </div>

          <div>
            <label htmlFor="license" className="block text-gray-700 font-medium">
              Driving License
            </label>
            <input
              type="text"
              id="license"
              className="w-full border-gray-300 rounded-md p-3 mt-1"
              {...register('license', { required: true })}
            />
            {errors.license && (
              <p className="text-red-500 text-sm">Driving License is required.</p>
            )}
          </div>

          {/* Payment Information */}
          <div className="payment-section">
            <h3 className="text-xl font-semibold">Payment Information</h3>

            <div>
              <label htmlFor="cardNumber" className="block text-gray-700 font-medium">
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                className="w-full border-gray-300 rounded-md p-3 mt-1"
                {...register('cardNumber', {
                  required: true,
                  pattern: /^[0-9]{16}$/,
                })}
              />
              {errors.cardNumber && (
                <p className="text-red-500 text-sm">
                  Card Number is required and must be 16 digits.
                </p>
              )}
            </div>

            <div className="flex space-x-4">
              <div>
                <label htmlFor="expiryDate" className="block text-gray-700 font-medium">
                  Expiry Date (MM/YY)
                </label>
                <input
                  type="text"
                  id="expiryDate"
                  className="w-full border-gray-300 rounded-md p-3 mt-1"
                  {...register('expiryDate', {
                    required: true,
                    pattern: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
                  })}
                />
                {errors.expiryDate && (
                  <p className="text-red-500 text-sm">
                    Expiry Date is required and must be in MM/YY format.
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="cvv" className="block text-gray-700 font-medium">
                  CVV
                </label>
                <input
                  type="text"
                  id="cvv"
                  className="w-full border-gray-300 rounded-md p-3 mt-1"
                  {...register('cvv', {
                    required: true,
                    pattern: /^[0-9]{3}$/,
                  })}
                />
                {errors.cvv && (
                  <p className="text-red-500 text-sm">
                    CVV is required and must be 3 digits.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Additional Options */}
          <div>
            <h3 className="text-xl font-semibold">Additional Options</h3>
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                id="gps"
                className="mr-2"
                {...register('gps')}
              />
              <label htmlFor="gps" className="text-gray-700">
                GPS
              </label>
            </div>
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                id="childSeat"
                className="mr-2"
                {...register('childSeat')}
              />
              <label htmlFor="childSeat" className="text-gray-700">
                Child Seat
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default CarDetailsPage;
