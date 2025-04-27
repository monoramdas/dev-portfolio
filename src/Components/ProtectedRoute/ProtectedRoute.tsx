// filepath: c:\Users\Monoram Das\Desktop\coding\Projects\dev-portfolio-builder\client\src\Components\ProtectedRoute\ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }:any) => {
  const userInfo = localStorage.getItem("userInfo");

  if (!userInfo) {
    // Redirect to login if the user is not authenticated
    return <Navigate to="/login" replace />;
  }

  // Render the protected component if the user is authenticated
  return children;
};

export default ProtectedRoute;