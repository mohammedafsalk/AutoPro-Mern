import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import Login from "../components/admin/Login";
import AdminReq from "../components/admin/AdminReq";
import ServiceCenters from "../components/admin/AdminServiceCenters.js";
import AdminDashBoard from "../components/admin/AdminDashBoard";
import AdminUsers from "../components/admin/AdminUsers";
import AdminBookings from "../components/admin/AdminBookings";
import NotFoundPage from "../components/pageNotFound/PageNotFound";
import AdminWithdraws from "../components/admin/AdminWithdraws";

export default function AdminRoutes() {
  const { admin, refresh } = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    (async function () {
      let { data: adminData } = await axios.get("/admin/auth/checkLogin");
      dispatch({
        type: "admin",
        payload: { login: adminData.loggedIn },
      });
    })();
  }, [refresh]);
  return (
    <Routes>
      {admin.login && (
        <>
          <Route path="/" element={<AdminDashBoard />} />
          <Route path="/requests" element={<AdminReq />} />
          <Route path="/service-centers" element={<ServiceCenters />} />
          <Route path="/users" element={<AdminUsers />} />
          <Route path="/bookings" element={<AdminBookings />} />
          <Route path="/withdraws" element={<AdminWithdraws />} />
          <Route path="/login" element={<Navigate to="/admin/" />} />
        </>
      )}
      {admin.login === false && (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/admin/login" />} />
          <Route path="/users" element={<Navigate to="/admin/login" />} />
          <Route path="/requests" element={<Navigate to="/admin/login" />} />
          <Route path="/bookings" element={<Navigate to="/admin/login" />} />
          <Route path="/withdraws" element={<Navigate to="/admin/login" />} />
          <Route
            path="/service-centers"
            element={<Navigate to="/admin/login" />}
          />
        </>
      )}
      {/* {admin.login !== null && <Route path="/*" element={<NotFoundPage />} />} */}
    </Routes>
  );
}
