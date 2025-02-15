import Appointment from '../models/appointmentModel.js';
import User from '../models/userModel.js';
import Doctor from '../models/doctorModel.js';

export const bookAppointment = async (req, res) => {
  try {
    const {patientId, slotTime} = req.body;
    //const patientId = req.user_id;
    const {doctorId} = req.params;
    const doctor = await Doctor.findById(doctorId);
    if (!doctor || !doctor.available) {
      return res.status(400).json({ message: "Doctor not available" });
    }

    const appointment = new Appointment({ doctorId, patientId, slotTime });
    await appointment.save();

    await User.findByIdAndUpdate(patientId, {
      $push: { slots_booked: { doctorId, slotTime } }
    });

    await Doctor.findByIdAndUpdate(doctorId, {
      $push: { slots_booked: { patientId, slotTime } }
    });

    res.status(201).json({ message: "Appointment booked successfully", appointment });
  } catch (error) {
    res.status(500).json({ message: "Error booking appointment", error });
    console.log(error);
  }
};

export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate("doctorId patientId");
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments", error });
  }
};
