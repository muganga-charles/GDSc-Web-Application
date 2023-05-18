import React ,{useState,useEffect, useRef} from 'react';
import { Card, Grid, Row, Text } from "@nextui-org/react";
//import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import PersistentDrawerLeft from './Drawer';
import axios from 'axios';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import image from '../../../Assets/Profilebg.jpg'
import profilepic from '../../../Assets/Admin.png'
//import { Storage } from '@google-cloud/storage';
const  useStyles = makeStyles((theme) =>({
  cards:{
    width:"700px",
    height:"400px",
    margin:"10px",
    padding:"10px",
    boxShadow:"0 0 10px 0 rgba(0,0,0,0.2)",
    borderRadius:"10px",
    backgroundColor:"#fff",
    display:"flex",
    flexDirection:"column",
    justifyContent:"space-between",
    alignItems:"center",
    transition:"all 0.3s ease-in-out",
    "&:hover":{
      transform:"scale(1.05)",
      boxShadow:"0 0 20px 0 rgba(0,0,0,0.2)",
    },
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
  container1: {
    height: '500px',
    width:360,
    marginTop: '80px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor:'black',
    color: 'white',
    boxShadow: "0 0 10px 0 rgba(0,0,0,0.2)",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  }));

function Profile() {
  const classes = useStyles();
  
  const [email, setEmail] = useState('');
  const storedUser = JSON.parse(localStorage.getItem('userData'));
  const navigate = useNavigate();
  useEffect(() => {
    axios.post('http://localhost:3301/api/members/email', storedUser)
    .then(response =>{
        setEmail(response.data.data.email)
        localStorage.setItem('email', JSON.stringify(email));
    })
    .catch(error => {
        console.log(error)
    })
    }, [])


  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };
  

// read the data from local storage
  const values  = '1.png'
    
    console.log(storedUser)
    return (
      <div className={classes.container}>
        <PersistentDrawerLeft/>
        <Grid xs={6} sm={3} key={storedUser.id}>
          <Card className={classes.container1}>
            <Card className={classes.root}>
              <Card.Body css={{ p: 0 }}>
                <Card.Image
                  objectFit="cover"
                  src={profilepic}
                  width="100%"
                  height={100}
                  borderRadius='50%'
                />
              </Card.Body>
            </Card>
              <Button
                  onClick={handleClick}
                      >
                        Upload Image
                </Button>
                <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={(e) => {
                          const file = e.target.files[0];
                          console.log(file.name);
                        }}
                      />
                <div>
                    <label htmlFor="firstName">First Name: {storedUser.firstname}</label>
                    <br />
                    <label htmlFor="lastName">Last Name: {storedUser.lastname}</label>

                    <br />
                    <label htmlFor="email">Email: {storedUser.email}</label>
                    <br />
                    <label htmlFor="phone">Phone: {storedUser.phone}</label>
                    <br />

                </div>
                <Button onClick={() => navigate('/profile/update')}>Update Profile</Button>
          </Card>
          
        </Grid>
      </div>
    );


    
}

export default Profile;