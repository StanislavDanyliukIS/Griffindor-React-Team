import { useEffect, useState, useRef } from "react";

import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../../../../firebase";
import { ToastPortal } from "../../../../../../components/ToastPortal/ToastPortal";

import "./ModalManager.scss";

export const ModalManager = ({
  handleAddFormSubmit,
  handleAddFormChange,
  setAddFormData,
}) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    birthday: "",
    telephone: "",
    organization: "",
  });
  const [managersEmail, setManagersEmail] = useState([]);
  const [nameValidation, setNameValidation] = useState("hide-text-danger");
  const [emailValidation, setEmailValidation] = useState("hide-text-danger");
  const [phoneValidation, setPhoneValidation] = useState("hide-text-danger");
  const [organizationValidation, setOrganithationValidation] =
    useState("hide-text-danger");
  const [ageDateValidation, setAgeDateValidation] =
    useState("hide-text-danger");

  const toastRef = useRef();

  useEffect(() => {
    let q = query(collection(db, "users"), where("role", "==", "manager"));
    const usersEmailArray = [];
    getDocs(q).then((data) =>
      data.forEach((user) => {
        usersEmailArray.push(user.data().email);
      })
    );
    setManagersEmail(usersEmailArray);
  }, [user]);

  const nameValidationClass = () => {
    const userName = user.name
      .trim()
      .split("")
      .map((elem) => Number(elem))
      .filter((elem) => elem !== 0)
      .every((elem) => isNaN(elem));
    setNameValidation(
      (user.name.length >= 2 && userName) || user.name.length === 0
        ? "hide-text-danger"
        : "text-danger"
    );
  };

  const handleChange = (e) => {
    if (e.target.value === " ") {
      return;
    }
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

  const validatePhoneClass = () => {
    const numcheck = user.telephone.split("").slice(1, user.telephone.length);
    const isNumbers = numcheck.every((elem) => !isNaN(Number(elem)));

    setPhoneValidation(
      (user.telephone.length === 13 &&
        user.telephone[0] === "+" &&
        isNumbers) ||
        user.telephone.length === 0
        ? "hide-text-danger"
        : "text-danger"
    );
  };

  const organizationValitationClass = () => {
    const stringTest = user.organization.split("").slice(0, 1);
    const firstCharString = isNaN(Number(stringTest));
    setOrganithationValidation(
      (user.organization.length > 1 && firstCharString) ||
        user.organization.length === 0
        ? "hide-text-danger"
        : "text-danger"
    );
  };

  const ageDateValidationClass = () => {
    const age =
      new Date().getFullYear() - new Date(user.birthday).getFullYear();
    setAgeDateValidation(age >= 18 ? "hide-text-danger" : "text-danger");
  };

  const modalValidation = () => {
    return [
      nameValidation,
      emailValidation,
      phoneValidation,
      organizationValidation,
      ageDateValidation,
    ].every((elem) => elem === "hide-text-danger");
  };

  const checkFormObject = () =>
    Object.values(user).every((elem) => !!elem === true);

  const checkForm = (e) => {
    e.preventDefault();
    user.name.length ? nameValidationClass() : setNameValidation("text-danger");

    user.email.length
      ? validateEmailClass()
      : setEmailValidation("text-danger");

    user.telephone.length
      ? validatePhoneClass()
      : setPhoneValidation("text-danger");

    user.organization.length
      ? organizationValitationClass()
      : setOrganithationValidation("text-danger");

    ageDateValidationClass();
  };

  const checkManagersEmail = () => {
    if (managersEmail.includes(user.email)) {
      toastRef.current.addMessage({
        mode: "warning",
        message: "User with this email is already registered.",
      });
      setUser({ ...user, email: "" });
    }
  };

  const clearForm = () => {
    setUser({
      name: "",
      email: "",
      birthday: "",
      telephone: "",
      organization: "",
    });

    setAddFormData({
      name: "",
      email: "",
      birthday: "",
      telephone: "",
      organization: "",
    });

    [
      setNameValidation,
      setEmailValidation,
      setPhoneValidation,
      setOrganithationValidation,
      setAgeDateValidation,
    ].forEach((elem) => elem("hide-text-danger"));
  };

  const { name, email, organization, birthday, telephone } = user;

 
  return (
    <div
      className="modal fade"
      id="ModalCreateManager"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="ModalCreateManagerCenterTitle"
      aria-hidden="true"
    >
      <ToastPortal ref={toastRef} autoClose={false} />
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="ModalCreateManagerCenterTitle">
              Create new manager
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
                Manager name:
              </label>
              <input
                className="form-control user-form"
                id="event-name"
                type="text"
                name="name"
                value={name}
                required="required"
                placeholder="John Doe"
                onChange={(e) => {
                  handleAddFormChange(e);
                  handleChange(e);
                }}
                onBlur={() => {
                  checkFormObject();
                  nameValidationClass();
                }}
              />
              <small className={`${nameValidation} warning-text`}>
                Incorrect user name.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="event-name" className="col-form-label">
                Manager email:
              </label>
              <input
                className="form-control user-form"
                id="event-name"
                type="text"
                name="email"
                value={email}
                required="required"
                placeholder="example@mail.com"
                onChange={(e) => {
                  handleAddFormChange(e);
                  handleChange(e);
                }}
                onBlur={() => {
                  validateEmailClass();
                  checkFormObject();
                  checkManagersEmail();
                }}
              />
              <small className={`${emailValidation} warning-text`}>
                Incorrect email address
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="event-name" className="col-form-label">
                Manager phone number:
              </label>
              <input
                className="form-control user-form"
                id="event-phone"
                type="phone"
                name="telephone"
                value={telephone}
                required="required"
                placeholder="Telephone"
                onChange={(e) => {
                  handleAddFormChange(e);
                  handleChange(e);
                }}
                onBlur={validatePhoneClass}
              />
              <small className={`${phoneValidation} warning-text`}>
                Incorrect phone number.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="event-name" className="col-form-label">
                Manager company name:
              </label>
              <input
                className="form-control user-form"
                id="event-company"
                type="text"
                name="organization"
                value={organization}
                required="required"
                placeholder="Company"
                onChange={(e) => {
                  handleAddFormChange(e);
                  handleChange(e);
                }}
                onBlur={organizationValitationClass}
              />
              <small className={`${organizationValidation} warning-text`}>
                Name should be at least two symbols and first sibol must be a
                leter.
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="event-date" className="col-form-label">
                Manager birthday:
              </label>
              <input
                className="form-control user-form"
                id="event-date"
                type="date"
                name="birthday"
                value={birthday}
                required="required"
                placeholder="Date of birth"
                onChange={(e) => {
                  handleAddFormChange(e);
                  handleChange(e);
                }}
                onBlur={() => {
                  ageDateValidationClass();
                }}
              />
              <small className={`${ageDateValidation} warning-text`}>
                User should be at least 18 years old.
              </small>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={clearForm}
              data-dismiss="modal"
            >
              Cancel
            </button>
            {modalValidation() && checkFormObject() ? (
              <button
                type="submit"
                className="btn btn-outline-primary"
                data-dismiss="modal"
                onFocus={(e) => {
                  checkForm(e);
                  checkManagersEmail();
                }}
                onClick={handleAddFormSubmit}
              >
                Submit
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-outline-primary"
                data-dismiss
                onClick={(e) => {
                  checkForm(e);
                  checkManagersEmail();
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
