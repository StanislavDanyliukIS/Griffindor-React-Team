export const useAuth = () => {
  if (!JSON.parse(sessionStorage.getItem("user"))) {
    return { isAuth: false };
  }
  const { name, role, email, number, organization } = JSON.parse(
    sessionStorage.getItem("user")
  );

  return {
    isAuth: !!email,
    name,
    role,
    email,
    number,
    organization,
  };
};
