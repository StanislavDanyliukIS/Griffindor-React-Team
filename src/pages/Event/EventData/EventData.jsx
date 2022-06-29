import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState, Fragment } from "react";
import { db } from "../../../firebase";
import { getClassNames } from "../../../functions/getClassNames";
import { useSorting } from "../../../hook/useSorting";
import "./EventData.scss";

const EventData = ({ event }) => {
  const { items, requestSort, sorting } = useSorting(event.participants);
  const [editUser, setEditUser] = useState("");
  const [editUserData, setEditUserData] = useState("");
  const [participantsData, setParticipantsData] = useState([]);
  const [scoreForAttending, setScoreForAttending] = useState("");
  const [users, setUsers] = useState([]);
  const [oldExtrapoints, setOldExtrapoints] = useState("");

  useEffect(() => {
    setParticipantsData(event.participants);
    setScoreForAttending(event.score);
    const q = query(collection(db, "users"), where("role", "==", "user"));
    const usersData = [];
    onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        usersData.push({ ...doc.data(), id: doc.id });
      });
      setUsers(usersData);
    });
  }, [event]);

  const handleEditClick = (item) => {
    setEditUser(item.id);
    const userInputValues = {
      id: item.id,
      extrapoints: item.extrapoints,
      comment: item.comment,
      attended: item.attended,
    };
    setOldExtrapoints(item.extrapoints);
    setEditUserData(userInputValues);
  };
  const handleCancelClick = () => {
    setEditUser("");
  };
  const handleEditFormChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    const newFormData = { ...editUserData };
    newFormData[fieldName] = fieldValue;
    setEditUserData(newFormData);
  };
  const handleEditExtrapointsChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    const newFormData = { ...editUserData };
    newFormData[fieldName] =
      Number(fieldValue) < 0 ? "" : !fieldValue ? "" : fieldValue;
    const updExtrapoints =
      fieldValue < 0
        ? users
        : users.map((user) =>
            user.id === editUser
              ? {
                  ...user,
                  score:
                    Number(user.score) +
                    Number(fieldValue) -
                    Number(oldExtrapoints),
                }
              : user
          );
    setOldExtrapoints(fieldValue < 0 ? 0 : fieldValue);
    setUsers(updExtrapoints);
    setEditUserData(newFormData);
  };
  const handleEditCheckChange = (event) => {
    const checked = event.target.checked;
    const newFormData = { ...editUserData };
    newFormData.attended = checked;
    setEditUserData(newFormData);
    const updScore = checked
      ? users.map((user) =>
          user.id === editUser
            ? { ...user, score: Number(user.score) + Number(scoreForAttending) }
            : user
        )
      : users.map((user) =>
          user.id === editUser
            ? { ...user, score: Number(user.score) - Number(scoreForAttending) }
            : user
        );

    setUsers(updScore);
  };
  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    const newUserData = {
      id: editUserData.id,
      extrapoints: editUserData.extrapoints,
      comment: editUserData.comment,
      attended: editUserData.attended,
    };
    const partData = participantsData.map((el) =>
      el.id === editUserData.id ? { ...el, ...newUserData } : el
    );
    const eventRef = doc(db, "events", event.id);
    const userRef = doc(db, "users", editUser);
    const user = users.filter((user) => user.id === editUser);
    const updUserScore = user[0].score;
    updateDoc(eventRef, {
      participants: partData,
    });
    updateDoc(userRef, {
      score: updUserScore,
    });
    setEditUser("");
  };

  const checkScoreValue = () => {
    setEditUserData(
      editUserData.extrapoints === "0" ||
        editUserData.extrapoints < 0 ||
        editUserData.extrapoints === 0
        ? { ...editUserData, extrapoints: "" }
        : editUserData
    );
  };

  const checkScoreOnBlure = () => {
    setEditUserData(
      editUserData.extrapoints === "" ||
        editUserData.extrapoints.split("")[0] === "0"
        ? { ...editUserData, extrapoints: "0" }
        : editUserData
    );
  };

  return (
    <div className="container-xl event-table">
      <table className="table ">
        <thead>
          <tr>
            <th
              scope="col"
              onClick={() => requestSort("user")}
              className={`${getClassNames("user", sorting)} w-20 pointer`}
            >
              Users
            </th>
            <th
              scope="col"
              onClick={() => requestSort("extrapoints")}
              className={`${getClassNames(
                "extrapoints",
                sorting
              )} w-20 pointer`}
            >
              Extra points
            </th>
            <th
              scope="col"
              onClick={() => requestSort("comment")}
              className={`${getClassNames("comment", sorting)}  w-25 pointer`}
            >
              Comment
            </th>
            <th
              scope="col"
              onClick={() => requestSort("attended")}
              className={`${getClassNames("attended", sorting)} pointer`}
            >
              Attended
            </th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <Fragment key={item.id}>
              {editUser === item.id ? (
                <tr className="edit-elem">
                  <td className="name-column">{item.user}</td>
                  <td>
                    <input
                      className="form-control user-form "
                      type="number"
                      min="0"
                      name="extrapoints"
                      value={editUserData.extrapoints}
                      required="required"
                      placeholder="Add extra points"
                      onFocus={checkScoreValue}
                      onBlur={() => {
                        checkScoreOnBlure();
                      }}
                      onChange={handleEditExtrapointsChange}
                    />
                  </td>
                  <td>
                    <input
                      className="form-control user-form "
                      type="text"
                      name="comment"
                      value={editUserData.comment}
                      placeholder="Comment"
                      onChange={handleEditFormChange}
                    />
                  </td>
                  <td>
                    <input
                      className="form-check-input "
                      type="checkbox"
                      id="flexCheckChecked"
                      onChange={handleEditCheckChange}
                      checked={editUserData.attended}
                    />
                  </td>
                  <td>
                    <div className="td-buttons">
                      <button
                        onClick={handleEditFormSubmit}
                        type="submit"
                        className="btn btn-outline-success table-btn"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-check-square"
                          viewBox="0 0 16 16"
                        >
                          <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                          <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-danger table-btn"
                        onClick={handleCancelClick}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-x-square"
                          viewBox="0 0 16 16"
                        >
                          <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                <tr key={item.id}>
                  <td className="name-column">{item.user}</td>
                  <td>{item.extrapoints}</td>
                  <td>{item.comment}</td>
                  <td>
                    <input
                      className="form-check-input check "
                      type="checkbox"
                      id="flexCheckChecked"
                      checked={item.attended}
                      disabled
                    />
                  </td>
                  <td>
                    <div className="td-buttons">
                      <button
                        onClick={() => {
                          handleEditClick(item);
                        }}
                        type="button"
                        className="btn btn-outline-secondary table-btn"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-pencil-square"
                          viewBox="0 0 16 16"
                        >
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                          <path
                            fillRule="evenodd"
                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventData;
