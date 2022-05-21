import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./ForgotPassword.scss";
import letter from "./white-letter.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailValidation, setEmailValidation] = useState("hide-text-danger");
  const navigate = useNavigate();

  const handleSendMeBack = () => {
    navigate("login");
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const validateEmailClass = () => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    setEmailValidation(
      re.test(String(email).toLowerCase()) ? "hide-text-danger" : "text-danger"
    );
    return re.test(String(email).toLowerCase());
  };

  return (
    <div className="forgotpassword-page bg-light">
      <form className="forgotpassword-form">
        <h6 className="forgotpassword-title">Forgot password</h6>
        <p className="forgotpassword-text">
          Enter your email address and your password will be reset and emailed
          to you.
        </p>
        <label className="forgotpassword-label" htmlFor="forgotInput">
          Email address
        </label>
        <input
          className="forgotpassword-input form-control"
          id="forgotInput"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={handleChange}
        ></input>
        <div className="btn-block">
          <img
            className="forgotpassword-image-letter"
            src={letter}
            alt="letter"
          />
          <button
            className="btn btn-primary d-sm-inline-block forgotpassword-btn"
            onClick={(e) => {
              e.preventDefault();
              validateEmailClass();
              if (validateEmailClass()) {
                setEmail("");
              }
            }}
          >
            Send me new password
          </button>
          <span className={emailValidation}>Incorrect email address</span>
        </div>
      </form>
      <p className="sendmeback">
        Forget it,{" "}
        <a className="back-linck" href="forgotInput" onClick={handleSendMeBack}>
          send me back
        </a>{" "}
        to the login screen.
      </p>
    </div>
  );
};

export default ForgotPassword;
