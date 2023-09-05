import { Box, Button, Typography } from "@mui/material";
import React from "react";
import CategoryModal from "../../modal/CategoryModal";

export default function Categories({ details }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Box
        sx={{ minWidth: 300, minHeight: 300 }}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        gap={2}
      >
        <Button variant="outlined" onClick={handleOpen}>
          Manage Categories
        </Button>
        {details.categories.length === 0 ? (
          <Typography fontWeight={500}>No Categories Added! </Typography>
        ) : (
          <Typography>Categories Added</Typography>
        )}
      </Box>
      <CategoryModal handleClose={handleClose} open={open} />
    </>
  );
}
