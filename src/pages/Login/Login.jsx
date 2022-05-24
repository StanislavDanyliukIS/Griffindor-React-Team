import { useState } from "react";

import Footer from "../../components/Footer/Footer";

import { users } from "../../App";
import { useNavigate } from "react-router";

import "./Login.scss";
import eye from "./eye.png";

const Login = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [paswordValidation, setPasswordValidation] =
    useState("hide-text-danger");
  const [emailValidation, setEmailValidation] = useState("hide-text-danger");
  const [uservValidation, setUserValidation] = useState("hide-text-danger");
  const [passwordVisibility, setPasswordVisibility] = useState("password");
  const navigate = useNavigate();

  const { email, password } = userData;

  const setUserToLocaleStorage = (data) => {
    sessionStorage.setItem("user", JSON.stringify(data));
    setUserData({ email: "", password: "" });
    navigate("/", { replace: true });
  };

  const moveToForgotPasswordInput = () => {
    navigate("/forgot");
  };

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const validatePasswordClass = () => {
    setPasswordValidation(
      password.length >= 6 || password.length == 0
        ? "hide-text-danger"
        : "text-danger"
    );
    return password.length >= 6;
  };

  const validateEmailClass = () => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    setEmailValidation(
      re.test(String(email).toLowerCase()) || email.length == 0
        ? "hide-text-danger"
        : "text-danger"
    );
    return re.test(String(email).toLowerCase());
  };

  const handleVisibility = () => {
    setPasswordVisibility(
      passwordVisibility === "password" ? "text" : "password"
    );
  };

  const showUserNotFoundText = () =>
    validatePasswordClass() && validateEmailClass()
      ? setUserValidation("text-danger")
      : null;

  const checkUser = () => {
    const result = users.filter(
      (user) =>
        user.email === userData.email && user.password === userData.password
    );
    result.length ? setUserToLocaleStorage(result[0]) : showUserNotFoundText();
  };

  return (
    <div className="login-page bg-light">
      <form className="singin-form">
        <p className="form-title">Login to your account</p>
        <span className={uservValidation}>
          Incorrect email address or password!
        </span>
        <label htmlFor="inputEmail4" className="login-input-label">
          Email address
        </label>
        <input
          type="email"
          name="email"
          className="form-control login-input"
          id="inputEmail4"
          placeholder="Enter email"
          value={email}
          onChange={handleChange}
          required
          onBlur={validateEmailClass}
        />
        <span className={emailValidation}>Incorrect email address</span>
        <label htmlFor="inputPassword4" className="login-input-label">
          Password
        </label>

        <div className="form-input-password">
          <span
            className="forgot-password text-primary"
            onClick={moveToForgotPasswordInput}
          >
            I forgot password
          </span>
          <input
            type={passwordVisibility}
            name="password"
            className="form-control login-input "
            id="inputPassword4"
            placeholder="Password"
            value={password}
            onChange={handleChange}
            required
            onBlur={validatePasswordClass}
          />
          <img className="eye" src={eye} alt="eye" onClick={handleVisibility} />
          <span className={paswordValidation}>
            Password should be at least 6 characters
          </span>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            setTimeout(checkUser, 1000);
          }}
          className="btn btn-primary d-sm-inline-block login-btn"
        >
          Login
        </button>
      </form>
      <Footer />
    </div>
  );
};
export default Login;
