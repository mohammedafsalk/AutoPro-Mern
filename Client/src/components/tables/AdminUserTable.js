import React from "react";
import {
  Box,
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
export default function AdminUserTable({ users, rowHeads, setRefresh }) {
  const [openLoader, setOpenLoader] = React.useState(false);
  const handleAccess = async (type, id) => {
    setOpenLoader(true);
    let { data } = await axios.post("admin/users", { type, id });
    if (!data.err && data.blocked) {
      setRefresh((prev) => !prev);
      setOpenLoader(false);
      toast.success(data.message);
    } else if (!data.err && !data.blocked) {
      setRefresh((prev) => !prev);
      setOpenLoader(false);
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  };

  const handleDelete = async (id) => {
    let { data } = await axios.delete(`admin/users/${id}`);
    if (data.err) {
      toast.error(data.message);
    } else {
      setRefresh((prev) => !prev);
      toast.success(data.message);
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
            {users &&
              users.map((item, i) => (
                <StyledTableRow key={i}>
                  <StyledTableCell component="th" scope="row" align="center">
                    {i + 1}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Box style={styles.imgContainer}>
                      <img src={item.profile} alt="" style={styles.img} />
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell align="center">{item.name}</StyledTableCell>
                  <StyledTableCell align="center">{item.email}</StyledTableCell>
                  <StyledTableCell align="center">{item.phone}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Box style={styles.iconContainer}>
                      <IconButton onClick={() => handleDelete(item._id)}>
                        <Delete color="error" />
                      </IconButton>
                      {item.block ? (
                        <IconButton
                          onClick={() => handleAccess("unblock", item._id)}
                        >
                          <CheckCircleOutline color="success" />
                        </IconButton>
                      ) : (
                        <IconButton
                          onClick={() => handleAccess("block", item._id)}
                        >
                          <Block color="error" />
                        </IconButton>
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
