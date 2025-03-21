import "../styles/Sidebar.css";
import img1 from "../images/falls1.jpg";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div className={`sidebar ${isExpanded ? "expanded" : "collapsed"}`}>
        {isExpanded ? (
          <>
            <h1>WanderBlogger</h1>
            <div className="profile-section">
              <img src={img1} alt="ORG USER" />
              <h3>Wander Human</h3>
              <p>@wanderhuman</p>
              <div className="stats">
                <div>
                  <strong>46</strong>
                  <br />
                  <strong>Posts</strong>
                </div>
                <div>
                  <strong>2.8k</strong>
                  <br />
                  <strong>Followers</strong>
                </div>
                <div>
                  <strong>526</strong>
                  <br />
                  <strong>Following</strong>
                </div>
              </div>
            </div>
            <ul className="nav-links">
              <li><Link to="/feed">Feed</Link></li>
              <li><Link to="/explore">Explore</Link></li>
              <li><Link to="/notifications">Notifications</Link></li>
              <li><Link to="/messages">Messages</Link></li>
              <li><Link to="/direct">Direct</Link></li>
              <li><Link to="/stats">Stats</Link></li>
              <li><Link to="/settings">Settings</Link></li>
            </ul>
            <button className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <div className="profile-section1">
              <img src={img1} alt="ORG USER" />
            </div>
            <ul className="nav-links icons-only">
              <li><Link to="/feed">🏠</Link></li>
              <li><Link to="/explore">🔍</Link></li>
              <li><Link to="/notifications">🔔</Link></li>
              <li><Link to="/messages">✉️</Link></li>
              <li><Link to="/direct">📤</Link></li>
              <li><Link to="/stats">📊</Link></li>
              <li><Link to="/settings">⚙️</Link></li>
            </ul>
            <button className="logout-btn icon-only">🚪</button>
          </>
        )}
      </div>
      <div className="toggle-btn" onClick={toggleSidebar}>
        {isExpanded ? <ChevronLeft size={40} color="black" /> : <ChevronRight size={40} color="black" />}
      </div>
    </>
  );
};

export default Sidebar;