import React from "react";
import "./ManagementPage.css";
import { useNavigate } from "react-router-dom";

const ManagementPage = () => {
  const histoy = useNavigate();
  const addFood = () => {
    histoy("/addFood");
  };

  const fetchData=async()=>{
    
  }
  return (
    <>
      <div className="management">
        <div className="managementCon">
          <div className="add">
            <button onClick={addFood}>ADD NEW PRODUCT</button>
          </div>
          <div className="show">
          </div>
        </div>
      </div>
    </>
  );
};

export default ManagementPage;
