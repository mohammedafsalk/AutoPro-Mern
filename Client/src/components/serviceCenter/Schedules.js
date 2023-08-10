import React, {useEffect} from "react";
import NavBar from "./Navbar";
import { Box, Button, Container, Switch, Typography } from "@mui/material";
import axios from "axios";

const style = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  gap: 4,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#f5f5f5",
  boxShadow: 1,
  p: 4,
};

export default function Schedules() {
  const [schedule, setSchedule] = React.useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });

  useEffect(() => {
    (async function(){
        const {data} = await axios.get("/service-center/schedule");
        console.log(data)
        if(data.err){
            console.loog("error")
        }else if(data.schedule){
            let {monday, tuesday, wednesday, thursday, friday, saturday, sunday}= data.schedule;
            setSchedule({monday, tuesday, wednesday, thursday, friday, saturday, sunday})
        }
    })()
  }, []);

  const handleSwitch = (e, item) => {
    setSchedule({ ...schedule, [item]: e.target.checked });
  };
  const handleSave = async () => {
    let { data } = await axios.post("service-center/schedule", { schedule });
  };
  console.log(schedule);
  return (
    <>
      <NavBar />
      <Container fixed sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={style}>
          <Box textAlign={"center"}>
            <Typography variant="h5" fontWeight={500}>
              Adjust Your Schedule
            </Typography>
          </Box>
          {Object.keys(schedule).map((item, index) => (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" fontWeight={300}>
                {" "}
                {item}
              </Typography>
              <Switch onChange={(e) => handleSwitch(e, item)} checked={schedule[item]} name="monday" />
            </Box>
          ))}

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button onClick={handleSave} variant="contained">
              Save
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
