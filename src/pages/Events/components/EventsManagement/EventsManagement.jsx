import { useSorting } from "../../../../hook/useSorting";
import { useEffect, useState } from "react";

import { db } from "../../../../firebase";
import {

	collection,
	addDoc,
	query,
	onSnapshot,
	where,
	doc,
	deleteDoc,
} from 'firebase/firestore';


import { getClassNames } from "../../../../functions/getClassNames";

import "./EventsManagement.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { ModalEvent } from "./components/ModalEvent/ModalEvent";
import { ConfirmDeleteModal } from "../../../../components/ConfirmDeleteModal/ConfirmDeleteModal";

const EventsManagement = () => {
  const eventsData = useSelector((state) => state.events.eventsData);
  const { items, requestSort, sorting } = useSorting(eventsData);

  const [initValue, setInitValue] = useState({
    date: "",
    name: "",
    score: 0,
    participants: [],
  });

  const [formData, setFormData] = useState(initValue);
  const [deleteEvent, setDeleteEvent] = useState({});

  const handleClearForm = () => {
    setFormData(initValue);
  };
  const handleAddFormChange = (e) => {
    e.preventDefault();

    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    const newFormData = { ...formData };
    newFormData[fieldName] = fieldValue;

    setFormData(newFormData);
  };

  const handleDeleteClick = (eventId) => {
    const selectedEvent = items.filter((el) => el.id === eventId);

    setDeleteEvent(selectedEvent[0]);
  };

  const handleDeleteSubmit = () => {
    const document = doc(db, "events", deleteEvent.id);

    deleteDoc(document);

    setDeleteEvent({});
  };

  const handleAddFormSubmit = async (e) => {
    e.preventDefault();
    if (JSON.stringify(initValue) !== JSON.stringify(formData)) {
      await addDoc(collection(db, "events"), {
        date: formData.date,
        name: formData.name,
        participants: formData.participants,
        score: formData.score,
      });
    }

    setFormData(initValue);
  };

  useEffect(() => {
    const q = query(collection(db, "users"), where("role", "==", "user"));

    onSnapshot(q, (querySnapshot) => {
      const participantsArray = [];

      querySnapshot.forEach((doc) => {
        participantsArray.push({
          id: doc.id,
          user: doc.data().name,
          attended: false,
          extrapoints: 0,
          comment: "",
        });
      });
      setInitValue((prev) => ({ ...prev, participants: participantsArray }));
    });
  }, []);

  return (
    <main>
      <div className={"container-xl"}>
        <h3 className={"page-name pt-2"}> Events </h3>
      </div>
      <div className={"container-xl"}>
        <button
          type="button"
          className="btn btn-outline-secondary btn-table-create"
          data-toggle="modal"
          data-target="#ModalCreateEvent"
          onClick={() => {
            setFormData(initValue);
          }}
        >
          Create a new Event
        </button>
      </div>

      <ModalEvent
        handleClearForm={handleClearForm}
        handleAddFormChange={handleAddFormChange}
        handleAddFormSubmit={handleAddFormSubmit}
        formData={formData}
        setFormData={setFormData}
      />
      <ConfirmDeleteModal
        user={deleteEvent.name}
        handleDeleteSubmit={handleDeleteSubmit}
      />

      <div className={"container-xl"}>
        <table className="table">
          <thead>
            <tr>
              <th
                scope="col"
                onClick={() => requestSort("name")}
                className={`${getClassNames("name", sorting)} pointer`}
              >
                Name
              </th>
              <th
                scope="col"
                onClick={() => requestSort("date")}
                className={`${getClassNames("date", sorting)} pointer`}
              >
                Date
              </th>
              <th
                scope="col"
                onClick={() => requestSort("score")}
                className={`${getClassNames("score", sorting)} pointer`}
              >
                Points for attending
              </th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody className="events-list">
            {items.map((item) => (
              <tr key={item.id}>
                <td>
                  <Link to={`/events/${item.id}`}>{item.name}</Link>
                </td>
                <td>
                  {item.date.substr(0, 10) + " " + item.date.substr(11, 8)}
                </td>
                <td>{item.score}</td>
                <td className="table-btn">
                  <button
                    onClick={() => handleDeleteClick(item.id)}
                    type="button"
                    className="btn btn-outline-danger btn-delete"
                    data-toggle="modal"
                    data-target="#ModalConfirmDelete"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                      <path
                        fillRule="evenodd"
                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default EventsManagement;
