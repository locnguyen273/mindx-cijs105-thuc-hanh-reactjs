import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const AuthLayout = () => {
  const user = JSON.parse(localStorage.getItem("user")) || null;
  if (user) return <Navigate to={"/"} replace />;
  else return (
    <div>
      <Outlet />
    </div>
  )
}

export default AuthLayout