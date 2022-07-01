import { useState } from "react";

import "./ModalEvent.scss";

export const ModalEvent = ({
  handleClearForm,
  handleAddFormSubmit,
  handleAddFormChange,
  setFormData,
  formData,
}) => {
  const [validData, setValidData] = useState("hide-text-danger");
  const [validScore, setValidScore] = useState("hide-text-danger");
  const [validName, setValidName] = useState("hide-text-danger");

  const { name, score, date } = formData;

  const checkDate = () => {
    setValidData(
      new Date(date).getTime() >= new Date().getTime()
        ? "hide-text-danger"
        : "text-danger"
    );
  };

  const checkName = () => {
    setValidName(name.length > 1 ? "hide-text-danger" : "text-danger");
  };

  const checkScore = () => {
    if (score < 0) {
      setFormData({ ...formData, score: 0 });
    }
    setValidScore(score !== "" ? "hide-text-danger" : "text-danger");
  };

  const handleScorInput = () => {
    setFormData({ ...formData, score: "" });
  };

  const checkFormData = () => {
    return [validData, validScore, validName].every(
      (elem) =>
        elem === "hide-text-danger" &&
        name.length &&
        score.toString().length &&
        date.length
    );
  };

  const clearData = () => {
    [setValidName, setValidScore, setValidData].map((func) =>
      func("hide-text-danger")
    );
  };

  return (
    <div
      className="modal fade"
      id="ModalCreateEvent"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="ModalCreateEventTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="ModalCreateEventTitle">
              Create new event
            </h5>

            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                handleClearForm();
                clearData();
              }}
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
                Event name:
              </label>
              <input
                className="form-control user-form"
                id="event-name"
                type="text"
                name="name"
                value={name}
                required="required"
                placeholder="Name"
                onBlur={checkName}
                onChange={handleAddFormChange}
              />
              <small className={`${validName} warning-text`}>
                Incorrect event name.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="event-score" className="col-form-label">
                Score:
              </label>
              <input
                className="form-control user-form"
                id="event-score"
                type="number"
                min="0"
                name="score"
                value={score}
                required="required"
                placeholder="Points"
                onBlur={checkScore}
                onChange={handleAddFormChange}
                onFocus={handleScorInput}
              />
              <small className={`${validScore} warning-text`}>
                Please enter score.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="event-date" className="col-form-label">
                Date:
              </label>
              <input
                className="form-control user-form"
                id="event-date"
                type="date"
                name="date"
                value={date}
                required="required"
                placeholder="Date of birth"
                onBlur={checkDate}
                onChange={handleAddFormChange}
              />
              <small className={`${validData} warning-text`}>
                New event can be set no sooner than tomorrow.
              </small>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => {
                handleClearForm();
                clearData();
              }}
              data-dismiss="modal"
            >
              Cancel
            </button>
            {checkFormData() ? (
              <button
                type="submit"
                className="btn btn-outline-primary"
                data-dismiss="modal"
                onClick={handleAddFormSubmit}
              >
                Submit
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-outline-primary"
                onClick={() => {
                  checkName();
                  checkScore();
                  checkDate();
                }}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
