import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import DefaultContainer from "../../components/DefaultContainer";

interface ContactFormInputs {
  name: string;
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormInputs>();

  const onSubmit: SubmitHandler<ContactFormInputs> = (data) => {
    console.log(data);
    // Handle form submission here (e.g., send the data to an API)
  };
  return (
    <div className="py-10  dark:bg-black">
      <DefaultContainer>
        <div className="min-h-screen dark:bg-black bg-gray-100">
          <h1 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
            Get in Touch
          </h1>
          <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-2xl font-semibold dark:text-white text-gray-800 mb-6">
                  Contact Information
                </h2>

                <div className="space-y-6 mb-8">
                  <div className="flex items-start">
                    <FaPhoneAlt className="text-blue-500 text-2xl mr-4" />
                    <div>
                      <p className="text-lg font-medium text-gray-700 dark:text-white">Phone</p>
                      <p className="text-gray-600 dark:text-white">+1 (123) 456-7890</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <FaEnvelope className="text-green-500 text-2xl mr-4" />
                    <div>
                      <p className="text-lg font-medium dark:text-white text-gray-700">Email</p>
                      <p className="text-gray-600 dark:text-white">contact@company.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <FaMapMarkerAlt className="text-red-500 text-2xl mr-4" />
                    <div>
                      <p className="text-lg font-medium dark:text-white text-gray-700">
                        Address
                      </p>
                      <p className="text-gray-600 dark:text-white">
                        123 Main St, Suite 101, Springfield, IL 62701, USA
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                  Send Us a Message
                </h3>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label className="block text-gray-700 dark:text-white font-medium mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      {...register("name", { required: "Name is required" })}
                      className={`w-full px-4 dark:bg-black dark:text-white py-2 border rounded-md ${
                        errors.name ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-700 dark:text-white  font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value:
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                          message: "Invalid email address",
                        },
                      })}
                      className={`w-full px-4 dark:bg-black dark:text-white py-2 border rounded-md ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-700 dark:text-white font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      {...register("message", {
                        required: "Message is required",
                      })}
                      className={`w-full px-4 py-2 border dark:bg-black dark:text-white rounded-md ${
                        errors.message ? "border-red-500" : "border-gray-300"
                      }`}
                      rows={4}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg shadow hover:bg-blue-700 transition duration-300"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </DefaultContainer>
    </div>
  );
};

export default Contact;
