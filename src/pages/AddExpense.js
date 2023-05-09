import React, { useState, useRef } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { Switch, TextField, Typography, Stack, Button } from "@mui/material";
const dayjs = require("dayjs");


function AddExpense() {
  // variables
  const [date, setDate] = useState(dayjs());
  const ref = useRef(null);

  //functions
  function validateFields() {
    // use the ref to access form fields except for date which had to be specially set.

  }

  function handleSubmit() {
    // submit the validated fields to the backend, remember to user withCredentials: true in axios or possibly migrate to fetch instead becasue you can just use the credentials: "include"
    if (validateFields()) {
      // submit
    } else {
      // don't submit, throw an error and highlight the necessary fields (possibly create a function to do that or set that functionality within the validation function)
    }
  }

  // component
  return (
    <div style={{display: "flex", flexDirection:"column", backgroundColor: "grey", height: "425px", width: "350px", margin: "auto", borderRadius: "50px"}}>
      <legend style={{marginTop: "15px"}}>Add Expense</legend>
      <form ref={ref} onSubmit={handleSubmit} style={{display: "flex", margin: "auto", flexDirection: "column", height: "100%", justifyContent: "space-evenly"}}>
          <DatePicker value={date} onChange={(newVal) => setDate(newVal)}/>
          <TextField label="Price" variant="outlined" type="number" InputLabelProps={{shrink: true}}/>
          <TextField label="Type" variant="outlined" InputLabelProps={{shrink: true}}/>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography>Unnecessary</Typography>
              <Switch defaultChecked />
            <Typography>Necessary</Typography>
          </Stack>
          <Button variant="outlined" type="submit" style={{width: "fit-content", marginLeft: "auto", marginRight: "auto"}}>Add Expense</Button>
      </form>
    </div>
  )
}

export default AddExpense