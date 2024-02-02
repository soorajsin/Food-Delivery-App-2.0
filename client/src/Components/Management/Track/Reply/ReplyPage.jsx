import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import apiURL from "../../../config";

const ReplyPage = () => {
  const history = useNavigate();
  const api = apiURL.url;
  const { buyFoodId} = useParams();
  // console.log(responseId);
  const [sendData, setSendData] = useState({
    dname: "",
    dmobile: "",
    dduration: ""
  });

  const changeData = (e) => {
    setSendData({ ...sendData, [e.target.name]: e.target.value });
  };
  console.log(sendData);

  const fetchedData = async () => {
    try {
      const data = await fetch(`${api}/fetchedDataForManagement`, {
        method: "GET"
      });

      const res = await data.json();
      if (res.status === 201) {
        // console.log("update", res);

        const findupdatefood = await res.data[0].buyFood.find(
          (buyFood) => buyFood._id.toString() === buyFoodId
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
  };
  useEffect(() => {
    fetchedData();
  }, []);

  const responseFoodDetails = async () => {
    const { dname, dmobile, dduration } = sendData;
    if (!dname || !dmobile || !dduration) {
      alert("Please fill all fields");
    } else {
      console.log("done");
      const token = await localStorage.getItem("token");
      const data = await fetch(`${api}/responseUserFood`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify({ sendData, buyFoodId })
      });

      const res = await data.json();
      //   console.log(res);
      if (res.status === 208) {
        console.log(res);
        history("/track");
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
            <h1>Welcome to Response</h1>
          </div>

          <div className="form">
            <label htmlFor="dName">Delivery Boy Name</label>
            <br />
            <input
              type="text"
              name="dname"
              value={sendData.dname}
              onChange={changeData}
              placeholder="Enter food url"
            />
          </div>
          <div className="form">
            <label htmlFor="dmobile">Delivery Boy Contact</label>
            <br />
            <input
              type="tele"
              name="dmobile"
              value={sendData.dmobile}
              onChange={changeData}
              placeholder="Enter food url"
            />
          </div>
          <div className="form">
            <label htmlFor="dduration">Delivery Time</label>
            <br />
            <input
              type="time"
              name="dduration"
              value={sendData.dduration}
              onChange={changeData}
              placeholder="Enter food url"
            />
          </div>
          <div className="form">
            <button onClick={responseFoodDetails}>Response</button>
          </div>
          <div className="form">
            <h4>
              <NavLink to={"/track"}>Cancel</NavLink>
            </h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReplyPage;
