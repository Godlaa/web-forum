import React, { useContext, useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import NavBar from './components/navbar';
import { observer } from 'mobx-react-lite';
import { Context } from '.';
import { Spinner } from 'react-bootstrap';
import { check } from './http/userApi';

const App : React.FC = observer( () => {

  const { user_store } = useContext(Context) || {};
  const [loading, setLoading] = useState<boolean>(true);
  const token = localStorage.getItem('token')

  useEffect(() => {
    setTimeout(() => {
       if(!user_store || (!user_store.isAuth && !token)){
            setLoading(false)
            return
        }
        check().then((data) => {
                if (data) {
                  user_store.setIsAuth(true);
                  user_store.setUser(data);
                } else {
                  user_store.setIsAuth(false);
                }
            })
            .finally(() => setLoading(false));
    }, 1000);
  })

  if (loading){
      return <Spinner animation={"grow"} />
  }

  return (
    <BrowserRouter>
      <NavBar/>
      <AppRouter/>
    </BrowserRouter>  
  );
});

export default App;
