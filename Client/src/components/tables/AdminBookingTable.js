import React from "react";
import {
  Box,
  Button,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
  tableCellClasses,
} from "@mui/material";
import {
  Block,
  CheckCircleOutline,
  Delete,
  MoreVert,
  ReceiptRounded,
} from "@mui/icons-material";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import Backdropspinner from "../Loader/BackdropSpinner";
import loadingReducer from "../../reducers/loadingReducer";
import BookingDetails from "../../modal/BookingDetailsModal";
import AssignWorkers from "../../modal/WorkerAssignModal";
import InvoiceForm from "../../modal/InvoiceModal";

const styles = {
  imgContainer: {
    display: "flex",
    justifyContent: "center",
  },
  img: {
    maxWidth: "100%",
    maxHeight: "100px",
  },
  iconContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "8px",
  },
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontWeight: 500,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
export default function AdminBookingsTable({ bookings, rowheads, setRefresh }) {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {rowheads &&
                rowheads.map((item, i) => (
                  <StyledTableCell key={i} align="center">
                    {item}
                  </StyledTableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings &&
              bookings.map((item, i) => (
                <StyledTableRow key={item._id}>
                  <StyledTableCell component="th" scope="row" align="center">
                    {i + 1}
                  </StyledTableCell>
                  <StyledTableCell align="center">{item.name}</StyledTableCell>
                  <StyledTableCell align="center">
                    {item.centerId.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">{item.date}</StyledTableCell>
                  <StyledTableCell align="center">
                    {item.amountPaid}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.status}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
