import axios from 'axios'
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";
const Members = () => {
    // const [members, setmembers] = useState({
    //     firstname: "",
    //     lastname: "",
    //     email: "",
    //     password: '',
    //     phone: "",
    // })
    const [membersList, setmembersList] = useState([])

    async function Deletemembers(email){
        const value = {
            Email:email
        }
        const response = await axios.post('http://localhost:3301/api/member/delete', value);
        console.log(response.data.message)
        alert(response.data.message)
        if (response.data.status === true) {
            window.location = '/member'
        }
    }
    useEffect(() => {
        const loadData = async () => {
            const result = await axios.get(
                "http://localhost:3301/api/members");
                setmembersList(result.data.data);
            console.log(result.data.data)
        }
        loadData()

    }, [])
    return (
        <div>
            <div className="btn btn-primary mt-4">All Member Details</div>
            <div className="container mt-4">
            <table className="table table-dark" align="center">
                <thead>
                    <tr>
                        <th scope='col'>First Name</th>
                        <th scope='col'>Last Name</th>
                        <th scope='col'>Email</th>
                        <th scope='col'>Phone Number</th>
                        <th scope='col'>Action</th>

                        {/* <th scope="col">Option</th> */}
                    </tr>
                </thead>
                {membersList.map((members, key) => {
                    return (
                        <tbody key={members.firstname}>
                            <tr>
                                <th scope='row'>{members.firstname}</th>
                                <td>{members.lastname}</td>
                                <td>{members.email}</td>
                                <td>{members.phone}</td>
                               
                                <td>
                                    
                                    <Button style={{ backgroundColor: 'red', color: 'white' }} startIcon={<DeleteIcon />} onClick={() => Deletemembers(members.email)}>Delete</Button>
                                </td>
                            </tr>
                        </tbody>
                    );
                })}
            </table>

            </div>
        </div>
    );
    }
    export default Members;