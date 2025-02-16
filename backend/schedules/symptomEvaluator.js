const evaluateSymptoms = (symptoms, oxygenLevel, heartRate, oxygenStatus) => {
    let message = "🔍 *Personalized Health Assessment*\n\n";

    // 🚨 Critical Warning
    if (oxygenLevel < 90 || heartRate > 120 || oxygenStatus === "Risky") {
        message += "🚨 *Immediate Medical Attention Required!* Your vitals indicate a high-risk situation. Please seek medical help.\n\n";
    }

    // 🌬️ Breathing Issues
    if (symptoms.shortnessOfBreath || symptoms.wheezing || symptoms.nighttimeSymptoms) {
        message += "🌬️ *Breathing Difficulty Detected!* Consider using a bronchodilator and monitoring closely.\n\n";
    }

    // 🤒 Fever & Infection Signs
    if (symptoms.fever || symptoms.sputumProduction === "yellow" || symptoms.sputumProduction === "green") {
        message += "🤒 *Possible Infection!* Stay hydrated and consult a doctor if symptoms persist.\n\n";
    }

    // 💖 Chest Tightness Warning
    if (symptoms.chestTightness) {
        message += "💖 *Chest Tightness Detected!* If pain worsens, seek immediate help.\n\n";
    }

    // 🤧 Cough Type Analysis
    if (symptoms.coughing && symptoms.coughing !== "none") {
        message += `🤧 *Cough Type:* ${symptoms.coughing}. Try steam therapy and hydration.\n\n`;
    }

    if (message === "🔍 *Personalized Health Assessment*\n\n") {
        message += "✅ *No severe symptoms detected!* Continue monitoring your health.\n\n";
    }

    return message;
};

export default evaluateSymptoms;
