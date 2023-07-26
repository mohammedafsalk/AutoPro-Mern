import React from "react";
import AdminNav from "./AdminNav";
import { Container } from "@mui/material";
import AdminUserTable from "../tables/AdminUserTable";
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
        <AdminUserTable
          users={users}
          rowHeads={rowHeads}
          setRefresh={setRefresh}
        />
      </Container>
    </>
  );
}
