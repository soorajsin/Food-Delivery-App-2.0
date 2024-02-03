import React, { useCallback, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import apiURL from "../../../config";

const BuyFoodPage = () => {
  const history = useNavigate();
  const api = apiURL.url;
  const { addToCartId } = useParams();
  console.log(addToCartId);
  const [sendData, setSendData] = useState({
    uname: "",
    umobile: "",
    uaddress: ""
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
        // console.log("update buy", res.data[0]);

        const findupdatefood = await res.data[0].find(
          (addToCart) => addToCart._id.toString() === addToCartId
        );
        // console.log("Fetched user", findupdatefood);
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
  }, [api, addToCartId]);
  useEffect(() => {
    fetchedData();
  }, [fetchedData]);

  const responseFoodDetails = async () => {
    const { uname, umobile, uaddress } = sendData;
    if (!uname || !umobile || !uaddress) {
      alert("Please fill all fields");
    } else {
      console.log("done");
      const token = await localStorage.getItem("token");
      const data = await fetch(`${api}/buyToFood`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify({ sendData, addToCartId })
      });

      const res = await data.json();
      // console.log(res);
      if (res.status === 204) {
        console.log(res);
        history("/shopping");
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
            <h3>Welcome to User Contact</h3>
          </div>

          <div className="form">
            <label htmlFor="dName">User Name</label>
            <br />
            <input
              type="text"
              name="uname"
              value={sendData.uname}
              onChange={changeData}
              placeholder="Enter food url"
            />
          </div>
          <div className="form">
            <label htmlFor="dmobile">User Contact</label>
            <br />
            <input
              type="tele"
              name="umobile"
              value={sendData.umobile}
              onChange={changeData}
              placeholder="Enter food url"
            />
          </div>
          <div className="form">
            <label htmlFor="dduration">User Address</label>
            <br />
            <textarea
              type="text"
              name="uaddress"
              value={sendData.uaddress}
              onChange={changeData}
              placeholder="Enter user address"
              cols={"30"}
              rows={"2"}
            ></textarea>
          </div>
          <div className="form">
            <button onClick={responseFoodDetails}>Submit</button>
          </div>
          <div className="form">
            <h4>
              <NavLink to={"/shopping"}>Cancel</NavLink>
            </h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyFoodPage;
