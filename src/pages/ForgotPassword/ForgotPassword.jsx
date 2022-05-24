import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

import "./ForgotPassword.scss";
import letter from "./white-letter.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailValidation, setEmailValidation] = useState("hide-text-danger");
  const navigate = useNavigate();

  const handleSendMeBack = () => {
    navigate("/login");
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
          onBlur={validateEmailClass}
        ></input>
        <div className="btn-block">
          <img
            className="forgotpassword-image-letter"
            src={letter}
            alt="letter"
          />
          <span className={`${emailValidation}`}>Incorrect email address</span>
          <button
            className="btn btn-primary d-sm-inline-block forgotpassword-btn"
            onClick={(e) => {
              e.preventDefault();
              if (validateEmailClass()) {
                setEmail("");
                navigate("/login");
              }
            }}
          >
            Send me new password
          </button>
        </div>
      </form>
      <p className="sendmeback">
        Forget it,{" "}
        <span className="back-linck text-primary" onClick={handleSendMeBack}>
          send me back
        </span>{" "}
        to the login screen.
      </p>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
