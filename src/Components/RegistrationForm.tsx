import { useState } from "react";
import { RegisterData } from "../Data/RegistrationData";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userData } from "../Data/UserData";
import { SalaryDetails } from "../Data/SalaryDetails";
import "../Assets/css/Form.css";
import useHttp from "../Config/https";

interface Props {
  title: string;
  user: userData | null;
}

const RegistrationForm: React.FC<Props> = ({ title, user }) => {
  const { axiosInstance, loading } = useHttp();
  const [userId, setUserId] = useState<string | undefined>(user?.userId);
  const [register, setRegisterData] = useState<RegisterData>({
    name: "",
    username: "",
    password: "",
    email: ""
  })

  const [salaryDetails, setSalaryDetails] = useState<SalaryDetails>({
    id: 0,
    basicPay: 0,
    hra: 0,
    conveyanceAllowance: 0,
    medicalAllowance: 0,
    otherAllowance: 0,
    epf: 0,
    professionalTax: 0,
    employeeId: ""
  })

  const [emailAlertMessage, setEmailAlertMessage] = useState("");
  const [emailAlert, setEmailAlert] = useState<boolean>(false);
  const [usernameAlertMessage, setUsernameAlertMessage] = useState("");
  const [usernameAlert, setUsernameAlert] = useState<boolean>(false);
  const [passwordMessage, setPasswordMessage] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRegisterData({
      ...register,
      [name]: value
    });
  }

  const handleSalaryDetails = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSalaryDetails({
      ...salaryDetails,
      [name]: value
    });
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target
    setRegisterData({
      ...register,
      [name]: value
    });
    if (validateEmail(value)) {
      axiosInstance
        .get(`Authenticate/IsEmailExist/${value}`)
        .then(res => {
          if (res.data.result) {
            setEmailAlert(true);
            setEmailAlertMessage(res.data.message);
          }
          else {
            setEmailAlert(false);
          }
        })
        .catch(err => {
          console.log(err)
        });
    }
    else {
      setEmailAlert(false);
    }
  }

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target
    setRegisterData({
      ...register,
      [name]: value
    });
    if (validateName(value)) {
      axiosInstance
        .get(`Authenticate/IsUsernameExist/${value}`)
        .then(res => {
          if (res.data.result) {
            setUsernameAlert(true);
            setUsernameAlertMessage(res.data.message);
          }
          else {
            setUsernameAlert(false);
          }
        })
        .catch(err => {
          console.log(err)
        });
    }
    else {
      setUsernameAlert(false);
    }
  }

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    debugger
    event.preventDefault();
    const { name, value } = event.target;
    setRegisterData({
      ...register,
      [name]: value
    });
    if (validatePassword(value)) {
      setPasswordMessage("");
    }
    else {
      setPasswordMessage("* Password should start with capital letter and contain numbers and special characters");
    }
  }

  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (title == 'Admin') {
      axiosInstance
        .post("Authenticate/register-admin", register)
        .then(res => {
          navigate('/employees')
        })
        .catch(err => {
          console.log(err)
        });
    }
    else {
      const empSalary = {...register, salaryDetails: salaryDetails};
      axiosInstance
        .post(`Employee/add/${userId}`, empSalary)
        .then(res => {
          console.log(res.data.result)
          navigate("/employees")
        })
        .catch(err => {
          console.log(err)
        });
    }
  }

  const validateSalaryDetails = (salaryDetails: SalaryDetails) => {
    debugger
    if (
      salaryDetails.basicPay >= 0 &&
      salaryDetails.hra >= 0 &&
      salaryDetails.conveyanceAllowance >= 0 &&
      salaryDetails.medicalAllowance >= 0 &&
      salaryDetails.otherAllowance >= 0 &&
      salaryDetails.epf >= 0 &&
      salaryDetails.professionalTax >= 0 &&
      String(salaryDetails.basicPay) != "" &&
      String(salaryDetails.hra) != "" &&
      String(salaryDetails.conveyanceAllowance) != "" &&
      String(salaryDetails.medicalAllowance) != "" &&
      String(salaryDetails.otherAllowance) != "" &&
      String(salaryDetails.epf)! + "" &&
      String(salaryDetails.professionalTax) != ""
    ) {
      return true; // all values are valid
    } else {
      return false; // at least one value is invalid
    }
  }
  function validateName(name: string) {
    var re = /^[a-zA-Z ]+$/;
    return re.test(name);
  }

  function validatePassword(password: string) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9])(?!.*\s)[A-Z][a-zA-Z0-9!@#$%^&*()_+~`|\\{}\[\]:\";'<>?,./]{7,14}$/;
    return regex.test(password);
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
              onChange={handleUsernameChange}
              required />
            {register.username == "" ? <p className="text-danger font-weight-bold">* Please enter the Username</p> :
              (
                <>{!validateName(register.username) && register.username !== "" ? <p className="text-danger font-weight-bold">* Please enter a valid Username</p> : (
                  <>{usernameAlert && register.username != "" ? <p className="text-danger font-weight-bold">{usernameAlertMessage}</p> : <p className="text-success font-weight-bold">Username available</p>}</>)}
                </>
              )}
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
              onChange={handleEmailChange}
              required />
            {register.email == "" ? <p className="text-danger font-weight-bold">* Please enter the Email</p> : null}
            {!validateEmail(register.email) && register.email !== "" ? <p className="text-danger font-weight-bold">* Please enter a valid Email address</p> : null}
            {emailAlert && register.email != "" ? <p className="text-danger font-weight-bold">{emailAlertMessage}</p> : null}
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
              onChange={handlePassword}
              required />
            {register.password == "" ? <p className="text-danger font-weight-bold">* Please enter the Password</p> : null}
            {!validatePassword(register.password) && register.password != "" ? <p className="text-danger font-weight-bold">{passwordMessage}</p> : null}

          </div>
        </div>

        <hr />
        {title != "Admin" &&
          <div>
            <div className="form-header p-3 h4 text-center bg-light">
              Salary Details
            </div>

            <div className="row my-1 text-center">
              <div className="col-md-6">
                <label htmlFor="basicPay" className="form-label">Basic Pay</label>
                <input
                  type="number"
                  className="form-control"
                  id="basicPay"
                  placeholder="Enter Basic Pay"
                  name="basicPay"
                  value={salaryDetails.basicPay}
                  onChange={handleSalaryDetails}
                  onWheel={event => event.currentTarget.blur()}
                  required />
                {String(salaryDetails.basicPay) == "" || salaryDetails.basicPay == 0 ? <p className="text-danger">* Please enter basic pay amount </p> : null}
                {salaryDetails.basicPay < 0 && salaryDetails.basicPay != null ? <p className="text-danger">* Please enter amount correctly</p> : null}
              </div>
              <div className="col-md-6">
                <label htmlFor="hra" className="form-label">House Rent Allowance</label>
                <input
                  type="number"
                  className="form-control"
                  id="hra"
                  placeholder="Enter HRA"
                  name="hra"
                  value={salaryDetails.hra}
                  onChange={handleSalaryDetails}
                  onWheel={event => event.currentTarget.blur()}
                  required />
                {String(salaryDetails.hra) == "" || salaryDetails.hra == 0 ? <p className="text-danger">* Please enter hra amount </p> : null}
                {salaryDetails.hra < 0 && salaryDetails.hra != null ? <p className="text-danger">* Please enter amount correctly</p> : null}
              </div>
            </div>
            <div className="row my-1 text-center">
              <div className="col-md-6">
                <label htmlFor="conveyanceAllowance" className="form-label">Conveyance Allowance</label>
                <input
                  type="number"
                  className="form-control"
                  id="conveyanceAllowance"
                  placeholder="Enter Conveyance Allowance"
                  name="conveyanceAllowance"
                  value={salaryDetails.conveyanceAllowance}
                  onWheel={event => event.currentTarget.blur()}
                  onChange={handleSalaryDetails}
                  required />
                {String(salaryDetails.conveyanceAllowance) == "" || salaryDetails.conveyanceAllowance == 0 ? <p className="text-danger">* Please enter conveyance allowance </p> : null}
                {salaryDetails.conveyanceAllowance < 0 && salaryDetails.conveyanceAllowance != null ? <p className="text-danger">* Please enter amount correctly</p> : null}
              </div>
              <div className="col-md-6">
                <label htmlFor="medicalAllowance" className="form-label">Medical Allowance</label>
                <input
                  type="number"
                  className="form-control"
                  id="medicalAllowance"
                  placeholder="Enter Medical Allowance"
                  name="medicalAllowance"
                  value={salaryDetails.medicalAllowance}
                  onWheel={event => event.currentTarget.blur()}
                  onChange={handleSalaryDetails}
                  required />
                {String(salaryDetails.medicalAllowance) == "" || salaryDetails.medicalAllowance == 0 ? <p className="text-danger">* Please enter medical allowance</p> : null}
                {salaryDetails.medicalAllowance < 0 && salaryDetails.medicalAllowance != null ? <p className="text-danger">* Please enter amount correctly</p> : null}
              </div>
            </div>
            <div className="row my-1 text-center">
              <div className="col-md-6">
                <label htmlFor="otherAllowance" className="form-label">Other Allowances</label>
                <input
                  type="number"
                  className="form-control"
                  id="otherAllowance"
                  placeholder="Enter Other Allowances"
                  name="otherAllowance"
                  value={salaryDetails.otherAllowance}
                  onChange={handleSalaryDetails}
                  onWheel={event => event.currentTarget.blur()}
                  required />
                {String(salaryDetails.otherAllowance) == "" || salaryDetails.otherAllowance == 0 ? <p className="text-danger">* Please enter other allowances </p> : null}
                {salaryDetails.otherAllowance < 0 && salaryDetails.otherAllowance != null ? <p className="text-danger">* Please enter amount correctly</p> : null}
              </div>
              <div className="col-md-6">
                <label htmlFor="epf" className="form-label">EPF </label>
                <input
                  type="number"
                  className="form-control"
                  id="epf"
                  placeholder="Enter EPF"
                  name="epf"
                  value={salaryDetails.epf}
                  onChange={handleSalaryDetails}
                  onWheel={event => event.currentTarget.blur()}
                  required />
                {String(salaryDetails.epf) == "" || salaryDetails.epf == 0 ? <p className="text-danger">* Please enter epf amount</p> : null}
                {salaryDetails.epf < 0 && salaryDetails.epf != null ? <p className="text-danger">* Please enter amount correctly</p> : null}
              </div>
            </div>
            <div className="row my-1 text-center">
              <div className="col-md-6">
                <label htmlFor="professionalTax" className="form-label">Professional Tax</label>
                <input
                  type="number"
                  className="form-control"
                  id="professionalTax"
                  placeholder="Enter Professional Tax"
                  name="professionalTax"
                  value={salaryDetails.professionalTax}
                  onChange={handleSalaryDetails}
                  onWheel={event => event.currentTarget.blur()}
                  required />
                {String(salaryDetails.professionalTax) == "" || salaryDetails.professionalTax == 0 ? <p className="text-danger">* Please enter professional tax </p> : null}
                {salaryDetails.professionalTax < 0 && salaryDetails.professionalTax != null ? <p className="text-danger">* Please enter amount correctly</p> : null}
              </div>
            </div>
          </div>
        }
        <div className="row my-2">
          <div className="col-4">
            <input
              type="submit"
              className="btn btn-primary"
              value="Create Account"
              disabled={
                !validateName(register.name) ||
                emailAlert ||
                !validatePassword(register.password) ||
                !validateSalaryDetails(salaryDetails)
              }
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default RegistrationForm;