import React from "react";
import AdminNav from "./AdminNav";
import { Box, Container, Typography } from "@mui/material";
import AdminUserTable from "../tables/AdminUserTable";
import img from "../../assets/images/No User.jpg";
import axios from "axios";
import AdminWithdrawTable from "../tables/AdminWithdrawTable";

export default function AdminWithdraws() {
  const rowHeads = ["Centername", "Amount", "IFSC", "Acc-NO.", "Branch","Status" ,"Action"];
  const [requests, setRequests] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);
  React.useEffect(() => {
    (async function () {
      let { data } = await axios.get("admin/withdraws");
      if (data.err) {
        toast.error(data.message);
      } else {
        setRequests(data.requests);
      }
    })();
  }, [refresh]);

  

  return (
    <>
      <AdminNav />
      <Container fixed sx={{ marginTop: "20px" }}>
        {requests.length === 0 ? (
          <Box
            width="100%"
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <Box component="img" maxWidth="300px" src={img} />
            <Typography variant="h5">No New Requests</Typography>
          </Box>
        ) : (
          <AdminWithdrawTable
            items={requests}
            rowHeads={rowHeads}
            setRefresh={setRefresh}
          />
        )}
      </Container>
    </>
  );
}
