import express from "express";
import {userSignup,userLogin,sendProfileData,editProfile,saveSymtom,getMedication,saveMedication,deleteMedication} from "../controllers/userControllers.js";
import authUser from "../middlewares/authUser.js";
import upload from "../middlewares/multor.js";
import symptomCheck from "../middlewares/symptomCheck.js";
import { bookAppointment, getAppointments } from '../controllers/appointmentController.js';

const userRouter =express.Router();

userRouter.get("/profile",authUser,sendProfileData);
userRouter.put("/profile",authUser,upload.single('image'),editProfile);

userRouter.post("/signup",userSignup);
userRouter.post("/login",userLogin);

userRouter.post('/symptoms',authUser,saveSymtom);
userRouter.get('/symptoms/check',authUser,symptomCheck);

userRouter.get("/medications",authUser,getMedication);
userRouter.post("/medications",authUser,saveMedication);
userRouter.delete("/medications/:id",authUser,deleteMedication);

userRouter.post('/book/:doctorId', authUser, bookAppointment);
userRouter.get('/', authUser, getAppointments);



export default userRouter;