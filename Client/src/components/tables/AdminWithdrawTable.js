import React from "react";
import {
  Box,
  Button,
  IconButton,
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
import { Block, CheckCircleOutline, Delete } from "@mui/icons-material";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import Backdropspinner from "../Loader/BackdropSpinner";

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
export default function AdminWithdrawTable({ items, rowHeads, setRefresh }) {
  const [openLoader, setOpenLoader] = React.useState(false);

  const handleAccept = async (id) => {
    setOpenLoader(true);
    let { data } = await axios.post("admin/withdraws", { id });
    if (!data.err) {
      setOpenLoader(false);
      toast.success(data.message);
    } else {
      setOpenLoader(false);
      toast.error(data.message);
    }
  };

  return (
    <>
      <Toaster />
      <Backdropspinner openLoader={openLoader} />
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
            {items &&
              items.map((item, i) => (
                <StyledTableRow key={i}>
                  <StyledTableCell component="th" scope="row" align="center">
                    {item.centerId.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.amount}
                  </StyledTableCell>
                  <StyledTableCell align="center">{item.ifsc}</StyledTableCell>
                  <StyledTableCell align="center">
                    {item.accountNo}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.branch}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.status ? "Paid" : "Not Paid"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Box style={styles.iconContainer}>
                      <Button  disabled={item.status} onClick={() => handleAccept(item._id)}>
                        Accept
                      </Button>
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
