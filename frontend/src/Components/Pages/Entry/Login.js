import { useState } from 'react';
import image from '../../../Assets/bg-sign-in-basic.jpeg'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Appbar from './Appbar';
import { Card } from '@mui/material';
//import { Alert } from '@mui/material';
const useStyles = makeStyles((theme) => ({
  outercard: {
    height: '500px',
    width:360,
    marginTop: '80px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundImage: `url(${image})`, // update to use a URL
    backgroundSize: 'cover', // add this to adjust the image size
    backgroundRepeat: 'no-repeat',  
    display: "flex", /* use flexbox to align the cards */
    justifyContent: "center",
    flexWrap: "wrap",/* set the space between the cards */
    alignItems: 'center',
    //marginLeft: '60px',
    minHeight: "100vh",
  },
}));

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Google Develper Groups
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



const theme = createTheme();
// login

export default function SignIn() {
  const classes = useStyles()
  async function login(email, password) {
    await axios.post('http://localhost:3301/api/members/login', {
      email,
      password,
    }).then((response) => {
      console.log(response.data.data[0]);
      const data1 = response.data.data[0]
      // localStorage.setItem('userData', JSON.stringify(data1));
      console.log(data1)
      if (response.data.data.length === 0) {
        alert('Please Provide the correct Email Address or Password\nSign Up if you dont have an account');
      }
      else if (response.data.data.length === 1) {
        // alert('Login Successful');
        localStorage.setItem('userData', JSON.stringify(data1));
        navigate('/welcome')
        //console.log(userData);
      }
      //console.log(userData);
    }).catch((err) => console.log(err))
  }

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    login(data.get('email'), data.get('password'))

  };

  const UpdateProfile = (event) => {
  };


  return (
    <div className={classes.container}>
      <Appbar />
      <Card className={classes.outercard}>
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
              {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar> */}
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>

              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus

                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/signup" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>

          </Container>
        </ThemeProvider>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Card>

    </div>
  );
}