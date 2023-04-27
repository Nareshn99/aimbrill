import React, { useEffect, useState } from 'react'
import Layout from '../Component/Layout'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Users() {
    const [users, SetUsers] = useState([])

    const navigate = useNavigate();
    const getAllUsers = async () => {
        try {
            const res = await axios.get("/api/users")
            if (res && res.data.status) {
                SetUsers(res.data.data)
            } else {
                toast.error(res.data.message)
            }
        }
        catch (e) {
            toast.error("Something went wrong")
        }
    }

    useEffect(() => {
        getAllUsers();
    }, []);



    const handleSubmitDelete = async (uid) => {
        try {
            const res = await axios.delete(`/api/user/${uid}`)
            if (res?.data.status) {
                toast.success(res.data.message)
                getAllUsers();
            } else {
                toast.error(res.data.message)
            }
        }
        catch (e) {
            toast.error("Something went wrong")
        }
    }

    
    return (
        <Layout>
            <div className='alluse'>
                <table className='table table-dark table-striped p-2 m-2'>
                    <thead>
                        <tr>
                            <th scope="col">Sr.No</th>
                            <th scope="col">FirstName</th>
                            <th scope="col">LastName</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Gender</th>
                            <th scope="col">Country</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map((user, idx) =>
                                <>
                                    <tr key={idx} >

                                        <th scope="row">{idx + 1}</th>
                                        <td>{user.FirstName}</td>
                                        <td>{user.LastName}</td>
                                        <td>{user.Email}</td>
                                        <td>{user.Phone}</td>
                                        <td>{user.Gender}</td>
                                        <td>{user.Country}</td>
                                        <td>
                                            <button className='btn btn-primary m-2' onClick={()=>navigate(`update/${user._id}`)}>Edit</button>
                                            <button className='btn btn-danger m-2' onClick={() => handleSubmitDelete(user._id)}>Delete</button>

                                        </td>
                                    </tr>
                                </>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </Layout>
    )
}

export default Users
