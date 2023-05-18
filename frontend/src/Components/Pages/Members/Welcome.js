import React from 'react';
import { Grid } from "@nextui-org/react";
import { makeStyles } from '@mui/styles';
import { Eventcordinator } from './WelcomePageInfo/Eventcordinator';
import PersistentDrawerLeft from './Drawer';
import { TechinicalLead } from './WelcomePageInfo/TechinicalLead';
import Marketinglead from './WelcomePageInfo/Marketinglead';
import OutReachLead from './WelcomePageInfo/OutReachLead';
import Mentorshiplead from './WelcomePageInfo/MentorshipLead';
import ClubLead from './WelcomePageInfo/ClubLead';
import { DesignLead } from './WelcomePageInfo/DesignLead';
const useStyles = makeStyles((theme) => ({
    back: {
        display: 'flex',
        justifyContent: 'center',
    },
    container:{
        marginTop: '80px',
        display: "flex", /* use flexbox to align the cards */
        justifyContent:"center",
        flexWrap:"wrap",/* set the space between the cards */
        alignItems: 'center',
        //marginLeft: '60px',
        height: '100vh',
    }
   
}));

function Welcome(){
    const classes = useStyles();
    const data = JSON.parse(localStorage.getItem('userData'));
    return(
        <div className={classes.container}>
            <PersistentDrawerLeft />
            <h1 className={classes.back} b>Welcome back {data.firstname} 👋</h1>
            <Grid.Container gap={2} justify="center">
                <Grid xs={12} sm={5}>
                    <Eventcordinator />
                </Grid>
                <Grid xs={12} sm={5}>
                    <TechinicalLead />
                </Grid>
                <Grid xs={12} sm={5}>
                    <Mentorshiplead />
                </Grid>
                <Grid xs={12} sm={5}>
                    <OutReachLead />
                </Grid>
                <Grid xs={12} sm={5}>
                    <DesignLead />
                </Grid>
                <Grid xs={12} sm={5}>
                    <Marketinglead/>
                </Grid>
                <Grid xs={12} sm={10}>
                    <ClubLead />
                </Grid>
            </Grid.Container>
        </div>
    );            
}
export default Welcome;

