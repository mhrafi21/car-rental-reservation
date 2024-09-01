import React from "react";
import { useParams } from "react-router-dom";
import { useGetAllCarsQuery } from "../../redux/baseApi";
import ProductsList from "../../components/ProductsList";
import { TCar } from "../../interfaces";
import DefaultContainer from "../../components/DefaultContainer";

const CategoryProduct: React.FC = () => {
  const { categoryName } = useParams();

  const { data: products, isLoading } = useGetAllCarsQuery({
    category: categoryName,
  });

  return (
    <div className="py-12">
      <DefaultContainer>
      <h2 className="text-3xl font-bold mb-8 text-center">Category Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading
            ? "Loading..."
            : products?.data?.products?.map((product: TCar) => (
                <ProductsList
                  key={product._id}
                  product={product}
                ></ProductsList>
              ))}
        </div>
      </DefaultContainer>
    </div>
  );
};

export default CategoryProduct;
