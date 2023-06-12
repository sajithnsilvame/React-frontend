import {Link} from "react-router-dom";
import carousel_1 from "../../assets/images/carousel-1.jpg";
import carousel_2 from "../../assets/images/carousel-2.jpg";


const Carousel = () => {
  return (
    <>
      <div id="header-carousel" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active carousel-item-height">
            <img className="img-fluid" src={carousel_1} alt="Image1" />
            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
              <div className="p-3 carousel-item-max-width">
                <h4 className="text-light text-uppercase font-weight-medium mb-3">
                  10% Off Your First Order
                </h4>
                <h3 className="display-4 text-white font-weight-semi-bold mb-4">
                  Fashionable Dress
                </h3>
                <Link to="" className="btn btn-light py-2 px-3">
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
          <div className="carousel-item carousel-item-height">
            <img className="img-fluid" src={carousel_2} alt="Image2" />
            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
              <div className="p-3 carousel-item-max-width">
                <h4 className="text-light text-uppercase font-weight-medium mb-3">
                  10% Off Your First Order
                </h4>
                <h3 className="display-4 text-white font-weight-semi-bold mb-4">
                  Reasonable Price
                </h3>
                <Link to="" className="btn btn-light py-2 px-3">
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Link
          className="carousel-control-prev"
          to="#header-carousel"
          data-slide="prev">
          <div className="btn btn-dark carousel-item-btn">
            <span className="carousel-control-prev-icon mb-n2"></span>
          </div>
        </Link>
        <Link
          className="carousel-control-next"
          to="#header-carousel"
          data-slide="next">
          <div className="btn btn-dark carousel-item-btn">
            <span className="carousel-control-next-icon mb-n2"></span>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Carousel;
