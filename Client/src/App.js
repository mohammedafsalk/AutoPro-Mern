import React from "react";
import { Route, Routes } from "react-router-dom";
import UserRoutes from "./Routes/UserRoutes";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<UserRoutes />} />
      </Routes>
    </div>
  );
}
