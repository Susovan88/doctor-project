import Doctor from "../models/doctorModel.js"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import Appointment from "../models/appointmentModel.js"


const getAllDoctors=async (req, res) => {
    try {
      const doctors = await Doctor.find();
      res.status(200).json({success:true, message:"Get all doctors",doctors});
    } catch (error) {
        console.log(error);
      res.status(500).json({success:true, message: 'Failed to fetch doctors' });
    }
}


const doctorLogin= async (req, res) => {
  const { email, password } = req.body;

  try {
    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.status(400).json({ success: false, message: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid Password or Email' });
    }

    const payload = { docId: doctor._id};
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '3d' });

    res.json({ success: true, token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ success: false, message: 'Server Error' });
  }
}



const getDocAppointment=async (req, res) => {

  try {
    const doctorId = req.doctor._id;  // Get doctor ID from authenticated doctor

    const appointments = await Appointment.find({ doctorId: doctorId })
      .populate('patientId', 'name email image phone') // Populate patient details
      .sort({ date: 1 }); // Sort by date ascending

      console.log(appointments);
    res.status(200).json({ success: true,message:"get all appointments", appointments });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: 'Server error' });
  }
}

export {getAllDoctors,doctorLogin,getDocAppointment};