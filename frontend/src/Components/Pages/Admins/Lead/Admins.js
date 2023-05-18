import { Button } from '@mui/material';
import axios from 'axios'
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";
const Admins = () => {
    // const [admins, setadmins] = useState({
    //     firstname: "",
    //     lastname: "",
    //     email: "",
    //     password: '',
    //     phone: "",
    // })
    const [adminsList, setadminsList] = useState([])

    async function Deleteadmins(email){
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
                "http://localhost:3301/api/admins/all");
                setadminsList(result.data.data);
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
                        <th scope='col'>Role</th>
                        <th scope='col'>Notes</th>
                        <th scope='col'>Action</th>

                        {/* <th scope="col">Option</th> */}
                    </tr>
                </thead>
                {adminsList.map((admins, key) => {
                    return (
                        <tbody key={admins.firstname}>
                            <tr>
                                <th scope='row'>{admins.firstname}</th>
                                <td>{admins.lastname}</td>
                                <td>{admins.email}</td>
                                <td>{admins.phone}</td>
                                <td>{admins.role}</td>
                                <td>{admins.notes}</td>
                               
                                <td>
                                    
                                    <Button style={{ backgroundColor: 'red', color: 'white' }} startIcon={<DeleteIcon />} onClick={() => Deleteadmins(admins.email)}>Delete</Button>
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
    export default Admins;

   