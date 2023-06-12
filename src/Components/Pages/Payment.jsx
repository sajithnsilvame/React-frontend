import { useEffect, useContext } from "react";
import { ShoppingContext } from "../../context/ShoppingContext";

const Payment = () => {
  const { orderInfo, setOrderInfo, userInfo } = useContext(ShoppingContext);

  useEffect(() => {

    const tempArr = [...orderInfo.shoppingCart]; 
    const reCorrectArr = tempArr.map(ele => {

      const image = String(ele.image).split('/')[3] ;
      //console.log(image);
        return ({

          ...ele,image
        })
    })
    console.log(`hello world`,reCorrectArr);
    setOrderInfo({ ...orderInfo, shoppingCart: reCorrectArr });

  }, []);

 
    console.log(`order info success`,orderInfo);
    console.log(userInfo);
 

  return <div>Payment</div>;
};

export default Payment;
