import React from "react";
import LandingPage from "./pages/LandingPage";
import SignUp from "./pages/SignUp";
import DashBoard from "./pages/DashBoard";
import TrashDash from "./pages/TrashDash";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Stepper from "./pages/Stepper";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard/customer" element={<DashBoard/>} />
        <Route path="/dashboard/collector" element={<TrashDash/>} />
        <Route path="/dashboard/schedulepickup" element={<Stepper />} />
      </Routes>
    </Router>
  );
}

export default App;
