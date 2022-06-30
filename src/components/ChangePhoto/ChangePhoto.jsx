import React, { useEffect, useState } from "react";
import { useAuth } from "../../hook/useAuth";
import { useUserData } from "../../hook/useUserData";


import { useDispatch } from 'react-redux';
import { addUserData } from '../../store/slices/userDataSlice';


import { useNavigate } from "react-router";

import { doc, updateDoc, getDoc } from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "../../firebase";

import "./ChangePhoto.scss";

const ChangePhoto = () => {
  const [photoUser, setPhoto] = useState();
  const [image, setImage] = useState("");
  const [imagePreviwe, setImagePreviwe] = useState();

  const dispatch = useDispatch();

  const { uid } = useAuth();
  const { photo, userImageUrl } = useUserData();
  const navigate = useNavigate();

  useEffect(() => {
    setImage(userImageUrl);
  }, [userImageUrl]);

  const loadData = (e) => {
    e.preventDefault();
    const file = photoUser;
    const storageRef = ref(storage, `photos/${file.name}`);
    uploadBytes(storageRef, file)
      .then(() => {
        const desertRef = ref(storage, `photos/${photo}`);
        deleteObject(desertRef).catch((error) => {
          console.error(error);
        });
      })
      .then(() =>
        updateDoc(doc(db, "users", uid), {
          photo: photoUser.name,
        })
      )
      .then(() => setPhoto({ name: photo }))
      .then(() => getData());
  };

  const getData = () => {
    getDownloadURL(ref(storage, `photos/${photoUser.name}`))
      .then((url) => {
        setImage(url);
        updateDoc(doc(db, "users", uid), {
          userImageUrl: url,
        }).then((data) => {
          const docRef = doc(db, `users`, uid);
          getDoc(docRef).then((resp) => dispatch(addUserData(resp.data())));
          return data;
        });
      })
      .then(() => {
        navigate(-1);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const userImage = image
    ? image
    : "https://bootdey.com/img/Content/avatar/avatar7.png";

  const showImage = imagePreviwe ? imagePreviwe : userImage;

  return (
    <div className="image-change-container col-lg-6 mb-4 mb-lg-0">
      <img className="change-photo" src={showImage} alt="..." />

      <form className="change-photo-form form-group mb-3 row" action="">
        <input
          type="file"
          className="form-control form-control-sm"
          onChange={(e) => {
            setPhoto(e.target.files[0]);
            setImagePreviwe(URL.createObjectURL(e.target.files[0]));
          }}
        />
        <button
          type="submit"
          className="btn btn-primary"
          onClick={loadData}
          disabled={photoUser ? false : true}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ChangePhoto;
