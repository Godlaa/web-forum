import React, { useContext } from "react";
import { Context } from "..";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import {
  ADMIN_ROUTE,
  FORUM_ROUTE,
  LOGIN_ROUTE,
  PROFILE_ROUTE,
} from "../utils/consts";
import { observer } from "mobx-react-lite";
import { useNavigate, NavLink } from "react-router-dom";
import "../css/navbar.css";

const NavBar: React.FC = observer(() => {
  const user_store = useContext(Context)?.user_store;
  const navigate = useNavigate();

  const logout = () => {
    user_store?.setUser({ email: "", id: -1, role: "User", password: "" });
    user_store?.setIsAuth(false);
    localStorage.removeItem("token");
  };

  return (
    <Navbar className="navbar-body d-flex justify-content-between align-items-start">
      <Container>
        <NavLink
          to={FORUM_ROUTE}
          className="navbar-btn ms-5 mt-4"
          style={{
            color: "white",
            textDecoration: "none",
            fontFamily: "STIX Two Text-Regular",
          }}
        >
          Баня
        </NavLink>
        {user_store?.isAuth ? (
          <Nav className="mt-4" style={{ color: "white" }}>
            <div className="navbar-button-container">
              <button
                className="navbar-button"
                onClick={() => navigate(PROFILE_ROUTE)}
              >
                <span className="navbar-button-text">Профиль</span>
              </button>
            </div>

            {/* {user_store?.user.role === "ADMIN" ? (
              <div className="navbar-button-container">
                <button
                  className="navbar-button"
                  onClick={() => navigate(ADMIN_ROUTE)}
                >
                  <span className="navbar-button-text">Админ</span>
                </button>
              </div>
            ) : (
              <div></div>
            )} */}
            <div className="navbar-button-container">
              <button className="navbar-button" onClick={() => logout()}>
                <span className="navbar-button-text">Выход</span>
              </button>
            </div>
          </Nav>
        ) : (
          <Nav className="ms-auto mt-4">
            <div className="navbar-button-container">
              <button
                className="navbar-button"
                onClick={() => navigate(LOGIN_ROUTE)}
              >
                <span className="navbar-button-text">Вход</span>
              </button>
            </div>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});

export default NavBar;
