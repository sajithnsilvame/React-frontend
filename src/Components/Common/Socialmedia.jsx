import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
const Socialmedia = () => {
  return (
    <>
      <div className="col-lg-6 text-center text-lg-right">
        <div className="d-inline-flex align-items-center">
          <Link className="text-white px-2" to="">
            <i className="fab fa-facebook"></i>
          </Link>
          <Link className="text-white px-2" to="">
            <i className="fab fa-twitter"></i>
          </Link>
          <Link className="text-white px-2" to="">
            <i className="fab fa-linkedin-in"></i>
          </Link>
          <Link className="text-white px-2" href="">
            <i className="fab fa-instagram"></i>
          </Link>
          <Link className="text-white pl-2" to="">
            <i className="fab fa-youtube"></i>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Socialmedia;
