import { PaymentElement } from "@stripe/react-stripe-js";
import { useContext, useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
