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
export default function ServiceCenterBookings({ bookings, rowheads, setRefresh }) {
  const [item, setItem] = React.useState([]);
  const [modalActions, setModalActions] = React.useState({
    openDetails: false,
    openAssign: false,
    openInvoice: false,
  });
  const handleOpen = (id) => {
    let clickedItem = bookings.find((value) => value._id === id);
    setItem(clickedItem);
    setModalActions((prev) => ({
      ...prev,
      openDetails: true,
    }));
  };

  const handleClose = () => {
    setModalActions((prev) => ({
      ...prev,
      openDetails: false,
    }));
  };

  const handleOpenAssign = (id) => {
    let clickedItem = bookings.find((value) => value._id === id);
    setItem(clickedItem);
    setModalActions((prev) => ({
      ...prev,
      openAssign: true,
    }));
    setRefresh(prev=>!prev)
  };

  const handleCloseAssign = () =>
    {
      setModalActions((prev) => ({
        ...prev,
        openAssign: false,
      }));
      setRefresh(prev=>!prev)
    }

  const handleOpenInvoice = (item) => {
    setItem(item);
    setModalActions((prev) => ({
      ...prev,
      openInvoice: true,
    }));
    setRefresh(prev=>!prev)
  };

  const handleCloseInvoice = () =>
    {
      setModalActions((prev) => ({
        ...prev,
        openInvoice: false,
      }));
    setRefresh(prev=>!prev)
    }
  return (
    <>
      <Toaster />
      <BookingDetails
        handleClose={handleClose}
        open={modalActions.openDetails}
        item={item}
      />
      <AssignWorkers
        handleClose={handleCloseAssign}
        open={modalActions.openAssign}
        item={item}
      />
      <InvoiceForm
        handleClose={handleCloseInvoice}
        open={modalActions.openInvoice}
        item={item}
      />
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
                    {item.mobile}
                  </StyledTableCell>
                  <StyledTableCell align="center">{item.date}</StyledTableCell>
                  <StyledTableCell align="center">
                    {item.status}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      color="success"
                      onClick={() => handleOpen(item._id)}
                    >
                      Details
                    </Button>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Box style={styles.iconContainer}>
                      {item?.workerId ? (
                        item?.workerId?.name
                      ) : (
                        <Button
                          onClick={() => handleOpenAssign(item._id)}
                          color="info"
                        >
                          Assign
                        </Button>
                      )}
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.status === "Vehicle Picked Up" ? (
                      <Chip
                        label="Update Invoice"
                        variant="outlined"
                        onClick={() => handleOpenInvoice(item)}
                      />
                    ) : "N/A"}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
