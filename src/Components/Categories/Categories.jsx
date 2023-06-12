import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const host = "http://127.0.0.1:8000"

const Categories = () => {

  const [mainCategory, setMainCategory] = useState([]);
  
  useEffect(() => {
    axios.get(`/api/categories`).then((res) => {
      //console.log(res.data.categories)
      if (res.data.status === 200) {
        setMainCategory(res.data.categories);
      }
    });
  }, []);

  var MainCategoryList = mainCategory?.map((item) => {
    const img = item.image.split("public").join("");

    return (
      <div className="col-lg-4 col-md-6 pb-1" key={item.id}>
        <div
          className="cat-item d-flex flex-column border mb-4"
          style={{ padding: "30px" }}>
          <p className="text-right">{item.id}</p>
          <Link to="" className="cat-img position-relative overflow-hidden mb-3">
            <img
              className="img-fluid"
              src={`${host}/storage/${img}`}
              alt={item.name}
            />
          </Link>
          <h5 className="font-weight-semi-bold m-0">{item.name}</h5>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="container-fluid pt-5">
        <div className="row px-xl-5 pb-3">{MainCategoryList}</div>
      </div>
    </>
  );
};

export default Categories;
