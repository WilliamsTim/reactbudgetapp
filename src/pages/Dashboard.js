import React, { useEffect, useState } from 'react'

function Dashboard() {
    const [data, setData] = useState([]);
    var refDate = new Date();
    const [startDate, setStartDate] = useState(new Date(refDate.getFullYear(), refDate.getMonth(), 1));
    const [endDate, setEndDate] = useState(new Date(refDate.getFullYear(), refDate.getMonth() + 1, 0));
    useEffect(() => {
        fetch("http://localhost:8888/.netlify/functions/budgetAppGetExpenses?" + new URLSearchParams({startDate, endDate}), {
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