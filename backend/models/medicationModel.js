import mongoose from "mongoose";

const medicationSchema = new mongoose.Schema({
  medicationName: {
    type: String,
    required: true,
    trim: true
  },
  reminderTime: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Medication=mongoose.models.Medication || mongoose.model("Medication",medicationSchema);
export default Medication;
