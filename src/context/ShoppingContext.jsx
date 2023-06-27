import React, { createContext, useState } from "react";

export const ShoppingContext = createContext(null);

const ShoppingContextProvider = ({ children }) => {

  const [shoppingCart, setShoppingCart] = useState([]);
  const [orderInfo, setOrderInfo] = useState([]);
  const [userInfo, setUserInfo] = useState([]);

  const [paymentStatus, setPaymentStatus] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  return (
    <ShoppingContext.Provider
      value={{
        shoppingCart,
        setShoppingCart,
        orderInfo,
        setOrderInfo,
        userInfo,
        setUserInfo,
        paymentStatus,
        setPaymentStatus,
        clientSecret,
        setClientSecret,
      }}>
      {children}
    </ShoppingContext.Provider>
  );
};

export default ShoppingContextProvider;
