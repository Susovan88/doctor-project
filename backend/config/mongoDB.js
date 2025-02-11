import mongoose from "mongoose";
import env from "dotenv";
env.config();

const mongoUrl=process.env.MONGO_URL;

const main=async()=>{
    await mongoose.connect(`${mongoUrl}/DoctorsAppointment`);
}
export default main;
