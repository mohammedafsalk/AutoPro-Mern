import React from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { FormControl, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

export default function CustomDatePicker({
  datesAvailable,
  formData,
  setFormData,
}) {
  const formattedDates = datesAvailable.map((date) =>
    dayjs(date).format("YYYY-MM-DD")
  );
  const handleFormData = (selectedDate) => {
    let sDate = dayjs(selectedDate).format("DD-MM-YYYY");
    setFormData((prev) => ({ ...prev, date: sDate }));
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        slots={{ textField: TextField }}
        slotProps={{
          textField: {fullWidth: "true", size: "small", variant: "outlined", },
        }}
        value={formData.date}
        onChange={(date) => handleFormData(date)}
        shouldDisableDate={(date) => {
          const dateString = date.format("YYYY-MM-DD");
          return !formattedDates.includes(dateString);
        }}
      />
    </LocalizationProvider>
  );
}
