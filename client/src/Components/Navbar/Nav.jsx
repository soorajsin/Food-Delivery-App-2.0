import React, { useEffect, useState } from "react";
import { AppBar, Avatar, Toolbar } from "@mui/material";
import { NavLink } from "react-router-dom";
import "./Nav.css";
import apiURL from "../config";

const Nav = () => {
  const [userData, setUserData] = useState();
  const api = apiURL.url;
  const navAuth = async () => {
    const token = await localStorage.getItem("token");
    // console.log(token);

    const data = await fetch(`${api}/validator`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    });

    const res = await data.json();
    // console.log(res);

    if (res.status === 201) {
      console.log(res);
      setUserData(res);
    } else {
      window.location.replace("/login");
    }
  };

  useEffect(() => {
    navAuth();
  }, []);

  return (
    <>
      <AppBar>
        <Toolbar>
          <div className="nav">
            <div className="tab">
              <NavLink to={"/home"} className={"tabClick"}>
                <img
                  src="https://shopping-app-xx1p.vercel.app/static/media/Sooraj-logo.4ea9ba32a0c93354b8a8.png"
                  alt="logo"
                />
              </NavLink>
            </div>
            <div className="tab">
              <NavLink to={"/home"} className={"tabClick"}>
                Home
              </NavLink>
            </div>
            {/* management part */}
            {userData
              ? userData.data.role === "staff" && (
                  <>
                    <div className="tab">
                      <NavLink to={"/management"} className={"tabClick"}>
                        Management
                      </NavLink>
                    </div>
                    <div className="tab">
                      <NavLink to={"/track"} className={"tabClick"}>Track</NavLink>
                    </div>
                  </>
                )
              : ""}

            <div className="tab">
              <NavLink to={"/shopping"} className={"tabClick"}>
                <i className="fa-solid fa-cart-shopping"></i>
              </NavLink>
            </div>
            <div className="tab">
              <NavLink to={"/"} className={"tabClick"}>
                Login
              </NavLink>
            </div>
            <div className="tab">
              <NavLink className={"tabClick"}>
                <Avatar className="avatarIcon">
                  {userData ? userData.data.email.charAt(0).toUpperCase() : ""}
                </Avatar>
                <div className="avatarManu">
                  <div className="avatartab">
                    <NavLink className={"avatarClick"}>
                      {userData ? userData.data.email : "Email"}
                    </NavLink>
                  </div>
                  <div className="avatartab">
                    <NavLink to={"/home"} className={"avatarClick"}>
                      Home
                    </NavLink>
                  </div>
                  <div className="avatartab">
                    <NavLink className={"avatarClick"}>Management</NavLink>
                  </div>
                  <div className="avatartab">
                    <NavLink className={"avatarClick"}>Shopping</NavLink>
                  </div>
                  <div className="avatartab">
                    <NavLink className={"avatarClick"}>Track</NavLink>
                  </div>
                  <div className="avatartab">
                    <NavLink className={"avatarClick"}>Log Out</NavLink>
                  </div>
                </div>
              </NavLink>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Nav;
