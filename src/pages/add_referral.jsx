import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { addReferral } from '../service/referral_service';
import { BASE_URL } from '../helpers/constants.helper';

const theme = createTheme();

export default function AddReferral() {
  const [name, setName] = React.useState('');
  const [mobile, setMobile] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [companyName, setCompanyName] = React.useState('');

  const handleSubmit = () => {

    //addReferral(`${firstName} ${lastName}`, email, mobile);

    const data = {
      fullName: name,
      email: email,
      mobile: mobile,
      companyName: companyName
    };

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };

    const userMail = localStorage.getItem('userEmail');

    fetch(`${BASE_URL}/api/customer/signup/${userMail}`, options)
      .then((response) => {
        response.json();
      })
      .then((data1) => { console.log(data1); });

  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Add referral
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="name"
                required
                fullWidth
                id="name"
                label="Enter your name"
                autoFocus
                value={name}
                onChange={(ev) => setName(ev.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="companyName"
                label="Company Name"
                name="companyName"
                autoComplete="companyName"
                value={companyName}
                onChange={(ev) => setCompanyName(ev.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="mobileNumber"
                label="Mobile number"
                type="number"
                id="number"
                value={mobile}
                onChange={(ev) => setMobile(ev.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => handleSubmit()}
          >
            Add referral
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}