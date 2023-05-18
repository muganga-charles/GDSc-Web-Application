import {React,useEffect,useState} from 'react';
import { Card, Grid, Row, Text } from "@nextui-org/react";
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
//import Typography from '@mui/material/Typography';
import { Collapse } from '@mui/material'; 
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { CardActionArea,CardMedia,CardContent,Typography } from '@mui/material';

const useStyles = makeStyles({
    root:{
      margin: '0 5px',
      width: "300px", /* set the width of the cards */
      height: '400px', /* set the height of the cards */
      //border: "1px solid black", /* add a border to the cards */
      
    },
    container:{
      display: "flex", /* use flexbox to align the cards */
      justifyContent:"center",
      flexWrap:"wrap",/* set the space between the cards */
      alignItems: 'center',
      //marginLeft: '60px',
      minHeight:"100vh",
    },
    cardfooter:{
     
    },
    description:{
      display: 'block',
      marginTop: '1rem',
    }
})

export default function MembershipCard({checked}) {
    const classes = useStyles();
    const [admins, setAdmins] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3301/api/admins/get')
        .then(response =>{
            setAdmins(response.data.data)
    })
    .catch(error => {
        console.log(error)
    })
    }, [])

      
  return (
    <Collapse in={checked} {...(checked ? {timeout:2000} : {})}>
        <div className={classes.container} style={{backgroundColor:'black'}}>
        {admins.map((administrator) => (
          
        <Grid xs={6} sm={3} key={administrator.id}>
          <Card isPressable className={classes.root}>
            <Card.Body css={{ p: 0 }}>
              <Card.Image
                src={administrator.imagelink}
                objectFit="cover"
                width="100%"
                height={300}
                alt={administrator.role}
              />
            </Card.Body>
            <Card.Footer className={classes.cardfooter}>
            <Row>
              <Text b>{administrator.firstname +' '+ administrator.lastname}</Text>
             
              <Text>{ administrator.role }</Text>
            </Row>
            </Card.Footer>
          </Card>
        </Grid>
        ))}
        </div>
     
    </Collapse>
  );
}


