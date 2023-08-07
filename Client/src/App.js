import React from "react";
import { Route, Routes } from "react-router-dom";
import UserRoutes from "./Routes/UserRoutes";
import axios from "axios";
import AdminRoutes from "./Routes/AdminRoutes";
import ServiceCenterRoutes from "./Routes/ServiceCenterRoutes";
import SearchServiceCenter from "./components/user/SearchServiceCenter";
import UserServicePage from "./components/user/UserServicePage";
import UserHome from "./components/user/UserHome";
import ChooseServiceCenter from "./components/user/ChooseServiceCenter";

export default function App() {
  axios.defaults.baseURL = "http://localhost:5000/";
  axios.defaults.withCredentials = true;
  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<UserRoutes />} />
        {/* <Route path="/check1" element={<UserHome />} /> */}
        {/* <Route path="/check2" element={<UserServicePage />} /> */}
        <Route path="/check" element={<ChooseServiceCenter />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/service-center/*" element={<ServiceCenterRoutes />} />
      </Routes>
    </div>
  );
}
