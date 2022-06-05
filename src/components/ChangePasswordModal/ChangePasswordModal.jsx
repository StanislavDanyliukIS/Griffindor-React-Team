import React, { useState } from "react";

import { getAuth, updatePassword } from "firebase/auth";

import "./ChangePasswordModal.scss";

const ChangePasswordModal = () => {
  const [passwordObj, setPasswordObj] = useState({
    currentPassword: "",
    newPassword_1: "",
    newPassword_2: "",
  });
  const [password, setNewPassword] = useState("");
  const [worning, setWorning] = useState("text-hiden");

  const createNewPassword = () =>
    passwordObj.newPassword_1 === passwordObj.newPassword_2
      ? setNewPassword(passwordObj.newPassword_1)
      : setNewPassword(false);

  const handleChange = (e) => {
    setPasswordObj({ ...passwordObj, [e.target.name]: e.target.value });
  };

  const changePassword = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    console.log(password);
    updatePassword(user, password)
      .then(() => {
        console.log(user);
      })
      .catch((error) => {
        console.log(user);
        console.log(error);
      });
  };

  const passwordNotMatch = () => {
    setWorning(
      passwordObj.newPassword_1 === passwordObj.newPassword_2
        ? "text-hiden"
        : "text-danger"
    );
  };

  return (
    <div className="changepassword-field card-body">
      <form>
        <div className="form-group mb-3 row">
          <label className="form-label col-3 col-form-label">
            Current Password
          </label>
          <div className="col">
            <input
              type="password"
              name="currentPassword"
              className="form-control"
              placeholder="Password"
              value={passwordObj.currentPassword}
              onChange={handleChange}
            />
            <small className="form-hint">Enter your current password.</small>
          </div>
        </div>
        <div className="form-group mb-3 row">
          <label className="form-label col-3 col-form-label">
            New Password
          </label>
          <div className="col">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="newPassword_1"
              value={passwordObj.newPassword_1}
              onChange={handleChange}
            />
            <small className="form-hint">
              Enter your new password, your password must be 6-20 characters
              long.
            </small>
          </div>
        </div>
        <div className="form-group mb-3 row">
          <label className="form-label col-3 col-form-label">
            New Password
          </label>
          <div className="col">
            <input
              type="password"
              name="newPassword_2"
              className="form-control"
              placeholder="Password"
              value={passwordObj.newPassword_2}
              onChange={handleChange}
              onBlur={passwordNotMatch}
            />
            <small className="form-hint">Repeat your new password.</small>
            <span className={worning}>Password does not match.</span>
          </div>
        </div>

        <div className="form-footer">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              changePassword();
              setPasswordObj({
                currentPassword: "",
                newPassword_1: "",
                newPassword_2: "",
              });
            }}
          >
            Submit
          </button>
          <button type="button" className="btn btn-outline-dark">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordModal;
