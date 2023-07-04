import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MDBBtn } from "mdb-react-ui-kit";
import axios from "axios";

export default function AdminHome() {
  const dispatch = useDispatch();
  const value = useSelector((state)=>{
    return state.admin
  })
  console.log(value);
  const handleLogout = async () => {
    await axios.get("http://localhost:5000/admin/auth/logout");
    dispatch({ type: "refresh" });
  };
  return (
    <div>
      <h1>Welcome Home</h1>
      <MDBBtn
        onClick={handleLogout}
        className="mb-4 w-100 bg-dark mt-5 "
        size="lg"
      >
        Log Out
      </MDBBtn>
    </div>
  );
}
