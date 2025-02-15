import mongoose from 'mongoose';

const AppointmentSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  slotTime: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'completed'], default: 'pending' }
});

const Appointment = mongoose.models.Appointment || mongoose.model("Appointment", AppointmentSchema);
export default Appointment;