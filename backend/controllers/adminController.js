import validator from "validator"
import bycrypt from 'bcrypt'
import {v2 as cloudinary}from "cloudinary"
import Doctor from "../models/doctorModel.js";
import jwt from "jsonwebtoken";


const addDoctor=async(req,res)=>{

    try{
        const {name,email,password,speciality,degree,experience,about,fees,address}=req.body;
        const image=req.file;
        console.log( {name,email,password,speciality, image, degree,experience,about,fees,address});

        if(!name || !email || !password || !speciality||!degree||!experience||!about||!fees||!address){
            return res.json({success:false,message:"Missing Destails"});
        }
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter valid emails"});
        }
        if(password.length<10){
            return res.json({success:false,message:"Please enter valid password"});
        }
        if (!req.file) {
            return res.json({ success: false, message: "Image file is required!" });
        }
          
        // hshing doc password
        const solt=await bycrypt.genSalt(10);
        const hashedPassword=await bycrypt.hash(password,solt);

        // store image in cloudinary
        const imageUpload=await cloudinary.uploader.upload(image.path,{resource_type:"image"});
        const imageUrl=imageUpload.secure_url;

        const docData={
            name,
            email,
            image:imageUrl,
            password:hashedPassword,
            speciality,
            experience,
            degree,
            fees,
            about,
            address:JSON.parse(address) // in database address is  a string 
        };

        const newDoc=new Doctor(docData);
        await newDoc.save(); // handle the mongoose error
        res.json({success:true,message:"Doctor added!"});
    }catch(err){
        console.log(err);
        res.json({success:false,message:err.message});
    }
}

//api for admin login
const adminLogin=async(req,res)=>{
    try{
        const {email,password}=req.body;

        console.log(req.body);
        // if(email!==process.env.ADMIN_EMAIL) console.log("email false");
        // if(password!==process.env.ADMIN_PASSWORD) console.log("PW false");
        if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
            // console.log("valid");
            const token = jwt.sign(email+password,process.env.JWT_SECRET);
            res.json({success:true,token});
        }else{
            res.json({success:false,message:"Invalid credentials!!!"});
        }
    }catch(err){
        console.log(err);
        res.json({success:false,message:err.message});
    }
}

export {addDoctor,adminLogin};
