import React, { useState, useEffect } from "react";
import Layout from "../Component/Layout";
import toast from 'react-toast-notification';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Select, Radio } from "antd";
const { Option } = Select;


const UpdateProduct = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [FirstName, setFirstName] = useState("")
    const [LastName, setLastName] = useState("")
    const [Email, setEmail] = useState("")
    const [Phone, setPhone] = useState("")
    const [Password, setPassword] = useState("")
    const [Gender, setGender] = useState("")
    const [Country, setCountry] = useState("")
    const [id, setId] = useState("");


    const getSingleUser = async () => {
        try {
            const res = await axios.get(`/api/user/${params.uid}`);
            setFirstName(res.data.data.FirstName)
            setLastName(res.data.data.LastName)
            setEmail(res.data.data.Email)
            setPhone(res.data.data.Phone)
            setGender(res.data.data.Gender)
            setPassword(res.data.data.Password)
            setCountry(res.data.data.Country)
            setId(res.data.data._id)
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getSingleUser();
        //eslint-disable-next-line
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res =await axios.put(`/api/user/${id}`, { FirstName, LastName, Email, Phone, Password, Gender, Country });
            if (res?.data?.status) {
                toast.success("User Updated Successfully");
                navigate("/users");
            } else {
                toast.error(res.data?.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("something went wrong");
        }
    };

    return (
        <Layout >
            <div className="container-fluid m-3 p-3">
                <h1>Update User</h1>
                <div>
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
                            readOnly={true}
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
                            <Option value="Usa">Usa</Option>
                            <Option value="Japan">Japan</Option>
                            <Option value="Other">Other</Option>
                        </Select>
                    </div>
                    <button type="submit" className="btn btn-primary m-3" onClick={handleUpdate}>
                        UPDATE
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default UpdateProduct;