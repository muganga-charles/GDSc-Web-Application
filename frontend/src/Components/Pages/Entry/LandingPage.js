import React from 'react';
import { makeStyles } from '@mui/styles';
import { CssBaseline } from '@mui/material';
import Header from './Header';
import Membership from '../Members/Membership'
import image from '../../../Assets/3.png'
import Footer from '../Footer/Footer';

const useStyles = makeStyles((theme) => ({
    root: {
        //minHeight: '100vh',
        ///backgroundImage: 'url(https://4kwallpapers.com/images/wallpapers/google-circles-multicolor-colorful-white-background-5k-8k-7680x4320-5352.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        flexDirection: 'row',
        color: '#fff',
        backgroundColor: 'white',
    },
    header:{
        backgroundImage: `url(${image})`, // update to use a URL
        backgroundSize: 'cover', // add this to adjust the image size
        backgroundRepeat: 'no-repeat',    }
}));
const LandingPage = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CssBaseline />
            <div className={classes.header}><Header /></div>
            <div><Membership /></div>
            <div><Footer /></div>
        </div>
    )
}

export default LandingPage;