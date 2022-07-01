import React from "react";
import { useAuth } from "../hook/useAuth";

import { Navigate } from "react-router";

const LoginAccess = ({ children }) => {
  const { isAuth } = useAuth();
  if (!isAuth) {
    return children;
  }

  return <Navigate to="/" />;
};

export default LoginAccess;
