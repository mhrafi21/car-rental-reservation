import React, { useEffect } from "react";
import ProductManagement from "./ProductManagement";
import DefaultContainer from "../../components/DefaultContainer";
import { useGetAllCarsQuery } from "../../redux/baseApi";
import Title from "../../components/Title";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  setCurrentPage,
  setTotalPages,
} from "../../redux/features/products/paginationSlice";
import Pagination from "../../components/Pagination";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentPage, totalPages } = useAppSelector(
    (state) => state.pagination
  );

  const { data, isLoading } = useGetAllCarsQuery({
    page: currentPage,
    limit: 10,
  });

  useEffect(() => {
    if (data) {
      dispatch(setTotalPages(data?.data?.totalPages));
    }
  }, [data, dispatch]);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="">
      <DefaultContainer>
        <Title>Product Management</Title>
        <ProductManagement products={data?.data?.products} />
      </DefaultContainer>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      ></Pagination>
    </div>
  );
};

export default App;
