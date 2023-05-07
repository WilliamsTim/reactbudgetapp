import React, { useRef } from 'react';
import './login.css'
import { Box, Button, TextField } from '@mui/material';
import axios from "axios";

function Login() {
  // variables
  var ref = useRef(null);

  // functions
  function validateInputs() {
    if (ref.current[0].value.length  > 5 && ref.current[2].value.length > 5) return true;
    else return false;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (validateInputs()) {
      // submit to backend serverless function for authentication.
      // username value is at ref.current[0].value
      // password value is at ref.current[2].value
      axios.post("http://localhost:8888/.netlify/functions/budgetAppLogin", {username: ref.current[0].value, password: ref.current[2].value})
        .then((response) => {response.data.cookie.includes("undefined") ? alert("There was a problem logging in, please try again later") : document.cookie = response.data.cookie; window.location.reload()})
        .catch((err) => alert("Incorrect email or password"));
    } else {
      alert("login info not long enough");
    }
  }

  // returned component
  return (
    <div style={{display: "flex", height: "100%", width: "100%"}}>
        <Box className="loginbox">
            <legend>Login</legend>
            <form className='loginform' ref={ref} onSubmit={handleSubmit}>
              <TextField id="outlined-basic" label="Username" variant="outlined" />
              <TextField id="outlined-basic" label="Password" variant="outlined" />
              <Button variant="outlined" type='submit'>Login</Button>
            </form>
        </Box>
    </div>
  )
}

export default Login