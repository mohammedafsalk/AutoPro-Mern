import React from "react";
import {
  Box,
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
import { Block, Delete} from "@mui/icons-material";

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
export default function TableComponent({ centers, rowHeads }) {
  return (
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
          {centers &&
            centers.map((item, i) => (
              <StyledTableRow key={i}>
                <StyledTableCell component="th" scope="row" align="center">
                  {i + 1}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Box style={styles.imgContainer}>
                    <img src={item.logo.url} alt="" style={styles.img} />
                  </Box>
                </StyledTableCell>
                <StyledTableCell align="center">{item.name}</StyledTableCell>
                <StyledTableCell align="center">{item.mobile}</StyledTableCell>
                <StyledTableCell align="center">
                  {item.location}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.district}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Box style={styles.iconContainer}>
                    <Delete color="error" />
                    <Block color="error" />
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
