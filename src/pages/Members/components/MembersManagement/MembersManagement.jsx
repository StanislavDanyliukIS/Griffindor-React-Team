import { useSorting } from "../../../../hook/useSorting";
import {useEffect, useState} from "react";

import { getClassNames } from "../../../../functions/getClassNames";

import { Modal } from "../../../../components/Modal/Modal";
import { EditField } from "../../../../components/EditField/EditField";
import { ReadField } from "../../../../components/ReadField/ReadField";

import "./MembersManagement.scss";
import {collection, onSnapshot, query, where} from "firebase/firestore";
import {db} from "../../../../firebase";

const MembersManagement = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [members, setMembers] = useState(
    users.filter((item) => item.role === "user")
  );

  const { items, requestSort, sorting } = useSorting(members);

  const [addFormData, setAddFormData] = useState("");
  const [editFormData, setEditFormData] = useState("");
  const [editUser, setEditUser] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newPerson = {
      name: addFormData.name,
      email: addFormData.email,
      telephone: addFormData.telephone,
      organization: addFormData.organization,
      score: addFormData.score,
      birthday: addFormData.birthday,
    };

    const newPersons = [...items, newPerson];
    setMembers(newPersons);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    const editedContact = {
      name: editFormData.name,
      email: editFormData.email,
      telephone: editFormData.telephone,
      organization: editFormData.organization,
      score: editFormData.score,
      birthday: editFormData.birthday,
    };
    const newPersons = [...items];
    const index = items.findIndex((item) => item.name === editUser);
    newPersons[index] = editedContact;
    setMembers(newPersons);
    setEditUser(null);
  };
// modal 
  const [members, setMembers] = useState([]);

  useEffect(() => {
    let q;
    q = query(
        collection(db, "users"),
        where("role", "==", "user"));

    const membersList = onSnapshot(q, (querySnapshot) => {
      let membersArray = [];

      querySnapshot.forEach((doc) => {
        membersArray.push({...doc.data(), id: doc.id});
      });
      setMembers(membersArray);
    });
    return () => membersList();

  }, []);

  const { items, requestSort, sorting } = useSorting(members);

  const [editFormData, setEditFormData] = useState("");
  const [editUser, setEditUser] = useState(null);
// modal

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
    setEditUser(item.id);

    const formValues = {
      name: item.name,
      email: item.email,
      telephone: item.phone,
      organization: item.organization,
      score: item.score,
      birthday: item.birthday,
    };
    setEditFormData(formValues);
  };

  return (
    <div className="container-xl members-container">
      <main>
        <h3 className="title-management">Members Management</h3>
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
            className="bi bi-plus-square"
            viewBox="0 0 16 16"
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="btn-create-user-text">Add a new user</span>
        </button>
        {modalOpen && (
          <Modal
            setModalOpen={setModalOpen}
            handleAddFormChange={handleAddFormChange}
            handleAddFormSubmit={handleAddFormSubmit}
          />
        )}

        <table className="table-secondary table table-hover">
          <thead>
            <tr>
              <th
                scope="col"
                onClick={() => requestSort("name")}
                className={`${getClassNames("name", sorting)} w-15`}
              >
                Name
              </th>
              <th
                scope="col"
                onClick={() => requestSort("email")}
                className={`${getClassNames("email", sorting)} w-15`}
              >
                Email
              </th>
              <th scope="col">Telephone</th>
              <th
                scope="col"
                onClick={() => requestSort("organization")}
                className={`${getClassNames("organization", sorting)} w-10`}
              >
                Company
              </th>
              <th
                scope="col"
                onClick={() => requestSort("score")}
                className={`${getClassNames("score", sorting)} w-15`}
              >
                Score
              </th>
              <th
                scope="col"
                onClick={() => requestSort("birthday")}
                className={`${getClassNames("birthday", sorting)} w-15`}
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
                {editUser === item.id ? (
                  <EditField
                    key={item.id}
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleEditFormSubmit={handleEditFormSubmit}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadField
                      key={item.id}
                      item={item}
                      handleEditClick={handleEditClick}
                      handleDeleteClick={handleDeleteClick}
                  />
                )}
              </>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default MembersManagement;
