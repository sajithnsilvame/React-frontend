import { useContext } from "react";
import {Link} from "react-router-dom";
import { ShoppingContext } from "../../context/ShoppingContext";
const Cart = () => {

  const { shoppingCart } = useContext(ShoppingContext);
  const cartCount = shoppingCart.length;

  return (
    <>
        <Link to="/cart" className="btn border">
          <i className="fas fa-shopping-cart text-primary"></i>
          <span className="badge text-bg-primary">{cartCount}</span>
        </Link>   
    </>
  );
};

export default Cart;
