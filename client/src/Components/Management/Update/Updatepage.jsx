import React, { useCallback, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import "./Updatepage.css";
import apiURL from "../../config";

const Updatepage = () => {
  const history = useNavigate();
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

  const fetchedData = useCallback(async () => {
    try {
      const data = await fetch(`${api}/fetchedDataForManagement`, {
        method: "GET"
      });

      const res = await data.json();
      if (res.status === 201) {
        // console.log("update", res);

        const findupdatefood = await res.data[0].find(
          (addFood) => addFood._id.toString() === addFoodId
        );
        // console.log(findupdatefood);
        if (findupdatefood) {
          setSendData({
            fname: findupdatefood.fname,
            fprice: findupdatefood.fprice,
            fimg: findupdatefood.fimg,
            fdec: findupdatefood.fdec
          });
        } else {
          console.error("Error fetching data:", res.error);
        }
      } else {
        console.error("Food not found for the given ID");
      }
    } catch (error) {
      console.log(error);
    }
  }, [api, addFoodId]);
  useEffect(() => {
    fetchedData();
  }, [fetchedData]);

  const updateFoodDetails = async () => {
    const { fname, fprice, fimg, fdec } = sendData;
    if (!fname || !fprice || !fimg || !fdec) {
      alert("Please fill all fields");
    } else {
      console.log("done");
      const token = await localStorage.getItem("token");
      const data = await fetch(`${api}/updateFood`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify({ sendData, addFoodId })
      });

      const res = await data.json();
      // console.log(res);
      if (res.status === 205) {
        console.log(res);
        history("/management");
      } else {
        alert("Network check");
      }
    }
  };

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
