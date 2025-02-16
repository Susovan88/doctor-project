import express from "express";
import { getAQI } from "../controllers/aqiController.js";

const AQIrouter = express.Router();

// Route: GET /api/aqi?lat=XX&lon=XX
AQIrouter.get("/aqi", getAQI);

export default AQIrouter;
