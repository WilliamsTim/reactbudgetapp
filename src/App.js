import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import AddExpense from './pages/AddExpense';
import PrivateRoutes from './pages/PrivateRoutes';
import PublicRoutes from './pages/PublicRoutes';
import { Button } from '@mui/material';
import axios from "axios";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function App() {
  // variables

  // functions
  function signOut() {
    // this function can only be called from a button that only shows up if the user is logged in, so it does not need to test that
    axios.post("http://localhost:8888/.netlify/functions/budgetAppSignOut", {}, {withCredentials: true})
    .then(() => {document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:01 GMT"; window.location.reload();})
    .catch(() => alert("There was a problem signing you out, please try again later"));
  }

  function isLoggedIn() {
    // this needs to find if there is a cookie with the credentials sent back from the log in, if the user is logged in, return true, otherwise false.
    var cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      if (cookies[i].startsWith("token=")) {
        return true;
      }
    }
    return false;
  }

  return (
    <div className="App" style={{display: "flex", height: "100%", width: "100%"}}>
      <div id="banner">
        <p>Expense Tracker</p>
        {isLoggedIn() && <Button id="signout" onClick={signOut}>Sign out</Button>}
      </div>

      {isLoggedIn() && <div className="hamburger-menu">
        <input id="menu__toggle" type="checkbox" />
        <label className="menu__btn" htmlFor="menu__toggle">
          <span className="topline hamlines"></span>
          <span className="lines hamlines"></span>
          <span className="bottomline hamlines"></span>
        </label>

        <ul className="menu__box">
          <li><a className="menu__item" href="/dashboard">Dashboard</a></li>
          <li><a className="menu__item" href="/addexpense">Add Expense</a></li>
        </ul>
      </div>}
      <div style={{paddingTop: "64px", display: "flex", width: "100%"}}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <BrowserRouter>
            <Routes>
              <Route element={<PrivateRoutes />}>
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/addexpense' element={<AddExpense />} />
              </Route>
              <Route element={<PublicRoutes />}>
                <Route path="/" element={<Login />}/>
              </Route>
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </BrowserRouter>
        </LocalizationProvider>
      </div>
    </div>
  );
}

export default App;
