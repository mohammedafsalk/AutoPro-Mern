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
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'

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
  const downloadPdf = () => {
    console.log("hai")
    const body = data?.invoice.map(((item, index) => [index+1,item.details, item.price]))
    body.push(["#", "Total", totalPrice])
    const doc = new jsPDF();
    doc.setFontSize(13);
    doc.text("Invoice Details", 13, 10);
    doc.setFontSize(10);
    doc.text("Customer Name : "+data.name, 13, 20);
    doc.text("Vehicle No : "+data.vehicleNumber, 13, 25);
    doc.text("Vehicle Name : "+data.brand, 13, 30);
    doc.text("Vehicle Brand : "+data.vehicleName, 13, 35);
    doc.text("Date : "+data.date, 13, 40);

    autoTable(doc, {
        head: [["#", "Service", "Price"]],
        body: body,
        startY: 50

    })

    doc.save("invoice.pdf");
}


  return (
    <>
    <Toaster/>
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
              <MDBBtn onClick={()=>downloadPdf()} className="w-100" color="secondary">
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
