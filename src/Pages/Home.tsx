import { useState } from "react";
import Logo from "../Assets/Images/Logo.png"
import { Modal, Form, Button } from "react-bootstrap";
import axios from "axios";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onHide = () => {
    setShowModal(false);
  }

  const handleLogin = () => {
    debugger
    axios
      .post("https://localhost:7141/api/Authenticate/login", {
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
          // Store the access token in a secure way
          console.log(data.token);
          localStorage.setItem("access_token", JSON.stringify(data));
          window.location.reload();
          console.log(data);
        } else {
          console.error(data.error);
        }
      })
      .catch((error) => {
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

    </div>
  );
}

export default Home;