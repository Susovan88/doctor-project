import { fetchAQI } from "../schedules/aqiService.js";

export const getAQI = async (req, res) => {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
        return res.status(400).json({ error: "Latitude and Longitude are required" });
    }

    try {
        const data = await fetchAQI(lat, lon);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
