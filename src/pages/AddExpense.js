import React, { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { Switch, TextField, Typography, Stack, Button } from "@mui/material";
const dayjs = require("dayjs");


function AddExpense() {
  const [date, setDate] = useState(dayjs());

  return (
    <div style={{display: "flex", flexDirection:"column", backgroundColor: "grey", height: "425px", width: "350px", margin: "auto", borderRadius: "50px"}}>
      <legend style={{marginTop: "15px"}}>Add Expense</legend>
      <form style={{display: "flex", margin: "auto", flexDirection: "column", height: "100%", justifyContent: "space-evenly"}}>
          <DatePicker value={date} onChange={(newVal) => setDate(newVal)}/>
          <TextField label="Price" variant="outlined" type="number" InputLabelProps={{shrink: true}}/>
          <TextField label="Type" variant="outlined" InputLabelProps={{shrink: true}}/>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography>Unnecessary</Typography>
              <Switch defaultChecked />
            <Typography>Necessary</Typography>
          </Stack>
          <Button variant="outlined" style={{width: "fit-content", marginLeft: "auto", marginRight: "auto"}}>Add Expense</Button>
      </form>
    </div>
  )
}

export default AddExpense