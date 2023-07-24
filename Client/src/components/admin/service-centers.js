import React from "react";
import AdminNav from "./AdminNav/AdminNav";
import {
  Container,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function ServiceCenters() {
  return (
    <>
      <AdminNav />
      <Container fixed sx={{ marginTop: "20px" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Center Name</TableCell>
                <TableCell align="right">Contact Number</TableCell>
                <TableCell align="right">Location</TableCell>
                <TableCell align="right">District</TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
