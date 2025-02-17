import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const AppointmentSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  slotTime: { type: Date, required: true },
  mode: { type: String, enum: ['Online', 'Offline'], default: 'Offline' },
  paymentMode:{ type: String, enum: ['Cash', 'Online Payament'], default: 'Cash' },
  status: { type: String, enum: ['pending', 'confirmed', 'completed'], default: 'pending' },
  meetingDetails: {
    meetingId: { type: String, default: uuidv4 },
    meetingPassword: { type: String, default: () => Math.random().toString(36).slice(-8) }
  }
});

const Appointment = mongoose.models.Appointment || mongoose.model("Appointment", AppointmentSchema);
export default Appointment;
