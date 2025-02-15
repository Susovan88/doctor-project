import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  manufacturer: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['Tablet', 'Syrup', 'Injection', 'Ointment', 'Other']
  },
  expiry: {
    type: Date,
    required: true
  },
  image: {
    type: String, // URL or path to image
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Medicine=mongoose.model('Medicine', medicineSchema)

export default Medicine;