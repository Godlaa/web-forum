import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { FORUM_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { login, registration } from "../http/userApi";
import { observer } from "mobx-react-lite";
import { Context } from "..";

const Auth: React.FC = observer(() => {
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user_store = useContext(Context)?.user_store;
  const navigate = useNavigate();

  const click = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(email, password);
      }
      user_store?.setUser(data);
      user_store?.setIsAuth(true);
      navigate(FORUM_ROUTE);
    } catch (e) {
      if (e instanceof Error) {
        console.error("Ошибка:", e.message);
      } else {
        console.error("Неизвестная ошибка");
      }
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto"> {isLogin ? "Авторизация" : "Регистрация"} </h2>
        <Form className="d-flex flex-column" autoComplete="on">
          <Form.Control
            className="mt-3"
            id="email"
            type="email"
            name="email"
            placeholder="Введите ваш email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
          <Form.Control
            className="mt-3"
            id="password"
            type="password"
            name="password"
            placeholder="Введите ваш пароль..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={isLogin ? "current-password" : "new-password"}
            required
          />
          <Button className="mt-3" variant="outline-dark" onClick={click}>
            {isLogin ? "Войти" : "Зарегистрироваться"}
          </Button>
          {isLogin ? (
            <div className="mt-3">
              Нет аккаунта?{" "}
              <NavLink
                to={REGISTRATION_ROUTE}
                style={{ textDecoration: "none" }}
              >
                Зарегистрируйтесь!
              </NavLink>
            </div>
          ) : (
            <div className="mt-3">
              Есть аккаунт?{" "}
              <NavLink to={LOGIN_ROUTE} style={{ textDecoration: "none" }}>
                Войдите!
              </NavLink>
            </div>
          )}
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;
