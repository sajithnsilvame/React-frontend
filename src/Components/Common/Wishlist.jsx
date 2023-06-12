import { Link } from "react-router-dom";
const Wishlist = () => {
  return (
    <>
      <Link to="" className="btn border">
        <i className="fas fa-heart text-primary"></i>
        <span className="badge">0</span>
      </Link>
    </>
  );
};

export default Wishlist;
