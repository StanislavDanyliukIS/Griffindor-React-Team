import "./ConfirmDeleteModal.scss";

export const ConfirmDeleteModal = ({ handleDeleteSubmit, user }) => {
  return (
    <div
      className="modal fade"
      id="ModalConfirmDelete"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="ModalConfirmDeleteTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content modal-deleteConfirm">
          <div className="modal-header">
            <h5 className="modal-title" id="ModalConfirmDeleteTitle">
              Do you want to delete {user}?
            </h5>

            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
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

          <div className="modal-footer confirm-btns">
            <button
              type="button"
              className="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-outline-danger"
              data-dismiss="modal"
              onClick={handleDeleteSubmit}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
