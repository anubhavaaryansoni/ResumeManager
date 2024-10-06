import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import Studentview from "./student";
import Tprview from "./tpr";
import Recruiterview from "./recruiter";
import Navbar from "../Navbar";
import "./home.css" ;

import AuthContext from "../store/auth-context";
import Login from "../Login";

const Home = (props) => {
  
  const ctx = useContext(AuthContext);
  const [data, setData] = useState({});
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/user", {
        withCredentials: true,
      })
      .then((res) => {
        // console.log(res);
        setData(res.data);
        // console.log(ctx.isLoggedIn);
        // console.log(localStorage.getItem('isLoggedIn'));
        // console.log(!ctx.isLoggedIn&& localStorage.getItem('isLoggedIn'));
        if(!ctx.isLoggedIn && localStorage.getItem('isLoggedIn')) {
          console.log("here", !ctx.isLoggedIn);
          
      }
        //   window.location.href = "/";
      })
      .catch((err) => {
        console.log(err);
        window.location.href = '/login';
      });
  }, [setData, ctx]);
  // console.log(data);
  // console.log(data.designation === "comp_representative");
  // if (!["student", "tpr", "comp_representative"].includes(data.designation)) {
  //   return <Login/>;
  // }
  return (
    <React.Fragment>
    
     <Navbar />
      {data.designation === "student" && <Studentview />}
      {data.designation === "tpr" && <Tprview />}
      {data.designation === "admin" && <Tprview />}
      {data.designation === "comp_representative" && <Recruiterview />}
      {data.designation === "admin" && <Recruiterview />}
      </React.Fragment>
  );
};
export default Home;
