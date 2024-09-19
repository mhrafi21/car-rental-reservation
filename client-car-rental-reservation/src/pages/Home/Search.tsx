import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import { setSearchParams } from "../../redux/features/search/searchSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";


interface SearchFormInputs {
  location: string;
  date: string;
}

const Search: React.FC = () => {
  const { register, handleSubmit } = useForm<SearchFormInputs>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {location, date } = useAppSelector((state: RootState)=> state.search)

  const onSubmit: SubmitHandler<SearchFormInputs> = (data) => {
    const searchData = {
      location: data.location,
      date: data.date,
      status: "available",
    };

    dispatch(setSearchParams(searchData));
    navigate("/search");
  };

  return (
    <div>

      <div className="max-w-2xl mx-auto dark:bg-gray-700 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl dark:text-white font-semibold text-center text-gray-800 mb-4">Find Your Car</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className=" md:flex items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <label
         
              htmlFor="location"
              className="block text-sm dark:text-white font-medium text-gray-800"
            >
              Location
            </label>
            <select
              id="location"
              defaultValue={location}
              {...register("location", { required: true })}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Please Select Location</option>
              <option value="mymensingh">Mymensingh</option>
              <option value="dhaka">Dhaka</option>
            </select>
          </div>

          <div className="flex-1">
            <label
              htmlFor="date"
              className="block dark:text-white text-sm font-medium text-gray-800"
            >
              Start Date
            </label>
            <input
              id="date"
              type="date"
              defaultValue={date}
              {...register("date", { required: true })}
              className="mt-1 block w-full px-4 py-[9px] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Search
          </button>
        </div>
      </form>
    </div>

    </div>
  );
};

export default Search;
