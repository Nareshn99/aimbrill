import userModel from '../models/userModel.js';
import { isValidEmail } from '../utils/validation.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'


//Add New User
export const createUser = async (req, res) => {
    try {
        let { FirstName, LastName, Email, Phone, Password, Gender, Country } = req.body;

        switch (true) {
            case !FirstName:
                return res.status(400).send({ status: false, message: "FirstName Is Mandatory " });
            case !LastName:
                return res.status(400).send({ status: false, message: "LastName Is Mandatory " });
            case !Email:
                return res.status(400).send({ status: false, message: "Email Is Mandatory " });
            case !isValidEmail(Email):
                return res.status(400).send({ status: false, message: "Invalid Email" });
            case !Phone:
                return res.status(400).send({ status: false, message: "Phone Is Mandatory" });
            case !Password:
                return res.status(400).send({ status: false, message: "Password Is Mandatory" });
            case !Gender:
                return res.status(400).send({ status: false, message: "Gender Is Mandatory" });
            case !Country:
                return res.status(400).send({ status: false, message: "Country Is Mandatory" });
        }

        // Check for the uniqueness of email and phone
        let user = await userModel.find({ $or: [{ Email }, { Phone }] })
        for (let key of user) {
            if (key.Email == Email.trim().toLowerCase()) {
                return res.status(409).send({ status: false, message: "Given email is already taken" })
            }
            if (key.Phone == Phone) {
                return res.status(409).send({ status: false, message: "Given phone is already taken" })
            }
        }

        //bcrypt password
        const hashedPassword = await bcrypt.hash(Password, 10)

        let data = await userModel.create({
            FirstName,
            LastName,
            Email,
            Phone,
            Password: hashedPassword,
            Gender,
            Country
        })
        return res.status(201).send({ status: true, message: "User created successfully", data });
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}




//Login User
export const login = async (req, res) => {
    try {
        let { Email, Password } = req.body;

        //find user from dataBase
        let user = await userModel.findOne({ Email });
        if (!user) {
            return res.status(404).send({ status: false, message: "User Not found" });
        }
        let correctPass = await bcrypt.compare(Password, user.Password)
        if (!correctPass) {
            return res.status(400).send({ status: false, message: "Invalid Password" });
        }
        let userId = user._id;
        const token = jwt.sign({ userId: userId }, process.env.SECRET, { expiresIn: "1d" });
        res.status(200).send({ status: true, message: "User logged in successfully", data: { user, token } });
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
};



//Get All Users
export const getAllUsers = async (req, res) => {
    try {
        let user = await userModel.find()
        if (user.length === 0) {
            return res.status(404).send({ status: false, message: "User Not found" });
        }
        return res.status(200).send({ status: true, message: "Users Details", data: user })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}



//Get One User By Id
export const getUserById = async (req, res) => {
    try {
        let userId = req.params.id
        let user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).send({ status: false, message: "User Not found" });
        }
        return res.status(200).send({ status: true, message: "User profile details", data: user })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}



//Update User 
export const updateUser = async (req, res) => {
    try {
        let userId = req.params.id
        let { FirstName, LastName, Email, Phone, Password, Gender, Country } = req.body;

        let user = await userModel.findById(userId);

        switch (true) {
            case !user:
                return res.status(404).send({ status: false, message: "User Not found" });
            case !FirstName:
                return res.status(400).send({ status: false, message: "FirstName Is Mandatory " });
            case !LastName:
                return res.status(400).send({ status: false, message: "LastName Is Mandatory " });
            case !Email:
                return res.status(400).send({ status: false, message: "Email Is Mandatory " });
            case !isValidEmail(Email):
                return res.status(400).send({ status: false, message: "Invalid Email" });
            case !Phone:
                return res.status(400).send({ status: false, message: "Phone Is Mandatory" });
            case !Password:
                return res.status(400).send({ status: false, message: "Password Is Mandatory" });
             case !Gender:
                return res.status(400).send({ status: false, message: "Gender Is Mandatory" });
            case !Country:
                return res.status(400).send({ status: false, message: "Country Is Mandatory" });
        }
        

        let data = await userModel.findByIdAndUpdate(userId, {
            FirstName,
            LastName,
            Email,
            Phone,
            Gender,
            Country
        }, { new: true })
        return res.status(200).send({ status: true, message: "User profile updated", data: data });

    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}



//Delete User
export const deleteUserById = async (req, res) => {
    try {
        let userId = req.params.id
        let user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).send({ status: false, message: "User Not found" });
        }

        await userModel.findOneAndDelete(userId)
        return res.status(200).send({ status: true, message: "User Deleted" })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}
