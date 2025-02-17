import jwt from "jsonwebtoken";
import Doctor from "../models/doctorModel.js";

const authDoctor = async (req, res, next) => {
  const token = req.header('dToken');  // Expect token from 'dToken' header
//   console.log(token);
  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
    const doctor = await Doctor.findById(decoded.docId).select('-password');
    // console.log(doctor);

    if (!doctor) {
      return res.json({ success: false, message: 'Doctor not found' });
    }

    req.doctor = doctor;  // Attach doctor data to request object
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Invalid token' });
  }
};

export default authDoctor;
