import React, { useEffect, useState } from 'react';
const dayjs = require("dayjs");

function Dashboard() {
    const [data, setData] = useState([]);
    var refDate = new Date();
    const [startDate, setStartDate] = useState(dayjs().set("year", refDate.getFullYear()).set("month", refDate.getMonth()).set("date", 0));
    const [endDate, setEndDate] = useState(dayjs().set("year", refDate.getFullYear()).set("month", refDate.getMonth() + 1).set("date", -1));
    useEffect(() => {
        fetch("http://localhost:8888/.netlify/functions/budgetAppGetExpenses?" + new URLSearchParams({startDate: startDate.toISOString().slice(0, 10), endDate: endDate.toISOString().slice(0, 10)}), {
            method: "GET",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((response) => setData(response.data));
    }, []);
    return (
        <div>
            Dashboard
        </div>
    )
}

export default Dashboard