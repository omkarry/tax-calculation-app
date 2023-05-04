 import Logo from "../Assets/Images/Logo.png"
 import { Link } from "react-router-dom";

const HomeHeader = () => {
  return(
    <div className="container-fluid mx-0 px-0">
    <header className="d-flex flex-wrap align-items-center justify-content-between justify-content-md-between py-3 px-4 bg-none">
      <div className="col-md-3 mb-2 mb-md-0">
        <a href="/" className="d-inline-flex link-body-emphasis text-decoration-none text-center">
          <img src={Logo} className="img-responsive w-50" style={{mixBlendMode : "multiply"}}/>
        </a>
      </div>

      {/* <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li><a href="#" className="nav-link px-2 link-secondary">Home</a></li>
        <li><a href="#" className="nav-link px-2">Features</a></li>
        <li><a href="#" className="nav-link px-2">Pricing</a></li>
        <li><a href="#" className="nav-link px-2">FAQs</a></li>
        <li><a href="#" className="nav-link px-2">About</a></li>
      </ul> */}

      <div className="col-md-3 text-end">
        <Link to={"/login"} type="button" className="btn bg-primary text-white btn-outline-primary me-2">Login</Link>
        {/* <button type="button" className="btn btn-primary">Sign-up</button> */}
      </div>
    </header>
  </div>
  );
}

export default HomeHeader;