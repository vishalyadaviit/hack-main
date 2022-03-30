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
export default function Signin() {

  const [email, setEmail] = React.useState('');

  const handleSubmit = () => {

    const options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };

    fetch(`${BASE_URL}/api/users/login/${email}`, options)
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('user', JSON.stringify(data))
        window.location.href = '/dashboard'
      })
      .catch((error) => console.log(error));

  };

  return (
    <ThemeProvider theme={theme}>
      <Link to='/sign-in' />
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
                required
                fullWidth
                id='email'
                label='Email Address'
                placeholder='Enter valid e-mail'
                name='email'
                autoComplete='email'
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
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
            login
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}