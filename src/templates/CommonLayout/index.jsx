import React from "react";
import HeaderComponent from "../../components/shared/header";
import { Navigate, Outlet } from "react-router-dom";

const CommonLayout = () => {
  const user = JSON.parse(localStorage.getItem("user")) || null;
  if (!user) {
    return <Navigate to={"/login"} replace />;
  } else {
    return (
      <div>
        <HeaderComponent />
        <Outlet />
      </div>
    );
  }
};

export default CommonLayout;
