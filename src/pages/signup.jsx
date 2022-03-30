import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navsupp from '../components/navsup/navsupp';
import { BASE_URL } from '../helpers/constants.helper';

const theme = createTheme();
export default function Signup() {
  const [userName, setUserName] = React.useState('');
  const [number, setNumber] = React.useState('');
  const [mailId, setMailId] = React.useState('');

  const handleSubmit = () => {
    const data = {
      fullName: userName,
      email: mailId,
      mobileNo: number,
    };
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };

    fetch(`${BASE_URL}/api/users/signup`, options)
      .then((response) => {
        response.json();
        localStorage.setItem('userEmail', mailId);
        localStorage.setItem('islogin', true);
      })
      .then((data1) => { console.log(data1); });

    // const navigate = useNavigate();
    // const routeChange = () => {
    //   console.log("ho ra h");
    //   const path = "/add_referral";
    //   navigate(path);
    // };
  };

  return (
    <ThemeProvider theme={theme}>
      <Link to='/add_referral' />
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete='given-name'
                name='userName'
                required
                fullWidth
                id='fullName'
                label='Full Name'
                placeholder='Enter full name'
                autoFocus
                value={userName}
                onChange={(ev) => setUserName(ev.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='email'
                label='Email Address'
                placeholder='Enter valid e-mail'
                name='mailId'
                autoComplete='email'
                value={mailId}
                onChange={(ev) => setMailId(ev.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name='number'
                label='Mobile number'
                placeholder='Enter valid mobile-number'
                type='number'
                id='number'
                value={number}
                onChange={(ev) => setNumber(ev.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
            onClick={() => handleSubmit()}
          >
            Submit
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}