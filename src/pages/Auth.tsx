import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FORUM_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { login, registration } from "../http/userApi";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import "../css/Auth.css";

const Auth: React.FC = observer(() => {
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user_store = useContext(Context)?.user_store;
  const navigate = useNavigate();
  const [toggled, setToggled] = useState(false);

  const toggleAuth = () => {
    setToggled(!toggled);
  };

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
      className="justify-content-center align-items-center"
      style={{
        height: window.innerHeight - 54,
        marginTop: "144px",
      }}
    >
      <Row className="justify-content-md-center">
        <Col md="6">
          <div
            className="p-3 rounded"
            style={{
              border: "1px solid #dee2e6",
              borderRadius: "5px",
              borderColor: "black",
            }}
          >
            <Nav
              className="auth-toggle-button"
              fill
              variant="tabs"
              activeKey={isLogin ? "login" : "register"}
              style={{ width: "100%", backgroundColor: "#E5E5E5" }}
            >
              <Nav.Item
                className={`auth-button-wrapper ${
                  toggled ? "login-active" : "register-active"
                }`}
                style={{ width: "50%" }}
              >
                <Nav.Link
                  className="auth-button"
                  id="auth-login"
                  as={NavLink}
                  to={LOGIN_ROUTE}
                  eventKey="login"
                  style={{
                    borderRadius: "50px",
                    backgroundColor: isLogin ? "#FF374C" : "inherit",
                    color: isLogin ? "white" : "inherit",
                  }}
                >
                  Вход
                </Nav.Link>
              </Nav.Item>
              <Nav.Item
                className={`auth-button-wrapper ${
                  toggled ? "login-active" : "register-active"
                }`}
                style={{ width: "50%" }}
              >
                <Nav.Link
                  className="auth-button"
                  id="auth-register"
                  as={NavLink}
                  to={REGISTRATION_ROUTE}
                  eventKey="register"
                  style={{
                    borderRadius: "50px",
                    backgroundColor: !isLogin ? "#FF374C" : "inherit",
                    color: !isLogin ? "white" : "inherit",
                  }}
                >
                  Регистрация
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <div
              className={`form-container ${
                isLogin ? "show-login" : "show-register"
              }`}
            >
              <Form className="login-form">
                <Form.Group
                  controlId="formBasicEmail"
                  className="mt-3 form-text"
                >
                  <Form.Label>Почта</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Введите email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group
                  controlId="formBasicPassword"
                  className="mt-3 form-text"
                >
                  <Form.Label>Пароль</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Введите пароль..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <div className="d-flex justify-content-center">
                  <Button
                    className="mt-4 text-center d-block mb-2 p-3 rounded form-text"
                    onClick={click}
                    style={{
                      backgroundColor: "#A52532",
                      border: "none",
                      width: "400px",
                    }}
                  >
                    Войти
                  </Button>
                </div>
                <NavLink className="text-center d-block mt-2" to={FORUM_ROUTE}>
                  Забыли пароль?
                </NavLink>
              </Form>
              <Form className="register-form">
                <Form.Group
                  controlId="formBasicEmail"
                  className="mt-3 form-text"
                >
                  <Form.Label>Почта</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Введите email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group
                  controlId="formBasicPassword"
                  className="mt-3 form-text"
                >
                  <Form.Label>Пароль</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Введите пароль..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Group
                  controlId="formBasicPassword"
                  className="mt-3 form-text"
                >
                  <Form.Label>Повторите пароль</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Введите пароль повторно..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <div className="d-flex justify-content-center">
                  <Button
                    variant="danger"
                    className="mt-4 text-center mb-2 p-3 rounded"
                    onClick={click}
                    style={{
                      backgroundColor: "#A52532",
                      border: "none",
                      borderRadius: "50px",
                    }}
                  >
                    Зарегистрироваться
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
});

export default Auth;
