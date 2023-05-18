import { AppBar, IconButton, Toolbar, useTheme } from '@mui/material';
import { Button } from "@nextui-org/react";
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import logo from '.././../../Assets/google-dev.jpg';
import { useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import HomeIcon from '@mui/icons-material/Home';
import { createTheme,useMediaQuery } from '@mui/material';

const themes = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});
const useStyles = makeStyles((theme) => ({
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
  appbarWrapper: {
    width: '80%',
    margin: '0 auto',
  },
  appbartitle: {
    flexGrow: '2',
    color: 'red',
    fontSize: '2rem',
    [themes.breakpoints.down('sm')]: {
      fontSize: '1rem',
    },
  },
  button1: {
    margin: '0 10px',
  },
  logo: {
    margin: '0 5px',
  },
  button2: {
    margin: '0 10px',
  },
  texthighlight: {
    color: 'green',
  },
  hyphen: {
    color: 'blue',
  },
}));

function Appbar() {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleClose1 = () => {
    navigate('/signup');
  };
  const handleClose2 = () => {
    navigate('/login');
  };
  const handleClose3 = () => {
    navigate('/');
  };

  // Add media query hook to determine when to show the LoginIcon
  
  const isSmallScreen = useMediaQuery(themes.breakpoints.down('sm'));

  return (
    <div className="appbar">
      <AppBar className={classes.appbar}>
        <Toolbar className={classes.appbarWrapper}>
          <Link href="/">
            <Box
              component="img"
              sx={{ height: 20 }}
              alt="Logo"
              src={logo}
              className={classes.logo}
            />
          </Link>
          <h1 className={classes.appbartitle}>
            UCU<span className={classes.hyphen}>-</span>
            <span className={classes.texthighlight}>DSCs</span>
          </h1>
          {isSmallScreen ? (
            <>
              <IconButton style ={{color:'white'}} onClick={handleClose1}>
                <GroupAddIcon />
              </IconButton>
              <IconButton style ={{color:'white'}} onClick={handleClose2}>
                <LoginIcon />
              </IconButton>
              <IconButton style ={{color:'white'}} onClick={handleClose3}>
                <HomeIcon />
              </IconButton>
            </>
          ) : (
            <>
              <Button auto flat className={classes.button1} onPress={handleClose2}>
                Login
              </Button>
              <Button auto flat className={classes.button2} onPress={handleClose1}>
                Sign Up
              </Button>
              <Button auto flat className={classes.button2} onPress={handleClose3}>
                Home
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Appbar;
