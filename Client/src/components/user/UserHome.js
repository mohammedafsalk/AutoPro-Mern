import React from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBCol,
  MDBRipple,
  MDBRow,
} from "mdb-react-ui-kit";
import UserNav from "./UserNav";
import { useNavigate } from "react-router-dom";
import pickupImg from "../../assets/images/pickup.jpg";
import deliveryImg from "../../assets/images/delivery.png";
import orderImg from "../../assets/images/order.png";

export default function UserHome() {
  const navigate = useNavigate();
  const handleBookNow = () => {
    navigate("/serviceCenter");
  };
  return (
    <>
      <UserNav></UserNav>
      <MDBContainer>
        <header
          className="mt-5"
          style={{ paddingLeft: 0, borderRadius: "10px", overflow: "hidden" }}
        >
          <div
            className="p-5 text-center bg-image"
            style={{
              borderRadius: "10px",
              overflow: "hidden",
              backgroundImage:
                "url('https://img.freepik.com/premium-vector/auto-repair-service-car-workshop-panorama-men-garage-mechanics-team-technical-inspection-digital-diagnostics-automobile-change-wheels-vector-horizontal-banner-maintenance-vehicle-concept_176411-3644.jpg?w=2000')",
              height: 400,
            }}
          >
            <div
              className="mask"
              style={{
                boxShadow: "inset 58px -20px 300px 33px rgba(0,0,0,0.9)",
                backdropFilter: "blur(2px)", 
                backgroundColor: "rgba(0, 0, 0, 0.1)", 
              }}
            >
              <div className="d-flex justify-content-start align-items-center h-100">
                <div className="text-white d-flex ps-3 ps-md-5 flex-column align-items-start">
                  <h1 className="mb-3" style={{ fontWeight: "900" }}>
                    Auto Pro
                  </h1>
                  <b style={{ maxWidth: "350px" }} className="mb-3 text-start">
                    Effortless Vehicle Care: Schedule Your Pickup Today at Our
                    Service Center!
                  </b>
                  <MDBBtn color="light" onClick={handleBookNow}>
                    Book Now
                  </MDBBtn>
                </div>
              </div>
            </div>
          </div>
        </header>
      </MDBContainer>
      <MDBContainer className="py-5">
        <MDBRow className="gx-5 pb-4 mb-5">
          <MDBCol md="6" className="mb-4">
            <MDBRipple
              className="bg-image hover-overlay d-flex justify-content-center ripple rounded-5"
              rippleTag="div"
              rippleColor="light"
            >
              <img
                src="https://img.freepik.com/free-vector/auto-service-illustration_1284-20618.jpg"
                className="w-100"
                style={{ maxHeight: "380px", objectFit: "contain" }}
              />
              <a href="#!">
                <div
                  className="mask"
                  style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                ></div>
              </a>
            </MDBRipple>
          </MDBCol>
          <MDBCol
            md="6"
            className="mb-4 d-flex flex-column gap-4 justify-content-center"
          >
            <h4>
              <strong>Explore Our Exceptional Service Offerings</strong>
            </h4>
            <p className="text-muted">
              We offer exceptional service that is focused on customer
              satisfaction.We are committed to resolving customer issues quickly
              and efficiently. We strive to provide a positive and memorable
              customer experience.
            </p>
            <div>
              <MDBBtn color="dark" onClick={handleBookNow}>
                Explore
              </MDBBtn>
            </div>
          </MDBCol>
        </MDBRow>
        <MDBRow className="gx-5 pb-4 mb-5">
          <MDBCol
            md="6"
            className="mb-4 d-flex flex-column gap-4 justify-content-center"
          >
            <h4>
              <strong>Convenient Pickup & Drop Services for Your Ease</strong>
            </h4>
            <p className="text-muted">
              We offer convenient pickup and drop services for your ease. Our
              team will pick up your packages from your home or office and
              deliver them to your desired location.
            </p>
            <div>
              <MDBBtn color="dark" onClick={handleBookNow}>
                Explore
              </MDBBtn>
            </div>
          </MDBCol>
          <MDBCol md="6" className="mb-4">
            <MDBRipple
              className="bg-image hover-overlay d-flex justify-content-center ripple rounded-5 border-0"
              rippleTag="div"
              rippleColor="light"
            >
              <img
                src="https://img.freepik.com/free-vector/loading-workman-carrying-boxes_74855-14096.jpg"
                className="w-100"
                style={{ maxHeight: "380px", objectFit: "contain" }}
              />
              <a href="#!">
                <div
                  className="mask"
                  style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                ></div>
              </a>
            </MDBRipple>
          </MDBCol>
        </MDBRow>
        <MDBRow className="gx-lg-5">
          <MDBCol lg="4" md="6" className="mb-4 mb-lg-0">
            <div>
              <MDBRipple
                className="bg-image hover-overlay shadow-1-strong ripple rounded-5 mb-4"
                rippleTag="div"
                rippleColor="light"
              >
                <img src={orderImg} className="img-fluid img-height-250" />
                <a href="#!">
                  <div
                    className="mask"
                    style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                  ></div>
                </a>
              </MDBRipple>
              <MDBRow className="mb-3 d-flex flex-column justify-content-center align-items-center">
                <MDBCol col="6">
                  <h5 className="text-info d-flex justify-content-center align-items-center flex-column">
                    Order Process
                  </h5>
                </MDBCol>
                <MDBCol col="6" className="text-end"></MDBCol>
              </MDBRow>
              <a href="#!" className="text-dark text-center">
                <p>
                  Select your vehicle that needs to be repaired. Get best
                  Pricing.
                </p>
              </a>
            </div>
          </MDBCol>
          <MDBCol lg="4" md="6" className="mb-4 mb-lg-0">
            <div>
              <MDBRipple
                className="bg-image hover-overlay shadow-1-strong ripple rounded-5 mb-4"
                rippleTag="div"
                rippleColor="light"
              >
                <img src={pickupImg} className="img-fluid img-height-250" />
                <a href="#!">
                  <div
                    className="mask"
                    style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                  ></div>
                </a>
              </MDBRipple>
              <MDBRow className="mb-3  d-flex flex-column justify-content-center align-items-center">
                <MDBCol col="6">
                  <h5 className="text-danger d-flex justify-content-center align-items-center flex-column">
                    Schedule Service
                  </h5>
                </MDBCol>
                <MDBCol col="6" className="text-end"></MDBCol>
              </MDBRow>
              <a href="#!" className="text-dark text-center">
                <p>
                  Book a free technician visit at your home or work at a time
                  slot that best suits your convenience.
                </p>
              </a>
            </div>
          </MDBCol>
          <MDBCol lg="4" md="12" className="mb-4 mb-lg-0">
            <div>
              <MDBRipple
                className="bg-image hover-overlay shadow-1-strong ripple rounded-5 mb-4"
                rippleTag="div"
                rippleColor="light"
              >
                <img src={deliveryImg} className="img-fluid img-height-250" />
                <a href="#!">
                  <div
                    className="mask"
                    style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                  ></div>
                </a>
              </MDBRipple>
              <MDBRow className="mb-3  d-flex flex-column justify-content-center align-items-center">
                <MDBCol col="6">
                  <h5 className="text-warning  d-flex justify-content-center align-items-center flex-column">
                    Get Vehicle repaired
                  </h5>
                </MDBCol>
                <MDBCol col="6" className="text-end"></MDBCol>
              </MDBRow>
              <a href="#!" className="text-dark text-center">
                <p>
                  Our super-skilled technician will be there and make it as good
                  as new.
                </p>
              </a>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}
