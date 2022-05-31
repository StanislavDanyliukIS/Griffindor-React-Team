import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "../hook/useAuth";

const LoginAccess = ({ children }) => {
  const { isAuth } = useAuth();
  if (!isAuth) {
    return children;
  }

  return <Navigate to="/" />;
};

export default LoginAccess;
