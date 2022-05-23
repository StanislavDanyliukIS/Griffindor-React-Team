import { Navigate, useNavigate } from "react-router";
import { useAuth } from "../../hook/useAuth";

import "./Profile.scss";

const Profile = () => {
  const navigation = useNavigate();
  const handleClick = () => navigation("settings");
  const { name, role, email, number, organization } = useAuth();
  if (!!name) {
    <Navigate to="login" />;
  }

  return (
    <div>
      <div className="profile-page bg-light">
        <div className="container-xl">
          <h3 className="profil-title">Profile</h3>
        </div>
        <div className="container-xl">
          <div className="profile-field col-lg-12 mb-4 mb-sm-5">
            <div className="card card-style1 border-0">
              <div className="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7">
                <div className="row align-items-center">
                  <div className="col-lg-6 mb-4 mb-lg-0">
                    <img
                      className="profile-photo"
                      src="https://bootdey.com/img/Content/avatar/avatar7.png"
                      alt="..."
                    />
                  </div>
                  <div className="col-lg-6 px-xl-10">
                    <div className=" d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 rounded">
                      <h3 className="h2 text-black mb-0">{name}</h3>
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
                          Email:
                        </span>{" "}
                        {email}
                      </li>
                      <li className="mb-2 mb-xl-3 display-28">
                        <span className="display-26 text-secondary me-2 font-weight-600">
                          Rating:
                        </span>{" "}
                        35
                      </li>
                      <li className="mb-2 mb-xl-3 display-28">
                        <span className="display-26 text-secondary me-2 font-weight-600">
                          Points:
                        </span>{" "}
                        27
                      </li>
                      <li className="display-28">
                        <span className="display-26 text-secondary me-2 font-weight-600">
                          Phone:
                        </span>{" "}
                        {number}
                      </li>
                    </ul>
                    <button
                      className="btn btn-primary d-sm-inline-block edit-btn"
                      onClick={handleClick}
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
    </div>
  );
};
export default Profile;
