import React, { useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../firebase";
import { useNavigate } from "react-router";

import { useAuth } from "../../hook/useAuth";
import { useUserData } from "../../hook/useUserData";

import "./ChangePhoto.scss";

const ChangePhoto = () => {
  const [photoUser, setPhoto] = useState({});
  const [image, setImage] = useState("");

  const { uid } = useAuth();
  const { photo, userImageUrl } = useUserData();
  const navigate = useNavigate();

  const userImage = userImageUrl
    ? userImageUrl
    : "https://bootdey.com/img/Content/avatar/avatar7.png";

  useEffect(() => setPhoto({ name: photo }), [photo]);

  const loadData = (e) => {
    e.preventDefault();
    const file = photoUser;
    const storageRef = ref(storage, `photos/${file.name}`);
    uploadBytes(storageRef, file)
      .then((resp) => console.log("Uploaded file ", image, " ", resp))
      .then(() =>
        updateDoc(doc(db, "users", uid), {
          photo: photoUser.name,
        })
      )
      .then(() => setPhoto({ name: photo }))
      .then(() => getData())
      .then(() => {
        navigate(-1);
      });
  };

  const getData = () => {
    getDownloadURL(ref(storage, `photos/${photoUser.name}`))
      .then((url) => {
        setImage(url);
        updateDoc(doc(db, "users", uid), {
          userImageUrl: url,
        });
        console.log("Uploadet image to: ", url);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="image-change-container col-lg-6 mb-4 mb-lg-0">
      <img className="change-photo" src={userImage} alt="..." />
      <form className="change-photo-form form-group mb-3 row" action="">
        <input
          type="file"
          className="form-control form-control-sm"
          onChange={(e) => {
            setPhoto(e.target.files[0]);
          }}
        />
        <button type="submit" className="btn btn-primary" onClick={loadData}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ChangePhoto;
