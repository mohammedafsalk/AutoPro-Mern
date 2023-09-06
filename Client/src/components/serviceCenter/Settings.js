import React from "react";
import NavBar from "./Navbar";
import { Container, Tab, Tabs } from "@mui/material";
import { Toaster } from "react-hot-toast";
import Categories from "./Categories";
import Brands from "./Brands";
import { Apps, Category } from "@mui/icons-material";
import { useSelector } from "react-redux";

export default function Settings() {
  const serviceCenter = useSelector((state) => state.serviceCenter.details);
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <NavBar />
      <Toaster/>
      <Container
        sx={{
          mt: 5,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Tabs
          variant="standard"
          value={value}
          onChange={handleChange}
          aria-label="icon label tabs example"
          sx={{ mb: 5 }}
        >
          <Tab icon={<Category />} label="CATEGORIES" />
          <Tab icon={<Apps />} label="BRANDS" />
        </Tabs>
        {value === 0 && <Categories details={serviceCenter}  />}
        {value === 1 && <Brands />}
      </Container>
    </>
  );
}
