import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const naviget = useNavigate();
  const logout = () => {
    sessionStorage.clear();
    naviget("/login");
    window.location.reload();
  };
  const loginvalue = sessionStorage.getItem("login");
  useEffect(() => {
    const userToken = sessionStorage.getItem("token");
    setIsLoggedIn(!!userToken);
  }, []);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark fixed-top">
      <div className="container-fluid">
        {loginvalue ? (
          <Link className="navbar-brand text-light" to="/home">
            ProthsahanTeam
          </Link>
        ) : (
          <Link className="navbar-brand text-light" to="/">
            Admin Penel
          </Link>
        )}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {isLoggedIn ? (
              <li className="nav-item">
                <Link
                  className="nav-link active text-light"
                  aria-current="page"
                  to="/home"
                >
                  Home
                </Link>
              </li>
            ) : (
              ""
            )}
          </ul>
          <ul
            style={{
              display: "flex",
              listStyle: "none",
              fontSize: "25px",
              color: "white",
            }}
          >
            {isLoggedIn ? (
              <li>
                <button onClick={logout} className="btn btn-danger text-light">
                  Logout
                </button>
              </li>
            ) : (
              <li>
                {" "}
                <Link to="/login">
                  <i className="fa fa-user text-light"></i>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
