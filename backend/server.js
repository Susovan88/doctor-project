import express from "express";
import cors from "cors";
import env from "dotenv";
import main from "./config/mongoDB.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/addminRoute.js";
import userRouter from "./routes/userRoute.js";
import doctorRouter from "./routes/doctorRoute.js"
import scheduleReminders from "./schedules/reminderScheduler.js"
import { AQIconfig } from "./config/AQI.js";
import AQIrouter from "./routes/aqiRoute.js";


env.config();
const app=express();
const port=process.env.PORT;

//middlewares
app.use(cors());  // it is allow to connect frontend to backend
app.use(express.json());  
app.use(express.urlencoded({ extended: true })); 

main().then(()=>{  // connect mongodb
    console.log("-> -> mongodb is connected with server!!!")
}).catch(err=> console.log("err: ",err));

connectCloudinary(); // connect cloudinary

scheduleReminders();

app.use('/api/user',userRouter);

app.use('/api/admin',adminRouter);

app.use("/api/doctor",doctorRouter);

app.use('/api/aqi', AQIrouter);

app.get("/" ,(req,res)=>{
    res.send("Hello world");
});


app.listen(port,()=>{
    console.log(`-> ->server is connected with port ${port}`);
});



