import express from "express";
import {userSignup,userLogin,sendProfileData,editProfile,saveSymtom,getMedication,saveMedication,deleteMedication,getMedicines,orderItem,getOrder,deleteOrder} from "../controllers/userControllers.js";
import authUser from "../middlewares/authUser.js";
import upload from "../middlewares/multor.js";
import symptomCheck from "../middlewares/symptomCheck.js";
import { bookAppointment, getAppointments } from '../controllers/appointmentController.js';
import { submitSymptoms } from "../controllers/symptomController.js";

const userRouter =express.Router();

userRouter.get("/profile",authUser,sendProfileData);
userRouter.put("/profile",authUser,upload.single('image'),editProfile);

userRouter.post("/signup",userSignup);
userRouter.post("/login",userLogin);

userRouter.post('/symptoms',authUser,saveSymtom);
userRouter.get('/symptoms/check',authUser,symptomCheck);


userRouter.get('/medicines',getMedicines)
userRouter.post('/orders',authUser,orderItem);
userRouter.get('/orders',authUser,getOrder);
userRouter.delete("/orders/:id",authUser,deleteOrder);


userRouter.get("/medications",authUser,getMedication);
userRouter.post("/medications",authUser,saveMedication);
userRouter.delete("/medications/:id",authUser,deleteMedication);

userRouter.post('/book/:doctorId', authUser, bookAppointment);
userRouter.get('/', authUser, getAppointments);

userRouter.post('/submit',submitSymptoms);



export default userRouter;