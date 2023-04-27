import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Select, Radio } from "antd";
import Layout from '../Component/Layout';
const { Option } = Select;

function AddUser() {
    const [FirstName, setFirstName] = useState("")
    const [LastName, setLastName] = useState("")
    const [Email, setEmail] = useState("")
    const [Phone, setPhone] = useState("")
    const [Password, setPassword] = useState("")
    const [Gender, setGender] = useState("")
    const [Country, setCountry] = useState("")

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("/api/user", { FirstName, LastName, Email, Phone, Password, Gender, Country })
            if (res.data && res.data.status) {
                toast.success(res.data.message)
                navigate("/users")
            } else {
                toast.error(res.data.message)
            }
        }
        catch (e) {
            console.log(e.message)
            toast.error("Something went wrong")
        }
    }


    return (
        <Layout>
            <div className="form-container" style={{ minHeight: "90vh" }}>
                <form onSubmit={handleSubmit}>
                    <h4 className="title">ADD NEW USER</h4>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={FirstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="form-control"
                            placeholder="Enter Your First Name"
                            required
                            autoFocus
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={LastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="form-control"
                            placeholder="Enter Your Last Name"
                            required
                            autoFocus
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="email"
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            placeholder="Enter Your Email "
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            value={Password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Enter Your Password"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={Phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="form-control"
                            placeholder="Enter Your Phone  No."
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <Radio.Group
                            placeholder="Gender "
                            size="large"
                            className="form-select mb-3"
                            value={Gender}
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <Radio value={"Male"}>Male</Radio>
                            <Radio value={"Female"}>Female</Radio>
                            <Radio value={"Other"}>Other</Radio>
                        </Radio.Group>
                    </div>
                    <div className="mb-3">
                        <Select
                            bordered={false}
                            placeholder="Country "
                            size="large"
                            onChange={(value) => {
                                setCountry(value);
                            }}
                        >
                            <Option value="India">India</Option>
                            <Option value="USA">USA</Option>
                            <Option value="Japan">Japan</Option>
                            <Option value="Other">Other</Option>
                        </Select>
                    </div>
                    <button type="submit" className="btn btn-primary m-3">
                        ADD USER
                    </button> 
                </form>
            </div>
        </Layout>
    );
};

export default AddUser;
