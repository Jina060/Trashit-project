import React from "react";
import LandingPage from "./pages/LandingPage";
import SignUp from "./pages/SignUp";
import DashBoard from "./pages/DashBoard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/dashboard/customer" element={<DashBoard/>} />
      </Routes>
    </Router>
  );
}

export default App;
