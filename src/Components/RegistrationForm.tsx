import { useState } from "react";
import { RegisterData } from "../Data/RegistrationData";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userData } from "../Data/UserData";

interface Props {
  title: string;
  user: userData | null;
}

const RegistrationForm: React.FC<Props> = ({ title, user }) => {
  const [userId, setUserId] = useState<string | undefined>(user?.userId);
  const [register, setRegisterData] = useState<RegisterData>({
    name: "",
    username: "",
    password: "",
    email: ""
  })

  const [emailAlertMessage, setEmailAlertMessage] = useState("");
  const [emailAlert, setEmailAlert] = useState<boolean | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRegisterData({
      ...register,
      [name]: value
    })
  }

  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (title == 'Admin') {
      axios
        .post("https://localhost:7141/api/Authenticate/register-admin", register)
        .then(res => {
          navigate('/employees')
        })
        .catch(err => {
          console.log(err)
        });
    }
    else {
      debugger
      axios
        .post(`https://localhost:7141/api/Employee/add/${userId}`, register)
        .then(res => {
          navigate('/employees')
        })
        .catch(err => {
          console.log(err)
        });
    }
  }

  function validateName(name: string) {
    var re = /^[a-zA-Z ]+$/;
    return re.test(name);
  }

  function validateEmail(email: string) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  return (
    <div className="container w-50 border my-5 rounded">
      <form onSubmit={handleSubmit}>
        <div className="form-header p-3 h2 text-center bg-light">
          {title}
        </div>
        <div className="row my-1 text-center">
          <div className="col-md-6">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter the name"
              id='name'
              aria-label="name"
              name="name"
              value={register.name}
              onChange={handleChange}
              required />
            {register.name == "" ? <p className="text-danger font-weight-bold">* Please enter the name</p> : null}
            {!validateName(register.name) && register.name !== "" ? <p className="text-danger font-weight-bold">* Please enter a valid name</p> : null}
          </div>

          <div className="col-md-6">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              id='username'
              aria-label="Username"
              name="username"
              value={register.username}
              onChange={handleChange}
              required />
            {register.username == "" ? <p className="text-danger font-weight-bold">* Please enter the Username</p> : null}
            {!validateName(register.username) && register.username !== "" ? <p className="text-danger font-weight-bold">* Please enter a valid Username</p> : null}
          </div>
        </div>
        <div className="row my-1 text-center">
          <div className="col-md-6">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter Email"
              name="email"
              value={register.email}
              onChange={handleChange}
              required />
            {emailAlert ? <p className="text-danger font-weight-bold">* Please enter the Email</p> : null}
          </div>

          <div className="col-md-6">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter Password"
              name="password"
              value={register.password}
              onChange={handleChange}
              required />
            {register.password == "" ? <p className="text-danger font-weight-bold">* Please enter the Password</p> : null}
          </div>
          </div>
          <div className="row my-2">
            <div className="col-4">
              <input
                type="submit"
                className="btn btn-primary"
                value="Create Account"
              />
            </div>
          </div>
      </form>
    </div>
  );
}

export default RegistrationForm;