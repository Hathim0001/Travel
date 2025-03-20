import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './pages/Dashboard'
import Login from "./pages/Login";  
import Signup from "./pages/Signup"; 
import Feed from "./pages/Feed";
import Explore from "./pages/Explore";
import Notifications from "./pages/Notifications";
import Messages from "./pages/Messages";
import Direct from "./pages/Direct";
import Stats from "./pages/Stats";
import Settings from "./pages/Settings";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home/*" element={<HomePage />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/direct" element={<Direct />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}
