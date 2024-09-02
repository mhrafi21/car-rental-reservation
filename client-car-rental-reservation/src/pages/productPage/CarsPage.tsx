import React, { FormEvent, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setSearchQuery,
  setSelectedCategory,
  setPriceRange,
  setSortBy,
  clearFilters,
} from "../../redux/features/products/productsSlice";
import { RootState, AppDispatch } from "../../redux/store";
import { useGetAllCarsQuery } from "../../redux/baseApi";
import DefaultContainer from "../../components/DefaultContainer";
import { TCar } from "../../interfaces";
import ProductsList from "../../components/ProductsList";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaSearch } from "react-icons/fa";
import { useAppSelector } from "../../redux/hooks";
import {
  setCurrentPage,
  setTotalPages,
} from "../../redux/features/products/paginationSlice";
import Pagination from "../../components/Pagination";

const CarsPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const searchQuery = useSelector(
    (state: RootState) => state.products.searchQuery
  );
  const selectedCategory = useSelector(
    (state: RootState) => state.products.selectedCategory
  );
  const priceRange = useSelector(
    (state: RootState) => state.products.priceRange
  );
  const sortBy = useSelector((state: RootState) => state.products.sortBy);

  const { currentPage, totalPages } = useAppSelector(
    (state: RootState) => state.pagination
  );

  const { data: products, isLoading } = useGetAllCarsQuery({
    search: searchQuery,
    category: selectedCategory,
    minPrice: priceRange.min.toString(),
    maxPrice: priceRange.max.toString(),
    sort: sortBy,
    page: currentPage,
    limit: 10,
  });

  useEffect(() => {
    if (products) {
      dispatch(setTotalPages(products?.data?.totalPages));
    }
  }, [products, dispatch]);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const handleSearchChange = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      search: { value: string };
    };
    dispatch(setSearchQuery(target.search.value));
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(setSelectedCategory(event.target.value));
  };

  const handlePriceRangeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = event.target;
    switch (value) {
      case "0-50":
        dispatch(setPriceRange({ min: 0, max: 50 }));
        break;
      case "51-100":
        dispatch(setPriceRange({ min: 51, max: 100 }));
        break;
      case "101-200":
        dispatch(setPriceRange({ min: 101, max: 200 }));
        break;
      case "201-400":
        dispatch(setPriceRange({ min: 201, max: 400 }));
        break;
      case "401-600":
        dispatch(setPriceRange({ min: 401, max: 600 }));
        break;
      case "601-800":
        dispatch(setPriceRange({ min: 601, max: 800 }));
        break;
      case "801-1200":
        dispatch(setPriceRange({ min: 801, max: 1200 }));
        break;
      case "1201-12000000":
        dispatch(setPriceRange({ min: 801, max: 12000000 }));
        break;
      default:
        break;
    }
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortBy(event.target.value as "asc" | "desc"));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  // useEffect to initialize AOS
  useEffect(() => {
    AOS.init({ once: true }); // Initialize once
  }, []);

  console.log(products)

  return (
    <div className="bg-gray-100 min-h-screen">
      <DefaultContainer>
        <div className="py-8">
          <div className="">
            <form onSubmit={handleSearchChange} className="flex">
              <div className="relative w-full">
                <div>
                  <FaSearch className="h-6 w-6 top-3 left-5 text-gray-400 absolute " />
                </div>
                <input
                  type="text"
                  placeholder="Search products..."
                  name="search"
                  className="p-2.5 pl-16 w-full border  border-gray-300 rounded-md mr-4 hover:bg-gray-200 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute h-full right-0 top-0 bottom-0">
                  <button
                    type="submit"
                    className=" h-full px-5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
                  >
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Filter controls */}

          <div className="flex flex-col md:flex-row md:justify-between items-center my-8">
            {/* Search */}
            {/* Category */}
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="p-2.5 border border-gray-300 rounded-md mr-4 mb-2 md:mb-0 hover:bg-gray-200 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              <option value="sedan">sedan</option>
              <option value="SUV">SUV</option>
              <option value="hybrid">Hybrid</option>
            </select>

            {/* Price Range */}
            <select
              value={`${priceRange.min}-${priceRange.max}`}
              onChange={handlePriceRangeChange}
              className="p-2.5 border border-gray-300 rounded-md mr-4 mb-2 md:mb-0 hover:bg-gray-200 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="0-12000000">Select Price Range</option>
              <option value="0-50">Up to $50</option>
              <option value="51-100">$51 - $100</option>
              <option value="101-200">$101 - $200</option>
              <option value="201-400">$201 - $400</option>
              <option value="401-600">$401 - $600</option>
              <option value="601-800">$601 - $800</option>
              <option value="801-1200">$801 - $1200</option>
              <option value="1201-12000000">$1201 - above</option>
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="p-2.5 border border-gray-300 rounded-md mr-4 mb-2 md:mb-0 hover:bg-gray-200 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="asc">Price Low to High</option>
              <option value="desc">Price High to Low</option>
            </select>

            {/* Clear Filters */}
            <button
              onClick={handleClearFilters}
              className="p-2.5 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition duration-200"
            >
              Clear Filters
            </button>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 ">
            {isLoading && <div>Loading...</div>}
            {products?.data && products?.data.length === 0 ? (
              <div>No Result Found!</div>
            ) : (
              products?.data?.map((product: TCar, index : number) => (
                <ProductsList
                  key={index}
                  product={product}
                ></ProductsList>
              ))
            )}
          </div>
        </div>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        ></Pagination>
      </DefaultContainer>
    </div>
  );
};

export default CarsPage;
