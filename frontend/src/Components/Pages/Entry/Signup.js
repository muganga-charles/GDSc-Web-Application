import * as React from 'react';
import image from '../../../Assets/bg-sign-up-cover.jpeg'
//import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
//import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios'
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
        Google Developers GroupS
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const addMember = async (member) => {
  const response = await axios.post('http://localhost:3301/api/members/add', member);
  const value = { email: member.email, firstname: member.firstname, lastname: member.lastname}
  const result = await axios.post('http://localhost:3301/api/members/email',value);
  console.log(result.data.message)
  alert(response.data.message)
  if (response.data.status === true) {
    localStorage.setItem('userData', JSON.stringify(value));
    window.location = '/welcome'
  }
}

const theme = createTheme();

export default function SignUp() {
  const classes = useStyles()
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const member = {
      email: data.get('email'),
      firstname: data.get('firstName'),
      lastname: data.get('lastName'),
      password: data.get('password'),
      phone: data.get('phonenumber'),
    }
    
    addMember(member);
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
                Sign up
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
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
                    // validateEmail must take in what has been typed in the email field

                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="phonenumber"
                      label="phonenumber"
                      type="number"
                      id="phonenumber"
                      autoComplete="new-password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                    />
                  </Grid>
                  <Grid item xs={12}>

                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/login" variant="body2">
                      Already have an account? Sign in
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