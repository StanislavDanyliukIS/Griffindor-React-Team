import { useState } from "react";
import "./ModalMember.scss";

export const ModalMember = ({ handleAddFormSubmit, handleAddFormChange }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    score: 0,
    birthday: "",
    telephone: "",
    organization: "",
  });
  const [emailValidation, setEmailValidation] = useState("hide-text-danger");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validateEmailClass = () => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    setEmailValidation(
      re.test(String(user.email).toLowerCase()) || user.email.length === 0
        ? "hide-text-danger"
        : "text-danger"
    );
    return re.test(String(user.email).toLowerCase());
  };

  const clearForm = () => {
    setUser({
      name: "",
      email: "",
      score: "",
      birthday: "",
      telephone: "",
      organization: "",
    });
  };

  return (
    <div
      className="modal fade"
      id="ModalCreateMember"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="ModalCreateMemberCenterTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="ModalCreateMemberCenterTitle">
              Create new member
            </h5>

            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={clearForm}
            >
              <span className="close-btn-header" aria-hidden="true">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  fill="currentColor"
                  className="bi bi-x"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
              </span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="event-name" className="col-form-label">
                Member name:
              </label>
              <input
                className="form-control user-form user-modal"
                id="event-name"
                type="text"
                name="name"
                value={user.name}
                required="required"
                placeholder="John Doe"
                onChange={(e) => {
                  handleAddFormChange(e);
                  handleChange(e);
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="event-name" className="col-form-label">
                Member email:
              </label>
              <input
                className="form-control user-form"
                id="event-name"
                type="email"
                name="email"
                value={user.email}
                required="required"
                placeholder="example@mail.com"
                onBlur={validateEmailClass}
                onChange={(e) => {
                  handleAddFormChange(e);
                  handleChange(e);
                }}
              />
              <small className={`${emailValidation} warning-text`}>
                Incorrect email address
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="event-name" className="col-form-label">
                Member phone number:
              </label>
              <input
                className="form-control user-form user-modal"
                id="event-phone"
                type="phone"
                name="telephone"
                value={user.telephone}
                required="required"
                placeholder="+380680000000"
                onChange={(e) => {
                  handleAddFormChange(e);
                  handleChange(e);
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="event-name" className="col-form-label">
                Member company name:
              </label>
              <input
                className="form-control user-form user-modal"
                id="event-company"
                type="text"
                name="organization"
                value={user.organization}
                required="required"
                placeholder="Company"
                onChange={(e) => {
                  handleAddFormChange(e);
                  handleChange(e);
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="event-score" className="col-form-label">
                Member score:
              </label>
              <input
                className="form-control user-form user-modal"
                id="event-score"
                type="number"
                min="0"
                name="score"
                value={user.score}
                required="required"
                placeholder="Points"
                onChange={(e) => {
                  handleAddFormChange(e);
                  handleChange(e);
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="event-date" className="col-form-label">
                Member birthday:
              </label>
              <input
                className="form-control user-form user-modal"
                id="event-date"
                type="date"
                name="birthday"
                value={user.birthday}
                required="required"
                placeholder="Date of birth"
                onChange={(e) => {
                  handleAddFormChange(e);
                  handleChange(e);
                }}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary"
              data-dismiss="modal"
              onClick={clearForm}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-outline-primary"
              data-dismiss="modal"
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
