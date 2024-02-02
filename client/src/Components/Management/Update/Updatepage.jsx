import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import "./Updatepage.css";
import apiURL from "../../config";

const Updatepage = () => {
  const api = apiURL.url;
  const { addFoodId } = useParams();
  //   console.log(addFoodId);
  const [sendData, setSendData] = useState({
    fname: "",
    fprice: "",
    fimg: "",
    fdec: ""
  });

  const changeData = (e) => {
    setSendData({ ...sendData, [e.target.name]: e.target.value });
  };
  console.log(sendData);

  useEffect(() => {
    const fetchedData = async () => {
      try {
        const data = await fetch(`${api}/fetchedDataForManagement`, {
          method: "GET"
        });

        const res = await data.json();
        if (res.status === 201) {
          console.log("update", res);
        } else {
          console.error("Food not found for the given ID");
        }
      } catch (error) {
        console.log(error);
      }
    };
  });

  const updateFoodDetails = async () => {};

  return (
    <>
      <div className="register">
        <div className="regContainer">
          <div className="form">
            <h3>Welcome to Update Food</h3>
          </div>
          <div className="form">
            <label htmlFor="fname">Food Name</label>
            <br />
            <input
              type="text"
              name="fname"
              value={sendData.fname}
              onChange={changeData}
              placeholder="Enter food name"
            />
          </div>
          <div className="form">
            <label htmlFor="fprice">Food Price</label>
            <br />
            <input
              type="number"
              name="fprice"
              value={sendData.fprice}
              onChange={changeData}
              placeholder="Enter food price"
            />
          </div>
          <div className="form">
            <label htmlFor="fimg">Food URL</label>
            <br />
            <input
              type="url"
              name="fimg"
              value={sendData.fimg}
              onChange={changeData}
              placeholder="Enter food url"
            />
          </div>
          <div className="form">
            <label htmlFor="fdec">Food Description</label>
            <textarea
              name="fdec"
              value={sendData.fdec}
              onChange={changeData}
              placeholder="Enter description"
              cols="30"
              rows="2"
            ></textarea>
          </div>
          <div className="form">
            <button onClick={updateFoodDetails}>Update</button>
          </div>
          <div className="form">
            <h4>
              <NavLink to={"/management"}>Cancel</NavLink>
            </h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default Updatepage;
