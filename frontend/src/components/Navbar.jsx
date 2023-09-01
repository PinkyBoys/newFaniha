import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut, reset } from "../features/authSlice";
import { useSelector } from "react-redux/es/hooks/useSelector";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(logOut());
    dispatch(reset());
    navigate("/");
  };

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset >= window.innerHeight * 0.2) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <nav
      className="navbar has-background-light is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
      id="navbar"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: "opacity .3s ease",
        minHeight: "8vh",
      }}
    >
      <div className="navbar-brand">
        <NavLink className="navbar-item" to="/">
          <span className="is-size-4 has-text-weight-bold">Faniha Kitchen</span>
        </NavLink>
        {/* <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a> */}
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-end">
          <div className="navbar-item">
            <NavLink
              to={"/product"}
              className="navbar-item is-size-6 has-text-weight-bold"
            >
              Menu
            </NavLink>
            <div className="buttons">
              <>
                {user && user.status === "1" ? (
                  <button onClick={logout} className="button is-white">
                    Logout
                  </button>
                ) : (
                  <NavLink to={"/login"} className="button is-light">
                    Log in
                  </NavLink>
                )}
              </>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
