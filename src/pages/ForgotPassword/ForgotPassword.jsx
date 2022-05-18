import React, { useState } from "react";

import "./ForgotPassword.scss";
import letter from "./white-letter.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="forgotpassword-page">
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
          type="text"
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
          <button className="btn btn-primary d-sm-inline-block forgotpassword-btn">
            Send me new password
          </button>
        </div>
      </form>
      <p className="sendmeback">
        Forget it,{" "}
        <a className="back-linck" href="forgotInput">
          send me back
        </a>{" "}
        to the login screen.
      </p>
    </div>
  );
};

export default ForgotPassword;
