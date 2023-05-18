import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "@nextui-org/react";
import { makeStyles } from '@mui/styles';
import { useNavigate } from "react-router-dom";
import PersistentDrawerLeft from "../../Members/Drawer";
import image from '.././.././../../Assets/bg-profile.jpeg'

const useStyles = makeStyles((theme) => ({
  outercard: {
    height: '500px',
    width:360,
    marginTop: '40px', 
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

  },
  container: {
    backgroundImage: `url(${image})`, // update to use a URL
    backgroundSize: 'cover', // add this to adjust the image size
    backgroundRepeat: 'no-repeat',  
    display: "flex", /* use flexbox to align the cards */
    justifyContent: "center",
    flexWrap: "wrap",/* set the space between the cards */
    alignItems: 'center',
    //marginLeft: '60px',
    minHeight: "100vh",
    flexDirection: 'column', // add this
  },
  input: {
    width: '300px',
    height: '50px',
    margin: '10px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
    color: '#555',
    outline: 'none',
  },
  button: {
    backgroundColor: '#FFA500',
    border: 'none',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  cardBody: {
    padding: '20px',
    fontSize: '16px',
    lineHeight: '34px',
  },

}));

function AnyMember() {
  const memberrole = JSON.parse(localStorage.getItem('leadRole'));
  const navigate =  useNavigate()
  const [notes, setNotes] = useState("");
  const [newnote, setNewnotes]=useState("")

  const Role = {
    role: memberrole,
  };

  useEffect(() => {
    const getNotes = async () => {
      const result = await axios.post(
        "http://localhost:3301/api/leader/notes",
        Role
      );
      setNotes(result.data.data[0].notes);
    };
    getNotes();
    updateNotes();
    addtoNotes();
  }, []);

  const classes = useStyles();

  const handleNotesChange = (event) => {
    setNewnotes(event.target.value);
  };

  const updateNotes = async (event) => {
    const values = {
        role:memberrole,
        notes:newnote
    }
    event.preventDefault();
    const response = await axios.post(
      "http://localhost:3301/api/leader/update",values
     
    );
    console.log(response.data.message);
    alert(response.data.message);
    if (response.data.status === true) {
        navigate('/anyrole')
    }
  };
  const addtoNotes = async (event) => {
    const values = {
        role:memberrole,
        notes:newnote
    }
    event.preventDefault();
    const response = await axios.post(
        "http://localhost:3301/api/leader/addto",values
    );
    console.log(response.data.message);
    alert(response.data.data);
    if (response.data.status === true) {
      
        navigate('/anyrole')
    
    };
  }


  return (
    <div className={classes.container}>
  <div className={classes.outercard}>
    <PersistentDrawerLeft />
    <h1>Notes</h1>
    {<Card>
      <Card.Body className={classes.cardBody}>
        {notes}
      </Card.Body>
    </Card>}
  </div>
  <form onSubmit={updateNotes}>
    <input type="text" className={classes.input} onChange={handleNotesChange} />
    <button type="submit" className={classes.button}>Update</button>
    <button type="submit" className={classes.button} onClick={addtoNotes}>Add to</button>
  </form>
</div>

  );
}

export default AnyMember;
