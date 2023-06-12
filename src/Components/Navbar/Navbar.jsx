
import CategoryList from '../Common/CategoryList';
import NavItems from '../Common/NavItems';
import Carousel from '../Common/Carousel';
const Navbar = () => {
  return (
    <>
      <div className="container-fluid mb-5">
        <div className="row border-top px-xl-5">
          <CategoryList />

          <div className="col-lg-9">
            <NavItems />
            <Carousel />
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;