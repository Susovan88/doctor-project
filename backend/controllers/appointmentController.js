import Appointment from '../models/appointmentModel.js';
import User from '../models/userModel.js';
import Doctor from '../models/doctorModel.js';
import mongoose from 'mongoose';


export const bookAppointment = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { doctorId, slotTime, mode, paymentMode } = req.body;
    const patientId = req.user._id;

    // Normalize slotTime to ignore seconds and milliseconds
    const slotTimeNormalized = new Date(slotTime);
    slotTimeNormalized.setSeconds(0, 0);

    // Check if slot is already booked (same doctor, same date and time)
    const existingAppointment = await Appointment.findOne({
      doctorId,
      slotTime: { $gte: slotTimeNormalized, $lt: new Date(slotTimeNormalized.getTime() + 60000) } // Check for exact minute
    }).session(session);

    if (existingAppointment) {
      return res.json({ success: false, message: 'This slot is already booked for the selected doctor' });
    }

    const newAppointment = new Appointment({
      doctorId,
      patientId,
      slotTime: slotTimeNormalized,
      mode,
      paymentMode,
      status: 'pending'
    });

    await newAppointment.save({ session });

    const user = await User.findById(patientId).session(session);
    const doctor = await Doctor.findById(doctorId).session(session);

    if (!user || !doctor) {
      return res.json({ success: false, message: 'User or Doctor not found' });
    }

    user.slots_booked.push({ doctorId, slotTime: slotTimeNormalized });
    doctor.slots_booked.push({ patientId, slotTime: slotTimeNormalized });
    await user.save({ session });
    await doctor.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.json({ success: true, message: 'Appointment booked successfully', appointment: newAppointment });

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Error booking appointment:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getAppointments = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming user ID is available from auth middleware
    const appointments = await Appointment.find({ patientId: userId })
      .populate({ path: "doctorId", select: "name specialization address image" })
      .populate("patientId");

    res.status(200).json({success:true, message:"Get all Your appointments.",appointments});
  } catch (error) {
    console.log(error);
    res.status(500).json({success:false, message: "Error fetching appointments" });
  }
};

export const cancleAppointment=async (req, res) => {
  try {
    const appointmentId = req.params.id;

    // Find the appointment to get related user and doctor
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) return res.json({ success: false, message: 'Appointment not found' });

    const { userId, doctorId, slotTime } = appointment;

    await Appointment.findByIdAndDelete(appointmentId);

    await User.findByIdAndUpdate(userId, { $pull: { slots_booked: { slotTime } } });

    await Doctor.findByIdAndUpdate(doctorId, { $pull: { slots_booked: { slotTime } } });

    res.status(200).json({ success: true, message: 'Appointment cancelled successfully' });
  } catch (error) {
    console.error('Error cancelling appointment:', error);
    res.json({ success: false, message: 'Internal server error' });
  }
}








export const getDocAppointment= async (req, res) => {
  try {
    const { doctorId } = req.params;
    const appointments = await Appointment.find({ doctorId }).select('slotTime -_id');
    res.json({ success: true, slots: appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching booked slots' });
  }
}
