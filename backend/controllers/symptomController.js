import Symptom from "../models/symptomModel.js";
import evaluateSymptoms from "../schedules/symptomEvaluator.js";

export const submitSymptoms = async (req, res) => {
  try {
    const { userId, symptoms, oxygenLevel, heartRate, notes } = req.body;

    // Create new symptom log
    const symptomLog = new Symptom({
      userId,
      symptoms,
      oxygenLevel,
      heartRate,
      notes,
    });

    await symptomLog.save();

    // Generate personalized response
    const message = evaluateSymptoms(symptoms, oxygenLevel, heartRate, symptomLog.oxygenStatus);

    res.status(201).json({ success: true, message, symptomLog });
  } catch (error) {
    console.error("Error submitting symptoms:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
