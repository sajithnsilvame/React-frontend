
const Searchbar = () => {
  return (
    <>
      <div className="col-lg-6 col-6 text-left">
        <form action="">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search for products"
              style={{
                outline: "none",
                "&:focus": {
                  outline: "none",
                },
              }}
            />
            <div className="input-group-append">
              <button className="btn btn-primary" type="submit">
                <i className="fa fa-search"></i>
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Searchbar