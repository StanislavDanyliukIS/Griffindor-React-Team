
import { useSelector } from "react-redux";

export const useAuth = () => {
  const user = useSelector((state) => state.auth.userInfo);
  const { id, email, token } = user;
  return {
    isAuth: !!email,
    id,
    email,
    token,
  };
};
