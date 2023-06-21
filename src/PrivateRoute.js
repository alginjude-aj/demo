import React from "react";
import {  Navigate, Outlet } from "react-router-dom";



const PrivateRoute = ({ redirectPath = '/login', children }) => {
  const isAuth = localStorage.getItem("isAuth") === "1";
  if (!isAuth) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};


// const PrivateRoute = ({ element: Component, isAuth, ...rest }) => {
//     if (!isAuth) {
//       return <Navigate to="/login" />;
//     }
  
//     // return <Component {...rest} />;
//     return <Route {...rest} element={<Component />} />;
//   };
        
export default PrivateRoute;