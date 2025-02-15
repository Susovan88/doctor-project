import User from "../models/userModel.js";
import Symptom from "../models/symptomModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {v2 as cloudinary}from "cloudinary";
import Medication from "../models/medicationModel.js";

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



const saveSymtom=async(req,res)=>{
  try {
    const {symptoms, oxygenLevel, heartRate ,notes} = req.body;

    // Validate required fields
    if (!oxygenLevel) {
      return res.json({success:false, message: "Oxygen Level are required." });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of the day

    // Check if a symptom record already exists for today
    const existingSymptom = await Symptom.findOne({
      userId: req.user._id,
      date: { $gte: today },
    });

    console.log( "is exist ",existingSymptom);

    if (existingSymptom) {
      return res.json({ success: false, message: "You have already recorded symptoms today." });
    }

    // Determine oxygen status
    let oxygenStatus = "Risky";
    if (oxygenLevel >= 95) oxygenStatus = "Safe";
    else if (oxygenLevel >= 90) oxygenStatus = "Moderate";

    // Create a new symptom record
    const newSymptom = new Symptom({
      userId:req.user._id,
      symptoms,
      oxygenLevel,
      heartRate,
      oxygenStatus,
      notes,
    });

    // Save to database
    await newSymptom.save();
    await User.findByIdAndUpdate(
      req.user._id,
      { $push: { symptoms: newSymptom._id } },
      { new: true }
    )
    console.log("Symptoms recorded successfully!",newSymptom);



    return res.json({ success:true, message: "Symptoms recorded successfully!", data: newSymptom });
  } catch (error) {
    // console.error("Error saving symptoms:", error);
    return res.json({success:false, message:error.message });
  }

}



// Medication functions....

const getMedication=async (req, res) => {
  try {
    const userId = req.user._id; // Authenticated user's ID

    // Find user and populate medications
    const user = await User.findById(userId).populate('medications');

    if (!user) {
<<<<<<< HEAD
      return res.json({ message: 'User not found' });
    }
    
    res.json({ success: true, message: "get Medications data.", medications: user.medications });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message });
=======
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ success: true, message: "get Medications data.", medications: user.medications });
  } catch (error) {
    res.status(500).json({ message: error.message });
>>>>>>> 0f73b4d42e5632a82a8c31680e071155c2e48962
  }
}

const saveMedication=async (req, res) => {

  const { medicationName, reminderTime } = req.body;
  if(!medicationName || !reminderTime){
    return res.json({success:false,message:"Medication and time required!"})
  }

  const medication = new Medication({
    medicationName,
    reminderTime,
    userId:req.user._id,
  });

  try {
    const newMedication = await medication.save();

    // Update the user's medications list
    await User.findByIdAndUpdate(req.user._id, { $push: { medications: newMedication._id } });

    res.json({ success: true, message: "Saved new Medication", newMedication });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
}


const deleteMedication = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('medications');
    if (!user) {
<<<<<<< HEAD
      return res.json({ message: 'User not found' });
=======
      return res.status(404).json({ message: 'User not found' });
>>>>>>> 0f73b4d42e5632a82a8c31680e071155c2e48962
    }

    const medicationId = req.params.id;
    const medication = user.medications.find(med => med._id.toString() === medicationId);

    if (!medication) {
      return res.json({ success:false, message: 'Medication not found' });
    }

    await Medication.findByIdAndDelete(medicationId);
    await User.findByIdAndUpdate(req.user._id, { $pull: { medications: medicationId } });

    res.json({success:true, message: 'Medication reminder deleted' });
  } catch (error) {
    res.json({success:false, message: error.message });
  }
};


// const deleteMedication= async (req, res) => {
//   try {
//     const medication = await Medication.findById(req.user._id);
//     if (!medication) {
//       return res.status(404).json({ message: 'Medication not found' });
//     }
//     medication.isActive = false;
//     await medication.save();
//     await User.findByIdAndUpdate(medication.userId, { $pull: { medications: medication._id } });
//     res.json({ message: 'Medication reminder deleted' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// }

export {userSignup,userLogin,sendProfileData,editProfile,saveSymtom,getMedication,saveMedication,deleteMedication};