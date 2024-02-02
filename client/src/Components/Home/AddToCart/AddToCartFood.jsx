import React, { useEffect, useState } from "react";
import apiURL from "../../config";
import "./AddToCartFood.css";

const AddToCartFood = () => {
  const api = apiURL.url;
  const [userData, setUserData] = useState();
  console.log("add to cart", userData);
  const navAuth = async () => {
    const token = await localStorage.getItem("token");
    // console.log(token);

    const data = await fetch(`${api}/validator`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    });

    const res = await data.json();
    // console.log(res);

    if (res.status === 201) {
      console.log(res);
      setUserData(res);
    } else {
      window.location.replace("/login");
    }
  };

  useEffect(() => {
    navAuth();
  }, []);

  const buyToFood = async (addToCartId, index) => {
    const token = await localStorage.getItem("token");
    const data = await fetch(`${api}/buyToFood`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({ addToCartId })
    });
    const res = await data.json();
    // console.log(res);
    if (res.status === 207) {
      console.log(res);
    } else {
      alert("Check internet");
    }
  };

  return (
    <>
      <div className="home">
        <div className="homeCon">
          <div className="show">
            {userData
              ? userData.data.addToCart.map((addToCart, index) => (
                  <div key={index} className="showData">
                    <img src={addToCart.fimg} alt="img" />
                    <h3>{addToCart.fname}</h3>
                    <h3>{addToCart.fprice}</h3>
                    <p>{addToCart.fdec}</p>
                    <div className="additional">
                      <button onClick={() => buyToFood(addToCart._id, index)}>
                        Buy
                      </button>
                    </div>
                  </div>
                ))
              : ""}
          </div>
          <div className="buy">
            <h1>Welcome to Buy Food</h1>
          </div>
          <div className="show">
            {userData
              ? userData.data.buyFood.map((buyFood, index) => (
                  <div key={index} className="showData">
                    <img src={buyFood.fimg} alt="img" />
                    <h3>{buyFood.fname}</h3>
                    <h3>{buyFood.fprice}</h3>
                    <p>{buyFood.fdec}</p>
                  </div>
                ))
              : ""}
          </div>
          <div className="buy">
            <h1>Delivery boy and time</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddToCartFood;
