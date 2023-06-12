import {  Link } from "react-router-dom";
const Logo = () => {
  return (
    <>
      <div className="col-lg-3 d-none d-lg-block">
        <Link to="/" className="text-decoration-none">
          <h1 className="m-0 display-5 font-weight-semi-bold">
            <span className="text-primary font-weight-bold border px-3 mr-1">
              E
            </span>
            Martz
          </h1>
        </Link>
      </div>
    </>
  );
}

export default Logo