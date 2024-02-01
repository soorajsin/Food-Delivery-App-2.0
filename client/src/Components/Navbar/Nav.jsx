import React from "react";
import { AppBar, Avatar, Toolbar } from "@mui/material";
import { NavLink } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  const navAuth=async()=>{
    
  }

  return (
    <>
      <AppBar>
        <Toolbar>
          <div className="nav">
            <div className="tab">
              <NavLink className={"tabClick"}>
                <img
                  src="https://shopping-app-xx1p.vercel.app/static/media/Sooraj-logo.4ea9ba32a0c93354b8a8.png"
                  alt="logo"
                />
              </NavLink>
            </div>
            <div className="tab">
              <NavLink className={"tabClick"}>Home</NavLink>
            </div>
            <div className="tab">
              <NavLink className={"tabClick"}>Management</NavLink>
            </div>
            <div className="tab">
              <NavLink className={"tabClick"}>
                <i className="fa-solid fa-cart-shopping"></i>
              </NavLink>
            </div>
            <div className="tab">
              <NavLink className={"tabClick"}>Track</NavLink>
            </div>
            <div className="tab">
              <NavLink to={"/register"} className={"tabClick"}>
                Login
              </NavLink>
            </div>
            <div className="tab">
              <NavLink className={"tabClick"}>
                <Avatar></Avatar>
                <div className="avatarManu">
                  <div className="avatartab">
                    <NavLink className={"avatarClick"}>Email</NavLink>
                  </div>
                  <div className="avatartab">
                    <NavLink className={"avatarClick"}>Home</NavLink>
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
