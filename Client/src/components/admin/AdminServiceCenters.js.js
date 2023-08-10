import React from "react";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import AdminNav from "./AdminNav";

import axios from "axios";
import AdminServiceCenter_TableComponent from "../tables/AdminServiceCenterTable";

export default function ServiceCenters() {
  let rowHeads = [
    "No",
    "Image",
    "Center Name",
    "Contact No",
    "Location",
    "District",
    "Action",
  ];
  const [centers, setCenters] = React.useState([]);
  React.useEffect(() => {
    (async function () {
      let { data } = await axios.get("admin/service-centers");
      if (data.err) {
        toast.error(data.message);
      } else {
        setCenters(data.centers);
      }
    })();
  }, []);

  return (
    <>
      <AdminNav />
      <Container fixed sx={{ marginTop: "20px" }}>
        <AdminServiceCenter_TableComponent
          centers={centers}
          rowHeads={rowHeads}
        />
      </Container>
    </>
  );
}
