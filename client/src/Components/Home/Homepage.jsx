import React, { useCallback, useEffect, useState } from "react";
import apiURL from "../config";
import "./Homepage.css";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const history = useNavigate();
  const api = apiURL.url;
  const [userData, setUserData] = useState();
  const fetchData = useCallback(async () => {
    try {
      const data = await fetch(`${api}/fetchedDataForManagement`, {
        method: "GET"
      });
      const res = await data.json();

      if (res.status === 201) {
        // console.log("API Response:", res.data[0].email);
        setUserData(res);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  }, [api]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const addToCart = async (addFoodId, index) => {
    const token = await localStorage.getItem("token");
    const data = await fetch(`${api}/addToCart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({ addFoodId })
    });
    const res = await data.json();
    // console.log(res);
    if (res.status === 206) {
      alert("Added to cart successfully");
      history("/shopping");
    } else {
      alert("Please login first!");
    }
  };

  return (
    <>
      <div className="home">
        <div className="homeCon">
          <div className="show">
            {userData
              ? userData.data[0].map((addFood, index) => (
                  <div key={index} className="showData">
                    <img src={addFood.fimg} alt="img" />
                    <h3>{addFood.fname}</h3>
                    <h3>{addFood.fprice}</h3>
                    <p>{addFood.fdec}</p>
                    <div className="additional">
                      <button onClick={() => addToCart(addFood._id, index)}>
                        ADD To Cart
                      </button>
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

export default Homepage;
