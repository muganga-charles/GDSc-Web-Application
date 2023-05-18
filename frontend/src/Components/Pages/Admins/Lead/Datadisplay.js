import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Members from './Members';
import Admins from './Admins';
import { Button } from '@mui/material';
import adminpic from '../../../../Assets/admin.jpg'
const useStyles = makeStyles((theme) => ({
    
    container: {
        marginTop: '80px',
        display: "flex", /* use flexbox to align the cards */
        flexWrap:"wrap",/* set the space between the cards */
        width: '900px',

    },
    inner: {
      display: 'flex',
        justifyContent: 'center',
        margin: '0 auto',
    }
    
  }));

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Datadisplay() {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={classes.outerdiv}>
    <Card className= {classes.container}>
        
      <CardHeader
        
        title="Member Details"

      />
      
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Contains All the Member Details of both the Administrator and the Members.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
        </IconButton>
        <IconButton aria-label="share">
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Data:</Typography>
          <Typography paragraph>
          <Members/>
          </Typography>
          <Typography paragraph>
          <Admins/>
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
    </div>
    
    
  );
}