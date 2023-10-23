import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Backdropspinner from "./components/Loader/BackdropSpinner";

const LazyUserRoutes = lazy(() => import("./Routes/UserRoutes"));
const LazyServiceCenterRoutes = lazy(() =>
  import("./Routes/ServiceCenterRoutes")
);
const LazyWorkerRoutes = lazy(() => import("./Routes/WorkerRoutes"));
const LazyAdminRoutes = lazy(() => import("./Routes/AdminRoutes.js"));


export default function App() {
  axios.defaults.baseURL = "http://localhost:5000/";
  // axios.defaults.baseURL = "https://autopro.afsal.online/";
  axios.defaults.withCredentials = true;
  return (
    <div className="App">
      <Suspense fallback={<Backdropspinner openLoader={true} />}>
        <Routes>
          <Route path="/*" element={<LazyUserRoutes />} />
          <Route path="/admin/*" element={<LazyAdminRoutes />} />
          <Route
            path="/service-center/*"
            element={<LazyServiceCenterRoutes />}
          />
          <Route path="/worker/*" element={<LazyWorkerRoutes />} />
        </Routes>
      </Suspense>
    </div>
  );
}
