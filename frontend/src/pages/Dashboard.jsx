import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Routes, Route } from "react-router-dom";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="dashboard-container">
      <Sidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      <div className={`main-content ${isExpanded ? "expanded" : "collapsed"}`}>
        <h1>Welcome to the Dashboard</h1>
        {/* Your Routes or Page Content here */}
      </div>
    </div>
  );
};

export default Dashboard;
