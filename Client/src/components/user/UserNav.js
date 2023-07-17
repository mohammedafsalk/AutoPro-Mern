import React, { useState } from "react";
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBCollapse,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBBtn,
  MDBCol,
} from "mdb-react-ui-kit";
import { useDispatch } from "react-redux";
import axios from "axios";
import userimage from "../../assets/images/avatar.png";

export default function UserNav() {
  const [showNavColorThird, setShowNavColorThird] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();

  const handleImageClick = () => {
    setShowMenu(!showMenu);
  };

  const handleMouseLeave = () => {
    if (!showMenu) {
      setShowMenu(false);
    }
  };
  const handleMouseEnter = () => {
    setShowMenu(true);
  };

  const handleLogout = async () => {
    await axios.get("http://localhost:5000/user/auth/logout");
    dispatch({ type: "refresh" });
  };

  return (
    <MDBNavbar expand="lg" light style={{ backgroundColor: "#e3f2fd" }}>
      <MDBContainer fluid>
        <MDBNavbarBrand>
          <h3 className="">AUTOPRO</h3>
        </MDBNavbarBrand>
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
          <MDBNavbarNav className="me-auto mb-2 mb-lg-0 d-flex justify-content-end">
            <MDBNavbarItem>
              <MDBCol
                className="d-flex align-items-center gap-3"
                onMouseLeave={handleMouseLeave}
                onMouseEnter={handleMouseEnter}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    marginRight: "10px",
                  }}
                >
                  <img
                    src={userimage}
                    onClick={handleImageClick}
                    alt="User"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                {showMenu && (
                  <div
                    className="position-fixed  bg-light shadow "
                    style={{
                      top: "12%",
                      right: "0",
                      transform: "translateY(-50%)",
                      zIndex: "999",
                      borderRadius: "5px",
                    }}
                  >
                    <ul className="list-unstyled mb-0">
                      <li className="mb-1 p-2">
                        <MDBBtn>Profile</MDBBtn>
                      </li>
                      <li className=" p-2">
                        <MDBBtn onClick={handleLogout}>LogOut</MDBBtn>
                      </li>
                    </ul>
                  </div>
                )}
              </MDBCol>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
