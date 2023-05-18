import {ThemeProvider,createTheme } from '@mui/material/styles';
import { Card } from '@mui/material';
import Container from '@mui/material/Container';
import { makeStyles } from '@mui/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import PersistentDrawerLeft from './Drawer';
import image from '../../../Assets/bg-sign-up-cover.jpeg'


const  useStyles = makeStyles((theme) =>({
    outercard:{
      height: '500px',
      width:360,
      marginTop: '80px',
      padding: '20px',
    
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',

    },
    container:{
      backgroundImage: `url(${image})`, // update to use a URL
      backgroundSize: 'cover', // add this to adjust the image size
      backgroundRepeat: 'no-repeat', 
      display: "flex", /* use flexbox to align the cards */
      justifyContent:"center",
      flexWrap:"wrap",/* set the space between the cards */
      alignItems: 'center',
      //marginLeft: '60px',
      minHeight:"100vh",
    },

    }));
    

    const theme = createTheme();
function UpdateMember(){

    const navigate = useNavigate();
    const classes = useStyles({theme})
    const emailaddress = JSON.parse(localStorage.getItem('email'));

    const updateUser = async (user) => {
        const res = await axios.post('http://localhost:3301/api/members/update', user);
        console.log(user)
        console.log(res.data.data)
        alert(res.data.message)
        navigate('/member')
    }
      const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const user = {
            email: emailaddress,
            firstname: data.get('firstName'),
            lastname: data.get('lastName'),
            password: data.get('password'),
            phone: data.get('phonenumber'),
        }
        updateUser(user);
        };

    const storedUser = JSON.parse(localStorage.getItem('userData'));
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
          Update Profile
          </Typography>
          <Box component="form" noValidate  sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  placeholder = {storedUser.firstname}
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
                  placeholder = {storedUser.lastname}
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
                  placeholder = {storedUser.phone}
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
              onClick={handleSubmit}
            >
              Update
            </Button>
            <Grid container justifyContent="flex-end">
            </Grid>
          </Box>
        </Box>
       
      </Container>
    </ThemeProvider>
    </Card>
        </div>
    );
    

}

export default UpdateMember;