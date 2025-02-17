import mongoose from 'mongoose';

const DoctorSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  image: String,
  speciality: String,
  degree: String,
  experience: String,
  about: String,
  available: { type: Boolean, default: true },
  fees: Number,
  phone: { type: String, default: "+00 000000000" },
  address: {
    line1: String,
    line2: String,
    city: String,
    state: String,
    country: String,
    zip: String
  },
  slots_booked: [{
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    slotTime: Date
  }]
}, { minimize: false });

const Doctor = mongoose.models.Doctor || mongoose.model("Doctor", DoctorSchema);
export default Doctor;