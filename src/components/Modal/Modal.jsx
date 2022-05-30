import './Modal.scss';

export const Modal = ({
  setModalOpen,
  handleAddFormSubmit,
  handleAddFormChange,
}) => {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
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
              class="bi bi-x"
              viewBox="0 0 16 16"
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </button>
        </div>

        <div className="body">
          <input
            className="form-control user-form"
            type="text"
            name="name"
            required="required"
            placeholder="Name"
            onChange={handleAddFormChange}
          />

          <input
            className="form-control user-form"
            type="email"
            name="email"
            required="required"
            placeholder="Email"
            onChange={handleAddFormChange}
          />

          <input
            className="form-control user-form"
            type="text"
            name="telephone"
            required="required"
            placeholder="Telephone"
            onChange={handleAddFormChange}
          />

          <input
            className="form-control user-form"
            type="text"
            name="organization"
            required="required"
            placeholder="Company"
            onChange={handleAddFormChange}
          />

          <input
            className="form-control user-form"
            type="number"
            name="score"
            required="required"
            placeholder="Score"
            onChange={handleAddFormChange}
          />

          <input
            className="form-control user-form"
            type="date"
            name="birthday"
            required="required"
            placeholder="Date of birth"
            onChange={handleAddFormChange}
          />
        </div>
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
  );
};
