import { useState } from "react";
import { useUserData } from "../../hook/useUserData";
import ChangePasswordModal from "../../components/ChangePasswordModal/ChangePasswordModal";
import ChangePhoto from "../../components/ChangePhoto/ChangePhoto";

import "./Profile.scss";

const Profile = () => {
  const [change, setChange] = useState(false);

  const showPasswordWindow = () => {
    setChange(true);
  };

  const { name, role, email, organization, phone, score, rate, birthday } =
    useUserData();

  return (
    <div>
      <div className="profile-page ">
        <div className="container-xl">
          <h3 className="profil-title">Profile</h3>
        </div>
        <div className="container-xl">
          <div className="profile-field col-lg-12 mb-4 mb-sm-5">
            <div className="card card-style1 border-0">
              <div className="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7">
                <div className="row align-items-center">
                  {change ? (
                    <ChangePhoto />
                  ) : (
                    <div className="image-container col-lg-6 mb-4 mb-lg-0">
                      <img
                        className="profile-photo"
                        src="https://bootdey.com/img/Content/avatar/avatar7.png"
                        alt="..."
                      />
                    </div>
                  )}
                  {change ? (
                    <ChangePasswordModal />
                  ) : (
                    <div className="info-container col-lg-6 px-xl-10">
                      <div className=" d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 rounded">
                        <h3 className="h2 mb-0">{name}</h3>
                      </div>
                      <ul className="list-unstyled mb-1-9">
                        <li className="mb-2 mb-xl-3 display-28">
                          <span className="display-26 text-secondary me-2 font-weight-600">
                            Role:
                          </span>{" "}
                          {role}
                        </li>
                        <li className="mb-2 mb-xl-3 display-28">
                          <span className="display-26 text-secondary me-2 font-weight-600">
                            Organization:
                          </span>{" "}
                          {organization}
                        </li>
                        <li className="mb-2 mb-xl-3 display-28">
                          <span className="display-26 text-secondary me-2 font-weight-600">
                            Birthday:
                          </span>{" "}
                          {birthday}
                        </li>
                        <li className="mb-2 mb-xl-3 display-28">
                          <span className="display-26 text-secondary me-2 font-weight-600">
                            Email:
                          </span>{" "}
                          {email}
                        </li>
                        <li className="mb-2 mb-xl-3 display-28">
                          <span className="display-26 text-secondary me-2 font-weight-600">
                            Rating:
                          </span>{" "}
                          {rate}
                        </li>
                        <li className="mb-2 mb-xl-3 display-28">
                          <span className="display-26 text-secondary me-2 font-weight-600">
                            Points:
                          </span>{" "}
                          {score}
                        </li>
                        <li className="display-28">
                          <span className="display-26 text-secondary me-2 font-weight-600">
                            Phone:
                          </span>{" "}
                          {phone}
                        </li>
                      </ul>
                      <button
                        className="btn btn-primary d-sm-inline-block edit-btn"
                        onClick={showPasswordWindow}
                      >
                        Edit
                      </button>
                    </div>
                  )}
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
