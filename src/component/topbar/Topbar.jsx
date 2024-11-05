import React from 'react';
import './Topbar.css'; 
import { FaRegUser, FaBars } from "react-icons/fa"; // Import FaBars for toggle button

const Topbar = ({ onToggleSidebar }) => {
  return (
    <div className="topbar">
      <div className="topbar__left">
        {/* Sidebar Toggle Button */}
        <button className="toggle-btn" onClick={onToggleSidebar}>
          <FaBars />
        </button>
        <img src="https://www.visiblegain.in/vg-img/vgicon/Untitled%20png.png" alt="Logo" className="logo" />
      </div>
      <div className="topbar__center">
        <h1 className="title">Visible Gain Dashboard</h1>
      </div>
      <div className="topbar__right">
        <button><FaRegUser /></button>
      </div>
    </div>
  );
};

export default Topbar;
