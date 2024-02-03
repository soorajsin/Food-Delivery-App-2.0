import React, { useCallback, useEffect, useState } from "react";
import "./ManagementPage.css";
import { useNavigate } from "react-router-dom";
import apiURL from "../config";

const ManagementPage = () => {
  const [userData, setUserData] = useState();
  // console.log("checked", userData);
  const api = apiURL.url;
  const histoy = useNavigate();

  const addFoodPage = () => {
    histoy("/addFood");
  };

  const fetchData = useCallback(async () => {
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
  }, [api]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);


  const deleteFood = async (addFoodId, index) => {
    const token = await localStorage.getItem("token");
    const data = await fetch(`${api}/deleteFood`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({ addFoodId })
    });

    const res = await data.json();
    // console.log(res);

    if (res.status === 204) {
      console.log(res);
      fetchData();
    } else {
      alert("Failed to Delete Food");
    }
  };

  const updateFood = async (addFoodId, index) => {
    histoy(`/updateFood/${addFoodId}`);
  };

  return (
    <>
      <div className="management">
        <div className="managementCon">
          <div className="add">
            <button onClick={addFoodPage}>ADD NEW PRODUCT</button>
          </div>
          <div className="show">
            {userData
              ? userData.data[0].map((addFood, index) => (
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
                          <i
                            onClick={() => updateFood(addFood._id, index)}
                            className="fa-solid fa-pen-nib"
                          ></i>
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
