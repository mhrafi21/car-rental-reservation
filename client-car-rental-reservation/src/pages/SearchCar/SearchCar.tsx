import React from "react";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { useGetAllCarsQuery } from "../../redux/baseApi";
import ProductsList from "../../components/SingleCarList";
import { TCar } from "../../interfaces";
import DefaultContainer from "../../components/DefaultContainer";
import Search from "../Home/Search";

const SearchCar: React.FC = () => {
  const { location, date, status } = useAppSelector(
    (state: RootState) => state.search
  );

  const { data: cars, isLoading } = useGetAllCarsQuery({
    location: location,
    date: date,
    status: status,
  });

  return (
    <div>
      <DefaultContainer>
        <div className="py-8">
        <Search />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 ">
          {isLoading && <div>Loading...</div>}
          {cars?.data && cars?.data.length === 0 ? (
            <div>No Result Found!</div>
          ) : (
            cars?.data?.map((product: TCar, index: number) => (
              <ProductsList key={index} product={product}></ProductsList>
            ))
          )}
        </div>
      </DefaultContainer>
    </div>
  );
};

export default SearchCar;
