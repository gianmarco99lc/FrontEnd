import React, { useEffect, useState } from "react";
import "../App.css";
import { SidebarData } from "./SidebarData";
import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const handleClick = (e, path) => {
    e.preventDefault();
    navigate(path);
  };
  
  return (
    <div className="Sidebar">
      <ul className="SidebarList">
        {SidebarData.map((val, key) => {
          return (
            <li
              key={key}
              className="row"
              id={window.location.pathname == val.link ? "active" : ""}
            >
              <div onClick={(e) => handleClick(e, val.link)}>
                <div id="icon">{val.icon}</div>{" "}
                <div id="title">{val.tittle}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
