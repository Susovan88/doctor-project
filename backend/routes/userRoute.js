import express from "express";
import {userSignup,userLogin,sendProfileData,editProfile} from "../controllers/userControllers.js";
import authUser from "../middlewares/authUser.js";
import upload from "../middlewares/multor.js";

const userRouter =express.Router();

userRouter.get("/profile",authUser,sendProfileData);
userRouter.put("/profile",authUser,upload.single('image'),editProfile);

userRouter.post("/signup",userSignup);
userRouter.post("/login",userLogin);



export default userRouter;