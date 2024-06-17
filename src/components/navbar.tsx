import React, { useContext } from "react";
import { Context } from "..";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
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
            <Button
              className="navbar-btn mx-2 mt-4"
              variant={"outline-light"}
              onClick={() => navigate(PROFILE_ROUTE)}
              style={{
                textDecoration: "none",
              }}
            >
              Профиль
            </Button>
            {user_store?.user.role === "ADMIN" ? (
              <Button
                className="navbar-btn mx-2 mt-4"
                variant={"outline-light"}
                onClick={() => navigate(ADMIN_ROUTE)}
                style={{
                  textDecoration: "none",
                }}
              >
                Админ
              </Button>
            ) : (
              <div></div>
            )}
            <Button
              variant={"outline-light"}
              onClick={() => logout()}
              className="navbar-btn ms-2 mt-4"
              style={{
                textDecoration: "none",
              }}
            >
              Выйти
            </Button>
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
