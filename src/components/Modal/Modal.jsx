import "./Modal.scss";

export const Modal = ({ setModalOpen, handleAddUserSubmit, handleAddUser }) => {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setModalOpen(false);
            }}
          >
            X
          </button>
        </div>

        <div className="body">
          <input
            className="form-control user-form"
            type="text"
            name="name"
            // value={editFormData.name}
            required="required"
            placeholder="Name"
            // onChange={handleEditFormChange}
          />

          <input
            className="form-control user-form"
            type="email"
            name="email"
            // value={editFormData.email}
            required="required"
            placeholder="Email"
            // onChange={handleEditFormChange}
          />

          <input
            className="form-control user-form"
            type="text"
            name="telephone"
            // value={editFormData.telephone}
            required="required"
            placeholder="Telephone"
            // onChange={handleEditFormChange}
          />

          <input
            className="form-control user-form"
            type="text"
            name="organization"
            // value={editFormData.organization}
            required="required"
            placeholder="Company"
            // onChange={handleEditFormChange}
          />

          <input
            className="form-control user-form"
            type="number"
            name="score"
            // value={editFormData.score}
            required="required"
            placeholder="Score"
            // onChange={handleEditFormChange}
          />

          <input
            className="form-control user-form"
            type="date"
            name="birthday"
            // value={editFormData.birthday}
            required="required"
            placeholder="Date of birth"
            // onChange={handleEditFormChange}
          />
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setModalOpen(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button onSubmit={handleAddUserSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};
