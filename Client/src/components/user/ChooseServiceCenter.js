import React from "react";
import UserNav from "./UserNav";
import {
  Typography,
  Container,
  Box,
  Grid,
  Paper,
  useMediaQuery,
  InputBase,
  Stack,
  Pagination,
} from "@mui/material";
import { alpha, styled, useTheme } from "@mui/material/styles";
import { LocationSearching, SearchIcon as icons } from "@mui/icons-material";
import { grey } from "@mui/material/colors";
import { Call, FmdGood } from "@mui/icons-material";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  border: "1px solid black",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function ChooseServiceCenter() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [data, setData] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [count, setCount] = React.useState(0);
  const [search, setSearch] = React.useState("");

  const filteredData = data.filter((item) => {
    const locationMatches = item.location
      .toLowerCase()
      .includes(search.toLowerCase());
    const districtMatches = item.district
      .toLowerCase()
      .includes(search.toLowerCase());
    return locationMatches || districtMatches;
  });

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  React.useEffect(() => {
    (async function () {
      let { data } = await axios.get(`user/service-centers?page=${page - 1}`);
      if (data.err) {
        toast.error(data.message);
      } else {
        setData(data.center);
        setCount(data.totalPage);
      }
    })();
  }, [page, search]);

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
          minHeight: "100dvh",
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
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Search>
            <SearchIconWrapper>
              <LocationSearching />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              value={search}
              onChange={handleSearchChange}
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Box>
        <Grid container spacing={4}>
          {data &&
            filteredData.map((item, i) => (
              <Grid
                key={i}
                item
                xs={12}
                md={4}
                sx={{
                  minWidth: "200px",
                  maxWidth: "100%",
                  maxHeight: "500px",
                  height: "100%",
                }}
              >
                <Paper sx={{ width: "100%" }} elevation={5}>
                  <Link to={`/select-package/${item._id}`}>
                    <img
                      src={item.logo.url}
                      width="100%"
                      height="300px"
                      alt=""
                    />
                  </Link>
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
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Stack spacing={2}>
            <Pagination
              count={count}
              page={page}
              onChange={(e, val) => setPage(val)}
            />
          </Stack>
        </Box>
      </Container>
    </>
  );
}
