import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  image: { type: String, default: "https://t3.ftcdn.net/jpg/07/24/59/76/360_F_724597608_pmo5BsVumFcFyHJKlASG2Y2KpkkfiYUU.jpg" },
  address: {
    line1: String,
    line2: String
  },
  slots_booked: [{
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
    slotTime: Date
  }],
  gender: { type: String, enum: ["Male", "Female", "Not Selected"], default: "Not Selected" },
  dob: { type: String, default: "Not Selected" },
  phone: { type: String, default: "+00 000000000" },
  symptoms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Symptoms" }],
  medications: [{ type: mongoose.Schema.Types.ObjectId, ref: "Medication" }]
}, { minimize: false });

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
