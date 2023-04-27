import express from 'express';
import { createUser, deleteUserById, getAllUsers, getUserById, login, updateUser } from '../controllers/userConroller.js';
import { reqSignIn } from '../middlewares/userAuth.js';

const router=express.Router();


//Add User
router.post("/user",createUser);

//login User
router.post("/login",login)

//Get User By Id
router.get("/user/:id",reqSignIn,getUserById);

//Get All Users
router.get("/users",reqSignIn,getAllUsers);

//Update User
router.put("/user/:id",reqSignIn,updateUser);

//Delete User By Id
router.delete("/user/:id",reqSignIn,deleteUserById);



export default router;