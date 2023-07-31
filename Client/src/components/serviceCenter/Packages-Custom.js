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
import React from "react";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default function CustomPackages({
  openCustom,
  onCloseCustom,
  centerId,
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

  const [items, setItems] = React.useState([]);

  const handleAdd = () => {
    if (inputRef.current.value === "") {
      return toast.error("Please Enter Proper Values");
    }
    const item = {
      id: uuidv4(),
      value: inputRef.current.value,
    };
    setItems((prev) => [item, ...prev]);
    inputRef.current.value = "";
  };

  const handleDelete = (id) => {
    let filtered = items.filter((value) => value.id !== id);
    setItems(filtered);
  };

  const handleSave = async () => {
    let valuesFrmArray = items.map((item) => item.value);
    let { data } = await axios.post("service-center/custom-package", {
      details: valuesFrmArray,
      id: centerId,
    });
    if (data.err) {
      toast.error(data.message);
    } else {
      onCloseCustom(data.message);
    }
  };

  return (
    <>
      <Toaster />
      <Modal
        open={openCustom}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton
            sx={{ position: "absolute", top: "5px", right: "20px" }}
            onClick={() => onCloseCustom("closed")}
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
            {items &&
              items.map((types) => (
                <List key={types.id}>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText primary={types.value} />
                      <ListItemIcon onClick={() => handleDelete(types.id)}>
                        <Close />
                      </ListItemIcon>
                    </ListItemButton>
                  </ListItem>
                </List>
              ))}
          </Box>
          {items.length > 0 && <Button onClick={handleSave}>Save</Button>}
        </Box>
      </Modal>
    </>
  );
}
