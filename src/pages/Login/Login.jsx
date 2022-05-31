import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";

import { logIn } from "../../store/authSlice";

import "./Login.scss";
import eye from "./eye.png";

const Login = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [emailValidation, setEmailValidation] = useState("hide-text-danger");
  const [userValidation, setUserValidation] = useState("hide-text-danger");
  const [passwordVisibility, setPasswordVisibility] = useState("password");

  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const inputRef = useRef();

  const focusOnPasswordInput = () => {
    return inputRef.current.focus();
  };

  const { email, password } = userData;

  const moveToForgotPasswordInput = () => {
    navigate("/forgot");
  };

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const validateEmailClass = () => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    setEmailValidation(
      re.test(String(email).toLowerCase()) || email.length === 0
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

  const clearPasword = () =>
    validateEmailClass() ? setUserData({ email, password: "" }) : null;

  const handleLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(logIn({ uid: user.uid }));
        localStorage.setItem("isAuth", !!user.uid);
      })
      .then()
      .catch((error) => {
        clearPasword();
        focusOnPasswordInput();
        setUserValidation("text-danger");
        console.log(error);
      });
  };

  return (
    <div className="login-page bg-light">
      <form className="singin-form">
        <p className="form-title">Login to your account</p>
        <span className={userValidation}>
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
            ref={inputRef}
            name="password"
            className="form-control login-input "
            id="inputPassword4"
            placeholder="Password"
            value={password}
            onChange={handleChange}
            required
          />
          <img className="eye" src={eye} alt="eye" onClick={handleVisibility} />
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            handleLogin(email, password);
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
