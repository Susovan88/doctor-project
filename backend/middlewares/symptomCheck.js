import Symptom from "../models/symptomModel.js"

const symptomCheck = async (req, res) => {
  console.log("check call");
  try {
    const today = new Date();
    // Set the date to 00:00:00 UTC on the current day
    today.setUTCHours(0, 0, 0, 0);

    const existingSymptom = await Symptom.findOne({
      userId: req.user._id,
      date: { $gte: today },
    });
    
    console.log("is exist- ", existingSymptom);

    if (existingSymptom) {
      return res.json({ success: true, message: "You have already recorded symptoms today." });
    }

    return res.json({ success: false, message: "No symptoms recorded for today." });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

export default symptomCheck;
