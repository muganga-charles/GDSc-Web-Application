import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from '@mui/styles';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import { useNavigate } from 'react-router-dom';
const useStyles = makeStyles((theme)=>({
    
    appbartitle:{
        
        color: '#fff',
    }
}))
export default function Menuheader() {
    const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const navigate =  useNavigate()
  const handleClose1 = () => {
    setAnchorEl(null);
    navigate('/signup')
  };
  const handleClose2 = () => {
    setAnchorEl(null);
    navigate('/login')
  };
  const handleClose = () => {
    setAnchorEl(null);
    navigate('/login')
  };
  return (
    <div>
      {/* <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className={classes.appbartitle}
      > */}
        {/* 
      </Button> */}
      <ListOutlinedIcon  onClick= {handleClick}/>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose1}>Sign up</MenuItem>
        <MenuItem onClick={handleClose2}>Log in</MenuItem>
      </Menu>
    </div>
  );
}