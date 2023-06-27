import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MDBBtn } from "mdb-react-ui-kit";
import axios from "axios";

export default function Userhome() {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await axios.get("http://localhost:5000/user/auth/logout");
    dispatch({ type: "refresh" });
  };

  const value = useSelector((state) => {
    return state.user.details;
  });
  return (
    <div>
      <h1>Welcome Home {value.name}</h1>
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
