import axios from "axios";
import { AQIconfig } from "../config/AQI.js";

export const fetchAQI = async (lat, lon) => {
    const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${AQIconfig.openWeatherApiKey}`;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching AQI data:", error);
        throw new Error("Failed to fetch AQI data");
    }
};
