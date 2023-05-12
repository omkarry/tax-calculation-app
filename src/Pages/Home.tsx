import { useState } from "react";
import Logo from "../Assets/Images/Logo.png"
import { Modal, Form, Button } from "react-bootstrap";
import axios from "axios";
import DashboardHead from "../Assets/Images/home-image.jpg"
import useHttp from "../Config/https";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [validUser, setValidUser] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {axiosInstance, loading} = useHttp();

  const onHide = () => {
    setUsername("");
    setPassword("");
    setValidUser("");
    setShowModal(false);
  }

  const handleLogin = () => {
    debugger
    axiosInstance
      .post("Authenticate/login", {
        username,
        password,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const data: any = response.data;

        if (response.status === 200) {
          setValidUser("");
          console.log(data.token);
          localStorage.setItem("access_token", JSON.stringify(data));
          window.location.reload();
          console.log(data);
        } else {
          console.error(data.error);
        }
      })
      .catch((error) => {
        setValidUser("Invalid username or password");
        console.error(error);
      });
  };

  return (
    <div className="container-fluid mx-0 px-0">
      <header className="d-flex flex-wrap align-items-center justify-content-between justify-content-md-between py-3 px-4 bg-none">
        <div className="col-md-3 mb-2 mb-md-0">
          <a href="/" className="d-inline-flex link-body-emphasis text-decoration-none text-center">
            <img src={Logo} className="img-responsive w-50" style={{ mixBlendMode: "multiply" }} />
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
          <button type="button" className="btn bg-primary text-white btn-outline-primary me-2" onClick={() => setShowModal(true)}>Login</button>
        </div>
      </header>
      <Modal show={showModal} onHide={onHide} >
        <Modal.Title className='text-center mt-3 text-dark' >
          Login
        </Modal.Title>
        <Modal.Body>
          <Form>
          {validUser != "" ? <p className="text-danger">{validUser}</p> : null}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                Username
              </Form.Label>
              <Form.Control
                type="text"
                name='username'
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Enter Username"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.CotrolTextarea1">
              <Form.Label>
                Password
              </Form.Label>
              <Form.Control
                type="password"
                name='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder='Enter password'
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={onHide}
          >
            Close
          </Button>
          <Button
            type="submit"
            variant="primary"
            name="login"
            onClick={handleLogin}
          >
            Login
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="mw-100">
        <img src={DashboardHead} alt="Dashboard-Head-Image" width="100%" height="300px" className="rounded shadow " />
      </div>
      <div className="row align-items-md-stretch px-5 my-3">
        <div className="col-md-6">
          <div className="h-100 p-5 text-bg-dark rounded-3 shadow">
            <p>We are more than a company, we are a family!
              We are a diverse yet close-knit group of people united by a passion for technology
              At IncubXperts, we believe in working hard, playing harder, and drinking a whole lot of tea (and coffee)!</p>
            <button className="btn btn-outline-light" type="button">Example button</button>
          </div>
        </div>
        <div className="col-md-6">
          <div className="h-100 p-5 bg-body-tertiary border rounded-3 shadow">
            <h2>Add borders</h2>
            <p>Or, keep it light and add a border for some added definition to the boundaries of your content. Be sure to look under the hood at the source HTML here as we've adjusted the alignment and sizing of both column's content for equal-height.</p>
            <button className="btn btn-outline-secondary" type="button">Example button</button>
          </div>
        </div>
      </div>
      <div className="mw-100 border my-3 rounded shadow text-center px-5 py-3">
        <p className="h6 rounded">
          We are more than a company, we are a family!
          We are a diverse yet close-knit group of people united by a passion for technology
          At IncubXperts, we believe in working hard, playing harder, and drinking a whole lot of tea (and coffee)!
        </p>
      </div>
      <div className="album py-5 bg-body-tertiary">
        <div className="container">

          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            <div className="col">
              <div className="card shadow-sm">
                <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c" /><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
                <div className="card-body">
                  <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                      <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                      <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                    </div>
                    <small className="text-body-secondary">9 mins</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card shadow-sm">
                <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c" /><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
                <div className="card-body">
                  <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                      <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                      <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                    </div>
                    <small className="text-body-secondary">9 mins</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card shadow-sm">
                <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c" /><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
                <div className="card-body">
                  <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                      <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                      <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                    </div>
                    <small className="text-body-secondary">9 mins</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;