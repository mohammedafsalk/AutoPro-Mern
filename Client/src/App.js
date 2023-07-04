import React from "react";
import { Route, Routes } from "react-router-dom";
import UserRoutes from "./Routes/UserRoutes";
import axios from "axios";
import AdminRoutes from "./Routes/AdminRoutes";

export default function App() {
  axios.defaults.baseURL = "http://localhost:5000/";
  axios.defaults.withCredentials = true;
  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<UserRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </div>
  );
}
