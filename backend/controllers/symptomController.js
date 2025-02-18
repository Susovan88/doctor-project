import Symptom from "../models/symptomModel.js";
import evaluateSymptoms from "../schedules/symptomEvaluator.js";
import mongoose from 'mongoose';

export const submitSymptoms = async (req, res) => {
  try {
    const userId = req.user._id;

    // Get today's date (start of the day and end of the day for filtering)
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));  // Start of today
    const endOfDay = new Date(today.setHours(23, 59, 59, 999)); // End of today

    // Query the database for symptoms for today for the logged-in user
    let symptomLog = await Symptom.findOne({
      userId,
      date: { $gte: startOfDay, $lte: endOfDay }
    });

    if (!symptomLog) {
      return res.status(404).json({ success: false, message: "No symptom log found for today." });
    }

    // Generate personalized response
    const message = evaluateSymptoms(symptomLog.symptoms, symptomLog.oxygenLevel, symptomLog.heartRate, symptomLog.oxygenStatus);

    res.status(200).json({
      success: true,
      message,
      symptoms:symptomLog.symptoms,
      oxygenLevel: symptomLog.oxygenLevel,
      heartRate: symptomLog.heartRate,
      oxygenStatus: symptomLog.oxygenStatus,
    });

  } catch (error) {
    console.log("Error submitting symptoms:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const weeklySymptomsAnalyse=async (req, res) => {

  console.log("Backend route hit");
  try {
    const userId = req.user._id;

    // Get the current date and subtract 7 days for the past week
    const endDate = new Date();
    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - 7);

    // Query the database to find symptoms data of the user within the last 7 days
    const symptoms = await Symptom.find({
      userId:new mongoose.Types.ObjectId(userId), // Filter by userId
      date: { $gte: startDate, $lte: endDate }, // Filter by date range
    }).select('date oxygenLevel heartRate'); // Only return the date, oxygenLevel, and heartRate

    // Format the data into the desired response
    const formattedData = symptoms.map(entry => ({
      date: entry.date.toISOString().split('T')[0], // Get only the date part
      oxygenLevel: entry.oxygenLevel,
      heartRate: entry.heartRate,
    }));

    res.json({success:true,message:"Track Your weekly symptoms",formattedData}); // Send the formatted response
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
}
