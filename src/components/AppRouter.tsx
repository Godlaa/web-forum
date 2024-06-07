import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { authRoutes, publicRoutes } from "../routes";
import { Context } from "../index";
import { observer } from "mobx-react-lite";

const AppRouter : React.FC  = () => {
    const user_store = useContext(Context)?.user_store;

    return (
        <Routes>
            {user_store?.isAuth && authRoutes.map(({path, Component}) => 
                <Route key={path} path={path} element={<Component />} />
            )}
            {publicRoutes.map(({path, Component}) => 
                <Route key={path} path={path} element={<Component />} />
            )}
        </Routes>
    );
}

export default observer(AppRouter);