import React from "react";
import CheckoutForm from "./CheckOutForm";
import DefaultContainer from "../../components/DefaultContainer";
import Title from "../../components/Title";

const CheckoutPage: React.FC = () => {
  return (
    <div className="my-8">
      <DefaultContainer>
          <Title>Checkout</Title>
        <CheckoutForm />
      </DefaultContainer>
    </div>
  );
};

export default CheckoutPage;
