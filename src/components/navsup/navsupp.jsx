import React from "react";
import { useNavigate } from "react-router-dom";
import "./navsupp.css";

export default function Navsupp() {
  const navigate = useNavigate();
  const routeChange = () => {
    console.log("ho ra h");
    const path = "/";
    navigate(path);
  };

  return(
  <div className="gpt3__navbar">
    <div className="gpt3__navbar-links">
      <div className="gpt3__navbar-links_container">
        <div className="logo">
          <img src="download.png" width="80" height="60" />
        </div>
      </div>
    </div>
    <div className="gpt3__navbar-sign">
    <button type="button" onClick={()=>{
          routeChange();
        }
      } >logout</button>
    </div>
  </div>);
};
