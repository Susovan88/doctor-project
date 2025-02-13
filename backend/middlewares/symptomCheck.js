import Symptom from "../models/symptomModel.js";

const symptomCheck=async (req, res) => {
    try {

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const existingSymptom = await Symptom.findOne({
        userId: req.user._id,
        date: { $gte: today },
      });
  
      console.log( "is exist ",existingSymptom);
  
      if (existingSymptom) {
        return res.json({ success: true, message: "You have already recorded symptoms today." });
      }
  
      return res.json({ success: false, message: "No symptoms recorded for today." });
  
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
}

export default symptomCheck;