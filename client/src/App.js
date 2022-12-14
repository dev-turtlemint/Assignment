import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Booking from "./pages/Bookings";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
// import OfficeInfo from "./Pages/OfficeInfo";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/homepage" element={<HomePage />}></Route>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/booking" element={<Booking />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/login" exact element={<Login />}></Route>
          <Route path="/register" exact element={<Register />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          {/* <Route path="/officeInfo" element={<OfficeInfo />}></Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
