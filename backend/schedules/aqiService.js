import axios from "axios";
export const fetchAQI = async (lat, lon) => {
    const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}`;

    try {
        const response = await axios.get(url);
        const components = response.data.list[0].components;  // Extract components
        const aqi = response.data.list[0].main.aqi;  // AQI value

        // Format data for PieChart
        const chartData = [
            { name: 'CO', value: components.co },
            { name: 'NH3', value: components.nh3 },
            { name: 'NO', value: components.no },
            { name: 'NO2', value: components.no2 },
            { name: 'O3', value: components.o3 },
            { name: 'PM2.5', value: components.pm2_5 },
            { name: 'PM10', value: components.pm10 },
            { name: 'SO2', value: components.so2 }
        ];
        console.log(chartData,aqi);
        return { chartData, aqi };  // Return both chartData and aqi value
    } catch (error) {
        console.log("Error fetching AQI data:", error);
        throw new Error("Failed to fetch AQI data");
    }
};
