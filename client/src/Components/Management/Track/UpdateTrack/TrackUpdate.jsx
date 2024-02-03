import React, { useCallback, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import apiURL from "../../../config";

const TrackUpdate = () => {
  const history = useNavigate();
  const api = apiURL.url;
  const { responseId } = useParams();
  console.log(responseId);
  const [sendData, setSendData] = useState({
    dname: "",
    dmobile: "",
    dduration: ""
  });

  const changeData = (e) => {
    setSendData({ ...sendData, [e.target.name]: e.target.value });
  };
  console.log(sendData);

  const fetchedData = useCallback(async () => {
    try {
      const data = await fetch(`${api}/fetchedDataForManagementTrack`, {
        method: "GET"
      });

      const res = await data.json();
      if (res.status === 201) {
        // console.log("update", res);

        const findupdatefood = await res.data[0].find(
          (response) => response._id.toString() === responseId
        );
        // console.log("findupdatefood", findupdatefood);
        if (findupdatefood) {
          setSendData({
            dname: findupdatefood.dname,
            dmobile: findupdatefood.dmobile,
            dduration: findupdatefood.dduration
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
  }, [api, responseId]);
  useEffect(() => {
    fetchedData();
  }, [fetchedData]);

  const responseFoodDetails = async () => {
    const { dname, dmobile, dduration } = sendData;
    if (!dname || !dmobile || !dduration) {
      alert("Please fill all fields");
    } else {
      console.log("done");
      const token = await localStorage.getItem("token");
      const data = await fetch(`${api}/responseUpdate`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify({ sendData, responseId })
      });

      const res = await data.json();
      //   console.log(res);
      if (res.status === 210) {
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
            <h3>Welcome to Response Update</h3>
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
            <button onClick={responseFoodDetails}>Response Update</button>
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

export default TrackUpdate;
