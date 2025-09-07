import React from "react";
import { Link, useNavigate } from "react-router-dom";

const HeaderComponent = () => {
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const navigate = useNavigate();

  const handleLogoutUser = () => {
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container d-flex justify-content-between">
          <div className="d-flex justify-content-between">
            <Link className="navbar-brand" to={"/"}>
              Navbar
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <Link className="nav-link active" aria-current="page" to={""}>Manage Task App</Link>
                <Link className="nav-link" to={"/todo-list"}>Todo list</Link>
                <Link className="nav-link" to={"/users"}>Users </Link>
                <Link className="nav-link" to={"/products"}>Products</Link>
                <Link className="nav-link" to={"/mindx-example"}>Mindx Example</Link>
                <Link className="nav-link" to={"/todo-custom-hooks"}>Todo app custom hooks</Link>
                
              </div>
            </div>
          </div>

          <div>
            {user ? (
              <div>
                <Link className="mr-4 " to={""}>Hello, {user?.username}</Link>
                <button className="btn btn-success" onClick={handleLogoutUser}>Logout</button>
              </div>
            ) : (
              <Link to={"/login"} className="btn btn-primary">
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default HeaderComponent;
