import { Typography } from '@mui/material';
import React, { useEffect, useState, useRef } from 'react';
import { Box, Modal, TextField, InputAdornment, Stack, Switch, Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
const dayjs = require("dayjs");

function Dashboard() {
    // variables
    const [data, setData] = useState([]);
    const [startDate, setStartDate] = useState(dayjs().set("date", 1));
    const [endDate, setEndDate] = useState(dayjs().set("month", startDate.$M + 1).set("date", 0));
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState();
    const [includeUnecessary, setIncludeUnecessary] = useState(true);
    const [filterOpen, setFilterOpen] = useState(false);
    const [errors, setErrors] = useState({});
    const helperText = "Please enter a valid input";
    const ref = useRef(null);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 325,
        height: 450,
        bgcolor: 'white',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        borderRadius: "25px"
    };

    // functions
    function validateFiltersFields() {
        // validate the filters fields
    }
    function handleSubmit(e) {
        e.preventDefault();
        // submit the fields to then refresh the data according to the filters selected and applied
        if (validateFiltersFields()) {
            // submit
        }
    }

    // on render
    useEffect(() => {
        fetch("http://localhost:8888/.netlify/functions/budgetAppGetExpenses?" + new URLSearchParams({startDate: `${startDate.$y}-${startDate.$M + 1}-${startDate.$D}`, endDate: `${endDate.$y}-${endDate.$M + 1}-${endDate.$D}`}), {
            method: "GET",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((response) => setData(response.data));
    }, []);

    // the returned component
    return (
        <div style={{height: "100%", width: "100%", display: "flex"}}>
            <Typography style={{marginLeft: "auto", marginRight: "auto", fontSize: "20px", textDecoration: "underline"}} onClick={() => setFilterOpen(true)}>Filters and Options</Typography>
            <Modal
                open={filterOpen}
                onClose={() => setFilterOpen(false)}
                aria-labelledby="Filters and Options"
                aria-describedby="The filters and options to be applied to the displayed expenses"
            >
                <Box sx={style}>
                    <form ref={ref} onSubmit={handleSubmit} style={{display: "flex", margin: "auto", flexDirection: "column", height: "100%", justifyContent: "space-evenly"}}>
                        <div style={{display: "flex", flexDirection: "row"}}>
                            <DatePicker label="Start Date" value={startDate} onChange={(newVal) => setStartDate(newVal)} sx={{width: "145px"}}/>
                            <Typography sx={{margin: "auto"}}>to</Typography>
                            <DatePicker label="End Date" value={endDate} onChange={(newVal) => setStartDate(newVal)} sx={{width: "145px"}}/>
                        </div>
                        <TextField label="Min Price" variant="outlined" InputLabelProps={{shrink: true}} placeholder="E.g. 10.00" InputProps={{startAdornment: (<InputAdornment position="start">$</InputAdornment>)}} error={errors.minPrice} helperText={errors.minPrice ? helperText : ""} />
                        <TextField label="Max Price" variant="outlined" InputLabelProps={{shrink: true}} InputProps={{startAdornment: (<InputAdornment position="start">$</InputAdornment>)}} placeholder="E.g. 1000.00" error={errors.maxPrice} helperText={errors.maxPrice ? helperText : ""} />
                        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <Typography style={{width: "fit-content"}}>Include Necessary</Typography>
                            <Stack direction="row" spacing={1} alignItems="center">
                            <Typography style={{opacity: includeUnecessary ? "0.5" : "1", transition: "opacity", transitionDuration: "0.5s"}}>No</Typography>
                                <Switch defaultChecked value={includeUnecessary} onChange={() => setIncludeUnecessary(!includeUnecessary)}/>
                            <Typography style={{opacity: includeUnecessary ? "1" : "0.5", transition: "opacity", transitionDuration: "0.5s"}}>Yes</Typography>
                            </Stack>
                        </div>
                        <Button variant="outlined" type="submit" style={{width: "fit-content", marginLeft: "auto", marginRight: "auto"}}>Add Expense</Button>
                    </form>
                </Box>
            </Modal>
        </div>
    )
}

export default Dashboard