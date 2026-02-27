import React, { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { userToken } = useContext(AuthContext);

  return (
    <div className="min-h-screen">
      {userToken ? children : <Navigate to="/login" />}
    </div>
  );
}
