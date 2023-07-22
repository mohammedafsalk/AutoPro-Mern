import React from "react";
import UserNav from "./UserNav";
import Service1 from "../../assets/images/Car Service1.jpeg";
import Service2 from "../../assets/images/car service2.png";
import Service3 from "../../assets/images/car service3.jpeg";
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
import { Call, FmdGood, Map } from "@mui/icons-material";

export default function ChooseServiceCenter() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <UserNav />
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
          <Grid
            item
            xs={12}
            md={4}
            sx={{ minWidth: "200px", maxWidth: "100%" }}
          >
            <Paper sx={{ width: "100%", padding: "5px" }} elevation={5}>
              <img src={Service1} width="100%" alt="" />
              <Box
                textAlign="center"
                padding={3}
                display="flex"
                alignItems="center"
                gap={2}
                flexDirection="column"
              >
                <Typography variant="h4" fontWeight={500} color={grey[800]}>
                  Center Name
                </Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <FmdGood color="error" />
                  <Typography
                    variant="body1"
                    fontWeight={300}
                    color={grey[800]}
                  >
                    Place, District
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <Call />
                  <Typography
                    variant="body1"
                    fontWeight={300}
                    color={grey[800]}
                  >
                    +98767655434
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            sx={{ minWidth: "200px", maxWidth: "100%" }}
          >
            <Paper sx={{ width: "100%", padding: "5px" }} elevation={5}>
              <img src={Service1} width="100%" alt="" />
              <Box
                textAlign="center"
                padding={3}
                display="flex"
                alignItems="center"
                gap={2}
                flexDirection="column"
              >
                <Typography variant="h4" fontWeight={500} color={grey[800]}>
                  Center Name
                </Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <FmdGood color="error" />
                  <Typography
                    variant="body1"
                    fontWeight={300}
                    color={grey[800]}
                  >
                    Place, District
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <Call />
                  <Typography
                    variant="body1"
                    fontWeight={300}
                    color={grey[800]}
                  >
                    +98767655434
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            sx={{ minWidth: "200px", maxWidth: "100%" }}
          >
            <Paper sx={{ width: "100%", padding: "5px" }} elevation={5}>
              <img src={Service1} width="100%" alt="" />
              <Box
                textAlign="center"
                padding={3}
                display="flex"
                alignItems="center"
                gap={2}
                flexDirection="column"
              >
                <Typography variant="h4" fontWeight={500} color={grey[800]}>
                  Center Name
                </Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <FmdGood color="error" />
                  <Typography
                    variant="body1"
                    fontWeight={300}
                    color={grey[800]}
                  >
                    Place, District
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <Call />
                  <Typography
                    variant="body1"
                    fontWeight={300}
                    color={grey[800]}
                  >
                    +98767655434
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            sx={{ minWidth: "200px", maxWidth: "100%" }}
          >
            <Paper sx={{ width: "100%", padding: "5px" }} elevation={5}>
              <img src={Service1} width="100%" alt="" />
              <Box
                textAlign="center"
                padding={3}
                display="flex"
                alignItems="center"
                gap={2}
                flexDirection="column"
              >
                <Typography variant="h4" fontWeight={500} color={grey[800]}>
                  Center Name
                </Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <FmdGood color="error" />
                  <Typography
                    variant="body1"
                    fontWeight={300}
                    color={grey[800]}
                  >
                    Place, District
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <Call />
                  <Typography
                    variant="body1"
                    fontWeight={300}
                    color={grey[800]}
                  >
                    +98767655434
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            sx={{ minWidth: "200px", maxWidth: "100%" }}
          >
            <Paper sx={{ width: "100%", padding: "5px" }} elevation={5}>
              <img src={Service1} width="100%" alt="" />
              <Box
                textAlign="center"
                padding={3}
                display="flex"
                alignItems="center"
                gap={2}
                flexDirection="column"
              >
                <Typography variant="h4" fontWeight={500} color={grey[800]}>
                  Center Name
                </Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <FmdGood color="error" />
                  <Typography
                    variant="body1"
                    fontWeight={300}
                    color={grey[800]}
                  >
                    Place, District
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <Call />
                  <Typography
                    variant="body1"
                    fontWeight={300}
                    color={grey[800]}
                  >
                    +98767655434
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            sx={{ minWidth: "200px", maxWidth: "100%" }}
          >
            <Paper sx={{ width: "100%", padding: "5px" }} elevation={5}>
              <img src={Service1} width="100%" alt="" />
              <Box
                textAlign="center"
                padding={3}
                display="flex"
                alignItems="center"
                gap={2}
                flexDirection="column"
              >
                <Typography variant="h4" fontWeight={500} color={grey[800]}>
                  Center Name
                </Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <FmdGood color="error" />
                  <Typography
                    variant="body1"
                    fontWeight={300}
                    color={grey[800]}
                  >
                    Place, District
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <Call />
                  <Typography
                    variant="body1"
                    fontWeight={300}
                    color={grey[800]}
                  >
                    +98767655434
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            sx={{ minWidth: "200px", maxWidth: "100%" }}
          >
            <Paper sx={{ width: "100%", padding: "5px" }} elevation={5}>
              <img src={Service1} width="100%" alt="" />
              <Box
                textAlign="center"
                padding={3}
                display="flex"
                alignItems="center"
                gap={2}
                flexDirection="column"
              >
                <Typography variant="h4" fontWeight={500} color={grey[800]}>
                  Center Name
                </Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <FmdGood color="error" />
                  <Typography
                    variant="body1"
                    fontWeight={300}
                    color={grey[800]}
                  >
                    Place, District
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <Call />
                  <Typography
                    variant="body1"
                    fontWeight={300}
                    color={grey[800]}
                  >
                    +98767655434
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
