import React from "react";
import AdminNav from "./AdminNav";
import { Box, Container, Typography } from "@mui/material";
import AdminUserTable from "../tables/AdminUserTable";
import img from "../../assets/images/No User.jpg";
import axios from "axios";

export default function AdminUsers() {
  const rowHeads = ["No", "Image", "Name", "E-mail", "Contact", "Action"];
  const [users, setUsers] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);
  React.useEffect(() => {
    (async function () {
      let { data } = await axios.get("admin/users");
      if (data.err) {
        toast.error(data.message);
      } else {
        setUsers(data.users);
      }
    })();
  }, [refresh]);

  return (
    <>
      <AdminNav />
      <Container fixed sx={{ marginTop: "20px" }}>
        {users.length === 0 ? (
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
            <Typography variant="h5">No Users Found!</Typography>
          </Box>
        ) : (
          <AdminUserTable
            users={users}
            rowHeads={rowHeads}
            setRefresh={setRefresh}
          />
        )}
      </Container>
    </>
  );
}
