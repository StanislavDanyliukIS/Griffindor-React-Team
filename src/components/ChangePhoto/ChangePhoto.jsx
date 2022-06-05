import React from "react";
import "./ChangePhoto.scss";

const ChangePhoto = () => {
  return (
    <div className="image-change-container col-lg-6 mb-4 mb-lg-0">
      <img
        className="change-photo"
        src="https://bootdey.com/img/Content/avatar/avatar7.png"
        alt="..."
      />
      <form className="change-photo-form form-group mb-3 row" action="">
        <input type="file" className="form-control form-control-sm" />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ChangePhoto;
