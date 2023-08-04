import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { MDBInput } from "mdb-react-ui-kit";

export default function ForgetOtpModal({
  show,
  email,
  otp,
  err,
  setDispatch,
  handleOtp,
}) {

  return (
    <Modal
      show={show}
      centered
      onHide={() => setDispatch({ type: "hideModal" })}
    >
      <Modal.Header closeButton>
        <Modal.Title>Reset Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Enter OTP sent to <b>{email}</b> to reset your password
        </p>
        <MDBInput
          label="OTP"
          id=""
          value={otp}
          onChange={(e) =>
            setDispatch({ type: "otp", payload: e.target.value })
          }
          type="number"
          size="lg"
        />
      </Modal.Body>
      <div className=" text-center ">
        {err && <p className="text-danger ">{err}</p>}
      </div>
      <Modal.Footer>
        {otp && (
          <Button onClick={handleOtp} variant="dark">
            Continue
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
