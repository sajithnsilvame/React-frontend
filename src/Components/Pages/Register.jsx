import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import swal from "sweetalert";

import "../../index.css";

const Register = () => {

  const Navigate = useNavigate();
  const [registerInput, setRegisterInput] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    error_list: [],
  });

  const handleInput = (event) => {
    event.persist();
    setRegisterInput({
      ...registerInput,
      [event.target.name]: event.target.value,
    });
  };

  const registerSubmit = (event) => {
    event.preventDefault();
    
    const data = {
      name: registerInput.name,
      email: registerInput.email,
      phone: registerInput.phone,
      address: registerInput.address,
      password: registerInput.password,
    };
    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post(`/api/register`, data).then((res) => {
        if (res.data.status === 200) {
          localStorage.setItem("auth_token", res.data.token);
          localStorage.setItem("auth_name", res.data.username);
          swal("Success", res.data.message, "success");
          Navigate("/");
        } else {
          setRegisterInput({
            ...registerInput,
            error_list: res.data.validation_error,
          });
        }
      });
    });
  };

  return (
    <>
      <section className="vh-100 bgColor ">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black border-radius mt-5">
                <Link className="btn btn-info btn-sm" to="/">
                  Back to home
                </Link>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Register
                      </p>

                      <form className="mx-1 mx-md-4" onSubmit={registerSubmit}>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="name"
                              name="name"
                              className="form-control"
                              placeholder="Enter your name"
                              onChange={handleInput}
                              value={registerInput.name}
                            />
                            <span className="text-danger">
                              {registerInput.error_list.name}
                            </span>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="email"
                              id="email"
                              name="email"
                              className="form-control"
                              placeholder="Enter your email"
                              onChange={handleInput}
                              value={registerInput.email}
                            />
                            <span className="text-danger">
                              {registerInput.error_list.email}
                            </span>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="phone"
                              name="phone"
                              className="form-control"
                              placeholder="Enter your phone number"
                              maxLength={10}
                              onChange={handleInput}
                              value={registerInput.phone}
                            />
                            <span className="text-danger">
                              {registerInput.error_list.phone}
                            </span>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="address"
                              name="address"
                              className="form-control"
                              placeholder="Enter your address"
                              onChange={handleInput}
                              value={registerInput.address}
                            />
                            <span className="text-danger">
                              {registerInput.error_list.address}
                            </span>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              id="password"
                              name="password"
                              className="form-control"
                              placeholder="Enter your password"
                              onChange={handleInput}
                              value={registerInput.password}
                            />
                            <span className="text-danger">
                              {registerInput.error_list.password}
                            </span>
                          </div>
                        </div>
                        <h6>
                          Already have an account <a href="login"> log in</a>
                        </h6>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="submit"
                            className="btn btn-primary btn-lg">
                            Register
                          </button>
                        </div>
                      </form>
                    </div>

                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="register_img"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
