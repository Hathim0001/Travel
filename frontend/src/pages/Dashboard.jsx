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
        {/* Add your routes or page content here */}
        <Routes>
          {/* Example Route */}
          <Route path="/" element={<h2>Home Content</h2>} />
          <Route path="/profile" element={<h2>Profile Content</h2>} />
          {/* Add more routes here */}
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
