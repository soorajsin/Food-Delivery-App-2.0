import React, { useEffect, useState } from "react";
import apiURL from "../../config";
import { useNavigate } from "react-router-dom";
import "./TrackPage.css";

const TrackPage = () => {
  const history = useNavigate();
  const api = apiURL.url;
  const [userData, setUserData] = useState();
  const fetchData = async () => {
    try {
      const data = await fetch(`${api}/fetchedDataForManagement`, {
        method: "GET"
      });
      const res = await data.json();

      if (res.status === 201) {
        // console.log("API Response:", res.data[0].email);
        setUserData(res.data[0]);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const responseTo = async (buyFoodId, index) => {
    history(`/reply/${buyFoodId}`);
  };

  const deleteResponsed = async (responseId, index) => {
    const token = await localStorage.getItem("token");
    const data = await fetch(`${api}/deleteResponsed`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({ responseId })
    });
    const res = await data.json();
    // console.log(res);
    if (res.status === 209) {
      console.log(res);
      fetchData();
    } else {
      alert("Network check failed!");
    }
  };

  const updateResponsed = async (responseId, index) => {
    history(`/replyUpdate/${responseId}`);
  };

  return (
    <>
      <div className="home">
        <div className="homeCon">
          <div className="show">
            {userData
              ? userData.buyFood.map((buyFood, index) => (
                  <div key={index} className="showData">
                    <img src={buyFood.fimg} alt="img" />
                    <h3>{buyFood.fname}</h3>
                    <h3>{buyFood.fprice}</h3>
                    <p>{buyFood.fdec}</p>
                    <div className="additional">
                      <button onClick={() => responseTo(buyFood._id, index)}>
                        Response
                      </button>
                    </div>
                  </div>
                ))
              : ""}
          </div>
          <div className="buy">
            <h1>Welcome to Responed</h1>
          </div>
          <div className="show">
            {userData
              ? userData.response.map((response, index) => (
                  <div key={index} className="showData">
                    <img src={response.fimg} alt="img" />
                    <h3>{response.fname}</h3>
                    <h3>{response.fprice}</h3>
                    <p>{response.fdec}</p>
                    <p>{response.dname}</p>
                    <p>{response.dmobile}</p>
                    <p>{response.dduration}</p>
                    <div className="additional">
                      <>
                        <i
                          onClick={() => deleteResponsed(response._id, index)}
                          className="fa-solid fa-trash"
                        ></i>
                        <i
                          onClick={() => updateResponsed(response._id, index)}
                          className="fa-solid fa-pen-nib"
                        ></i>
                      </>
                    </div>
                  </div>
                ))
              : ""}
          </div>
        </div>
      </div>
    </>
  );
};

export default TrackPage;
