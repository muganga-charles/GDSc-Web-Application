import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import PersonIcon from '@mui/icons-material/Person';
import { ListItemIcon } from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        backgroundColor: '#000',
    },
    bodycontent:{
        color: 'blue',
        textAlign:'center',
    },
    
    drawer: {
        witdh: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
    
    },
}));

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);


const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
    const classes = useStyles();
    const history = useNavigate();
    const handleRoute = (path) => {
        history(path);
    };
    
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const navigate = useNavigate();

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleClick = () => {
    window.location = '/member/profile';
  };
  const handleClick1 = () => {
    window.location = '/';
  };
  return (

    <Box sx={{ display: 'flex' }}id = 'drowerbar'>
      <CssBaseline />
      <AppBar position="fixed" open={open} className = {classes.root} style={{ backgroundColor: 'black' }}>
        <Toolbar  style={{backgroundColor:'black'}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            UCU DSCs Member
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        classes = {{
            paper: classes.drawerPaper,
        }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader style={{backgroundColor:'black'}}>
          <IconButton onClick={handleDrawerClose}  style={{color:'white'}}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        
        <Divider />
        <List style={{backgroundColor:'black'}}>
            <ListItem disablePadding style={{color:'white',backgroundColor:'black'}}>
              <ListItemButton onClick={()=> handleRoute('/member/profile')}>
                <ListItemIcon style={{color:'white'}}>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary={'Profile'} />
              </ListItemButton>
            </ListItem>
            <Divider />

            <ListItem disablePadding style={{color:'white',backgroundColor:'black'}}>
              <ListItemButton onClick={() => navigate('/varifylead')} >
                <ListItemIcon style={{color:'white'}}>
                  <AdminPanelSettingsIcon />
                </ListItemIcon>
            <ListItemText primary={'Lead'} />
              </ListItemButton>
            </ListItem>
            <Divider />

            <ListItem disablePadding style={{color:'red',backgroundColor:'black'}}>
            <ListItemButton onClick={()=> handleRoute('/')}>
                <ListItemIcon style={{color:'white'}}>
                  <LogoutIcon />
                </ListItemIcon>
            <ListItemText primary={'Log Out'} />
              </ListItemButton>
            </ListItem>
            <Divider />

        </List>
        
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}