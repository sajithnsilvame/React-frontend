import { Link } from 'react-router-dom';
import Cart from '../Common/Cart';
import Wishlist from '../Common/Wishlist';
import Searchbar from '../Common/Searchbar';
import Logo from '../Common/Logo';
import Socialmedia from '../Common/Socialmedia';

const Topbar = () => {

  return (
    <>
      <div className="container-fluid">
        <div className="row bg-dark py-2 px-xl-5">
          <div className="col-lg-6 d-none d-lg-block">
            <div className="d-inline-flex align-items-center">
              <Link className="text-white" to="">
                FAQs
              </Link>
              <span className="text-muted px-2">|</span>
              <Link className="text-white" to="">
                Help
              </Link>
              <span className="text-muted px-2">|</span>
              <Link className="text-white" to="">
                Support
              </Link>
            </div>
          </div>
          <Socialmedia />
        </div>

        <div className="row align-items-center py-3 px-xl-5">
          {/* shop logo */}
          <Logo />
          <Searchbar />

          <div className="col-lg-3 col-6 text-right">
            <Wishlist />
            
              <Cart />
            
          </div>
        </div>
      </div>
    </>
  );
}

export default Topbar;