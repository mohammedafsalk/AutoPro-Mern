import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
  MDBRipple,
  MDBBtn,
  MDBInputGroup,
  MDBInput,
} from "mdb-react-ui-kit";
import UserNav from "./UserNav";
import axios from "axios";
import { Pagination, Stack } from "@mui/material";

export default function SearchServiceCenter() {
  const [data, setData] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [count, setCount] = React.useState(0);
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    (async function () {
      let { data } = await axios.get(`user/service-centers?page=${page - 1}`);
      if (data.err) {
        toast.error(data.message);
      } else {
        setData(data.center);
        setCount(data.totalPage);
      }
    })();
  }, [page, search]);
  return (
    <>
      <UserNav></UserNav>
      <MDBContainer>
        <MDBRow className="d-flex justify-content-center mt-3">
          <MDBCol md={3}>
            <MDBInputGroup>
              <MDBInput label="Search" />
              <MDBBtn rippleColor="dark">
                <MDBIcon icon="search" />
              </MDBBtn>
            </MDBInputGroup>
          </MDBCol>
        </MDBRow>
        {data &&
          data.map((item) => (
            <MDBRow className="justify-content-center mb-0">
              <MDBCol md="8">
                <MDBCard className="shadow-0 border rounded-3 mt-5 mb-3">
                  <MDBCardBody>
                    <MDBRow>
                      <MDBCol md="12" lg="3" className="mb-4 mb-lg-0">
                        <MDBRipple
                          rippleColor="light"
                          rippleTag="div"
                          className="bg-image rounded hover-zoom hover-overlay"
                        >
                          <MDBCardImage
                            src={item.logo?.url}
                            fluid
                            className="w-100"
                          />
                          <a href="#!">
                            <div
                              className="mask"
                              style={{
                                backgroundColor: "rgba(251, 251, 251, 0.15)",
                              }}
                            ></div>
                          </a>
                        </MDBRipple>
                      </MDBCol>
                      <MDBCol
                        md="6"
                        className="d-flex flex-column align-items-start justify-content-center"
                      >
                        <h5>{item.name}</h5>
                        <div className="d-flex flex-row">
                          <div className="text-danger mb-1 me-2">
                            <MDBIcon fas icon="star" />
                            <MDBIcon fas icon="star" />
                            <MDBIcon fas icon="star" />
                            <MDBIcon fas icon="star" />
                          </div>
                          <span>310</span>
                        </div>
                        <div className="d-flex flex-row">
                          <div className="text-danger mb-1 me-2">
                            <MDBIcon fas icon="phone-alt" />
                          </div>
                          <span>{item.mobile}</span>
                        </div>
                        <div className="d-flex flex-row">
                          <div className="text-danger mb-1 me-2">
                            <MDBIcon fas icon="map-marker-alt" />
                          </div>
                          <span>{item.location}</span>
                        </div>
                      </MDBCol>
                      <MDBCol
                        md="6"
                        lg="3"
                        className="border-sm-start-none border-start  d-flex align-items-center justify-content-center"
                      >
                        <div className="d-flex flex-column mt-4">
                          <MDBBtn color="dark" size="sm">
                            Details
                          </MDBBtn>
                        </div>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          ))}
        <MDBRow className="justify-content-center">
          <MDBCol sm={2} >
            <Stack spacing={2}>
              <Pagination
               color="secondary"
                count={count}
                page={page}
                onChange={(e, val) => setPage(val)}
              />
            </Stack>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}
