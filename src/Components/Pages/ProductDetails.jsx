import { useState, useEffect, useContext } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import Topbar from '../Topbar/Topbar';
import CategoryList from '../Common/CategoryList';
import NavItems from '../Common/NavItems';
import Footer from "../Footer/Footer";
import user from "../../assets/images/user.jpg";
import {ShoppingContext} from "../../context/ShoppingContext";




const host = "http://127.0.0.1:8000";

const ProductDetails = () => {
  const Navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState({});
  const { shoppingCart, setShoppingCart } = useContext(ShoppingContext);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  
  //let EXPIRE = 1000 *10;
  let { id } = useParams();
  const img =
    product && product.image ? product.image.replace("public", "") : "";

  

  useEffect(() => {
    axios
      .get(`/api/view-product/${id}`)
      .then((response) => {
        //console.log(response.data.product);
        if (response.data.status === 200) {
          setProduct(response.data.product);
        }
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 404) {
            alert(err.response.data.errors);
          }
          if (err.response.status === 500) {
            alert(err.response.data.errors);
          }
        }
      });
  }, [id]);

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value); 
  };

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  }
  

  const incrementQuantity = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
    } else if (quantity === 10) {
      swal({
        title: "Oops!!",
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
          Navigate("/contact-us");
        }
      });
    }
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleQuantityChange = (event) => {
    const input = event.target.value;
    const pattern = /^[0-9\b]+$/; // Only allow numbers
    if (pattern.test(input)) {
      const newQuantity = parseInt(input);
      if (newQuantity <= 10) {
        setQuantity(newQuantity);
      } else {
        setQuantity(10); // Set the quantity to 10 if the entered value is greater than 10
      }
    }
  };

  const handleAddtoCart = () => {
    

    setShoppingCart((pre) => {
      const existingProductIndex = pre.findIndex(
        (item) =>
          item.id === product.id &&
          item.size === selectedSize &&
          item.color === selectedColor
      );

      if (existingProductIndex !== -1) {
        // If the product already exists in the cart, increment the quantity
        const updatedCart = [...pre];
        updatedCart[existingProductIndex].quantity += 1;
        //console.log(updatedCart);
        return updatedCart;
      } else {
        // If the product does not exist in the cart, add it as a new item
        const updatedCart = [
          ...pre,
          {
            ...product,
            quantity: quantity,
            size: selectedSize,
            color: selectedColor,
            price: product.discount_price
              ? product.discount_price
              : product.price,
          },
        ];
        //console.log(updatedCart);

        swal("Product Added!", "You product is in the cart", "success");

        return updatedCart;
      }
    });
      
  };



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
                Product Details
              </h1>
              <div className="d-inline-flex">
                <p className="m-0">
                  <Link to="/"> Home </Link>
                </p>
                <p className="m-0 px-2">-</p>
                <p className="m-0">Product Details</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid pt-5">
          <div className="row px-xl-5"></div>

          {/* product detail start */}

          <div className="container-fluid py-5">
            <div className="row px-xl-5">
              <div className="col-lg-5 pb-5">
                <div
                  id="product-carousel"
                  className="carousel slide"
                  data-ride="carousel">
                  <div className="carousel-inner border">
                    <div className="carousel-item active">
                      <img
                        className="w-100 h-100"
                        src={`${host}/storage/${img}`}
                        alt="productimg"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-7 pb-5">
                <h3 className="font-weight-semi-bold">{product.title}</h3>

                {/* <h3 className="font-weight-semi-bold mb-4">$150.00</h3> */}

                <div className="d-flex align-items-center">
                  {product.discount_price ? (
                    <>
                      <h3 className="font-weight-semi-bold mb-4 text-danger">
                        ${product.discount_price}
                      </h3>
                      <del>
                        <h3 className="font-weight-semi-bold text-muted mb-4 ml-2">
                          ${product.price}
                        </h3>
                      </del>
                    </>
                  ) : (
                    <h3 className="font-weight-semi-bold mb-4">
                      ${product.price}
                    </h3>
                  )}
                </div>

                <p className="mb-4">{product.description}</p>

                <div className="d-flex mb-3">
                  <p className="text-dark font-weight-medium mb-0 mr-3">
                    Sizes
                  </p>
                  {Array.isArray(product.size) &&
                    product.size.map((size, index) => (
                      <div
                        className="custom-control custom-radio custom-control-inline"
                        key={index}>
                        <input
                          type="radio"
                          className="custom-control-input"
                          id={`size${index}`}
                          name="size"
                          value={size}
                          //checked={selectedSize === size}
                          onChange={handleSizeChange}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor={`size${index}`}>
                          {size}
                        </label>
                      </div>
                    ))}
                </div>

                <div className="d-flex mb-3">
                  <p className="text-dark font-weight-medium mb-0 mr-3">
                    Colors
                  </p>
                  {Array.isArray(product.color) &&
                    product.color.map((color, index) => (
                      <div
                        className="custom-control custom-radio custom-control-inline"
                        key={index}>
                        <input
                          type="radio"
                          className="custom-control-input"
                          id={`color${index}`}
                          name="color"
                          value={color}
                          // checked={selectedColor === color}
                          onChange={handleColorChange}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor={`color${index}`}>
                          {color}
                        </label>
                      </div>
                    ))}
                </div>

                <div className="d-flex align-items-center mb-4 pt-2">
                  <div
                    className="input-group quantity mr-3"
                    style={{ width: 130 }}>
                    <div className="input-group-btn">
                      <button
                        className="btn btn-primary btn-minus"
                        onClick={decrementQuantity}>
                        <i className="fa fa-minus" />
                      </button>
                    </div>

                    <input
                      inputMode="numeric"
                      className="form-control bg-secondary text-center"
                      value={quantity}
                      onChange={handleQuantityChange}
                      pattern="[0-9]*"
                    />

                    <div className="input-group-btn">
                      <button
                        className="btn btn-primary btn-plus"
                        onClick={incrementQuantity}>
                        <i className="fa fa-plus" />
                      </button>
                    </div>
                  </div>
                  <button className="btn btn-primary px-3" onClick={handleAddtoCart}>
                    <i className="fa fa-shopping-cart mr-1" /> Add To Cart
                  </button>
                </div>

                <div className="d-flex pt-2">
                  <p className="text-dark font-weight-medium mb-0 mr-2">
                    Share on:
                  </p>
                  <div className="d-inline-flex">
                    <Link className="text-dark px-2" to="">
                      <i className="fab fa-facebook-f" />
                    </Link>
                    <Link className="text-dark px-2" to="">
                      <i className="fab fa-twitter" />
                    </Link>
                    <Link className="text-dark px-2" to="">
                      <i className="fab fa-linkedin-in" />
                    </Link>
                    <Link className="text-dark px-2" to="">
                      <i className="fab fa-pinterest" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="row px-xl-5">
              <div className="col">
                <div className="nav nav-tabs justify-content-center border-secondary mb-4">
                  <Link
                    className="nav-item nav-link active"
                    data-toggle="tab"
                    to="#tab-pane-1">
                    Description
                  </Link>
                  <Link
                    className="nav-item nav-link"
                    data-toggle="tab"
                    to="#tab-pane-2">
                    Information
                  </Link>
                  <Link
                    className="nav-item nav-link"
                    data-toggle="tab"
                    to="#tab-pane-3">
                    Reviews (0)
                  </Link>
                </div>
                <div className="tab-content">
                  <div className="tab-pane fade show active" id="tab-pane-1">
                    <h4 className="mb-3">Product Description</h4>
                    <p>
                      Eos no lorem eirmod diam diam, eos elitr et gubergren diam
                      sea. Consetetur vero aliquyam invidunt duo dolores et duo
                      sit. Vero diam ea vero et dolore rebum, dolor rebum eirmod
                      consetetur invidunt sed sed et, lorem duo et eos elitr,
                      sadipscing kasd ipsum rebum diam. Dolore diam stet rebum
                      sed tempor kasd eirmod. Takimata kasd ipsum accusam
                      sadipscing, eos dolores sit no ut diam consetetur duo
                      justo est, sit sanctus diam tempor aliquyam eirmod nonumy
                      rebum dolor accusam, ipsum kasd eos consetetur at sit
                      rebum, diam kasd invidunt tempor lorem, ipsum lorem elitr
                      sanctus eirmod takimata dolor ea invidunt.
                    </p>
                    <p>
                      Dolore magna est eirmod sanctus dolor, amet diam et eirmod
                      et ipsum. Amet dolore tempor consetetur sed lorem dolor
                      sit lorem tempor. Gubergren amet amet labore sadipscing
                      clita clita diam clita. Sea amet et sed ipsum lorem elitr
                      et, amet et labore voluptua sit rebum. Ea erat sed et diam
                      takimata sed justo. Magna takimata justo et amet magna et.
                    </p>
                  </div>
                  <div className="tab-pane fade" id="tab-pane-2">
                    <h4 className="mb-3">Additional Information</h4>
                    <p>
                      Eos no lorem eirmod diam diam, eos elitr et gubergren diam
                      sea. Consetetur vero aliquyam invidunt duo dolores et duo
                      sit. Vero diam ea vero et dolore rebum, dolor rebum eirmod
                      consetetur invidunt sed sed et, lorem duo et eos elitr,
                      sadipscing kasd ipsum rebum diam. Dolore diam stet rebum
                      sed tempor kasd eirmod. Takimata kasd ipsum accusam
                      sadipscing, eos dolores sit no ut diam consetetur duo
                      justo est, sit sanctus diam tempor aliquyam eirmod nonumy
                      rebum dolor accusam, ipsum kasd eos consetetur at sit
                      rebum, diam kasd invidunt tempor lorem, ipsum lorem elitr
                      sanctus eirmod takimata dolor ea invidunt.
                    </p>
                    <div className="row">
                      <div className="col-md-6">
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item px-0">
                            Sit erat duo lorem duo ea consetetur, et eirmod
                            takimata.
                          </li>
                          <li className="list-group-item px-0">
                            Amet kasd gubergren sit sanctus et lorem eos
                            sadipscing at.
                          </li>
                          <li className="list-group-item px-0">
                            Duo amet accusam eirmod nonumy stet et et stet
                            eirmod.
                          </li>
                          <li className="list-group-item px-0">
                            Takimata ea clita labore amet ipsum erat justo
                            voluptua. Nonumy.
                          </li>
                        </ul>
                      </div>
                      <div className="col-md-6">
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item px-0">
                            Sit erat duo lorem duo ea consetetur, et eirmod
                            takimata.
                          </li>
                          <li className="list-group-item px-0">
                            Amet kasd gubergren sit sanctus et lorem eos
                            sadipscing at.
                          </li>
                          <li className="list-group-item px-0">
                            Duo amet accusam eirmod nonumy stet et et stet
                            eirmod.
                          </li>
                          <li className="list-group-item px-0">
                            Takimata ea clita labore amet ipsum erat justo
                            voluptua. Nonumy.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="tab-pane-3">
                    <div className="row">
                      <div className="col-md-6">
                        <h4 className="mb-4">
                          1 review for "Colorful Stylish Shirt"
                        </h4>
                        <div className="media mb-4">
                          <img
                            src={user}
                            alt="user"
                            className="img-fluid mr-3 mt-1"
                            style={{ width: 45 }}
                          />
                          <div className="media-body">
                            <h6>
                              John Doe
                              <small>
                                {" "}
                                - <i>01 Jan 2045</i>
                              </small>
                            </h6>
                            <div className="text-primary mb-2">
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star-half-alt" />
                              <i className="far fa-star" />
                            </div>
                            <p>
                              Diam amet duo labore stet elitr ea clita ipsum,
                              tempor labore accusam ipsum et no at. Kasd diam
                              tempor rebum magna dolores sed sed eirmod ipsum.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <h4 className="mb-4">Leave a review</h4>
                        <small>
                          Your email address will not be published. Required
                          fields are marked *
                        </small>
                        <div className="d-flex my-3">
                          <p className="mb-0 mr-2">Your Rating * :</p>
                          <div className="text-primary">
                            <i className="far fa-star" />
                            <i className="far fa-star" />
                            <i className="far fa-star" />
                            <i className="far fa-star" />
                            <i className="far fa-star" />
                          </div>
                        </div>
                        <form>
                          <div className="form-group">
                            <label htmlFor="message">Your Review *</label>
                            <textarea
                              id="message"
                              cols={30}
                              rows={5}
                              className="form-control"
                              defaultValue={""}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="name">Your Name *</label>
                            <input
                              type="text"
                              className="form-control"
                              id="name"
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="email">Your Email *</label>
                            <input
                              type="email"
                              className="form-control"
                              id="email"
                            />
                          </div>
                          <div className="form-group mb-0">
                            <input
                              type="submit"
                              defaultValue="Leave Your Review"
                              className="btn btn-primary px-3"
                            />
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* product detail end */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;
