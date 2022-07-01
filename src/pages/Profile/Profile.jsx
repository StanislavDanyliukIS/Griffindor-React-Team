import { useEffect, useState } from "react";
import { useUserData } from "../../hook/useUserData";

import { useNavigate } from "react-router";

import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

import "./Profile.scss";

const Profile = () => {
  const [photo, setPhoto] = useState();
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const {
    name,
    role,
    email,
    organization,
    telephone,
    score,
    birthday,
    userImageUrl,
  } = useUserData();

  const moveToEdit = () => {
    navigate("edit-data");
  };

  useEffect(() => getUsersData, []);

  const getUsersData = async () => {
    const arr = [];
    const q = query(collection(db, "users"), where("role", "==", "user"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      arr.push(doc.data().score);
    });
    setUsers(arr.sort((a, b) => b - a));
  };

  useEffect(() => {
    setPhoto(userImageUrl);
  }, [userImageUrl]);

  const userImage = photo
    ? photo
    : "https://bootdey.com/img/Content/avatar/avatar7.png";

  return (
    <div className="profile-page ">
      <div className="container-xl">
        <h3 className="profil-title">Profile</h3>
      </div>
      <div className="main-container container-xl">
        <div className="profile-field col-lg-12 mb-4 mb-sm-5">
          <div className="card ">
            <div className="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7">
              <div className="container-content row">
                <div className="image-container col-lg-6 mb-4 mb-lg-0">
                  <img className="profile-photo" src={userImage} alt="..." />
                </div>

                <div className="info-container col-lg-6 px-xl-10">
                  <div className=" d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 rounded">
                    <h3 className="info-container__name h2 mb-0">{name}</h3>
                  </div>
                  <ul className="list-unstyled mb-1-9">
                    {role === "user" && (
                      <li className="mb-2 mb-xl-3 display-28">
                        <span className="info-container__info-title display-26  me-2 font-weight-600">
                          Rating:
                        </span>{" "}
                        {users.indexOf(score) + 1}
                      </li>
                    )}
                    <li className="mb-2 mb-xl-3 display-28">
                      <span className="info-container__info-title display-26  me-2 font-weight-600">
                        Role:
                      </span>{" "}
                      {role}
                    </li>
                    <li className="mb-2 mb-xl-3 display-28">
                      <span className="info-container__info-title display-26  me-2 font-weight-600">
                        Organization:
                      </span>{" "}
                      {organization}
                    </li>
                    <li className="mb-2 mb-xl-3 display-28">
                      <span className="info-container__info-title display-26  me-2 font-weight-600">
                        Birthday:
                      </span>{" "}
                      {birthday}
                    </li>
                    <li className="mb-2 mb-xl-3 display-28">
                      <span className="info-container__info-title display-26  me-2 font-weight-600">
                        Email:
                      </span>{" "}
                      {email}
                    </li>
                    {role === "user" && (
                      <li className="mb-2 mb-xl-3 display-28">
                        <span className="info-container__info-title display-26  me-2 font-weight-600">
                          Points:
                        </span>{" "}
                        {score}
                      </li>
                    )}
                    <li className="display-28">
                      <span className="info-container__info-title display-26  me-2 font-weight-600">
                        Phone:
                      </span>{" "}
                      {telephone}
                    </li>
                  </ul>
                  <button
                    className="edit-btn btn btn-primary d-sm-inline-block edit-btn"
                    onClick={moveToEdit}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
