import React from "react";
import UserNav from "./UserNav";
import {
  Typography,
  Container,
  Box,
  Grid,
  Paper,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { Call, FmdGood } from "@mui/icons-material";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

export default function ChooseServiceCenter() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    (async function () {
      let { data } = await axios.get("user/chooseServiceCenter");
      if (data.err) {
        toast.error(data.message);
      } else {
        setData(data.center);
      }
    })();
  }, []);

  return (
    <>
      <UserNav />
      <Toaster />
      <Container
        sx={{
          marginTop: "50px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Box display="flex" justifyContent="center">
          <Typography
            variant={isSmallScreen ? "h5" : "h4"}
            fontWeight={500}
            component="span"
            sx={{
              borderBottom: "1px solid black",
              paddingBottom: "5px",
            }}
          >
            Choose Your Service Center
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {data &&
            data.map((item, i) => (
              <Grid
                item
                xs={12}
                md={4}
                sx={{ minWidth: "200px", maxWidth: "100%" }}
              >
                <Paper sx={{ width: "100%", padding: "5px" }} elevation={5}>
                  <img src={item.logo.url} width="100%" alt="" />
                  <Box
                    textAlign="center"
                    padding={3}
                    display="flex"
                    alignItems="center"
                    gap={2}
                    flexDirection="column"
                  >
                    <Typography variant="h4" fontWeight={500} color={grey[800]}>
                      {item.name}
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1}>
                      <FmdGood color="error" />
                      <Typography
                        variant="body1"
                        fontWeight={300}
                        color={grey[800]}
                      >
                        {item.location}, {item.district}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Call />
                      <Typography
                        variant="body1"
                        fontWeight={300}
                        color={grey[800]}
                      >
                        +91{item.mobile}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            ))}
        </Grid>
      </Container>
    </>
  );
}
