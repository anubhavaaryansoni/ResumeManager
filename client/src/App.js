import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  useRoutes
} from "react-router-dom";

import UploadPDF from './components/UploadPDF';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import EditForm from './components/EditForm';
import UserPage from './components/UserPage';

import 'bootstrap/dist/css/bootstrap.min.css' ;

function App(props) {
  let routes = useRoutes([
    {path: "/", element: <Home/>},
    {path: "/upload", element: <UploadPDF />},
    {path: "/login", element: <Login setIsLoggedIn={props.setIsLoggedIn} />},
    {path: "/register", element: <Register />},
    {path: "/editinfo", element: <EditForm/> },
    {path: "/userpage", element: <UserPage />},
  ]);

  return (
    routes
  );
}

const AppWrapper = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return <Router>
    <App isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
  </Router>
}

export default AppWrapper;