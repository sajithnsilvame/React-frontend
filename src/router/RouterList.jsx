import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../Home';
import Register from '../Components/Pages/Register';
import Login from '../Components/Pages/Login';
import Checkout from '../Components/Pages/Checkout';
import Contact from '../Components/Pages/Contact';
import ProductDetails from '../Components/Pages/ProductDetails';
import Shop from '../Components/Pages/Shop';
import ShoppingCart from '../Components/Pages/ShoppingCart';
import PaymentForm from "../Components/Pages/paymentGateway/PaymentForm";
import Completion from "../Components/Pages/paymentGateway/Completion";

const RouterList = () => {

  
  const routes = [
    { path: "/", element: <Home /> },
    { path: "/register", element: <Register /> },
    { path: "/login", element: <Login /> },
    { path: "/checkout", element: <Checkout /> },
    { path: "/contact-us", element: <Contact /> },
    { path: "/view-product/:id", element: <ProductDetails /> },
    { path: "/shop", element: <Shop /> },
    { path: "/cart", element: <ShoppingCart /> },
    { path: "/payment", element: <PaymentForm /> },
    { path: "/completion", element: <Completion /> },
  ];

  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default RouterList;
