import { useContext } from "react";
import Footer from '../Footer/Footer';
import NavItems from '../Common/NavItems';
import CategoryList from '../Common/CategoryList';
import Topbar from '../Topbar/Topbar';
import { Link, useNavigate } from 'react-router-dom';
import swal from "sweetalert";
import axios from 'axios';

import { ShoppingContext } from "../../context/ShoppingContext";

const host = "http://127.0.0.1:8000";

const Checkout = () => {
  const navigate = useNavigate();

  const { orderInfo } = useContext(ShoppingContext);
  const { userInfo, setUserInfo } = useContext(ShoppingContext);
  const { setClientSecret } = useContext(ShoppingContext);

  

  const handleUserInfo = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const userData = Object.fromEntries(formData.entries());

    setUserInfo(userData);
    swal("success", "information confirmed", "success");
    
  };
  
  
  const isEmpty = Object.keys(userInfo).length === 0;

  const handlePay = () => {
    if (isEmpty) {
      console.log(isEmpty);
      swal("Warning", "Please confirm your information", "warning");
    } else if (!isEmpty) {
      
      axios
        .post("/api/payment-intent", {
          amount: orderInfo.total,
        })
        .then((result) => {
          const { client_secret } = result.data;
          console.log(result.data);
          setClientSecret(client_secret);
          navigate("/payment");
        });
    }
    
  }
  

  
    return (
      <>
        <Topbar />
        <div className="container-fluid mb-5">
          <div className="row border-top px-xl-5">
            <CategoryList />

            <div className="col-lg-9">
              <NavItems />
            </div>

            <div className="container-fluid bg-secondary mb-5 ml-3">
              <div className="d-flex flex-column align-items-center justify-content-center minHeight">
                <h1 className="font-weight-semi-bold text-uppercase mb-3">
                  Checkout
                </h1>
                <div className="d-inline-flex">
                  <p className="m-0">
                    <Link to="/">Home</Link>
                  </p>
                  <p className="m-0 px-2">-</p>
                  <p className="m-0">Checkout</p>
                </div>
              </div>
            </div>

            {/* checkout section start */}

            <div className="container-fluid pt-5">
              <div className="row px-xl-5">
                <div className="col-lg-8">
                  <div className="mb-4">
                    <h4 className="font-weight-semi-bold mb-4">
                      Shipping Information
                    </h4>
                    <form onSubmit={handleUserInfo}>
                      <div className="row">
                        <div className="col-md-6 form-group">
                          <label>First Name</label>
                          <input
                            className="form-control"
                            type="text"
                            name="fname"
                            required
                            placeholder="John"
                          />
                        </div>
                        <div className="col-md-6 form-group">
                          <label>Last Name</label>
                          <input
                            className="form-control"
                            type="text"
                            name="lname"
                            required
                            placeholder="Doe"
                          />
                        </div>
                        <div className="col-md-6 form-group">
                          <label>E-mail</label>
                          <input
                            className="form-control"
                            type="email"
                            name="email"
                            required
                            placeholder="example@email.com"
                          />
                        </div>
                        <div className="col-md-6 form-group">
                          <label>Mobile No</label>
                          <input
                            className="form-control"
                            type="text"
                            maxLength={10}
                            name="mobile"
                            required
                            placeholder="+123 456 789"
                          />
                        </div>
                        <div className="col-md-6 form-group">
                          <label>Address</label>
                          <input
                            className="form-control"
                            type="text"
                            name="address"
                            required
                            placeholder="123 Street"
                          />
                        </div>

                        <div className="col-md-6 form-group">
                          <label>City</label>
                          <input
                            className="form-control"
                            type="text"
                            name="city"
                            required
                            placeholder="New York"
                          />
                        </div>
                        <div className="col-md-6 form-group d-flex justify-content-center m-auto">
                          <button
                            className="btn btn-primary btn-md"
                            type="submit">
                            Confirm My Shipping Info
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="card border-secondary mb-5">
                    <div className="card-header bg-secondary border-0">
                      <h4 className="font-weight-semi-bold m-0">
                        Checkout Info
                      </h4>
                    </div>

                    <div className="card-body">
                      <hr className="mt-0" />
                      <div className="d-flex justify-content-between mb-3 pt-1">
                        <h6 className="font-weight-medium">Subtotal</h6>
                        <h6 className="font-weight-medium">
                          $
                          {orderInfo && orderInfo
                            ? orderInfo.total
                            : "0.00"}
                        </h6>
                      </div>
                      <div className="d-flex justify-content-between">
                        <h6 className="font-weight-medium">Free Shipping</h6>
                      </div>
                    </div>
                    <div className="card-footer border-secondary bg-transparent">
                      <div className="d-flex justify-content-between mt-2">
                        <h5 className="font-weight-bold">
                          Total Payable Amount
                        </h5>
                        <h5 className="font-weight-bold">
                          $
                          {orderInfo && orderInfo
                            ? orderInfo.total
                            : "0.00"}
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div className="card border-secondary mb-5">
                    <div className="card-header bg-secondary border-0">
                      <h4 className="font-weight-semi-bold m-0">Payment</h4>
                    </div>

                    <div className="card-footer border-secondary bg-transparent">
                      <button
                        className="btn btn-lg btn-block btn-primary font-weight-bold my-3 py-3"
                        onClick={handlePay}>
                        Make Payment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* checkout section end */}
          </div>
        </div>
        <Footer />
      </>
    );
}

export default Checkout;