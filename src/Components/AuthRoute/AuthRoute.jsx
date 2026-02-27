import React, { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function AuthRoute({ children }) {
  const { userToken } = useContext(AuthContext);
  return <>{!userToken ? children : <Navigate to={"/"} />}</>;
}
