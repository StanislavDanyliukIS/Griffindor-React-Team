
import { useNavigate } from "react-router";

import "./Profile.scss";

const Profile = () => {
  const navigation = useNavigate();
  const handleClick = () => navigation("settings", { replace: true });
  return (
    <div>
      <div className="profile-page">
        <div class="container">
          <h3 className="profil-title">Profile</h3>
          <div class="profile-field col-lg-12 mb-4 mb-sm-5">
            <div class="card card-style1 border-0">
              <div class="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7">
                <div class="row align-items-center">
                  <div class="col-lg-6 mb-4 mb-lg-0">
                    <img  className ="profile-photo"
                      src="https://bootdey.com/img/Content/avatar/avatar7.png"
                      alt="..."
                    />
                  </div>
                  <div class="col-lg-6 px-xl-10">
                    <div class=" d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 rounded">
                      <h3 class="h2 text-black mb-0">John Doe</h3>
                    </div>
                    <ul class="list-unstyled mb-1-9">
                      <li class="mb-2 mb-xl-3 display-28">
                        <span class="display-26 text-secondary me-2 font-weight-600">
                          Role:
                        </span>{" "}
                        User
                      </li>
                      <li class="mb-2 mb-xl-3 display-28">
                        <span class="display-26 text-secondary me-2 font-weight-600">
                          Date of registration:
                        </span>{" "}
                        15.05.2022
                      </li>
                      <li class="mb-2 mb-xl-3 display-28">
                        <span class="display-26 text-secondary me-2 font-weight-600">
                          Email:
                        </span>{" "}
                        edith@mail.com
                      </li>
                      <li class="mb-2 mb-xl-3 display-28">
                        <span class="display-26 text-secondary me-2 font-weight-600">
                          Rating:
                        </span>{" "}
                        35
                      </li>
                      <li class="mb-2 mb-xl-3 display-28">
                        <span class="display-26 text-secondary me-2 font-weight-600">
                          Points:
                        </span>{" "}
                        27
                      </li>
                      <li class="display-28">
                        <span class="display-26 text-secondary me-2 font-weight-600">
                          Phone:
                        </span>{" "}
                        507 - 541 - 4567
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
