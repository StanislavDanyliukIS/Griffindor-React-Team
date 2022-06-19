import { useState } from "react";

import "./Modal.scss";

export const Modal = ({
  setModalOpen,
  handleAddFormSubmit,
  handleAddFormChange,
}) => {
  const [emailValidation, setEmailValidation] = useState("hide-text-danger");
  const [score, setScore] = useState(0);
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleScore = (e) => {
    if (e.target.value >= 0) {
      setScore(e.target.value);
    } else {
      setScore(0);
    }
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

  return (
    <div className="modalBackground">
      <div className="modalContainer managers">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setModalOpen(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-x"
              viewBox="0 0 16 16"
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </button>
        </div>

        <div className="body">
          <input
            className="modal-input form-control user-form"
            type="text"
            name="name"
            required="required"
            placeholder="Name"
            onChange={handleAddFormChange}
          />
          <div className="email-block">
            <input
              className="form-control user-form"
              type="email"
              name="email"
              required="required"
              placeholder="Email"
              onChange={(e) => {
                handleAddFormChange(e);
                handleChange(e);
              }}
              onBlur={validateEmailClass}
            />
            <small className={`${emailValidation} warning-text`}>
              Incorrect email address
            </small>
          </div>
          <input
            className="modal-input form-control user-form"
            type="text"
            name="telephone"
            required="required"
            placeholder="Telephone"
            onChange={handleAddFormChange}
          />

          <input
            className="modal-input form-control user-form"
            type="text"
            name="organization"
            required="required"
            placeholder="Company"
            onChange={handleAddFormChange}
          />

          <input
            className="modal-input form-control user-form"
            type="number"
            name="score"
            required="required"
            placeholder="Score"
            value={score}
            onChange={(e) => {
              handleAddFormChange(e);
              handleScore(e);
            }}
          />

          <input
            className="modal-input form-control user-form"
            type="date"
            name="birthday"
            required="required"
            placeholder="Date of birth"
            onChange={handleAddFormChange}
          />
          <div className="footer">
            <button
              className="btn btn-danger footer-btn"
              onClick={() => {
                setModalOpen(false);
              }}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary footer-btn"
              type="submit"
              onClick={handleAddFormSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
