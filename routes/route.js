import express from 'express';
import { createUser, deleteUserById, getAllUsers, getUserById, login, updateUser } from '../controllers/userConroller.js';

const router=express.Router();


//Add User
router.post("/user",createUser);

//login User
router.post("/login",login)

//Get User By Id
router.get("/user/:id",getUserById);

//Get All Users
router.get("/users",getAllUsers);

//Update User
router.put("/user/:id",updateUser);

//Delete User By Id
router.delete("/user/:id",deleteUserById);



export default router;