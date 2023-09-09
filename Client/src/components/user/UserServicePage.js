import React, { useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
  MDBBtn,
  MDBRipple,
  MDBCardFooter,
  MDBTextArea,
} from "mdb-react-ui-kit";
import UserNav from "./UserNav";
import { Rating, Typography } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import BookNowModal from "../../modal/BookNowModal";

export default function UserServicePage() {
  const { id } = useParams();
  const location = useLocation();
  const serviceCenter = location.state.itemData;
  const [center, setCenter] = React.useState({});
  const [reviews, setReviews] = React.useState([]);
  const [openModal, setOpenModal] = useState(false);

  const handleBooking = () => {
    setOpenModal(true);
    console.log(openModal);
  };

  React.useEffect(() => {
    (async function () {
      let { data } = await axios.post("user/service-centers", { id });
      if (data.err) {
        console.log(data.message);
      } else {
        setCenter(data.center);
        setReviews(data.reviews);
      }
    })();
  }, []);

  let brands = center?.brands?.join(", ");
  return (
    <>
      <UserNav></UserNav>
      <MDBContainer fluid className="my-5">
        <MDBRow className="justify-content-center">
          <MDBCol md="6" lg="6" xl="4">
            <MDBCard style={{ borderRadius: "15px" }}>
              <MDBRipple
                rippleColor="light"
                rippleTag="div"
                className="bg-image rounded hover-overlay"
              >
                <MDBCardImage
                  src={center.logo?.url}
                  className="w-100 img-height-400-cover"
                  fluid
                  style={{
                    borderTopLeftRadius: "15px",
                    borderTopRightRadius: "15px",
                  }}
                />
                <a href="#!">
                  <div className="mask"></div>
                </a>
              </MDBRipple>
              <MDBCardBody className="pb-0">
                <div className="d-flex justify-content-between">
                  <div>
                    <p>
                      <a href="#!" className="text-dark">
                        {center?.name}
                      </a>
                    </p>
                    <p className="small text-muted">{center?.location}</p>
                  </div>
                  <div>
                    <div className="d-flex flex-row justify-content-end mt-1 mb-4 text-danger">
                      <Rating
                        name="read-only"
                        size="small"
                        sx={{ color: "#DC4C64" }}
                        value={4}
                      />
                    </div>
                    <a href={center?.mobile} className="small text-muted">
                      {center?.mobile}
                    </a>
                  </div>
                </div>
              </MDBCardBody>
              <hr class="my-0" />
              <MDBCardBody className="">
                <div className="d-flex justify-content-between  ">
                  {center?.brands?.length === 0 ? (
                    <Typography fontWeight={500}>No Brands</Typography>
                  ) : (
                    <Typography fontWeight={500}>{brands}</Typography>
                  )}
                </div>
              </MDBCardBody>
              <hr class="my-0" />
              <MDBCardBody className="pb-0">
                <div className="d-flex justify-content-center align-items-center pb-2 mb-4">
                  <MDBBtn color="dark" onClick={handleBooking}>
                    Book now
                  </MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol md="6" lg="6" xl="4">
            <section className="vh-100">
              <MDBRow className="justify-content-center">
                <MDBCol md="12" lg="12" xl="12">
                  <MDBCard>
                    <MDBCardFooter
                      className="py-3 border-0"
                      style={{ backgroundColor: "#f8f9fa" }}
                    >
                      <div>
                        <h5>Rating And Reviews</h5>
                      </div>
                    </MDBCardFooter>
                    {/* <MDBCardFooter
                      className="py-3 border-0"
                      style={{ backgroundColor: "#f8f9fa" }}
                    >
                      <div className="d-flex flex-start w-100 d-none">
                        <MDBCardImage
                          className="rounded-circle shadow-1-strong me-3"
                          src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp"
                          alt="avatar"
                          width="40"
                          height="40"
                        />
                        <div className="w-100">
                          <Rating
                            name="read-only"
                            sx={{ color: "#DC4C64" }}
                            value={3}
                          />

                          <MDBTextArea
                            label="Message"
                            id="textAreaExample"
                            rows={4}
                            style={{ backgroundColor: "#fff" }}
                            wrapperClass="w-100"
                          />
                        </div>
                      </div>
                      <div className="float-end mt-2 pt-1 d-none">
                        <MDBBtn outline color="dark" size="sm">
                          Cancel
                        </MDBBtn>
                        <MDBBtn size="sm" color="dark" className="ms-1">
                          Post Review
                        </MDBBtn>
                      </div>
                    </MDBCardFooter> */}
                    {reviews[0] ? (
                      reviews.map((item) => (
                        <MDBCardBody className="border-bottom" key={item._id}>
                          <div className="d-flex flex-start align-items-center">
                            <MDBCardImage
                              className="rounded-circle shadow-1-strong me-3"
                              src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp"
                              alt="avatar"
                              width="60"
                              height="60"
                            />
                            <div>
                              <h6 className="fw-bold text-primary mb-1">
                                {item.userId.name}
                              </h6>
                              <p className="text-muted small mb-0">
                                <Rating
                                  readOnly
                                  sx={{ color: "#DC4C64" }}
                                  defaultValue={item.rating}
                                  size="small"
                                />
                              </p>
                            </div>
                          </div>

                          <p className="mt-3 mb-4 pb-2">{item.description}</p>
                        </MDBCardBody>
                      ))
                    ) : (
                      <MDBCol className=" p-2 d-flex justify-content-center">
                        <p>No Reviews</p>
                      </MDBCol>
                    )}
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </section>
          </MDBCol>
        </MDBRow>
        <BookNowModal
          open={openModal}
          id={id}
          setOpen={setOpenModal}
          serviceCenter={serviceCenter}
        ></BookNowModal>
      </MDBContainer>
    </>
  );
}
