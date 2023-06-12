import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
const BacktoTopBtn = () => {
  return (
    <div>
      <Link to="" className="btn btn-primary back-to-top">
        <i className="fa fa-angle-double-up"></i>
      </Link>
    </div>
  );
};

export default BacktoTopBtn;
