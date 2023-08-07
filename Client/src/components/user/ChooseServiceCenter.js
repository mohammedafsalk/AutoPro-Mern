import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
  MDBInputGroup,
  MDBInput,
  MDBBtn,
} from "mdb-react-ui-kit";
import axios from "axios";
import UserNav from "./UserNav";
import { Link } from "react-router-dom";

export default function ChooseServiceCenter() {
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
      <MDBContainer className="my-5">
        <MDBRow className="justify-content-center">
          <MDBCol md={3}>
            <MDBInputGroup>
              <MDBInput
                size="lg"
                label="Search"
                placeholder="Search by location,name.."
              />
            </MDBInputGroup>
          </MDBCol>
        </MDBRow>
        <MDBRow className="mt-5">
          {data &&
            data.map((item) => (
              <MDBCol md="12" lg="4" className="mb-4 mb-lg-0">
                <Link className="text-dark" to={`/select-package/${item._id}`}>
                  <MDBCard>
                    <MDBCardImage
                      src={item?.logo?.url}
                      className="img-height-200-cover"
                      position="top"
                      alt="Laptop"
                    />
                    <MDBCardBody className=" d-flex flex-column align-items-center justify-content-center">
                      <div className="mb-3">
                        <h5 className="mb-0">{item.name}</h5>{" "}
                      </div>

                      <div class="d-flex flex-column mb-2">
                        <div className="d-flex flex-row">
                          <div className="text-danger mb-1 me-2">
                            <MDBIcon fas color="success" icon="phone-alt" />
                          </div>
                          <span>{item.mobile}</span>
                        </div>
                        <div className="d-flex flex-row">
                          <div className="text-danger mb-1 me-2">
                            <MDBIcon
                              fas
                              color="success"
                              icon="map-marker-alt"
                            />
                          </div>
                          <span>
                            {item.location}.{item.district}
                          </span>
                        </div>
                        <div class="text-warning text-center">
                          <MDBIcon fas icon="star" />
                          <MDBIcon fas icon="star" />
                          <MDBIcon fas icon="star" />
                          <MDBIcon fas icon="star" />
                          <MDBIcon fas icon="star" />
                        </div>
                      </div>
                    </MDBCardBody>
                  </MDBCard>
                </Link>
              </MDBCol>
            ))}
        </MDBRow>
      </MDBContainer>
    </>
  );
}
