import {
  Box,
  MenuItem,
  Modal,
  useTheme,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Checkbox,
  ListItemText,
} from "@mui/material";
import React from "react";

export default function ChooseCustomPackageModal({
  open,
  onClose,
  custom,
  setCustomPackage,
  handleOpenMsg,
}) {
  const theme = useTheme();
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

  const [allchecked, setAllChecked] = React.useState([]);
  function handleChange(e) {
    if (e.target.checked) {
      setAllChecked([...allchecked, e.target.value]);
    } else {
      setAllChecked(allchecked.filter((item) => item !== e.target.value));
    }
  }

  const handleAdd = () => {
    setCustomPackage(allchecked);
    onClose();
    handleOpenMsg();
  };
  return (
    <>
      <Dialog onClose={onClose} open={open}>
        <DialogTitle>Choose Your Service</DialogTitle>
        <List sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {custom.map((types, i) => (
            <ListItem sx={{ textAlign: "center" }} key={i}>
              <Checkbox value={types} onChange={handleChange} color="success" />
              <ListItemText primary={types} />
            </ListItem>
          ))}
          <Button onClick={handleAdd}>Continue</Button>
        </List>
      </Dialog>
    </>
  );
}
