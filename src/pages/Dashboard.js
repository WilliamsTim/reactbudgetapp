import React, { useEffect, useState } from 'react';
import { Box, Modal, TextField, InputAdornment, Stack, Switch, Button, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import "./dashboard.css";
const dayjs = require("dayjs");

function Dashboard() {
    // variables
    const [data, setData] = useState([]);
    const [chartExpenses, setChartExpenses] = useState([
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 }
    ]);
    const [necessaryExpenses, setNecessaryExpenses] = useState([
        { name: 'Necessary', value: 400 },
        { name: 'Unncessary', value: 300 }
    ]);
    const [startDate, setStartDate] = useState(dayjs().set("date", 1));
    const [endDate, setEndDate] = useState(dayjs().set("month", startDate.$M + 1).set("date", 0));
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [includeUnnecessary, setincludeUnnecessary] = useState(true);
    const [filterOpen, setFilterOpen] = useState(false);
    const [errors, setErrors] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState({});
    const helperText = "Please enter a valid input";
    const [noEdit, setNoEdit] = useState(true);
    const COLORS = ['#8884d8', '#00C49F', '#0088FE', '#ff6961'];

    // functions
    function validateFiltersFields() {
        // validate the filters fields
        return true;
    }
    function changeData(e) {
        e?.preventDefault();
        // submit the fields to then refresh the data according to the filters selected and applied
        if (validateFiltersFields()) {
            // submit
            console.log("fetching data");
            fetch("http://localhost:8888/.netlify/functions/budgetAppGetExpenses?" + new URLSearchParams({startDate: `${startDate.$y}-${startDate.$M + 1}-${startDate.$D}`, endDate: `${endDate.$y}-${endDate.$M + 1}-${endDate.$D}`, minPrice, maxPrice, includeUnnecessary}), {
                method: "GET",
                mode: "cors",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            // once the backend is all set up change this to change the data state to the response data
            .then((response) => response.status === 200 ? response.json() : null)
            .then((data) => data != null ? setData(data) : null)
            .catch((err) => console.log(err));
        }
    }

    // set the modal data state and trigger the expense modal
    function handleExpenseClick(expense) {
        setModalData(expense);
        setModalOpen(true);
    }

    // handle the apply button click on the expense modal
    function handleExpenseEdit() {
        // here will be the code for sending the edited expense to the backend
        // We can access the necessary data on the modalData state
    }

    function handleDelete() {
        // here will be the code for sending the expense info to the backend
        // We can access the necessary data on the modalData state
    }

    // this function will set the chart values and will be called whenether they need to be changed.
    // this will avoid having to call the backend everytime we change the data, instead we can mirror the changes that are happening on the backend on the frontend as well and simply change the data on the front end to match
    function setChartValues() {
        // take our data and go through it altering it how we need to and setting the chart values based upon that data.
    }

    // on render
    useEffect(() => {
        changeData();
    }, []);

    // the returned component
    return (
        <div style={{height: "100%", width: "100%", display: "flex", flexDirection:"column", paddingLeft: "10px", paddingRight: "10px"}}>
            <Typography style={{marginLeft: "auto", marginRight: "auto", fontSize: "20px", textDecoration: "underline", zIndex: 10}} onClick={() => setFilterOpen(true)}>Filters and Options</Typography>
            <div style={{display: "flex", flexDirection: "row", marginTop: "10px", height: "100%"}}>
                <div className="neumorphism" style={{display: "flex", flexDirection: "column", height: "95%", width: "100%", marginRight: "10px", paddingTop: "10px", overflow: "auto", paddingLeft: "15px", paddingRight: "15px"}}>
                    {/* expense container here */}
                    {data.map((expense) => <div onClick={() => handleExpenseClick(expense)} key={`key-${expense.id}`}style={{display: "flex", flexDirection: "row", justifyContent: "space-evenly", marginTop: "3px", marginBottom: "3px"}}><div style={{width: "33%", display: "flex"}}><Typography sx={{width: "fit-content", margin: "auto"}}>{expense.type}</Typography></div><div style={{width: "33%", display: "flex"}}><Typography sx={{height: "fit-content", margin: "auto"}}>{expense.price}</Typography></div><div style={{width: "33%", display: "flex"}}><Typography sx={{width: "fit-content", margin: "auto"}}>{expense.time}</Typography></div></div>)}
                </div>
                <div className='neumorphism' style={{display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: "10px", height: "95%"}}>
                    {/* pie charts go in here */}
                    <div>
                    <Typography>Top Expenses</Typography>
                    <PieChart width={300} height={225}>
                        <Pie
                            dataKey="value"
                            isAnimationActive={true}
                            data={chartExpenses}
                            outerRadius={80}
                            label
                        >
                            {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index]} />)}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                    </div>
                    <div>
                    <Typography>Necessary VS Unnecessary</Typography>
                    <PieChart width={300} height={225}>
                        <Pie
                            dataKey="value"
                            isAnimationActive={true}
                            data={necessaryExpenses}
                            outerRadius={80}
                            label
                        >
                            {necessaryExpenses.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[2 * index + 1]} />)}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                    </div>
                </div>
            </div>
            {/* All modals and popups will go under here, all normal component code above here*/}
            <Modal
                open={filterOpen}
                onClose={() => setFilterOpen(false)}
                aria-labelledby="Filters and Options"
                aria-describedby="The filters and options to be applied to the displayed expenses"
            >
                <Box sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 325, height: 450, bgcolor: 'white', border: '2px solid #000', boxShadow: 24, p: 4, borderRadius: "25px"
    }}>
                    <form onSubmit={changeData} style={{display: "flex", margin: "auto", flexDirection: "column", height: "100%", justifyContent: "space-evenly"}}>
                        <div style={{display: "flex", flexDirection: "row"}}>
                            <DatePicker label="Start Date" value={startDate} onChange={(newVal) => setStartDate(newVal)} sx={{width: "145px"}}/>
                            <Typography sx={{margin: "auto"}}>to</Typography>
                            <DatePicker label="End Date" value={endDate} onChange={(newVal) => setStartDate(newVal)} sx={{width: "145px"}}/>
                        </div>
                        <TextField label="Min Price" variant="outlined" InputLabelProps={{shrink: true}} placeholder="E.g. 10.00" InputProps={{startAdornment: (<InputAdornment position="start">$</InputAdornment>)}} error={errors.minPrice} helperText={errors.minPrice ? helperText : ""} onChange={(e) => setMinPrice(e.target.value)} />
                        <TextField label="Max Price" variant="outlined" onChange={(e) => setMaxPrice(e.target.value)} InputLabelProps={{shrink: true}} InputProps={{startAdornment: (<InputAdornment position="start">$</InputAdornment>)}} placeholder="E.g. 1000.00" error={errors.maxPrice} helperText={errors.maxPrice ? helperText : ""} />
                        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <Typography style={{width: "fit-content"}}>Include Unnecessary</Typography>
                            <Stack direction="row" spacing={1} alignItems="center">
                            <Typography style={{opacity: includeUnnecessary ? "0.5" : "1", transition: "opacity", transitionDuration: "0.5s"}}>No</Typography>
                                <Switch defaultChecked value={includeUnnecessary} onChange={() => setincludeUnnecessary(!includeUnnecessary)}/>
                            <Typography style={{opacity: includeUnnecessary ? "1" : "0.5", transition: "opacity", transitionDuration: "0.5s"}}>Yes</Typography>
                            </Stack>
                        </div>
                        <Button variant="outlined" type="submit" style={{width: "fit-content", marginLeft: "auto", marginRight: "auto"}}>Get Expenses</Button>
                    </form>
                </Box>
            </Modal>
            {/* modal for when the user clicks on an individual expense */}
            <Modal
                open={modalOpen}
                onClose={() => {setModalOpen(false); setNoEdit(true)}}
                aria-labelledby="Individual Expense information"
                aria-describedby="Information about the individual expense that was clicked on"
            >
                <Box sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 325, height: 450, bgcolor: 'white', border: '2px solid #000', boxShadow: 24, p: 4, borderRadius: "25px"
    }}>
                    <legend style={{marginLeft: "auto", marginRight: "auto", width: "fit-content"}}>Expense Information</legend>
                    <form onSubmit={() => console.log("submit form")} style={{display: "flex", margin: "auto", flexDirection: "column", height: "100%", justifyContent: "space-evenly"}}>
                        <DatePicker label="When" value={dayjs(modalData.time)} onChange={(newVal) => console.log(newVal)} readOnly={noEdit} />
                        {/*add input of type number for the price*/}
                        <TextField label="Price" value={modalData.price} variant="outlined" InputLabelProps={{shrink: true}} placeholder="E.g. 52.90" InputProps={{startAdornment: (<InputAdornment position="start">$</InputAdornment>), readOnly: noEdit}} error={errors.price} helperText={errors.price ? helperText : ""} onChange={(e) => setModalData({...modalData, price: e.target.value})} />
                        <TextField label="Expense Type" value={modalData.type} variant="outlined" InputLabelProps={{shrink: true}} placeholder="E.g. Groceries" error={errors.type} helperText={errors.type ? helperText : ""} InputProps={{readOnly: noEdit}} onChange={(e) => setModalData({...modalData, type: e.target.value})} />
                        <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" >
                        <Typography style={{opacity: modalData.necessary ? "0.5" : "1", transition: "opacity", transitionDuration: "0.5s"}}>Unnecessary</Typography>
                            <Switch defaultChecked value={modalData.necessary} disabled={noEdit} />
                        <Typography style={{opacity: modalData.necessary ? "1" : "0.5", transition: "opacity", transitionDuration: "0.5s"}}>Necessary</Typography>
                        </Stack>
                        {noEdit ? <div style={{width: "100%", display: "flex", justifyContent: "space-evenly"}}><Button color="error" variant="outlined">Delete</Button><Button onClick={() => setNoEdit(false)} variant="outlined">Edit</Button></div> : <div style={{width: "100%", display: "flex", justifyContent: "space-evenly"}}><Button onClick={() => setNoEdit(true)} variant="outlined">Back</Button><Button variant="outlined">Apply</Button></div>}
                    </form>
                </Box>
            </Modal>
        </div>
    )
}

export default Dashboard