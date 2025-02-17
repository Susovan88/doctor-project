import express from "express";
import { addDoctor,adminLogin,addMedicine,getAllOrders,editOrderStatus,getAllAppoints} from "../controllers/adminController.js";
import upload from "../middlewares/multor.js";
import authAdmin from "../middlewares/authAdmin.js";

const adminRouter=express.Router();

adminRouter.post('/add-doctor',authAdmin,upload.single('image'),addDoctor);
adminRouter.post("/login",adminLogin);

adminRouter.post('/add-medicine', authAdmin, upload.single('image'), addMedicine);
adminRouter.get('/orders',authAdmin,getAllOrders);
adminRouter.put('/orders/:id',authAdmin, editOrderStatus);

adminRouter.get("/all-appointments",authAdmin,getAllAppoints);

export default adminRouter;