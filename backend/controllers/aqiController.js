import { fetchAQI } from "../schedules/aqiService.js";

export const getAQI = async (req, res) => {
    const { lat, lon } = req.params;

    if (!lat || !lon) {
        return res.status(400).json({ error: "Latitude and Longitude are required" });
    }

    try {
        const { chartData, aqi } = await fetchAQI(lat, lon);  // destructure directly
        res.status(200).json({ success: true, chartData, aqi });
    } catch (error) {
        res.json({success:false, message: error.message });
    }
};
