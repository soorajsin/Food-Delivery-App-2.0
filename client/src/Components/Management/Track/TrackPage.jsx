import React, { useEffect, useState } from "react";
import apiURL from "../../config";

const TrackPage = () => {
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

  const responseTo = async () => {
    
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
        </div>
      </div>
    </>
  );
};

export default TrackPage;
