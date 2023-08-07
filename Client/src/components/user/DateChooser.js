import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import { Toaster, toast } from "react-hot-toast";

export default function BasicDateCalendar() {
  const [selectedDate, setSelectedDate] = React.useState(null);

  const handleDateChange = (date) => {
    let formatted = dayjs(date.$d).format("YYYY-MM-DD");
    setSelectedDate(formatted);
    let item = slot.find((value) => value.date === formatted);
    if (item?.availableSlots <= 0) {
      toast.error("No Slots Available, Choose Another Date", {
        duration: 1000,
        enter: "fade",
        exit: "slide",
      });
    } else {
      toast.success("Date Available", {
        duration: 1000,
        enter: "fade",
        exit: "slide",
      });
    }
  };

  return (
    <>
      <Toaster />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          disablePast
          selected={selectedDate}
          onChange={handleDateChange}
        />
      </LocalizationProvider>
    </>
  );
}
