import { makeStyles } from '@mui/styles';
import adminpic from '../../../../Assets/admin.jpg'
import Datadisplay from './Datadisplay';
import PersistentDrawerLeft from '../../Members/Drawer';
const useStyles = makeStyles((theme) => ({
    outerdiv: {
        minHeight: '100vh',
        backgroundImage: `url(${adminpic})`, // update to use a URL
        backgroundSize: 'cover', // add this to adjust the image size
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        display: 'flex',
        justifyContent: 'center',
        margin: '0 auto',
        
    },
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

function AdminDisplay(){
    const classes = useStyles()
    return (
        <div className={classes.outerdiv}>
            <PersistentDrawerLeft />
            <Datadisplay />
        </div>
    )
}
export default AdminDisplay