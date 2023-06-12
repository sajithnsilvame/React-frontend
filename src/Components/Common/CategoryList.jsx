import { useState, useEffect } from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const CategoryList = () => {
  const [categoryList, setcategoryList] = useState([]);

  useEffect(() => {
    axios.get(`/api/sub-categories`).then((res) => {
      //console.log(res.data.sub_categories);
      if (res.data.status === 200) {
        setcategoryList(res.data.sub_categories);
      }
    });
  }, []);

  return (
    <div className="col-lg-3 d-none d-lg-block">
      <a
        className="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100"
        data-toggle="collapse"
        href="#navbar-vertical"
        style={{ height: 65, marginTop: "-1px", padding: "0 30px" }}>
        <h6 className="m-0">Categories</h6>
        <i className="fa fa-angle-down text-dark" />
      </a>
      <nav
        className="collapse show navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0"
        id="navbar-vertical">
        {categoryList &&
          categoryList?.map((item) => {
            return (
              <div className="navbar-nav w-100 overflow-hidden" key={item.id}>
                <Link to="" className="nav-item nav-link">
                  {item.category_name}
                </Link>
              </div>
            );
          })}
      </nav>
    </div>
  );
};

export default CategoryList;
