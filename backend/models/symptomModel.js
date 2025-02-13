import mongoose from "mongoose";

const SymptomSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  symptoms: {
    shortnessOfBreath: { type: Boolean, default: false },
    wheezing: { type: Boolean, default: false },
    chestTightness: { type: Boolean, default: false },
    coughing: {
      type: String,
      enum: ["none", "dry", "wet"],
      default: "none",
    },
    fever: { type: Boolean, default: false }, 
    fatigue: { type: Boolean, default: false }, 
    sputumProduction: {
      type: String,
      enum: ["none", "clear", "yellow", "green", "bloody"],
      default: "none",
    },
    nighttimeSymptoms: { type: Boolean, default: false },
  },
  oxygenLevel: {
    type: Number,
    required: true,
  },
  heartRate: {
    type: Number, // BPM (beats per minute)
    required: false,
  },
  oxygenStatus: {
    type: String,
    enum: ["Safe", "Moderate", "Risky"],
  },
  notes:{
    type: String,
    default:"none",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Auto-categorize oxygen level before saving
SymptomSchema.pre("save", function (next) {
  if (this.oxygenLevel >= 95) this.oxygenStatus = "Safe";
  else if (this.oxygenLevel >= 90) this.oxygenStatus = "Moderate";
  else this.oxygenStatus = "Risky";
  next();
});

const Symptom = mongoose.model("Symptom", SymptomSchema);
export default Symptom;
