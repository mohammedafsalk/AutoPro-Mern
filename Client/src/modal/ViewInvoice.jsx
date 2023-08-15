import React, { useState, useEffect } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import axios from 'axios'
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ViewInvoice({ basicModal, setBasicModal, data, setRefresh }) {
  const [totalPrice, setTotalPrice] = useState(0)
  const navigate = useNavigate()
  const toggleShow = () => setBasicModal(!basicModal);
  console.log(data)
  useEffect(() => {
    let total=0
    if(data?.invoice){
        data?.invoice.forEach((item)=>total+=Number(item.price))
        setTotalPrice(total)
    }
  }, [data]);
  const handleBooking = async () => {
    const { data } = await axios.post("/user/payment", { amount: totalPrice });
    if (!data.err) {
      handleRazorPay(data.order);
    }
  };
  
  const handleRazorPay = (order) => {
    const options = {
      key: "rzp_test_0ksLH8MhxszVRr",
      amount: order.amount,
      currency: order.currency,
      name: "Auto Pro",
      description: "Test Transaction",
      order_id: order.id,
      handler: async (response) => {
        const { data:orderData } = await axios.post("/user/payment/bill/verify", {
          response,
          bookingId:data._id
        });
        if (orderData.err) {
          toast.error(data.message);
        } else {
          toast.success("Payment SuccessFull");
        }
        setBasicModal(false)
        setRefresh(prev=>!prev)
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
    rzp1.on("payment.failed", (response) => {
      toast.error("Payment Failed");
    });
  };


  return (
    <>
    <Toaster/>
      <MDBBtn onClick={toggleShow}>LAUNCH DEMO MODAL</MDBBtn>
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Invoice</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBTable>
                <MDBTableHead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Service</th>
                    <th scope="col">Price</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {data?.invoice && data?.invoice.map((item, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{index+1}</th>
                        <td>{item.details}</td>
                        <td>{item.price}</td>
                      </tr>
                      );
                    })}
                    <tr>
                      <th scope="row">#</th>
                      <td><b>Total</b></td>
                      <td><b>{totalPrice}</b></td>
                    </tr>
                </MDBTableBody>
              </MDBTable>
              <MDBBtn className="w-100" color="secondary" onClick={toggleShow}>
                Download Invoice
              </MDBBtn>
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={toggleShow}>
                Close
              </MDBBtn>
              {
                !data?.billPayment &&
                <MDBBtn onClick={handleBooking}>Pay Now</MDBBtn>
              }
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
