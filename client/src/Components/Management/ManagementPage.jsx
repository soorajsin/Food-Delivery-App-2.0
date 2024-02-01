import React, { useEffect, useState } from "react";
import "./ManagementPage.css";
import { useNavigate } from "react-router-dom";
import apiURL from "../config";

const ManagementPage = () => {
  const [userData, setUserData] = useState();
  const api = apiURL.url;
  const histoy = useNavigate();

  const addFood = () => {
    histoy("/addFood");
  };

  const fetchData = async () => {
    try {
      const data = await fetch(`${api}/fetchedDataForManagement`, {
        method: "GET"
      });
      const res = await data.json();

      if (res.status === 201) {
        console.log("API Response:", res);
        setUserData(res);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log("userData:", userData);
  }, [userData]);

  return (
    <>
      <div className="management">
        <div className="managementCon">
          <div className="add">
            <button onClick={addFood}>ADD NEW PRODUCT</button>
          </div>
          <div className="show">
            {userData ? <p>Email: {userData.data.email}</p> : ""}
          </div>
        </div>
      </div>
    </>
  );
};

export default ManagementPage;
