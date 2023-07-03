import React from "react";
import { Modal, Button } from "react-bootstrap";
import { MDBInput } from "mdb-react-ui-kit";

export default function ForgetOtpModal({
  email,
  showModal,
  handleclose,
  otp,
  setOtp,
  handleOtp,
  errMsgOtp,
}) {
  return (
    <Modal show={showModal} onHide={handleclose}>
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
          onChange={(e) => setOtp(e.target.value)}
          type="number"
          size="lg"
        />
      </Modal.Body>
      <div className="ms-4">
        {errMsgOtp && <p className="text-danger ">{errMsgOtp}</p>}
      </div>
      <Modal.Footer>
        {otp && (
          <Button onClick={handleOtp} variant="secondary">
            Continue
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
