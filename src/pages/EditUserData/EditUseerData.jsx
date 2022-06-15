import React from "react";
import ChangePasswordModal from "../../components/ChangePasswordModal/ChangePasswordModal";
import ChangePhoto from "../../components/ChangePhoto/ChangePhoto";

import "./EditUserData.scss"

const EditUserData = () => {
  return (
    <div>
      <div className="profile-page ">
        <div className="container-xl">
          <h3 className="profil-title">Profile</h3>
        </div>
        <div className="container-xl">
          <div className="profile col-lg-12 mb-4 mb-sm-5">
            <div className="card card-style1 border-0">
              <div className="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7">
                <div className="content-container row align-items-center">
                  <ChangePhoto />
                  <ChangePasswordModal />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserData;
