import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBCollapse,
  MDBBtn,
} from "mdb-react-ui-kit";

export default function UserNav() {
  const [showNavColorThird, setShowNavColorThird] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await axios.get("http://localhost:5000/user/auth/logout");
    dispatch({ type: "refresh" });
  };

  return (
    <MDBNavbar expand="lg" light style={{ backgroundColor: "#e3f2fd" }}>
      <MDBContainer fluid>
        <MDBNavbarBrand><h3 className="" >AUTOPRO</h3></MDBNavbarBrand>
        <MDBNavbarToggler
          type="button"
          data-target="#navbarColor02"
          aria-controls="navbarColor02"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowNavColorThird(!showNavColorThird)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse show={showNavColorThird} navbar>
          <MDBNavbarNav className="me-auto mb-2 mb-lg-0  d-flex justify-content-end ">
            <MDBNavbarItem>
              <MDBBtn onClick={handleLogout} className="bg-danger">
                Log Out
              </MDBBtn>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
