import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useContext } from "react";
import {ShoppingContext} from "../../../context/ShoppingContext";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51NHMI3IcPN2M0dwTu9aTt4mU8PofEdW6gtH1ttG2iwGp6jhxVvT0aF1uLNO0z2AaXNgyJaLrA0ksQRbi3x38EI8V00q6Da1Z61"
);

const PaymentForm = () => {
  
  const { clientSecret } = useContext(ShoppingContext);
  return (
    <div>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );

};

export default PaymentForm;
