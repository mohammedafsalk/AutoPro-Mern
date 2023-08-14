import React from "react";
import {
  Box,
  Button,
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import { Block, CheckCircleOutline, Delete } from "@mui/icons-material";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import dayjs from "dayjs";
import Backdropspinner from "../Loader/BackdropSpinner";
import loadingReducer from "../../reducers/loadingReducer";
import WorkerBookingDetails from "../../modal/BookingDetailsWorker";

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
export default function BookingList({ bookings, rowHeads }) {
  let currDate = new Date();
  let formattedDate = dayjs(currDate).format("DD-MM-YYYY");

  const [open, setOpen] = React.useState(false);
  const [item, setItem] = React.useState([]);
  const handleOpen = (id) => {
    let singleItem = bookings.find((value) => value._id === id);
    setItem(singleItem);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Toaster />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {rowHeads &&
                rowHeads.map((item, i) => (
                  <StyledTableCell key={i} align="center">
                    {item}
                  </StyledTableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings &&
              bookings.map((item, i) => (
                <StyledTableRow key={i}>
                  <StyledTableCell component="th" scope="row" align="center">
                    {i + 1}
                  </StyledTableCell>
                  <StyledTableCell align="center">{item.date}</StyledTableCell>
                  <StyledTableCell align="center">{item.place}</StyledTableCell>
                  {item.date === formattedDate &&
                  item.status === "Waiting For Pickup" ? (
                    <StyledTableCell align="center">
                      <Chip label="Pickup Scheduled Today" color="error" />
                    </StyledTableCell>
                  ) : (
                    <StyledTableCell align="center">
                      <Chip label={item.status} color="success" />
                    </StyledTableCell>
                  )}
                  <StyledTableCell align="center">
                    <Box style={styles.iconContainer}>
                      <Button onClick={() => handleOpen(item._id)}>
                        Details
                      </Button>
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <WorkerBookingDetails open={open} handleClose={handleClose} item={item} />
    </>
  );
}
