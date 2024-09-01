import { useParams } from "react-router-dom";
import { useGetSingleCarByIdQuery } from "../../redux/baseApi";
import ProductDetail from "./CarDetail";
import DefaultContainer from "../../components/DefaultContainer";


const ProductDetailsPage = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetSingleCarByIdQuery(id);
  console.log(data);
  return (
    <DefaultContainer>
      {isLoading && <div>Loading...</div>}
      <div>
            <ProductDetail key={Math.random()} product={data?.data}/>
      </div>
    </DefaultContainer>
  );
};

export default ProductDetailsPage;
