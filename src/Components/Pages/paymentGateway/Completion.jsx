import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Confetti from "react-confetti";
import {useContext, useEffect} from "react";
import swal from "sweetalert";
import {useNavigate} from "react-router-dom";
import {ShoppingContext} from "../../../context/ShoppingContext";
import axios from "axios";

const Completion = () => {

  const navigate = useNavigate();
  const { orderInfo, userInfo } = useContext(ShoppingContext);

  useEffect(() => {
    showToast();
    
    /* setTimeout(() => {
      const orderDetails = JSON.parse(localStorage.getItem("orderDetails"));
      //console.log(orderDetails);

      const orderSet = {
        order: [
          ...orderDetails.orderInformation.shoppingCart,
        ],
        user: [
          {
            ...orderDetails.userInformation,
          },
        ],
      };
      
      console.log(orderSet);

      // axios.post(`/api/order-details`, orderSet).then((res) => {
      //   if (res.data.status === 200) {
      //     //console.log(res.data.orederData);
      //     const data = res.data.orederData;
      //     localStorage.setItem("orderData", data);

      //   } else {
      //     console.log('response faild');
      //   }
      // });

      //localStorage.removeItem("orderDetails");

    }, 500); */

  }, []);

  const showToast = () => {
    swal({
      title: "Congratulations!!",
      text: "Your Payment and Order Confirmation Successfully!",
      icon: "success",
      dangerMode: true,
      buttons: {
        contact: {
          text: "Continue Shopping",
          value: "shoping",
        },
      
        cancel: "Cancel",
      },
    }).then((value) => {
      if (value === "shoping") {
        navigate("/shop");
      }
      else{
        navigate("/");
      }
    });
  };


  return (
    <div>

      <div>
        <ToastContainer />
      </div>

      <Confetti />
    </div>
  );
};

export default Completion;
