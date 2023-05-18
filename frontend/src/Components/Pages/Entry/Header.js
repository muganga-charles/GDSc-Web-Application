import { useEffect, useState } from 'react'
import { Button } from "@nextui-org/react";
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import { AppBar, Collapse, IconButton, Toolbar } from '@mui/material';
// import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link as Scroll } from 'react-scroll';
import { useNavigate } from 'react-router-dom';
import logo from '.././../../Assets/google-dev.jpg';
//import Menuheader from './Menuheader';
import image from '../../../Assets/Google.jpg'
//import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Appbar from './Appbar';
const useStyles = makeStyles((theme) => ({

    root: {
        

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        sx: {
            fontSize: '1.5rem',
        },
    },

    appbar: {
        height: '60px',
        fontFamily: 'Nunito',
        backgroundColor: 'transparent !important',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        fontSize: '1.3 rem',



    },
    logo: {
        width: '100px',  // set the width to 100 pixels
        height: '700px',
        margin:'0 5px',
        
    },
    appbartitle: {
        flexGrow: '2',
        //color: '#fff',
        fontSize: '2rem',
    },
    appbarWrapper: {

        width: '80%',
        margin: '0 auto',
    },
    texthighlight: {
        color: '#5AFF3D',
    },
    container:
    {
        color: 'white',
        textAlign: 'center',
    },
    title: {
        fontSize: '2rem',
        color: 'white',
    },
    godown: {
        color: '#5AFF3D',
        fontSize: '7rem',
    },
    button1: {
        margin: '0 10px',
    },
    button2: {
        margin: '0 10px',
    }


}))
export default function Header() {
    const classes = useStyles();
    const navigate = useNavigate();
    const handleClose1 = () => {
        navigate('/signup')
    };
    const handleClose2 = () => {
        navigate('/login')
    };
    const handleClose3 = () => {
        navigate('/')
    };
    const [checked, setChecked] = useState(false);
    useEffect(() => {
        setChecked(true);
    }, [])
    return (
        <div className={classes.root} id='header'>

            <Appbar />
            <Collapse in={checked} {...(checked ? { timeout: 1000 } : {})} collapsedheight={50}>
                <div className={classes.container}>
                <Box
                component  = 'img'
                sx = {{height:20}}

                alt = "Logo"
                src = {logo}
                className = {classes.logo}
                />

                    <h1 className={classes.title} b>
                        Uganda Christian University <br />  Google Developer Student  Clubs
                    </h1>
                    <Scroll to="members" smooth={true}>
                        <IconButton>
                            <ExpandMoreIcon className={classes.godown} />
                        </IconButton>
                    </Scroll>
                </div>
            </Collapse>
        </div>
    )
}   