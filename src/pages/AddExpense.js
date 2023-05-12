import React, { useState, useRef } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { Switch, TextField, Typography, Stack, Button, InputAdornment } from "@mui/material";
const dayjs = require("dayjs");


function AddExpense() {
  // variables
    const [date, setDate] = useState(dayjs());
    const [bool, setBool] = useState(true);
    const [errors, setErrors] = useState({price : false, type: false});
    const ref = useRef(null);
    const helperText = "Please enter a valid input";

    //functions
    function validateFields() {
        // use the ref to access form fields except for date which had to be specially set.
        // I'm thinking go by one by one validating fields and if you hit a field that isn't right, toggle the error on the associated input
        // price input is at ref.current[3].value
        // type input is at ref.current[5].value
        // just use bool for the switch value, it too had to be specially set
        // a user can't actually avoid putting a value on the first or last values, it is impossible. Becasue the date starts on the current date and can only be changed to some other date and the toggle is always either true or false
        let isValid = true, price = false, type = false;
        if (ref.current[3].value.length === 0 || isNaN(ref.current[3].value) || ref.current[3].value.split(".")[1]?.length > 2) {
            // trigger error and helper text on price input
            price = true;
            isValid = false;
        } else {
            // remove any error on price input
            price = false;
        }
        if (ref.current[5].value.length === 0) {
            // trigger error on expense type field
            type = true;
            isValid = false;
        } else {
            // remove any errors present
            type = false;
        }
        // if we've made it through all checks, then it is valid and can be submitted
        setErrors({price, type});
        return isValid;
    }

    function handleSubmit(e) {
        e.preventDefault();
        // submit the validated fields to the backend, remember to user withCredentials: true in axios or possibly migrate to fetch instead becasue you can just use the credentials: "include"
        if (validateFields()) {
            console.log(date, bool, ref.current[3].value, ref.current[5].value);
            // submit
            fetch("http://localhost:8888/.netlify/functions/budgetAppAddExpense", {
                method: "POST",
                mode: "cors",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({time: date.$d, price: Number(ref.current[3].value), type: ref.current[5].value, necessary: bool})
            })
        }
        // if it isn't true do nothing, the inputs are not correct.
    }

    // component
    return (
        <div style={{display: "flex", flexDirection:"column", backgroundColor: "grey", height: "425px", width: "350px", margin: "auto", borderRadius: "50px"}}>
            <legend style={{marginTop: "15px"}}>Add Expense</legend>
            <form ref={ref} onSubmit={handleSubmit} style={{display: "flex", margin: "auto", flexDirection: "column", height: "100%", justifyContent: "space-evenly"}}>
                <DatePicker label="When" value={date} onChange={(newVal) => setDate(newVal)}/>
                {/*add input of type number for the price*/}
                <TextField label="Price" variant="outlined" InputLabelProps={{shrink: true}} placeholder="E.g. 52.90" InputProps={{startAdornment: (<InputAdornment position="start">$</InputAdornment>)}} error={errors.price} helperText={errors.price ? helperText : ""} />
                <TextField label="Expense Type" variant="outlined" InputLabelProps={{shrink: true}} placeholder="E.g. Groceries" error={errors.type} helperText={errors.type ? helperText : ""} />
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