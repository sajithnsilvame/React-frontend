import { PaymentElement } from "@stripe/react-stripe-js";
import { useContext, useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import {ShoppingContext} from "../../../context/ShoppingContext";
import axios from "axios";


const CheckoutForm = () => {
  
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  //const { orderInfo, userInfo } = useContext(ShoppingContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //console.log(orderInfo);
    //console.log(userInfo);

    /*const orderDetails = {
      orderInformation: orderInfo,
      userInformation: userInfo,
    }; */

   /* localStorage.setItem("orderDetails", JSON.stringify(orderDetails));
    const orderDetailsLast = JSON.parse(localStorage.getItem("orderDetails"));
    const orderSet = {
      order: [...orderDetailsLast.orderInformation.shoppingCart],
      user: [
        {
          ...orderDetailsLast.userInformation,
        },
      ],
    }; */

    // axios.post(`/api/order-details`, orderSet).then((res) => {
    //   if (res.data.status === 200) {
    //     //console.log(res.data.orederData);
    //     const data = res.data.orederData;
    //     localStorage.setItem("orderData", data);

    //   } else {
    //     console.log('response faild');
    //   }
    // });

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/completion`,
      },
    });

    if (!error) {
      console.log("success");
    }

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsProcessing(false);
  };

  

  return (
    <div className="container">
      <div className="card mt-5">
        <div className="card-body">
          <div className="row justify-content-center">
            <div className="col-md-6 mt-5">
              <form id="payment-form" onSubmit={handleSubmit}>
                <PaymentElement id="payment-element" />
                <div className="text-center">
                  <button
                    className="pay_button btn btn-primary btn-md mt-4"
                    disabled={isProcessing || !stripe || !elements}
                    id="submit">
                    <span id="button-text">
                      {isProcessing ? "Processing ..." : "Pay now"}
                    </span>
                  </button>
                </div>
                {/* Show any error or success messages */}
                {message && <div id="payment-message">{message}</div>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
