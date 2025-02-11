import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {v2 as cloudinary}from "cloudinary"
import upload from "../middlewares/multor.js";

const userSignup= async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // Check if user already exists
      let user = await User.findOne({ email });
      if (user) return res.json({success:false, message: "User already exists" });

      if(password.length<10){
        return res.json({success:false,message:"Please enter valid password"});
      }
  
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create user
      user = new User({ name, email, password: hashedPassword });
      await user.save();
  
      // Generate JWT Token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      console.log(user,"User registered successfully");
  
      res.status(201).json({success:true,  message: "User registered successfully", token });
    } catch (error) {
      return res.json({success:false,  message:error.message });
    }
}

const userLogin= async (req, res) => {
  
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    console.log(user,"User login successfully");


    res.json({ success: true, message: "Login successful", token});
  } catch (error) {
    return res.json({ success: false, message:error.message });
  }
}



const sendProfileData=async(req,res)=>{

  res.json({
    success: true,
    message: "User authenticated successfully",
    user: req.user, // Contains user details
  });

}

const editProfile=async(req,res)=>{
  console.log(req.file);
  try {
    const { name, email, phone, address, gender, dob } = req.body;

    const existingUser = await User.findById(req.user._id);
    if (!existingUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const image = req.file ? (await cloudinary.uploader.upload(req.file.path,{resource_type:"image"})) : existingUser.image;

    existingUser.name = name || existingUser.name;
    existingUser.email = email || existingUser.email;
    existingUser.phone = phone || existingUser.phone;
    existingUser.address = address || existingUser.address;
    existingUser.gender = gender || existingUser.gender;
    existingUser.dob = dob || existingUser.dob;
    existingUser.image = image.secure_url? image.secure_url : image;

    const updatedUser = await existingUser.save();
    // console.log(updatedUser);
    res.json({ success: true, message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message:error.message });
  }
}

export {userSignup,userLogin,sendProfileData,editProfile};