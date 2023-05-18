import React,{ useState,useEffect } from "react";
import PersistentDrawerLeft from "../Members/Drawer";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Card } from '@mui/material';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import image from '../../../Assets/bg-sign-in-basic.jpeg'
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

function VarifyLead (){
    const classes = useStyles();
    const navigate  = useNavigate();
    async function login(id, password) {
        await axios.post('http://localhost:3301/api/lead/login', {
          id,
          password,
        }).then((response) => {
          console.log(response.data.message);
          const data1 = response.data.data[0].role
          console.log(response.data.status)
          localStorage.setItem('leadRole', JSON.stringify(data1));
          alert(response.data.message)
          if (response.data.data.length === 0) {
            alert('Please Provide the correct id or Password\n');
          }
          else if (response.data.data.length === 1) {
          const role = response.data.data[0].role
          console.log(role)
          if(role === "CLUB LEAD"){
            navigate('/admindisplay')
          }
          else{
            navigate('/anyrole')
          }
          }
          //console.log(userData);
        }).catch((err) => console.log(err))
      }

      const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        login(data.get('id'), data.get('password'))
        
    
      };
    
    return (
        <div className={classes.container}>
            <PersistentDrawerLeft/>
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
                Varify Lead
              </Typography>

              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="id"
                  label="Lead id"
                  name="id"
                  autoComplete="id"
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
                  Submit
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
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

export default VarifyLead;