import { Link, Outlet, Route, Routes } from "react-router-dom";
import { userData } from "../Data/UserData";

const TaxDeclaration: React.FC<{ user: userData }> = ({ user }) => {
  return (
    <>
      <div className="container border rounded p-3 my-3 mx-auto shadow">
        <div className="row">
          <div className="h1">
            Welcome to tax declaration 2023
          </div>
        </div>
        <div className="row text-start">
          <p>
            In budget 2020, an alternative simplified tax regime has been introduced for individuals. The new personal
            tax regime contains reduced tax rates spread over six income slabs. However, the underlying condition is
            that the taxpayer availing the new regime will have to forgo several specified deductions / exeptions and set-off
            of losses.
          </p>
        </div>
      </div>
      <div className="container border rounded p-3 my-3 mx-auto shadow text-start">
        <div className="row">
          <div className="h3">
            Choose Between Old Tax Regime and New Tax Regime
          </div>
        </div>
        <div className="row">
          <p>
            In recent budget, it s proposed that new tax regime becomes the default regime. This means that your tax will be computed
            on the basis of new tax regime unless you want to go with the old tax regime.
          </p>
        </div>
        <hr />
        <div className="row mx-2 px-2">
          <Link to="/taxDeclaration/oldRegime" className="btn btn-primary col-md-2 mx-2">Old Regime</Link>
          <Link to="/taxDeclaration/newRegime" className="btn btn-primary col-md-2 mx-2">New Regime</Link>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default TaxDeclaration;