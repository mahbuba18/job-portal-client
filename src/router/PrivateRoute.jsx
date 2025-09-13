import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext/AuthContext";


const PrivateRoute = () => {
  const { user, loading } = useContext(AuthContext);
  const loaction = useLocation();

  if (loading) return <div>Loading...</div>;

  
  return user ? <Outlet /> : <Navigate to="/signin" state={{from: loaction.pathname}}/>;
};

export default PrivateRoute;
