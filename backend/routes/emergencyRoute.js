import express from 'express';
import { triggerEmergency } from '../controllers/emergencyController.js';
import authUser from '../middlewares/authUser.js';

const emergencyRouter = express.Router();

emergencyRouter.post('/trigger', authUser, triggerEmergency);

export default emergencyRouter;