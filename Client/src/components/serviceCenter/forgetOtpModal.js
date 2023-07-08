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
  const [displayError, setDisplayError] = useState(false);

  if (otp) {
    setDisplayError(true);
    const timeoutId = setTimeout(() => {
      setDisplayError(false);
    }, 5000);
  }

  const handleContinue = () => {
    if (otp) {
      handleOtp();
    } else {
      setDisplayError(true);
    }
  };
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
        {displayError && <p className="text-danger ">{err}</p>}
      </div>
      <Modal.Footer>
        {otp && (
          <Button onClick={handleContinue} variant="dark">
            Continue
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
