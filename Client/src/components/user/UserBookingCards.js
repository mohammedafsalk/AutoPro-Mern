import React, {useState} from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBTypography,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Button } from "@mui/material";
import ViewInvoice from "../../modal/ViewInvoice";

export default function AttendingUsers({ bookings,setRefresh }) {
  const [basicModal, setBasicModal] = useState(false);
  const [data, setData] = useState([])
  const openInvoice=(item)=>{
    setData(prev=>item)
    setBasicModal(true)
  }
  return (
    <>
      {bookings.map((item) => (
        <MDBContainer className="py-5 h-100">
          <MDBRow className=" align-items-center h-100">
            <MDBCol sm="3" md="4">
              <MDBCard className="mb-5" style={{ borderRadius: "15px" }}>
                <MDBCardBody className="p-4">
                  <MDBTypography tag="h3">{item.vehicleName}</MDBTypography>
                  <MDBCardText className="small">
                    <strong>Booked On</strong> {item.date}
                  </MDBCardText>
                  <MDBCardText className="small">
                    <strong>Status</strong> {item.status}
                  </MDBCardText>
                  <hr className="my-4" />
                  <div className="d-flex justify-content-start gap-1 align-items-center">
                    {item?.invoice[0] ? (
                        <Button color="primary" onClick={()=>openInvoice(item)} variant="contained">
                      View Bill
                      </Button>
                      )
                      :
                      <Button color="error" variant="contained">
                      Cancel
                      </Button>
                    }
                    </div>
                    </MDBCardBody>
                    </MDBCard>
            </MDBCol>
            </MDBRow>
            </MDBContainer>
            ))}
            <ViewInvoice data={data} setRefresh={setRefresh} setBasicModal={setBasicModal} basicModal={basicModal}/>

    </>
  );
}
