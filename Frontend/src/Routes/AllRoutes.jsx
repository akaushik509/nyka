import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import RegisterPage from "../Pages/RegisterPage";
import LoginPage from "../Pages/LoginPage";
import { Dashboard } from "../Pages/Dashboard";
import { Analytics } from "../Pages/Analytics";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/register" element={<RegisterPage/>}></Route>
      <Route path="/login" element={<LoginPage/>}></Route>
      <Route path="/dashboard" element={<Dashboard/>}></Route>
      <Route path="/analytics" element={<Analytics/>}></Route>
    </Routes>
  );
}

export default AllRoutes;
