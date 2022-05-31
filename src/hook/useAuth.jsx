import { useSelector } from "react-redux";

export const useAuth = () => {
  const userData = useSelector((state) => state.auth.userInfo);
  const status = JSON.parse(localStorage.getItem("isAuth"));

  const { uid, email, token } = userData;

  return {
    isAuth: status,
    uid,
    email,
    token,
  };
};
