import { useSorting } from "../../../../hook/useSorting";
import { useEffect, useState } from "react";

import { getClassNames } from "../../../../functions/getClassNames";
import { EditField } from "../../../../components/EditField/EditField";
import { ReadField } from "../../../../components/ReadField/ReadField";

import "./MembersManagement.scss";
import {
  collection,
  onSnapshot,
  query,
  where,
  updateDoc,
  doc,
  getDoc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../../../../firebase";

import {
  createUser,
  updateUser,
  deleteUser,
} from "../../../../store/crudSlice";
import { useDispatch } from "react-redux";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signOut,
  sendEmailVerification,
} from "firebase/auth";
import { logOut } from "../../../../store/authSlice";
import { clearUserData } from "../../../../store/userDataSlice";
import { ModalMember } from "./components/ModalMember/ModalMember";
import { ConfirmDeleteModal } from "../../../../components/ConfirmDeleteModal/ConfirmDeleteModal";

const MembersManagement = () => {
  const auth = getAuth();
  const password = "111111";
  const [deleteMember, setDeleteMember] = useState({});
  const [members, setMembers] = useState([]);
  const [addFormData, setAddFormData] = useState("");
  const [editFormData, setEditFormData] = useState("");
  const [editUser, setEditUser] = useState(null);

  const indexedMembers = members.map((el, idx) => {
    el.index = idx + 1;
    return el;
  });

  const dispatch = useDispatch();

  const { items, requestSort, sorting } = useSorting(indexedMembers);
  useEffect(() => {
    let q;
    q = query(collection(db, "users"), where("role", "==", "user"));

    const membersList = onSnapshot(q, (querySnapshot) => {
      let membersArray = [];

      querySnapshot.forEach((doc) => {
        membersArray.push({ ...doc.data(), id: doc.id });
      });
      setMembers(membersArray);
    });
    return () => membersList();
  }, []);

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

    createUserWithEmailAndPassword(auth, addFormData.email, password)
      .then((userCredential) => {
        dispatch(
          createUser({
            email: userCredential.user.email,
            id: userCredential.user.uid,
          })
        );
        return {
          email: userCredential.user.email,
          id: userCredential.user.uid,
        };
      })
      .then((data) => {
        dispatch(
          createUser({
            name: addFormData.name,
            role: "user",
            score: addFormData.score ? addFormData.score : "0",
            birthday: addFormData.birthday,
            organization: addFormData.organization,
            telephone: addFormData.telephone,
            password: password,
            userImageUrl: null,
            photo: null,
          })
        );
        return {
          id: data.id,
          email: data.email,
          name: addFormData.name,
          role: "user",
          score: addFormData.score ? addFormData.score : "0",
          birthday: addFormData.birthday,
          organization: addFormData.organization,
          telephone: addFormData.telephone,
          password: password,
          userImageUrl: null,
          photo: null,
        };
      })
      .then((user) => {
        setDoc(doc(db, "users", user.id), {
          email: user.email,
          name: user.name,
          role: user.role,
          score: user.score,
          birthday: user.birthday,
          organization: user.organization,
          telephone: user.telephone,
          password: password,
          userImageUrl: null,
          photo: null,
        });
      })
      .catch((error) => console.log(error));

    signOut(auth)
      .then(() => {
        dispatch(logOut());
        dispatch(clearUserData());
        localStorage.removeItem("role");
        localStorage.removeItem("isAuth");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;
    setEditFormData(newFormData);
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
    const item = items.filter((el) => el.id === editFormData.id);
    const document = doc(db, "users", item[0].id);
    getDoc(document).then((data) => {
      dispatch(
        updateUser({
          name: editedContact.name,
          score: editedContact.score,
          birthday: editedContact.birthday,
          organization: editedContact.organization,
          telephone: editedContact.telephone,
        })
      );
      updateDoc(doc(db, "users", item[0].id), {
        name: editedContact.name,
        score: editedContact.score,
        birthday: editedContact.birthday,
        organization: editedContact.organization,
        telephone: editedContact.telephone,
      });
    });
    setEditUser(null);
  };

  const handleCancelClick = () => {
    setEditUser(null);
  };

  const handleDeleteClick = (itemId) => {
    const user = items.filter((el) => el.id === itemId);
    setDeleteMember(user[0]);
  };

  const handleDeleteSubmit = () => {
    const document = doc(db, "users", deleteMember.id);
    getDoc(document).then(() => {
      deleteDoc(document);
      dispatch(
        deleteUser({
          email: null,
          token: null,
          id: null,
          name: null,
          role: null,
          score: null,
          birthday: null,
          organization: null,
          telephone: null,
          userImageUrl: null,
          photo: null,
          password: null,
        })
      );
    });
    setDeleteMember("");
  };

  const handleEditClick = (event, item) => {
    event.preventDefault();
    setEditUser(item.id);
    const formValues = {
      index: item.index,
      name: item.name,
      email: item.email,
      telephone: item.telephone,
      organization: item.organization,
      score: item.score,
      birthday: item.birthday,
      id: item.id,
    };
    setEditFormData(formValues);
  };

  return (
    <div className="container-xl members-container">
      <main>
        <h3 className="title-management">Members Management</h3>
        <button
          type="button"
          className="btn create-member-btn btn-outline-secondary btn-table-create "
          data-toggle="modal"
          data-target="#ModalCreateMember"
        >
          <span className="btn-create-user-text">Add a new user</span>
        </button>
        <ModalMember
          handleAddFormChange={handleAddFormChange}
          handleAddFormSubmit={handleAddFormSubmit}
          setAddFormData={setAddFormData}
        />

        <ConfirmDeleteModal
          user={deleteMember}
          handleDeleteSubmit={handleDeleteSubmit}
        />
        <table className="table member-table">
          <thead>
            <tr>
              <th
                scope="col"
                onClick={() => requestSort("index")}
                className={`${getClassNames("index", sorting)} w-10 pointer`}
              >
                №
              </th>
              <th
                scope="col"
                onClick={() => requestSort("name")}
                className={`${getClassNames("name", sorting)} w-15 pointer`}
              >
                Name
              </th>
              <th
                scope="col"
                onClick={() => requestSort("email")}
                className={`${getClassNames("email", sorting)} w-15 pointer`}
              >
                Email
              </th>
              <th scope="col" className={"w-15 "}>
                Telephone
              </th>
              <th
                scope="col"
                onClick={() => requestSort("organization")}
                className={`${getClassNames(
                  "organization",
                  sorting
                )} w-10 pointer`}
              >
                Company
              </th>
              <th
                scope="col"
                onClick={() => requestSort("score")}
                className={`${getClassNames("score", sorting)} w-15 pointer`}
              >
                Score
              </th>
              <th
                scope="col"
                onClick={() => requestSort("birthday")}
                className={`${getClassNames("birthday", sorting)} w-15 pointer`}
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
