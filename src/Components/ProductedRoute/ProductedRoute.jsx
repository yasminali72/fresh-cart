import React, { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import Login from "../Login/Login";

export default function ProductedRoute({ children }) {
  const { userToken } = useContext(AuthContext);

  return <div className="min-h-screen">{userToken ? children : <Login />}</div>;
}
