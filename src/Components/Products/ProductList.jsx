import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const host = "http://127.0.0.1:8000";

const ProductList = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`/api/products`).then((res) => {
      //console.log(res.data.products);
      if (res.data.status === 200) {
        setProducts(res.data.products);
      }
    });
  }, []);

  return (
    <>
      <div className="container-fluid pt-5">
        
        <div className="text-center mb-4">
          <h2 className="section-title px-5">
            <span className="px-2">Trending Products</span>
          </h2>
        </div>

        <div className="row px-xl-5 pb-3">
          
            {products?.map((product) => {
              const img = product.image.split("public").join("");
              return (
                <div
                  className="col-lg-3 col-md-6 col-sm-12 pb-1"
                  key={product.id}>
                  <div className="card product-item border-0 mb-4">
                    <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                      <img
                        className="img-fluid w-100"
                        src={`${host}/storage/${img}`}
                        alt={product.main_category}
                      />
                    </div>
                    <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                      <h6 className="text-truncate mb-3">{product.title}</h6>

                      <div className="d-flex justify-content-center">
                        <h6>${product.discount_price}</h6>
                        <h6 className="text-danger ml-2">
                          <del style={{ textDecorationColor: "red" }}>
                            ${product.price}
                          </del>
                        </h6>
                      </div>
                    </div>
                    <div className="card-footer d-flex justify-content-between bg-light border">
                      <Link
                        to={`/view-product/${product.id}`}
                        className="btn btn-sm text-dark p-0">
                        <i className="fas fa-eye text-primary mr-1"></i>View
                        Detail
                      </Link>
                      <Link to="" className="btn btn-sm text-dark p-0">
                        <i className="fas fa-heart text-primary text-primary mr-1"></i>
                        Add To Wishlist
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          
        </div>
      </div>
    </>
  );
};

export default ProductList;
