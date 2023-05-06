import { Link, Route, Routes } from "react-router-dom";
import Logo from "../Assets/Images/Logo.png";
import { SignOut } from "../Components/SignOut";
import InvestmentDeclaration from "./TaxDeclaration";
import Loader from "../Components/Loader";
import UpdateProfile from "./UpdateProfile";

const EmployeeDashboard = () => {
  return (
    <div className="container-fluid mx-0 px-0">
      <header className="d-flex flex-wrap align-items-center justify-content-between justify-content-md-between py-3 px-4 border-bottom">
        <div className="col-md-3 mb-2 mb-md-0">
          <a href="/" className="d-inline-flex link-body-emphasis text-decoration-none text-center">
            <img src={Logo} className="img-responsive w-50" style={{ mixBlendMode: "multiply" }} />
          </a>
        </div>
        <div className="col-md-3 mb-2 mb-md-0">
          <h4>Employee Dashboard</h4>
        </div>
        <div className="dropdown text-end">
          <a href="#" className="d-block link-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle" />
          </a>
          <ul className="dropdown-menu text-small">
            <li><Link to={"/investmentDeclaration"} className="dropdown-item">Investment Declaration</Link></li>
            <li><Link to={"/updateProfile"} className="dropdown-item">Update Profile</Link></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" onClick={SignOut}>Sign out</a></li>
          </ul>
        </div>
      </header>
        {/* <div>
          <Loader />
        </div> */}
      <div>
        
        <Routes>
          <Route path="/investmentDeclaration" element={<InvestmentDeclaration />} />
          <Route path="/updateProfile" element={<UpdateProfile />} />        
        </Routes>
      </div>
    </div>
  );
}

export default EmployeeDashboard;