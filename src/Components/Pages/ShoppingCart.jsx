import { useState, useEffect, useContext, useCallback } from "react";
import swal from "sweetalert";
import Footer from '../Footer/Footer';
import NavItems from '../Common/NavItems';
import CategoryList from '../Common/CategoryList';
import Topbar from '../Topbar/Topbar';

import { ShoppingContext } from "../../context/ShoppingContext";
import {Link, useNavigate} from "react-router-dom";

const host = "http://127.0.0.1:8000";

const ShoppingCart = () => {
  const navigate = useNavigate();
  const { shoppingCart, setShoppingCart } = useContext(ShoppingContext);
  const { orderInfo, setOrderInfo } = useContext(ShoppingContext);
  const [subtotal, setSubtotal] = useState(0);

  // Update the total whenever the shopping cart changes
  

  const calculateSubtotal = useCallback(() => {
    // Calculate subtotal logic here
    let total = 0;
    shoppingCart.forEach((product) => {
      total += product.price * product.quantity;
    });
    setSubtotal(total);
  }, [shoppingCart]);

  useEffect(() => {
    calculateSubtotal();
  }, [shoppingCart, calculateSubtotal]);

  const handleIncrement = (index) => {
    const updatedCart = [...shoppingCart];
    if (updatedCart[index].quantity < 10) {
      updatedCart[index].quantity += 1;
      setShoppingCart(updatedCart);
      calculateSubtotal();
    } else {
      swal({
        title: "Maximum quantity exceeded!!",
        text: "Maximum quantity is only 10. If you need more, please feel free to contact us!",
        icon: "info",
        dangerMode: true,
        buttons: {
          contact: {
            text: "Contact Us",
            value: "contact",
          },
          cancel: "Cancel",
        },
      }).then((value) => {
        if (value === "contact") {
          <Link to="/contact-us">Contact Us</Link>;
        }
      });
    }
  };

  const handleDecrement = (index) => {
    const updatedCart = [...shoppingCart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      setShoppingCart(updatedCart);
      calculateSubtotal();
    } else {
      alert("Minimum quantity reached");
    }
  };

  const handleQuantityChange = (e, index) => {
    const value = parseInt(e.target.value, 10);

    if (value >= 1 && value <= 10) {
      const updatedCart = [...shoppingCart];
      updatedCart[index].quantity = value;
      setShoppingCart(updatedCart);
      calculateSubtotal();
    } else if (value < 1) {
      // Handle minimum quantity (1) validation
      const updatedCart = [...shoppingCart];
      updatedCart[index].quantity = 1;
      setShoppingCart(updatedCart);
      calculateSubtotal();
      alert("Quantity cannot be less than 1");
    } else if (value > 10) {
      // Handle maximum quantity (10) validation
      const updatedCart = [...shoppingCart];
      updatedCart[index].quantity = 10;
      setShoppingCart(updatedCart);
      calculateSubtotal();
      alert("Quantity cannot be more than 10");
    }
  };

  const removeProduct = (index) => {
    const updatedCart = [...shoppingCart];
    updatedCart.splice(index, 1);
    setShoppingCart(updatedCart);
  };

  //console.log(shoppingCart);
  

  const handleCheckout = () =>{

    const order = {
      shoppingCart: [...shoppingCart],
      total: subtotal,
    };

    setOrderInfo(order);

    console.log(`order info`, order);

    if (localStorage.getItem("auth_token")) {
      navigate("/checkout");
    } 
    else {
      navigate("/login");
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
                Cart
              </h1>
              <div className="d-inline-flex">
                <p className="m-0">
                  <Link to="/">Home</Link>
                </p>
                <p className="m-0 px-2">-</p>
                <p className="m-0">Cart</p>
              </div>
            </div>
          </div>

          {/* cart section start */}

          <div className="container-fluid pt-5">
            <div className="row px-xl-5">
              <div className="col-lg-8 table-responsive mb-5">
                <table className="table table-bordered text-center mb-0">
                  <thead className="bg-secondary text-dark">
                    <tr>
                      <th>Products</th>
                      <th>Size</th>
                      <th>Color</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  {shoppingCart.length > 0 ? (
                    <tbody className="align-middle">
                      {shoppingCart?.map((product, index) => {
                        const img = product.image.split("public").join("");
                        return (
                          <tr key={index}>
                            <td className="align-middle">
                              <img
                                src={`${host}/storage/${img}`}
                                alt=""
                                style={{ width: "50px" }}
                              />
                              {product.title}
                            </td>
                            <td className="align-middle">{product.size}</td>
                            <td className="align-middle">{product.color}</td>
                            <td className="align-middle">{product.price}</td>
                            <td className="align-middle">
                              <div
                                className="input-group quantity mx-auto"
                                style={{ width: "120px" }}>

                                <div className="input-group-btn mr-1">
                                  <button
                                    className="btn btn-sm btn-primary btn-minus"
                                    onClick={() => handleDecrement(index)}>
                                    <i className="fa fa-minus"></i>
                                  </button>
                                </div>

                                <input
                                  inputMode="numeric"
                                  className="form-control bg-secondary text-center"
                                  style={{ height: "30px" }}
                                  value={product.quantity}
                                  min="1"
                                  max="10"
                                  pattern="[0-9]*"
                                  onChange={(e) =>
                                    handleQuantityChange(e, index)
                                  }
                                />

                                <div className="input-group-btn ml-1">
                                  <button
                                    className="btn btn-sm btn-primary btn-plus"
                                    onClick={() => handleIncrement(index)}>
                                    <i className="fa fa-plus"></i>
                                  </button>
                                </div>

                              </div>
                            </td>
                            <td className="align-middle">
                              ${product.price * product.quantity}
                            </td>
                            <td className="align-middle">
                              <button
                                className="btn btn-sm btn-primary"
                                onClick={() => removeProduct(index)}>
                                <i className="fa fa-times"></i>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  ) : (
                    <div className="d-flex justify-content-center">
                      <h1 className="text-center">Cart is Empty</h1>
                    </div>
                  )}
                </table>
              </div>

              <div className="col-lg-4">
                <form className="mb-5" action="">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control p-4"
                      placeholder="Coupon Code"
                    />
                    <div className="input-group-append">
                      <button className="btn btn-primary">Apply Coupon</button>
                    </div>
                  </div>
                </form>
                <div className="card border-secondary mb-5">
                  <div className="card-header bg-secondary border-0">
                    <h4 className="font-weight-semi-bold m-0">Cart Summary</h4>
                  </div>
                  <div className="card-body">
                    <div className="d-flex justify-content-between mb-3 pt-1">
                      <h6 className="font-weight-medium">Subtotal</h6>
                      <h6 className="font-weight-medium">${subtotal}</h6>
                    </div>
                  </div>
                  <div className="card-footer border-secondary bg-transparent">
                    <div className="d-flex justify-content-between mt-2">
                      <h5 className="font-weight-bold">Grand Total</h5>
                      <h5 className="font-weight-bold">${subtotal}</h5>
                    </div>

                    <button
                      className="btn btn-block btn-primary my-3 py-3"
                      
                      onClick={handleCheckout}>
                      Proceed To Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* cart section end */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShoppingCart;
