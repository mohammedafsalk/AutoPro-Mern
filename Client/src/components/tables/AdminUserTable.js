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
import { Block, Delete } from "@mui/icons-material";
import avatar from "../../assets/images/avatar.png";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

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
                      <img src={avatar} alt="" style={styles.img} />
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
                      <IconButton>
                        <Block color="error" />
                      </IconButton>
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
