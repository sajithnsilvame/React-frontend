import React from 'react'
import "./assets/lib/owlcarousel/assets/owl.carousel.min.css";
import "./assets/css/style.css";
import "./assets/css/style.min.css";
//import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "@fortawesome/fontawesome-free/css/all.min.css";

import Topbar from "./Components/Topbar/Topbar";
import Navbar from "./Components/Navbar/Navbar";
import Featured from "./Components/Featured/Featured";
import Categories from "./Components/Categories/Categories";
import Offer from "./Components/Offer/Offer";
import ProductList from "./Components/Products/ProductList";
import Subscribe from "./Components/Subscribe/Subscribe";
import Footer from "./Components/Footer/Footer";

//import "./assets/lib/easing/easing.min.js";
//import "./assets/lib/owlcarousel/owl.carousel.min.js";
//import "./assets/mail/jqBootstrapValidation.min.js";
//import "./assets/mail/contact.js";
//import "./assets/js/main.js";


const Home = () => {
  return (
    <>
      <Topbar />
      <Navbar />
      <Featured />
      <Categories />
      <Offer />
      <ProductList />
      <Subscribe />
      <Footer />
    </>
  );
}

export default Home