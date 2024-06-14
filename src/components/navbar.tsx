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

const NavBar: React.FC = observer(() => {
  const user_store = useContext(Context)?.user_store;
  const navigate = useNavigate();

  const logout = () => {
    user_store?.setUser({ email: "", id: -1, role: "User", password: "" });
    user_store?.setIsAuth(false);
    localStorage.removeItem("token");
  };

  return (
    <Navbar
      style={{
        backgroundColor: "#ce1531",
        fontFamily: "PermianSansTypeface",
        fontSize: 24,
      }}
    >
      <Container>
        <NavLink
          to={FORUM_ROUTE}
          className="ms-5"
          style={{ color: "white", textDecoration: "none" }}
        >
          {" "}
          Предбанник{" "}
        </NavLink>
        {user_store?.isAuth ? (
          <Nav className="ms-auto" style={{ color: "white" }}>
            <Button
              variant={"outline-light"}
              onClick={() => navigate(PROFILE_ROUTE)}
            >
              Профиль
            </Button>
            {user_store?.user.role === "ADMIN" ? (
              <Button
                className="mx-2"
                variant={"outline-light"}
                onClick={() => navigate(ADMIN_ROUTE)}
              >
                Админ панель
              </Button>
            ) : (
              <div></div>
            )}
            <Button
              variant={"outline-light"}
              onClick={() => logout()}
              className="ms-2"
            >
              Выйти
            </Button>
          </Nav>
        ) : (
          <Nav className="ms-auto" style={{ color: "white" }}>
            <Button
              variant={"outline-light"}
              onClick={() => navigate(LOGIN_ROUTE)}
            >
              Авторизация
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});

export default NavBar;
