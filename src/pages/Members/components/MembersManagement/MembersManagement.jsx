import { useSorting } from "../../../../hook/useSorting";
import { useState } from "react";

import { getClassNames } from "../../../../functions/getClassNames";

import { users } from "../../../../App";

import { Modal } from "../../../../components/Modal/Modal";
import { EditField } from "../../../../components/EditField/EditField";
import { ReadField } from "../../../../components/ReadField/ReadField";

import "./MembersManagement.scss";

const MembersManagement = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [members, setMembers] = useState(
    users.filter((item) => item.role === "user")
  );

  const { items, requestSort, sorting } = useSorting(members);

  const [addUser, setAddUser] = useState("");
  const [editFormData, setEditFormData] = useState("");
  const [editUser, setEditUser] = useState(null);

  // const handleAddUser = (event) => {
  //   event.preventDefault();

  //   const fieldName = event.target.getAttribute("name");
  //   const fieldValue = event.target.value;

  //   const newAddUser = { ...addUser };
  //   newAddUser[fieldName] = fieldValue;

  //   setAddUser(newAddUser);
  // };

  // const handleAddUserSubmit = (event) => {
  //   event.preventDefault();

  //   const newPerson = {
  //     name: addUser.name,
  //     email: addUser.email,
  //     telephone: addUser.telephone,
  //     organization: addUser.organization,
  //     score: addUser.score,
  //     birthday: addUser.birthday,
  //   };

  //   const newPersons = [...items, newPerson];
  //   setMembers(newPersons);
  // };

  // const handleEditFormSubmit = (event) => {
  //   event.preventDefault();
  //   const editedContact = {
  //     id: editUser,
  //     name: editFormData.name,
  //     email: editFormData.email,
  //     telephone: editFormData.telephone,
  //     organization: editFormData.organization,
  //     score: editFormData.score,
  //     birthday: editFormData.birthday,
  //   };
  //   const newPersons = [...items];
  //   const index = items.findIndex((item) => item.name === editUser);
  //   newPersons[index] = editedContact;
  //   setMembers(newPersons);
  //   setEditUser(null);
  // };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;
    setEditFormData(newFormData);
  };

  const handleCancelClick = () => {
    setEditUser(null);
  };

  const handleDeleteClick = (itemId) => {
    const newItems = [...items];
    const index = items.findIndex((item) => item.id === itemId);
    newItems.splice(index, 1);
    setMembers(newItems);
  };

  const handleEditClick = (event, item) => {
    event.preventDefault();
    setEditUser(item.name);

    const formValues = {
      name: item.name,
      email: item.email,
      telephone: item.telephone,
      organization: item.organization,
      score: item.score,
      birthday: item.birthday,
    };
    setEditFormData(formValues);
  };

  return (
    <div className="container-xl members-container">
      <main>
        {/* <form className="members-add-user">
          <input
            className="form-control"
            type="text"
            name="text"
            required="required"
            placeholder="Name"
          />
          <input
            className="form-control"
            type="email"
            name="email"
            required="required"
            placeholder="Email"
          />
          <input
            className="form-control"
            type="password"
            name="password"
            required="required"
            placeholder="Password"
          />
        </form> */}
        <h2 className="title-management">Members Management</h2>
        <button
          onClick={() => {
            setModalOpen(true);
          }}
          type="button"
          className="btn btn-primary btn-create-user openModalBtn"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-plus-square"
            viewBox="0 0 16 16"
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="btn-create-user-text">Add a new user</span>
        </button>
        {modalOpen && <Modal setModalOpen={setModalOpen} />}

        <table className="table-secondary table table-hover">
          <thead>
            <tr>
              <th
                scope="col"
                onClick={() => requestSort("name")}
                className={getClassNames("name", sorting)}
              >
                Name
              </th>
              <th
                scope="col"
                onClick={() => requestSort("email")}
                className={getClassNames("email", sorting)}
              >
                Email
              </th>
              <th scope="col">Telephone</th>
              <th
                scope="col"
                onClick={() => requestSort("organization")}
                className={getClassNames("organization", sorting)}
              >
                Company
              </th>
              <th
                scope="col"
                onClick={() => requestSort("score")}
                className={getClassNames("score", sorting)}
              >
                Score
              </th>
              <th
                scope="col"
                onClick={() => requestSort("birthday")}
                className={getClassNames("birthday", sorting)}
              >
                Date of Birth
              </th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <>
                {editUser === item.name ? (
                  <EditField
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadField
                    item={item}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </>

              // <tr key={Math.random() * 1000000}>
              // 	<th scope='row'>{item.name}</th>
              // 	<td>{item.email}</td>
              // 	<td>{item.number}</td>
              // 	<td>{item.organization}</td>
              // 	<td>{item.score}</td>
              // 	<td>{item.birthday.substr(0, 10)}</td>
              // 	<td>
              // 		<button
              // 			type='button'
              // 			className='btn btn-outline-secondary btn-edit'
              // 		>
              // 			<svg
              // 				xmlns='http://www.w3.org/2000/svg'
              // 				width='16'
              // 				height='16'
              // 				fill='currentColor'
              // 				className='bi bi-pencil-square'
              // 				viewBox='0 0 16 16'
              // 			>
              // 				<path d='M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z' />
              // 				<path
              // 					fillRule='evenodd'
              // 					d='M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z'
              // 				/>
              // 			</svg>
              // 		</button>
              // 	</td>
              // 	<td>
              // 		<button
              // 			type='button'
              // 			className='btn btn-outline-secondary btn-delete'
              // 		>
              // 			<svg
              // 				xmlns='http://www.w3.org/2000/svg'
              // 				width='16'
              // 				height='16'
              // 				fill='currentColor'
              // 				className='bi bi-trash'
              // 				viewBox='0 0 16 16'
              // 			>
              // 				<path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z' />
              // 				<path
              // 					fillRule='evenodd'
              // 					d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'
              // 				/>
              // 			</svg>
              // 		</button>
              // 	</td>
              // </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default MembersManagement;
