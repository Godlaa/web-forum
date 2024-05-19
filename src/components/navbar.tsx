import React, { useContext } from "react";
import { Context } from "..";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { ADMIN_ROUTE, FORUM_ROUTE, LOGIN_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import { useNavigate, NavLink } from "react-router-dom";

const NavBar : React.FC  = observer ( () => {
    const user_store = useContext(Context)?.user_store;
    const navigate = useNavigate();
    const logout = () => {
        user_store?.setUser({});
        user_store?.setIsAuth(false);
        localStorage.removeItem('token');
    }
    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
            <NavLink to={FORUM_ROUTE} className="ms-5" style={{ color: "white", textDecoration: "none"}}> Парилка </NavLink>
            {user_store?.isAuth ? 
                <Nav className="ms-auto" style={ {color: "white"} }>
                <Button variant={"outline-light"} onClick={() => navigate(ADMIN_ROUTE)} >Админ панель</Button>
                <Button variant={"outline-light"} onClick={() => logout()} className="ms-2">Выйти</Button>
                </Nav>
                :
                <Nav className="ms-auto" style={ {color: "white"} }>
                <Button variant={"outline-light"} onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
                </Nav>
            }
            </Container>
        </Navbar>
    )
});


export default NavBar;
