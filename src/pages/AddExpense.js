import React, { useState, useRef } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { Switch, TextField, Typography, Stack, Button } from "@mui/material";
const dayjs = require("dayjs");


function AddExpense() {
  // variables
  const [date, setDate] = useState(dayjs());
  const [bool, setBool] = useState(true);
  const ref = useRef(null);

  //functions
  function validateFields() {
    // use the ref to access form fields except for date which had to be specially set.
    // I'm thinking go by one by one validating fields and if you hit a field that isn't right, toggle the error on the associated input
    console.log(date.$d)
    console.log(ref.current[7].value);
    // price input is at ref.current[3].value
    // type input is at ref.current[5].value

    return false;
  }

  function handleSubmit(e) {
    e.preventDefault();
    // submit the validated fields to the backend, remember to user withCredentials: true in axios or possibly migrate to fetch instead becasue you can just use the credentials: "include"
    if (validateFields()) {
      // submit
    }
    // if it isn't true do nothing, the inputs are not correct.
  }

  // component
  return (
    <div style={{display: "flex", flexDirection:"column", backgroundColor: "grey", height: "425px", width: "350px", margin: "auto", borderRadius: "50px"}}>
      <legend style={{marginTop: "15px"}}>Add Expense</legend>
      <form ref={ref} onSubmit={handleSubmit} style={{display: "flex", margin: "auto", flexDirection: "column", height: "100%", justifyContent: "space-evenly"}}>
          <DatePicker value={date} onChange={(newVal) => setDate(newVal)}/>
          <TextField label="Price" defaultValue={"0"} variant="outlined" type="number" InputLabelProps={{shrink: true}}/>
          <TextField label="Type" variant="outlined" InputLabelProps={{shrink: true}}/>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography style={{opacity: bool ? "0.5" : "1", transition: "opacity", transitionDuration: "0.5s"}}>Unnecessary</Typography>
              <Switch defaultChecked value={bool} onChange={() => setBool(!bool)}/>
            <Typography style={{opacity: bool ? "1" : "0.5", transition: "opacity", transitionDuration: "0.5s"}}>Necessary</Typography>
          </Stack>
          <Button variant="outlined" type="submit" style={{width: "fit-content", marginLeft: "auto", marginRight: "auto"}}>Add Expense</Button>
      </form>
    </div>
  )
}

export default AddExpense