import "../Assets/loader.css"
import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader-background"></div>
      <div className="loader">
        <Spinner animation="border" role="status" variant="light" />
      </div>
    </div>
  );
};

export default Loader;