import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import Login from "../components/admin/Login";
import AdminNav from "../components/admin/AdminNav/AdminNav";
import AdminReq from "../components/admin/AdminReq/AdminReq";
import ServiceCenters from "../components/admin/service-centers";

export default function AdminRoutes() {
  const { admin, refresh } = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    (async function () {
      let { data: adminData } = await axios.get(
        "http://localhost:5000/admin/auth/checkLogin"
      );
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
          <Route path="/" element={<AdminNav />} />
          <Route path="/requests" element={<AdminReq />} />
          <Route path="/service-centers" element={<ServiceCenters />} />
          <Route path="/login" element={<Navigate to="/admin/" />} />
        </>
      )}
      {!admin.login && (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/admin/login" />} />
          <Route path="/requests" element={<Navigate to="/admin/login" />} />
          <Route
            path="/service-centers"
            element={<Navigate to="/admin/login" />}
          />
        </>
      )}
    </Routes>
  );
}
