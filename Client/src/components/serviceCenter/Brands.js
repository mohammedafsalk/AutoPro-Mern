import { Box, Button, Chip, Typography } from "@mui/material";
import React from "react";
import CategoryModal from "../../modal/CategoryModal";
import BrandsModal from "../../modal/BrandsModal";

export default function Brands({ details }) {
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
          Manage Brands
        </Button>
        {details.brands.length === 0 ? (
          <Typography fontWeight={500}>No Brands Added!</Typography>
        ) : (
          details.brands.map((item) => <Chip key={item} label={item} />)
        )}
      </Box>
      <BrandsModal handleClose={handleClose} open={open} details={details} />
    </>
  );
}
