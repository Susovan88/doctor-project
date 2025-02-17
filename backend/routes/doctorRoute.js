import express from "express";
import {getAllDoctors,doctorLogin,getDocAppointment} from "../controllers/doctorController.js"
import authDoctor from "../middlewares/authDoctor.js";

const doctorRouter=express.Router();

doctorRouter.get('/',getAllDoctors);

doctorRouter.post('/login',doctorLogin);

doctorRouter.get('/doc-appointments',authDoctor,getDocAppointment)

export default doctorRouter;
