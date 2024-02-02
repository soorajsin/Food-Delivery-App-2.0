import React, { useEffect, useState } from "react";
import "./ManagementPage.css";
import { useNavigate } from "react-router-dom";
import apiURL from "../config";

const ManagementPage = () => {
  const [userData, setUserData] = useState();
  const api = apiURL.url;
  const histoy = useNavigate();

  const addFoodPage = () => {
    histoy("/addFood");
  };

  const fetchData = async () => {
    try {
      const data = await fetch(`${api}/fetchedDataForManagement`, {
        method: "GET"
      });
      const res = await data.json();

      if (res.status === 201) {
        // console.log("API Response:", res.data[0]);
        setUserData(res.data[0]);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteFood = async (addFoodId, index) => {};

  return (
    <>
      <div className="management">
        <div className="managementCon">
          <div className="add">
            <button onClick={addFoodPage}>ADD NEW PRODUCT</button>
          </div>
          <div className="show">
            {userData
              ? userData.addFood.map((addFood, index) => (
                  <div key={index} className="showData">
                    <img src={addFood.fimg} alt="img" />
                    <h3>{addFood.fname}</h3>
                    <h3>{addFood.fprice}</h3>
                    <p>{addFood.fdec}</p>
                    <div className="manage">
                      <>
                        <div className="handle">
                          <i
                            onClick={() => deleteFood(addFood._id, index)}
                            className="fa-solid fa-trash"
                          ></i>
                        </div>
                        <div className="handle">
                          <i className="fa-solid fa-pen-nib"></i>
                        </div>
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

export default ManagementPage;
