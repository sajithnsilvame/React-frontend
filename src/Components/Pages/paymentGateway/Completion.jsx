import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Confetti from "react-confetti";
import {useEffect} from "react";
import swal from "sweetalert";
import {useNavigate} from "react-router-dom";

const Completion = () => {

  const navigate = useNavigate();

  useEffect(() => {
    showToast();
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
