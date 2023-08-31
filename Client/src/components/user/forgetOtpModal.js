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
  const [timer, setTimer] = React.useState(10);
  const [canResend, setCanResend] = React.useState(false);

  React.useEffect(() => {
    let interval;
    if (showModal) {
      setTimer(10);
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [showModal]);

  React.useEffect(() => {
    if (timer === 0) {
      setCanResend(true);
    } 
  }, [timer]);

  const handleResendOtp = () => {
    setTimer(10);
    setCanResend(false);
  };
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
