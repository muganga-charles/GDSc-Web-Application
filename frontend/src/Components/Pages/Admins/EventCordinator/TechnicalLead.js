import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "@nextui-org/react";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    outercard: {
      height: '500px',
      width:360,
      marginTop: '80px',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
  
    },
    container: {
      display: "flex", /* use flexbox to align the cards */
      justifyContent: "center",
      flexWrap: "wrap",/* set the space between the cards */
      alignItems: 'center',
      marginLeft: '60px',
      minHeight: "100vh",
    },
  }));

function TechinicalLead() {
  const memberrole = "TECHNICAL LEAD";

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
      window.location = "/member";
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
    alert(response.data.message);
    if (response.data.status === true) {
        window.location = "/member";
    }
    };


  return (
    <div>
        <div>{<Card>
            <Card.Body css={{ p: 0 }}>
              {notes}
            </Card.Body>
            
          </Card>
        }</div>
      <form onSubmit={updateNotes}>
        <input type="text" style={{ width: "300px", height: "50px" }} onChange={handleNotesChange} />

        <button type="submit" className="btn btn-warning">Update</button>
        <button type="submit" className="btn btn-warning" onClick={addtoNotes}>Add to</button>
      </form>
    </div>
  );
}

export default TechinicalLead;
