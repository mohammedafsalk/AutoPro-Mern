import React from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import UserRoutes from "./Routes/UserRoutes";
import AdminRoutes from "./Routes/AdminRoutes";
import ServiceCenterRoutes from "./Routes/ServiceCenterRoutes";
import WorkerRoutes from "./Routes/WorkerRoutes";


export default function App() {
  axios.defaults.baseURL = "http://localhost:5000/";
  axios.defaults.withCredentials = true;
  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<UserRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/service-center/*" element={<ServiceCenterRoutes />} />
        <Route path="/worker/*" element={<WorkerRoutes />} />
      </Routes>
    </div>
  );
}
