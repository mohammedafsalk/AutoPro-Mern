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
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import Backdropspinner from "../Loader/BackdropSpinner";
import loadingReducer from "../../reducers/loadingReducer";

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
export default function WorkersTable({ workers, rowHeads, setRefresh }) {
  const handleAccess = async (type, id) => {
    let { data } = await axios.patch("service-center/workers", { type, id });
    console.log(data);
    if (!data.err && data.blocked) {
      toast.success(data.message);
    } else if (!data.err && !data.blocked) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
    setRefresh((prev) => !prev);
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
            {workers &&
              workers.map((item, i) => (
                <StyledTableRow key={i}>
                  <StyledTableCell component="th" scope="row" align="center">
                    {i + 1}
                  </StyledTableCell>
                  <StyledTableCell align="center">{item.name}</StyledTableCell>
                  <StyledTableCell align="center">
                    {item.mobile}
                  </StyledTableCell>
                  <StyledTableCell align="center">{item.email}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Box style={styles.iconContainer}>
                      {item.active === false ? (
                        <Button
                          onClick={() => handleAccess("unblock", item._id)}
                        >
                          UnBlock
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleAccess("block", item._id)}
                        >
                          Block
                        </Button>
                      )}
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
