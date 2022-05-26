import { useSelector } from "react-redux";

export const useUserData = () => {
  const { name, role, email, organization, phone, score, rate, birthday } =
    useSelector((state) => state.data.userData);
  return {
    name,
    role,
    email,
    organization,
    phone,
    score,
    rate,
    birthday,
  };
};
