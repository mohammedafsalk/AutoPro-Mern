import React from "react";
import { AddCircle, Close } from "@mui/icons-material";
import {
  Box,
  MenuItem,
  Modal,
  useTheme,
  Typography,
  TextField,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

export default function EditCustom({
  onCloseCustomEdit,
  openCustomEdit,
  customItems,
  setCustomItems,
  handleDeleteFrmCustom,
  handlesave,
}) {
  const theme = useTheme();
  const inputRef = React.useRef(null);

  const style = {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    borderRadius: 5,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    [theme.breakpoints.up("md")]: {
      width: "500px",
    },
  };

  const handleAdd = () => {
    let newItem = inputRef.current.value;
    setCustomItems((prev) => [newItem, ...prev]);
  };

  return (
    <Modal
      open={openCustomEdit}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <IconButton
          sx={{ position: "absolute", top: "5px", right: "20px" }}
          onClick={() => onCloseCustomEdit()}
        >
          <Close color="error" />
        </IconButton>
        <Typography
          id="modal-modal-title"
          variant="h5"
          sx={{ borderBottom: "1px solid black" }}
          component="span"
          fontWeight={500}
        >
          Custom Package
        </Typography>
        <TextField
          id="standard-basic"
          inputRef={inputRef}
          label="Add Packages"
          variant="standard"
          fullWidth
        />
        <ListItemIcon onClick={handleAdd}>
          <AddCircle color="success" />
        </ListItemIcon>
        <Box
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {customItems &&
            customItems.map((item, i) => (
              <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary={item} />
                    <ListItemIcon onClick={() => handleDeleteFrmCustom(i)}>
                      <Close />
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
              </List>
            ))}
        </Box>
        <Button onClick={handlesave}>Save</Button>
      </Box>
    </Modal>
  );
}
