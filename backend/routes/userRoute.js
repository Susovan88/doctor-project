import express from "express";
import {userSignup,userLogin,sendProfileData,editProfile,saveSymtom} from "../controllers/userControllers.js";
import authUser from "../middlewares/authUser.js";
import upload from "../middlewares/multor.js";
import symptomCheck from "../middlewares/symptomCheck.js";

const userRouter =express.Router();

userRouter.get("/profile",authUser,sendProfileData);
userRouter.put("/profile",authUser,upload.single('image'),editProfile);

userRouter.post("/signup",userSignup);
userRouter.post("/login",userLogin);

userRouter.post('/symptoms',authUser,saveSymtom);

userRouter.get('/symptoms/check',authUser,symptomCheck);



export default userRouter;