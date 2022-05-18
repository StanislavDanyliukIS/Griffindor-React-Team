import { useState } from "react";

import "./Login.scss";
import eye from "./eye.png";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [passwordVisibility, setPasswordVisibility] = useState("password");

  const { email, password } = user;

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = () => {
    if (!email && !password) {
      return;
    }
    sessionStorage.setItem("user", JSON.stringify(user));
    setUser({ email: "", password: "" });
  };

  const handleVisibility = () => {
    setPasswordVisibility(
      passwordVisibility === "password" ? "text" : "password"
    );
  };

  return (
    <div className="login-page">
      <form className="singin-form">
        <p className="form-title">Login to your account</p>
        <label htmlFor="inputEmail4" className="login-input-label">
          Email address
        </label>
        <input
          type="email"
          name="email"
          className="form-control"
          id="inputEmail4"
          placeholder="Enter email"
          value={email}
          onChange={handleChange}
        />
        <label htmlFor="inputPassword4" className="login-input-label">
          Password
        </label>

        <div className="form-input-password">
          <a href="inputPassword4" className="forgot-password">
            I forgot password
          </a>
          <input
            type={passwordVisibility}
            name="password"
            className="form-control "
            id="inputPassword4"
            placeholder="Password"
            value={password}
            onChange={handleChange}
          />
          <img className="eye" src={eye} alt="eye" onClick={handleVisibility} />
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            setTimeout(handleClick, 1000);
          }}
          className="btn btn-primary d-sm-inline-block login-btn"
        >
          Login
        </button>
      </form>
    </div>
  );
};
export default Login;
