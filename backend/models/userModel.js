import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        default:"https://t3.ftcdn.net/jpg/07/24/59/76/360_F_724597608_pmo5BsVumFcFyHJKlASG2Y2KpkkfiYUU.jpg",
    },
    address:{
        type:Object,
        default:{
            line1:"",
            line2:""
        }
    },
    slots_booked:{
        type:Object,
        default:{}
    },
    gender:{
        type:String,
        enum: ["Male", "Female","Not Selected"],
        default:"Not Selected",
    },
    dob:{
        type:String,
        default:"Not Selected",
    },
    phone:{
        type:String,
        default:"+00 000000000",
    },
    symptoms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Symptoms"
    }]
},{minimize:false});

const User=mongoose.models.User || mongoose.model("User",userSchema);
export default User;