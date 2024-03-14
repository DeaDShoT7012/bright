import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminType, setAdminType] = useState("");

  const handleUserName = ({ target }) => setUserName(target.value);
  const handleEmail = ({target}) => setEmail(target.value);
  const handlePassword = ({ target }) => setPassword(target.value);
  const handleAdminType = ({ target }) => setAdminType(target.value);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = {
        userName,
        email,
        password,
        adminType,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}user/signup`,
        data
      );
      console.log("res", response);
      if (response) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form-main">
      <div className="login-body">
        <div className="login-page">
          <div className="form">
            <h2 className="text-success mb-3">
              <b>SignUp to Bright Aluminium</b>
            </h2>
            <form className="login-form" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Username"
                onChange={handleUserName}
              />
              <input
                type="email"
                placeholder="email"
                onChange={handleEmail}
              />
              <input
                type="password"
                placeholder="Password"
                onChange={handlePassword}
              />
              <fieldset className="form-group form-group form-outline mb-4">
                <select
                  className="form-control form-select col-12"
                  id="adminType"
                  onChange={handleAdminType}
                >
                  <option disabled selected required>
                    Select Admin Type
                  </option>
                  <option key={"admin"} value={"admin"}>
                    Admin
                  </option>
                  <option key={"office"} value={"office"}>
                    Office
                  </option>
                  <option key={"employee"} value={"employee"}>
                  Employee
                  </option>
                  <option key={"assignEmployee"} value={"assignEmployee"}>
                  Assign Employee
                  </option>
                </select>
              </fieldset>
              <button type="submit" className="mb-3">
                SignUp
              </button>
            </form>
            <Link className="text-dark" to={"/login"}>
              Already a User? Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
