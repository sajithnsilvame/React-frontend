import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import Logo from './Logo';

const NavItems = () => {
  const navigate = useNavigate();

  const logoutSubmit = (event) => {
    event.preventDefault();
    axios.post(`/api/logout`).then((res) => {
      if (res.data.status === 200) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_name");
        swal("Success", res.data.message, "success");
        navigate("/");
      }
    });
  };

  var AuthButton = "";
  if (!localStorage.getItem("auth_token")) {
    AuthButton = (
      <>
        <Link to="/login" className="nav-item nav-link">
          Login
        </Link>
        <Link to="/register" className="nav-item nav-link">
          Register
        </Link>
      </>
    );
  } else {
    AuthButton = (
      <button className="btn btn-primary btn-sm" onClick={logoutSubmit}>
        Logout
      </button>
    );
  }

  // if user is logged, logout automatically within 30 mins!

  // const EXPIRE_TIME = 1000 * 60 * 60;

  // if (localStorage.getItem("auth_token")) {
  //   setTimeout(function () {
  //     axios.post(`/api/logout`).then((res) => {
  //       if (res.data.status === 200) {
  //         localStorage.removeItem("auth_token");
  //         localStorage.removeItem("auth_name");

  //         swal("Oops", "Your Session has Timeout!", "error");
  //       }
  //     });
  //   }, EXPIRE_TIME);
  // }

  

  const EXPIRE_TIME = 3600000; // 1 hour

  // Function to handle logout
  const logout = () => {
    axios
      .post(`/api/logout`)
      .then((res) => {
        if (res.data.status === 200) {
          localStorage.removeItem("auth_token");
          localStorage.removeItem("auth_name");
          swal("Oops", "Your Session has Timed Out!", "error");
        }
      })
      .catch((error) => {
        // Handle any error that occurred during logout
        console.error("Logout error:", error);
      });
  };

  // Variable to store the logout timer
  let logoutTimer;

  // Function to start the logout timer
  const startLogoutTimer = () => {
    // Clear any existing timer
    clearTimeout(logoutTimer);

    // Set a new timer for the specified expiration time
    logoutTimer = setTimeout(() => {
      logout();
    }, EXPIRE_TIME);
  };

  // Check if the user is already authenticated
  if (localStorage.getItem("auth_token")) {
    startLogoutTimer();
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
        <Logo />
        <button
          type="button"
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarCollapse">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarCollapse">
          <div className="navbar-nav mr-auto py-0">
            <Link to="/" className="nav-item nav-link active">
              Home
            </Link>
            <Link to="/shop" className="nav-item nav-link">
              Shop
            </Link>

            <div className="nav-item dropdown">
              <Link
                to="#"
                className="nav-link dropdown-toggle"
                data-toggle="dropdown">
                More
              </Link>
              <div className="dropdown-menu rounded-0 m-0">
                <Link to="/cart" className="dropdown-item">
                  Shopping Cart
                </Link>
                <Link to="/checkout" className="dropdown-item">
                  Checkout
                </Link>
              </div>
            </div>
            <Link to="/contact" className="nav-item nav-link">
              Contact
            </Link>
          </div>

          <div className="navbar-nav ml-auto py-0">{AuthButton}</div>
        </div>
      </nav>
    </>
  );
}

export default NavItems