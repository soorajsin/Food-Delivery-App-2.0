import React, { useState } from "react";
import "./AddFood.css";
import apiURL from "../../config";
import { NavLink, useNavigate } from "react-router-dom";

const AddFood = () => {
  const history = useNavigate();
  const api = apiURL.url;
  const [sendData, setSendData] = useState([
    {
      fname: "",
      fprice: "",
      fimg: "",
      fdec: ""
    }
  ]);

  const addFoodForm = () => {
    const newForm = {
      fname: "",
      fprice: "",
      fimg: "",
      fdec: ""
    };
    setSendData([...sendData, newForm]);
  };
  console.log(sendData);

  const submitToAdd = async (e) => {
    const emptryField = sendData.some(
      (form) => !form.fname || !form.fprice || !form.fimg || !form.fdec
    );

    if (emptryField) {
      alert("Please fill out all fields");
    } else {
      console.log("add");

      const token = await localStorage.getItem("token");
      const data = await fetch(`${api}/addFood`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify({ sendData })
      });

      const res = await data.json();
      // console.log(res);

      if (res.status === 201) {
        history("/management");
      } else {
        alert("Error");
      }
    }
  };

  return (
    <>
      <div className="register">
        <div className="regContainer">
          <div className="form">
            <h2>Welcome to Add Food</h2>
          </div>
          {sendData.map((subForm, index) => (
            <div key={index}>
              <div className="form">
                <label htmlFor="fname">Food Name</label>
                <br />
                <input
                  type="text"
                  value={subForm.fname}
                  onChange={(e) => {
                    const updateUser = [...sendData];
                    updateUser[index].fname = e.target.value;
                    setSendData(updateUser);
                  }}
                  placeholder="Enter food name"
                />
              </div>
              <div className="form">
                <label htmlFor="fprice">Food Price</label>
                <br />
                <input
                  type="number"
                  value={subForm.fprice}
                  onChange={(e) => {
                    const updateUser = [...sendData];
                    updateUser[index].fprice = e.target.value;
                    setSendData(updateUser);
                  }}
                  placeholder="Enter food price"
                />
              </div>
              <div className="form">
                <label htmlFor="fimg">Food Image</label>
                <br />
                <input
                  type="file"
                  value={subForm.fimg}
                  onChange={(e) => {
                    const updateUser = [...sendData];
                    updateUser[index].fimg = e.target.value;
                    setSendData(updateUser);
                  }}
                />
              </div>
              <div className="form">
                <label htmlFor="fdec">Food Description</label>
                <br />
                <textarea
                  value={subForm.fdec}
                  onChange={(e) => {
                    const updateUser = [...sendData];
                    updateUser[index].fdec = e.target.value;
                    setSendData(updateUser);
                  }}
                  placeholder="Enter description"
                  cols="30"
                  rows="2"
                ></textarea>
              </div>
              <div className="form">
                <div className="line"></div>
              </div>
            </div>
          ))}
          <div className="form">
            <button onClick={addFoodForm}>Add Data</button>
          </div>
          <div className="form">
            <button onClick={submitToAdd}>Submit</button>
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

export default AddFood;
