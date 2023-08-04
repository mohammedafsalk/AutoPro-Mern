import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Backdropspinner from "../Loader/BackdropSpinner";

const style = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  top: "50%",
  left: "50%",
  gap:"10px",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  position: "relative",
  boxShadow: 24,
  p: 4,
};

const MessageModal = ({ openMsg, onCloseMsg }) => {
  return (
    <div>
      <Modal
        open={openMsg}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton
            onClick={()=>onCloseMsg("close")}
            sx={{ position: "absolute", top: "10px", right: "20px" }}
          >
            <Close color="error" />
          </IconButton>
          <Typography gutterBottom variant="h6" sx={{ mt: 2 }}>
            Thank you for choosing our service. Please note that our service may
            take up to 7 days to complete. We assure you that we will keep you
            informed through email once the service is completed. We appreciate
            your patience and understanding.
          </Typography>
          <Box display={"flex"} justifyContent={"center"} >
            <Button onClick={()=>onCloseMsg("proceed")} variant="contained" color="success">
              Agree
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default MessageModal;
